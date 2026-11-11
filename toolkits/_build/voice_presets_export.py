"""Export the Brand Voice Workbook presets (voice_presets.py) as markdown and JSON.

Usage: python3 voice_presets_export.py ../02-brand-voice
Writes presets.md (for people) and presets.json (for AI tools and scripts).
Run it again whenever voice_presets.py changes, so the workbook and the repo stay in step.
"""
import json
import sys
from pathlib import Path

import voice_presets as P

out = Path(sys.argv[1] if len(sys.argv) > 1 else "../02-brand-voice")
CH_KEYS = ["channel", "who_its_for", "formality_1_to_5", "sentence_length", "opening", "closing", "formatting", "examples_and_data", "product_mentions"]

data = {
    "version": "2.2",
    "note": "Presets are starting points every brand can pick. Channel defaults are rules of thumb, not platform rules. Rewrite them in your own words.",
    "archetypes": [{"name": n, "description": d, "traits": [t.strip() for t in t_.split(",")]} for n, d, t_ in P.ARCHETYPES],
    "traits": [{"name": n, "sounds_like": s, "does_not_mean": x} for n, s, x in P.TRAITS],
    "channels": [dict(zip(CH_KEYS, c)) for c in P.CHANNELS],
    "options": {"sentence_length": P.LENGTHS, "opening": P.OPENS, "closing": P.CLOSES, "formatting": P.FORMATS,
                "examples_and_data": P.DATA, "product_mentions": P.PRODUCT},
    "do_and_dont": [{"rule": r, "do": d, "dont": x} for r, d, x in P.RULES],
    "ban_list_packs": [{"pack": n, "on_by_default": on == "Yes", "entries": [{"ban": b, "use_instead": u} for b, u in e]} for n, on, e in P.PACKS],
    "test_prompts": P.TEST_PROMPTS,
}
(out / "presets.json").write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")

L = ["# Brand Voice Workbook presets (v2.2)", "",
     "Starting points for the worksheet. Pick what fits, then rewrite it in your own words: presets are generic on purpose, and the example lines are what make a voice yours.",
     "Channel defaults are rules of thumb, not platform rules. Machine-readable copy: `presets.json`.", "",
     "## Archetypes", "", "| Archetype | Description | Typical traits |", "| --- | --- | --- |"]
L += [f"| {n} | {d} | {t} |" for n, d, t in P.ARCHETYPES]
L += ["", "## Traits", "", "| Trait | What it sounds like | What it does not mean |", "| --- | --- | --- |"]
L += [f"| {n} | {s} | {x} |" for n, s, x in P.TRAITS]
L += ["", "## Tone by channel (rules of thumb)", "",
      "| Channel | Who it's for | Formality (1 to 5) | Sentence length | Opening | Closing | Formatting | Examples and data | Product mentions |",
      "| --- | --- | --- | --- | --- | --- | --- | --- | --- |"]
L += ["| " + " | ".join(str(v) for v in c) + " |" for c in P.CHANNELS]
L += ["", "## Do and don't", "", "| Rule | Do | Don't |", "| --- | --- | --- |"]
L += [f"| {r} | {d} | {x} |" for r, d, x in P.RULES]
L += ["", "## Ban list packs", "", "Aim for 20 to 30 entries in total (rule of thumb). Ban phrases as well as single words, and say what to use instead.", ""]
for n, on, e in P.PACKS:
    L += [f"### {n}{' (on by default)' if on == 'Yes' else ''}", "", "| Ban | Use instead |", "| --- | --- |"]
    L += [f"| {b} | {u} |" for b, u in e]
    L += [""]
L += ["## Test prompts", ""] + [f"{i}. {t}" for i, t in enumerate(P.TEST_PROMPTS, 1)] + [""]
(out / "presets.md").write_text("\n".join(L))
print("wrote", out / "presets.md", "and", out / "presets.json")
