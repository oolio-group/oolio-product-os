# The UAT panel: user personas

The hospitality user personas. Individual human users of Oolio products and services, and our **user-acceptance lens**: when we review a feature, these are the people we ask whether they would actually accept it in real service.

This is the primary persona type in the library today. Almost every product decision, GTM artifact, and consultancy engagement touches one of these personas. The UAT panel works as a pair with the [Design Council](../design-council/README.md): the UAT panel asks "would our real users accept this on a Friday night", the Council asks "is the design sound by expert principles". A feature has to satisfy both.

These personas answer whether a user would accept a feature. Roy, the Behavioural Alchemist (`../behavioural-alchemist.md`), the elevated cross-cutting lens, can be convened alongside them to ask a different question: what is the user actually *experiencing*. Where a persona says the kitchen queue is too slow, Roy asks whether the real problem is the diner's anxiety about whether the order landed, or the new casual's fear of looking incompetent at the till, and whether a cheap change in perception would beat an expensive change in the workflow. Convene him when the felt, emotional, or social side of the experience is where the value or the risk sits.

---

## Categories

| Category | What it covers |
|---|---|
| `owners-and-executives/` | The people who own the business or run it at executive level. Independent owner-operators, small group owners, enterprise COOs, the contract caterer's catering director who owns a stadium hospitality P&L, and the enterprise IT and systems manager (not an operator: the technology gatekeeper whose security, integration, and change-control review every enterprise deal must pass). |
| `general-managers/` | The single most important persona category. The GM is where strategy meets the floor. Independent, enterprise, US, and stadium event-day versions. |
| `front-of-house/` | FOH managers, bar managers, the frontline bartender, and the event-day stadium bar supervisor. The customer experience layer. |
| `back-of-house/` | Head chefs, kitchen staff, stock control, the mid-market group kitchen operations director, and the finance manager and bookkeeper (head-office cost-and-control, alongside the stock controller: she reconciles sales, payouts, tips, and taxes at month-end, not during service). The cost and quality layer. |

---

## How to choose the right persona for a piece of work

Three questions.

1. **Who actually touches the system you are designing?** That is the primary persona. Almost always a frontline or operational role.
2. **Who pays for it?** That is the buyer persona. Usually an owner, executive, or GM. The pitch and the GTM material are written for them.
3. **Who has the power to stop it?** That is the blocker persona. Often the head chef (BOH), IT (enterprise), or the FOH manager (workflow disruption).

Name all three at the top of the work. A spec that does not name them is a spec that does not know who it is for.

---

## Pairings to keep in mind

These personas do not exist in isolation. They work alongside each other, and their needs trade off.

- **Owner and GM.** The owner sets direction. The GM owns delivery. A feature that helps one and burns the other will fail.
- **GM and head chef.** The classic FOH-versus-BOH tension. Service speed versus kitchen capacity. Any change to ordering flow touches both.
- **Bar manager and stock controller.** Wastage, variance, theft. Stock control without bar buy-in is theatre.
- **Head office and venue.** Most clearly visible in enterprise. A great central tool that the venue resents is not a great tool.

---

## What is missing from the library today

To be filled as research and roadmap signal demands new personas:

- A dedicated server (front-line, food-led) persona, if work on table service warrants it
- Hotel F&B persona (separate from pub and hotel multi-revenue)
- A stadium kitchen/BOH persona (the event-day operators now exist executive to frontline; the kitchen behind them does not)
- Franchisee versus corporate operator distinction inside QSR
- Enterprise procurement and enterprise finance personas (the IT buyer now exists, and finance is covered at small group; the enterprise versions of procurement and finance still block deals)
- Customer-facing personas (the diner, the punter, the punters' group) once consumer-facing experiences become a material part of the offer

When one of these gets added, update `personas.md` and remove the line from this list.
