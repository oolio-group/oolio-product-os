# Handover Checklist

Run before declaring the pack done. Every item must be either ticked or explicitly waived.

## Voice check

- [ ] No em dashes anywhere in any artifact. Search for the character before declaring done.
- [ ] No semicolons.
- [ ] British English throughout. Optimise, prioritise, colour, behaviour. No "color", "organize", "analyze".
- [ ] No hedging phrases. No "however", "it's worth noting", "I think", "we could potentially".
- [ ] No buzzwords. No leverage (verb), synergy, game-changing, robust, seamless, utilise, ascertain.
- [ ] Every sentence earns its place. If a sentence doesn't clarify a decision, define a problem, or move execution forward, cut it.
- [ ] Numbers, not adjectives. "Much faster" is wrong. "Cuts entry time by 30%" is right. `[TBC]` is fine.
- [ ] Reads like Niel wrote it. Not like marketing wrote it.

## Content

- [ ] Every section in `pack_content.json` filled or marked `[TBC]`. Zero `[GAP]` markers remain.
- [ ] Every `[TBC]` explicitly accepted by the user, not left out by accident.
- [ ] No internal codenames or project IDs in any external-facing artifact (one-pager, deck, marketing pack).
- [ ] Every quoted operator pain reads like an operator wrote it. If it reads like a marketer wrote it, rewrite.
- [ ] Numbers are real or marked `[TBC]`. No placeholder "30%" or "10x" survived.
- [ ] All cross-references between artifacts use the same names. Product name identical everywhere.

## Structure

- [ ] All six files present in `<pack-folder>/`.
- [ ] Filenames follow `0N_[Template]_v[X.Y].(pptx|docx)`.
- [ ] Version number identical across all six files and `pack_content.json`.
- [ ] `Last reviewed` date set to today.
- [ ] `README.md` updated with version, date, owner, and links to all six files.

## Visual

- [ ] Cover slide of the deck renders with no overflowing text.
- [ ] At least one content slide of the deck inspected per major layout type.
- [ ] One-pager fits on a single A4 page with no text cut off.
- [ ] DOCX files open without error. Metadata table fully populated.
- [ ] No leftover dashed-border placeholder boxes in any rendered file. Those mean the build saw `[GAP]` or empty content for a real field.

## Handover artifact

- [ ] Single-paragraph announce message drafted, ready for the user to paste into Slack or email.
- [ ] Folder link in the announce message resolves correctly.
- [ ] PM and GTM partner names match what's in the templates.

## Hand back

When all of the above is true, end the conversation with.

> "Pack [Product] [vX.Y] is ready to hand over. Six files in [folder link]. README updated. Suggested announce message.
>
> > [Product] GTM pack [vX.Y] is ready. [One sentence on what's new.] Files at [link]. Owner [PM]. Reviewed by [GTM partner].
>
> Want me to tweak anything before you send it?"

That's the exit. Don't keep going past this unless the user asks.
