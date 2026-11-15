# Toolkit build scripts

openpyxl scripts that generate the designed workbooks: `common.py` (styles and helpers), `voice.py` with `voice_presets.py` (Brand Voice Workbook), `scorecard.py`, `calendar.py` (30-Day Content Calendar v2, retired), `planner.py` (2027 Social Media Holidays Planner, toolkit 06 v3).

- Build: `python3 voice.py out.xlsx`, then recalculate formulas (for example with LibreOffice) so they carry cached values.
- Presets for the repo: `python3 voice_presets_export.py ../02-brand-voice` writes `presets.md` and `presets.json`. Run it whenever `voice_presets.py` changes.
- Master list: `social_holidays_2027.py` is the single source for the 2027 list. `python3 social_holidays_export.py` writes the `.md`, `.json`, `.csv` and `.ics` files into `../06-content-calendar/`. `python3 planner.py` builds the planner workbook from the same source. Run both whenever the list changes, and update `checked` dates.
