# Mavic Brand Marketing Workbench

Free, open toolkits for brand marketing in the AI era. Each module teaches one idea from first principles, gives you a framework and a fill-in template, and shows how to do it with AI: as a worksheet, a workbench your AI tools read, a skill that does the job, and a video that shows it. Made by the team at [Mavic](https://mavic.ai/?utm_source=github&utm_medium=readme&utm_campaign=workbench).

## How it fits together

```
toolkits/     LEARN   one idea, a method and a worksheet
   │
workbenches/  FILL    one brand's answers, in files any AI can read
   │
skills/       RUN     Agent Skills that do the job by reading the workbench
   │
video/        SHOW    explainer and how-to formats, briefs and templates
```

## Start here

1. Read `toolkits/02-brand-voice/` and fill in its worksheet (about an hour).
2. Put your answers in `workbenches/brand-dna/brand-book.md`. See `workbenches/examples/kopi-corner/` for a finished one.
3. Install the `brand-voice-check` skill and ask it to check your next post.

Planning 2027? Start with the [Master List of 2027 Social Media Holidays](toolkits/06-content-calendar/2027-social-media-holidays-master-list.md): 45 moments with a social movement behind them, and a fit test to pick the few that are yours. Then run the `content-calendar-planner` skill to write your year.

## What's here

| Module | Toolkit | Workbench | Skill | Video |
| --- | --- | --- | --- | --- |
| 01 What is a brand | Brand DNA Scorecard | `brand-dna/` (to come) | brand-dna-builder (to come) | Explainer: What is a brand? |
| 02 Brand voice | `toolkits/02-brand-voice/` | `brand-dna/brand-book.md` | `skills/brand-voice-check/` | How-to: How to make AI sound like your brand |
| 06 Content calendar | `toolkits/06-content-calendar/`: Master List of 2027 Social Media Holidays + Content Planner | `content-plan/plan-2027.md` | `skills/content-calendar-planner/` | How-to: in production |

Video formats and templates: `video/formats/` (explainer, how-to), `video/capture/` (a full screen recording brief), `video/remotion/paper-explainer/` (Remotion source), `video/examples/mavic/` (real episode packs).

## Thumbnails and covers

Videos from this workbench share one cover style, so a series looks like one brand. The rules, in short:

- **Sizes:** YouTube thumbnail 1280x720 PNG under 2 MB, with the bottom-right corner clear for the duration badge. Reel cover 1080x1920 with everything important in the centre 1080x1350 so the 4:5 profile grid crop keeps it.
- **Look:** light paper background, paper cut-out objects with a white torn edge and soft shadow, one hero illustration per cover drawn from the episode's own scene objects. Navy for text, pink for labels, teal for the payoff line. Inter 800 headline, two or three short lines broken by hand, last line in teal.
- **Label and logo:** a small label above the headline ("Explainer" or "How-to"), the real brand logo bottom-left. Never an invented mark.
- **Check:** view it at about 246 px wide before you publish. If the headline doesn't read, shorten it.
- **Examples:** fictional demo brands only, no real logos or likenesses.

## Install the skills

In Claude Code:

```
/plugin marketplace add mavic-ai/mavic-brand-marketing-workbench
/plugin install mavic-brand-marketing-workbench@mavic-brand-marketing-workbench
```

In the Claude apps, zip a skill folder (for example `skills/brand-voice-check/`) and upload it under Settings > Capabilities > Skills. Other tools: see `skills/README.md`.

## For AI assistants

Start with `AGENTS.md`. A one-line index of every file is in `llms.txt`.

## House rules

Every fact has a named, dated source in the module's `sources.md`. Rules of thumb are labelled as rules of thumb. Examples use fictional demo brands. No customer data. More in `CONTRIBUTING.md`.

## Licence

Writing and teaching material: [CC BY 4.0](LICENSES/CC-BY-4.0.txt). Code: [MIT](LICENSES/MIT.txt). Use it for anything, including paid work, with credit. The Mavic name and logo are not licensed for reuse. Details in `LICENSE`.
