# Toolkit build scripts

openpyxl scripts that generate the designed workbooks: `common.py` (styles and helpers), `voice.py` with `voice_presets.py` (Brand Voice Workbook), `scorecard.py`, `calendar.py`.

- Build: `python3 voice.py out.xlsx`, then recalculate formulas (for example with LibreOffice) so they carry cached values.
- Presets for the repo: `python3 voice_presets_export.py ../02-brand-voice` writes `presets.md` and `presets.json`. Run it whenever `voice_presets.py` changes.
