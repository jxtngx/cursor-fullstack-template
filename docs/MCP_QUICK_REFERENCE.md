# MCP Integration Quick Reference

Quick reference for using Notion, Linear, and Discord MCP integrations.

## Setup

### Environment Variables

```bash
# Notion
NOTION_API_KEY=secret_xxx
NOTION_WORKSPACE_ID=xxx
NOTION_SPRINT_DATABASE_ID=xxx
NOTION_TICKETS_DATABASE_ID=xxx
NOTION_DOCS_DATABASE_ID=xxx

# Linear
LINEAR_API_KEY=lin_api_xxx
LINEAR_FRONTEND_TEAM_ID=xxx
LINEAR_BACKEND_TEAM_ID=xxx
LINEAR_INFRA_TEAM_ID=xxx
LINEAR_TEST_TEAM_ID=xxx

# Discord
DISCORD_BOT_TOKEN=xxx
DISCORD_GUILD_ID=xxx
DISCORD_ANNOUNCEMENTS_CHANNEL=xxx
DISCORD_TICKET_UPDATES_CHANNEL=xxx
DISCORD_STANDUP_CHANNEL=xxx
```

### Start Services

```bash
# Start backend with MCP integrations
cd backend
pip install -e .
uvicorn main:app --reload

# Discord bot (separate process)
python integrations/discord/bot.py
```

## Discord Commands

### Available Slash Commands

| Command | Description | Example |
|---------|-------------|---------|
| `/ticket <id>` | Get ticket details | `/ticket FE-001` |
| `/sprint` | Current sprint status | `/sprint` |
| `/standup <yesterday> <today> [blockers]` | Post standup | `/standup "Fixed bug" "Working on feature" "Need design"` |
| `/velocity` | Team velocity metrics | `/velocity` |

### Usage Examples

**Check a ticket**:
```
/ticket BE-003
```
Response: Rich embed with status, points, dependencies, links to Notion and Linear

**Post standup**:
```
/standup 
  yesterday: "Completed FE-001, reviewed PR for BE-002"
  today: "Starting FE-002, pairing with backend on API"
  blockers: "Waiting for design assets"
```

**Check sprint**:
```
/sprint
```
Response: Sprint progress, tickets by status, velocity

## Notion Operations

### Sync Sprint to Notion

```python
from services.work_tracking.notion_service import NotionService

notion = NotionService()
sprint_page_id = await notion.sync_sprint_to_notion(
    ".cursor/plans/sprint_01_agentic_chat.md"
)
```

### Query Tickets

```python
# Get active sprint tickets
tickets = await notion.client.query_database(
    database_id=TICKETS_DATABASE_ID,
    filter_params={"property": "Status", "select": {"equals": "In Progress"}}
)
```

### Create Documentation Page

```python
doc_id = await notion.create_doc_page(
    title="API Architecture",
    category="Architecture",
    content=[...],  # Rich content blocks
    tags=["backend", "api", "design"]
)
```

## Linear Operations

### Create Issue from Ticket

```python
from services.work_tracking.linear_service import LinearService

linear = LinearService()
issue = await linear.create_issue_from_ticket({
    "id": "FE-001",
    "title": "Create Chat UI Components",
    "description": "Build chat interface...",
    "points": 5,
    "owner": "Frontend Engineer",
    "dependencies": []
})
# Returns: Linear issue ID and URL
```

### Update Issue Status

```python
await linear.sync_status_to_linear(
    ticket_id="FE-001",
    status="In Progress"
)
```

### Query Team Issues

```python
issues = await linear.client.list_team_issues(
    team_id="frontend-team-id",
    state_filter="In Progress"
)
```

## Discord Notifications

### Send Ticket Update

```python
from services.notifications.discord_service import DiscordService

discord = DiscordService()
await discord.send_ticket_update(
    ticket_id="BE-002",
    updates={
        "status": "In Progress",
        "title": "Implement Bedrock LLM Wrapper"
    },
    notion_url="https://notion.so/...",
    linear_url="https://linear.app/..."
)
```

### Announce Sprint Start

```python
await discord.announce_sprint_start({
    "name": "Sprint 1: Agentic AI Chat",
    "goal": "Build functional AI chat assistant",
    "start": "2024-03-15",
    "end": "2024-03-29",
    "velocity": 20,
    "status": "Active"
})
```

### Send Daily Standup Reminder

```python
# Typically run via cron job at 9 AM
await discord.send_daily_reminder()
```

## Work Tracking Coordinator

### Full Sync Flow

```python
from services.work_tracking.sync_coordinator import WorkTrackingCoordinator

coordinator = WorkTrackingCoordinator()

# When status changes in Linear (webhook handler)
await coordinator.handle_status_change(
    ticket_id="FE-001",
    new_status="In Review"
)
# Automatically:
# 1. Updates Notion page
# 2. Posts to Discord team channel
# 3. Posts to Discord #ticket-updates
```

### Manual Sync

```python
# Sync specific ticket across all platforms
await coordinator.sync_ticket_update(
    ticket_id="BE-003",
    updates={
        "status": "Done",
        "actual_points": 5,
        "completion_date": "2024-03-20"
    }
)
```

## Common Workflows

### Starting a Sprint

1. Create sprint plan markdown in `.cursor/plans/`
2. Run sync command:
```python
notion_page = await notion.sync_sprint_to_notion("sprint_01_agentic_chat.md")
linear_issues = await linear.create_sprint_issues(notion_page)
await discord.announce_sprint_start(sprint_data)
```

### Daily Work

1. Developer picks ticket from Linear board
2. Updates status to "In Progress"
3. Linear webhook fires
4. Coordinator updates Notion and Discord automatically

### Completing a Ticket

1. Developer marks ticket "Done" in Linear
2. Creates PR with `[FE-001]` in title
3. Coordinator syncs status
4. Discord posts completion notification
5. Notion updates sprint velocity

### Sprint Retrospective

1. Run velocity calculation:
```python
velocity = await coordinator.calculate_velocity()
```

2. Document in Notion
3. Create improvement tickets in Linear
4. Discord posts sprint summary

## Troubleshooting

### Check Sync Status

```bash
# Check webhook logs
tail -f logs/webhooks.log

# Test Notion connection
python -c "from integrations.notion.mcp_client import NotionMCPClient; \
  client = NotionMCPClient(api_key); \
  print(await client.client.users.me())"

# Test Linear connection  
python -c "from integrations.linear.mcp_client import LinearMCPClient; \
  client = LinearMCPClient(api_key); \
  print(await client.get_viewer())"

# Test Discord bot
python integrations/discord/bot.py --test
```

### Manual Resync

```python
# If platforms get out of sync, run manual sync
from scripts.sync_platforms import resync_all

await resync_all(
    sprint_id="sprint_01",
    force=True  # Overwrite conflicts
)
```

### API Rate Limits

**Notion**: 3 requests/second
- Use exponential backoff
- Cache database queries

**Linear**: 60 requests/minute  
- Batch operations when possible
- Use GraphQL to reduce request count

**Discord**: 50 messages/second per channel
- Queue notifications
- Use embeds to combine information

## Best Practices

1. **Always update Linear first** - It's the source of truth for status
2. **Use ticket IDs in commits** - Enables automatic linking
3. **Check Discord for updates** - Real-time notifications
4. **Keep Notion docs current** - Update with major decisions
5. **Use slash commands** - Quick queries without leaving Discord
6. **Tag tickets appropriately** - Helps with filtering and reports
7. **Close threads when resolved** - Keeps channels clean
8. **Archive old sprints** - Notion and Linear clutter management

## Quick Links

- **Notion Workspace**: https://notion.so/your-workspace
- **Linear Workspace**: https://linear.app/your-team
- **Discord Server**: https://discord.gg/your-invite
- **API Documentation**:
  - [Notion API](https://developers.notion.com)
  - [Linear API](https://developers.linear.app/docs)
  - [Discord API](https://discord.com/developers/docs)
