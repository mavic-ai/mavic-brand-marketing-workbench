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

## What's here

| Module | Toolkit | Workbench | Skill | Video |
| --- | --- | --- | --- | --- |
| 01 What is a brand | Brand DNA Scorecard | `brand-dna/` (to come) | brand-dna-builder (to come) | Explainer: What is a brand? |
| 02 Brand voice | `toolkits/02-brand-voice/` | `brand-dna/brand-book.md` | `skills/brand-voice-check/` | How-to: How to make AI sound like your brand |
| 06 Content calendar | 30-Day Content Calendar | `content-plan/` (to come) | content-calendar-planner (to come) | In production |

Video formats and templates: `video/formats/` (explainer, how-to), `video/capture/` (a full screen recording brief), `video/remotion/paper-explainer/` (Remotion source), `video/examples/mavic/` (real episode packs).

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
