# Jira teams

The canonical map of Oolio's Jira teams: each team's name as it appears in Jira and the Atlassian team ID the **Team** field actually stores. Skills use this when creating or updating issues, epics, initiatives and ideas so work lands with the right owners, and when triaging incidents, intake and orphan tasks. Load it from `${CLAUDE_PLUGIN_ROOT}/references/jira-teams.md`.

This is a starting point, not an org chart. It carries what a skill needs to assign work correctly; leads, members and team-to-project mappings are known gaps (see the foot of the file).

## How to use it

- The Jira Team field stores the **team ID** (a UUID), not the name. Match the work to a team below and set the field with the ID.
- Match on domain, not name. The notes under each team describe what the team actually owns, which is often wider than the name suggests: POS owns far more than the point of sale, and Products App owns menus.
- If no team fits cleanly, leave the field unset and flag it rather than guessing. A wrong team assignment is worse than none, because it buries work in the wrong standup.

## The teams

Prefixes are home bases: MEL is Melbourne, IN is India, VN is Vietnam. Teams with hybrid locations, such as DATA and eComm, carry no geo prefix.

| Team | Atlassian team ID |
|---|---|
| MEL 1 \| Integration | `cee9b57a-0e55-433c-9c32-f618d0983f3b` |
| MEL 2 \| Oolio Pay | `df0244f7-a388-4b94-8146-0094ef640cf6` |
| MEL 3 \| Loyalty & Engagement | `0e1c1b45-ec2c-46e1-a020-8c0f175a4962` |
| DATA | `59687059-e14b-41ea-8ab7-356c31a747ba` |
| Platform / DevOps | `973b2986-25f2-45d7-8138-1cb7aa83eefb` |
| IN 1 \| POS | `8a2f55ce-b8c8-4d1a-b65f-74528d7aa2f0` |
| IN 2 \| Accounts | `2128ae5d-3c9f-4887-935e-f0d959031c81` |
| IN 3 \| Inventory | `aa39cbde-8659-4996-ae46-37d3a664c683` |
| eComm | `826faa6d-de69-44c7-983c-a9054d3947ca` |
| VN 1 \| Insights | `83188983-d1c8-41cc-9ab3-9402f723c669` |
| VN 2 \| Products App | `859b23f9-eb6a-4f58-84f3-632406af1979` |

## What each team owns

### MEL 1 | Integration

Manages both integrations and partners. An integration is Oolio working with a third-party API to bring data into the Oolio world; a partner works the other way, using Oolio's APIs and SDKs to fetch data out. Both sides of that boundary belong here.

### MEL 2 | Oolio Pay

The payments team. Not generally formed as part of Oolio 1: Oolio 1 uses Oolio Pay, and so do all the other brands in the group suite. It runs its own projects, software projects, Confluence space, support team and product teams, so route Pay work to Pay rather than to an Oolio 1 product team.

### MEL 3 | Loyalty & Engagement

Everything to do with customers, loyalty and rewards issuing, and the engagement platform. The platform lets organisation admins broadcast a range of communications to members, or to non-members in the search for new customers, including social media posting in that case. The team feeds data into the warehouse for the Insights team's analytics, and provides frameworks that POS and eComm build on.

### DATA

Works with both POS and Pay data and internal data. Responsible for internal analytics and insights on the Oolio Data Warehouse; cross-functional. Also maintains the warehouse and its infrastructure so Insights and the other teams run at full capacity.

### Platform / DevOps

Exactly what it says: infrastructure, Terraform and infrastructure as code; Kubernetes, stacks and clusters; CI/CD and all the connected points.

### IN 1 | POS

The largest team, and its domain is wider than the name. In reality it owns every application and connection point a front-of-house operator would use: the point of sale itself, printers and print logic, the Oolio kitchen display system, mPOS (the mobile POS), networking, connectivity and offline communications.

### IN 2 | Accounts

Oolio accounts and organisation creation at the application level: orgs, venues, stores and access control. Also builds the framework and capabilities for the role-based permission scheme: who can access the application, when they can access it, and what they can do within it.

### IN 3 | Inventory

Based in India, building Oolio's native inventory system, initially in four phases and growing from there. The goal is a best-in-breed inventory system for Oolio 1 first; edge features such as the Oolio procurement marketplace may be shared with group brands later, on completion.

### eComm

The Oolio online store, delivery integrations both native and third party for driver delivery, and the Oolio Checkout app, the QR app that lets patrons scan and pay.

### VN 1 | Insights

The Oolio reporting team: Insights web and the Insights mobile app, two ways of getting reports, with the goal of actionable insights rather than static reports. The original founding team of the AI project, whose chat agent began on sales data and has since extended beyond it. Works with third-party data as well as POS data: labour data from labour integrations, weather, public holidays, and related data for budgets and forecasts.

### VN 2 | Products App

More than products: product catalogues, price lists and price list publishing, schedules, and menu creation, editing and publishing. Owns the under-the-hood APIs and interfaces for the Oolio online store plus Uber driver management, and the complete end-to-end creation and structure of products: standard products, modifiers, variants, combos and the rest.

## Routing hints

| The work smells like | Assign |
|---|---|
| Third-party data coming in, or partners using our APIs and SDKs | MEL 1 \| Integration |
| Payments, across any brand in the group | MEL 2 \| Oolio Pay |
| Loyalty, rewards, member and customer communications, campaigns | MEL 3 \| Loyalty & Engagement |
| The warehouse, internal analytics, data infrastructure | DATA |
| Infrastructure, Terraform, Kubernetes, CI/CD | Platform / DevOps |
| POS, KDS, mPOS, printing, front-of-house networking or offline behaviour | IN 1 \| POS |
| Orgs, venues, stores, access control, roles and permissions | IN 2 \| Accounts |
| Stock, recipes, suppliers, purchasing, stocktakes | IN 3 \| Inventory |
| Online store, delivery, QR order-and-pay | eComm |
| Reporting, dashboards, forecasts, the AI chat agent | VN 1 \| Insights |
| Catalogues, price lists, menus, product structure | VN 2 \| Products App |

## Known gaps

- The list is not exhaustive. Teams outside these eleven (design, QA, squad boards and others) are not yet registered; absence here does not mean a team does not exist.
- No leads or members yet. People live in the vault's People Directory (PDI-54), not here.
- No team-to-Jira-project mapping yet. The vault's Jira Register maps projects; joining the two is a known next step.
