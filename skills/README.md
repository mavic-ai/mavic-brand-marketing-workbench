# Skills

Agent Skills (`SKILL.md` folders, an open format read by Claude and other AI tools) that do one brand marketing job by reading a workbench.

| Skill | What it does | Reads | Toolkit |
| --- | --- | --- | --- |
| `brand-voice-check` | Checks a draft against a brand's voice, ban list and channel rules, and returns each miss with the rule behind it and a fix | `workbenches/brand-dna/brand-book.md` | 02 |
| `content-calendar-planner` | Plans a year of posts: a rhythm the brand can keep, weighted themes, the 2027 social media holidays it should join (fit test on a curated master list), and a version of each idea for every channel | `workbenches/brand-dna/brand-book.md`, `toolkits/06-content-calendar/2027-social-media-holidays-master-list.md`; writes `workbenches/content-plan/plan-2027.md` | 06 |

More to follow with each toolkit: brand-dna-builder (01), on-brand post by content type, key visual brief and review, social audit, video script pair.

## Install

- **Claude Code:** `/plugin marketplace add mavic-ai/mavic-brand-marketing-workbench`, then `/plugin install mavic-brand-marketing-workbench@mavic-brand-marketing-workbench`.
- **Claude apps:** zip the skill folder (for example `brand-voice-check/`) and upload it in Settings > Capabilities > Skills.
- **Any other tool:** copy the folder into the tool's skills directory, or paste `SKILL.md` into its instructions.

Every skill ships with evals on a fictional demo brand in its `evals/` folder, and a log of the runs so far.
