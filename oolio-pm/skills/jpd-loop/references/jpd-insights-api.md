# jpd-loop — Creating native JPD Insights (reference)

How to create native Insights on JPD ideas programmatically. Validated 19 Jul 2026 against Atlassian's official reference (github.com/Jira-Product-Discovery-Integrations/polaris-forge-ref-app, `ai-skills/SKILL.md`) and their community confirmation (Jun 2026: public API exists; MCP cannot do it yet).

## Route decision (check in this order)

1. **Can this session reach `api-private.atlassian.com` and `auth.atlassian.com`?** Test with a quick curl. Local Cowork (on the user's computer) and Claude Code sessions: usually yes → **Route A**. The Anthropic cloud sandbox: no (network allowlist blocks it, verified 19 Jul 2026) → next.
2. **Is the user's Chrome connected (Claude-in-Chrome)?** Yes → **Route B**.
3. Neither → **Route C** (paste-ready list, see `insights-and-citations.md`).

## Route A — Polaris GraphQL API

### One-time setup (user does this once)
Create a 3LO OAuth app at https://developer.atlassian.com/console/myapps/create-3lo-app/ with scopes `read:jira-user read:jira-work write:jira-work offline_access`, callback URL `http://localhost:7777`. Keep Client ID + Secret.

### Token handling
Store tokens at `~/.jpd-insights-token.json` (`access_token`, `refresh_token`, `expires_at` ms). Decision tree: file exists and `now < expires_at` → use as-is; expired → refresh via `POST https://auth.atlassian.com/oauth/token` with `grant_type=refresh_token` (no browser); no file / refresh 401 → full browser auth flow (auth URL → user approves → exchange `code` at the same token endpoint with `grant_type=authorization_code`). If the localhost callback can't be received, have the user paste the `?code=` from the failed redirect URL.

### IDs you need
- Cloud ID: `GET https://api.atlassian.com/oauth/token/accessible-resources` → match site URL (Oolio: `oolio.atlassian.net` → `98b2c73a-4f2e-4b23-aca7-dbc5b45b1e24`)
- Issue ID + Project ID: `GET /ex/jira/<CLOUD_ID>/rest/api/3/issue/<KEY>` → `id` and `fields.project.id` (OHSI project id: `10052`)

### Endpoint
```
POST https://api-private.atlassian.com/graphql
Authorization: Bearer <ACCESS_TOKEN>
Content-Type: application/json
X-ExperimentalApi: polaris-v0        ← REQUIRED or the API errors
```

### Create mutation
```graphql
mutation createInsight($input: CreatePolarisInsightInput!) {
  createPolarisInsight(input: $input) {
    success
    errors { message }
    node { id container created }
  }
}
```
Variables shape (all IDs are PLAIN ids here, not ARIs):
```json
{
  "input": {
    "cloudID": "<CLOUD_ID>",
    "projectID": "<PROJECT_ID>",
    "issueID": "<ISSUE_ID>",
    "description": {"version": 1, "type": "doc", "content": [
      {"type": "paragraph", "content": [{"type": "text", "text": "<one-line insight description>"}]}]},
    "data": [],
    "snippets": [{
      "oauthClientId": "<CLIENT_ID>",
      "url": "<source URL>",
      "data": {
        "type": "quotes",
        "group": {"name": "<group name>", "id": "<group_id>"},
        "context": {"icon": "<icon URL>", "url": "<source URL>", "title": "<link title>"},
        "content": [{"type": "quotesItem", "quote": "<text shown on the card>"}],
        "properties": {"labels": {"name": "Labels", "value": ["<tag>"]}}
      }
    }]
  }
}
```

### Schema gotchas (all verified live by Atlassian's skill)
- Input type is `CreatePolarisInsightInput` (NOT `PolarisCreateInsightInput`).
- Top-level `data: []` is required even when empty.
- The mutation returns `node`, not `insight`; check `success: true`.
- `snippets[].data.type` must be `"quotes"` (`"card"` is rejected).
- `snippets[].data.content` is an ARRAY of `{"type": "quotesItem", "quote": "..."}`.
- `snippets[].data.context` requires `icon`, `url`, AND `title` (icon is mandatory).
- `snippets[].data.group` is required: `{"name": "...", "id": "..."}`.

### Read query (per idea, or omit `container` for all insights in a project)
```graphql
query getPolarisInsights($project: ID!, $container: ID) {
  polarisInsights(project: $project, container: $container) {
    id container description snippets { id url data properties } created updated
  }
}
```
Variables use ARIs: `project: "ari:cloud:jira:<CLOUD_ID>:project/<PROJECT_ID>"`, `container: "ari:cloud:jira:<CLOUD_ID>:issue/<ISSUE_ID>"`. `container` is a scalar (no sub-selection).

### Common errors
| Error | Fix |
|---|---|
| `Unknown type 'PolarisCreateInsightInput'` | Use `CreatePolarisInsightInput` |
| 401 | Refresh token; if refresh fails, redo browser auth |
| `no data or no data node` | Wrong cloud ID / site not authorised |
| Validation error on `container { id }` | `container` is scalar — request it bare |

## Route B — Chrome UI automation (cloud sessions)

Using Claude-in-Chrome on the user's connected browser (their JPD session is already authenticated):
1. Navigate to `https://oolio.atlassian.net/browse/<KEY>` → open the **Insights** tab.
2. Click to add an insight; paste the source URL in the link field and wait for JPD to unfurl the preview card.
3. Add the one-line description in the description area; set the **Impact** dots (1–5 per the rubric in `insights-and-citations.md`).
4. Click **Create**; verify the insight renders before moving to the next one.
Batch all insights for one idea in a single pass. Do not create duplicates: read the Insights tab first.

## Standard (both routes)

Whenever evidence is gathered for an idea (jpd-loop step 3, ad-hoc research, market evidence like a competitor example), attach it as a native Insight on the idea with description + real source URL + impact rating. The Insights tab is the source of truth for validation evidence; description blocks and DISC pages mirror it.
