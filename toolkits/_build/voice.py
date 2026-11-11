"""Brand Voice Workbook v2.2 (11 Nov 2026): v2.1 plus presets. Every input has a dropdown of presets (archetypes, traits,
channels with suggested tone, do and don't rules, ban-list packs, test prompts); the user's own words always win over a preset.
Built to the toolkit standard: method first, one labelled "Do it in Mavic" section and one CTA, Kit v2.0 language, every number
sourced or labelled a rule of thumb, dated, UTM on every mavic.ai link.
Run: python3 voice.py [out.xlsx]   then recalculate (LibreOffice) so the formulas carry cached values."""
import sys; sys.path.insert(0, '.')
from common import *
from openpyxl.styles import Alignment
from voice_presets import ARCHETYPES, TRAITS, LENGTHS, OPENS, CLOSES, FORMATS, DATA, PRODUCT, CHANNELS, RULES, PACKS, TEST_PROMPTS

OUT = sys.argv[1] if len(sys.argv) > 1 else "/mnt/user-data/outputs/toolkits/Mavic_Brand_Voice_Workbook_v2.2.xlsx"
V = "Version 2.2  ·  11 Nov 2026  ·  Mavic steps checked 11 Nov 2026  ·  mavic.ai/toolkits"
HC = "https://mavic.crisp.help/en/article/"
LINKS = [
    ("Brand Personality (Mavic Help Centre)", HC + "brand-personality-1vjdb23/"),
    ("Writing Style (Mavic Help Centre)", HC + "writing-style-fzezr4/"),
    ("Ban List (Mavic Help Centre)", HC + "ban-list-1lx69y5/"),
]
UTM = "?utm_source=toolkit&utm_medium=xlsx&utm_campaign=brand_voice_workbook"
PAGE = "https://mavic.ai/toolkits/brand-voice-tone-guide-template/" + UTM + "&utm_content=video"
CTA = "https://mavic.ai/" + UTM + "&utm_content=cta"
SRC = "https://aclanthology.org/2024.tacl-1.9/"
WRAP = Alignment(wrap_text=True, vertical="top")
SUG = PatternFill("solid", fgColor="EEF7F6")   # preset / suggestion cells (pale teal)
DONT = '"Don"&CHAR(39)&"t: "'
P1, P2, P3, P4, PR = "'1 Personality'", "'2 Tone by channel'", "'3 Do and don''t'", "'4 Ban list'", "Presets"

def note(ws, r, text, col=1, **k):
    c = ws.cell(r, col, text); c.font = font(size=9, **k); c.alignment = Alignment(wrap_text=False, vertical="top")
    return r + 1

def link(ws, r, text, url, col=1):
    c = ws.cell(r, col, text); c.font = font(size=9, color=TEAL, underline="single"); c.hyperlink = url
    return r + 1

def sug(ws, r, col, f, size=9):
    c = ws.cell(r, col, f); c.font = font(size=size, color=GREY); c.fill = SUG; c.border = BOX; c.alignment = WRAP
    return c

def dd(ws, cells, source, strict=False):
    """Dropdown from a range (or inline list). strict=False lets people type their own words too."""
    dv = DataValidation(type="list", formula1=source, allow_blank=True)
    dv.showErrorMessage = strict
    if not strict:
        dv.showInputMessage = True; dv.promptTitle = "Pick or type"; dv.prompt = "Pick a preset from the list, or type your own."
    ws.add_data_validation(dv)
    for c in cells: dv.add(c)

wb = Workbook()
ws0 = wb.active; ws0.title = "How to use"

# ================================================================ Presets (built first, moved to the end)
pr = wb.create_sheet("Presets")
for col, w in zip("ABCDEFGHI", [30, 64, 40, 24, 26, 30, 26, 30, 30]): pr.column_dimensions[col].width = w
for col in "KLMNOPQ": pr.column_dimensions[col].width = 34
pr.sheet_view.showGridLines = False
pr["A1"] = "Presets"; pr["A1"].font = font(size=18, bold=True, color=NAVY)
pr["A2"] = "The lists behind the dropdowns. Edit any row to change a preset; your edits flow through the whole workbook. Channel suggestions are rules of thumb, not platform rules."
pr["A2"].font = font(size=10, color=GREY); pr["A3"] = V; pr["A3"].font = font(size=8, color=GREY)

def pr_table(r, title, head, rows):
    pr.cell(r, 1, title).font = font(size=12, bold=True, color=PINK); r += 1
    r = table_head(pr, r, head)
    a = r
    for vals in rows:
        r = row(pr, r, list(vals))
    return a, r - 1, r + 1

r = 5
a, b, r = pr_table(r, "Archetypes", ["Archetype", "Description", "Usually pairs with"], ARCHETYPES); AR = f"{PR}!$A${a}:$C${b}"; AR_L = f"{PR}!$A${a}:$A${b}"
a, b, r = pr_table(r, "Traits", ["Trait", "What it sounds like", "What it does not mean"], TRAITS); TR = f"{PR}!$A${a}:$C${b}"; TR_L = f"{PR}!$A${a}:$A${b}"
a, b, r = pr_table(r, "Channels (suggested starting points, rules of thumb)", ["Channel", "Who it's for", "Formality 1 to 5", "Sentence length", "How we open", "How we close", "Formatting", "Examples and data", "Product mentions"], CHANNELS)
CH = f"{PR}!$A${a}:$I${b}"; CH_L = f"{PR}!$A${a}:$A${b}"
a, b, r = pr_table(r, "Do and don't rules", ["Rule", "Do", "Don't"], RULES); RU = f"{PR}!$A${a}:$C${b}"; RU_L = f"{PR}!$A${a}:$A${b}"

pr.cell(r, 1, "Ban list packs").font = font(size=12, bold=True, color=PINK); r += 1
PACK_SUM = []   # (name, default, count cell, guide cell, mavic cell)
pack_rows = []
for name, default, words in PACKS:
    pr.cell(r, 1, name).font = font(bold=True, color=NAVY); r += 1
    r = table_head(pr, r, ["Word or phrase", "Use instead", "Goes to the style guide (automatic)"])
    w0 = r
    for w, alt in words:
        r = row(pr, r, [w, alt, ""])
        pr.cell(r - 1, 3, f'=A{r-1}&IF(B{r-1}="",""," (instead: "&B{r-1}&")")').font = font(size=9, color=GREY)
    pack_rows.append((name, default, w0, r - 1)); r += 1
r += 1
pr.cell(r, 1, "Pack summary (automatic)").font = font(size=12, bold=True, color=PINK); r += 1
r = table_head(pr, r, ["Pack", "Entries", "For the style guide", "For Mavic (comma separated)"])
for name, default, w0, w1 in pack_rows:
    pr.cell(r, 1, name).font = font()
    pr.cell(r, 2, f"=COUNTA(A{w0}:A{w1})").font = font()
    pr.cell(r, 3, f'=_xlfn.TEXTJOIN("; ",TRUE,C{w0}:C{w1})').font = font(size=9)
    pr.cell(r, 4, f'=_xlfn.TEXTJOIN(", ",TRUE,A{w0}:A{w1})').font = font(size=9)
    for col in (3, 4): pr.cell(r, col).alignment = WRAP
    PACK_SUM.append((name, default, f"{PR}!$B${r}", f"{PR}!$C${r}", f"{PR}!$D${r}")); r += 1

# option lists, side by side from column K
LISTS = {}
for k, (key, title, vals) in enumerate([("len", "Sentence length", LENGTHS), ("open", "How we open", OPENS), ("close", "How we close", CLOSES),
                                        ("fmt", "Formatting", FORMATS), ("data", "Examples and data", DATA), ("prod", "Product mentions", PRODUCT),
                                        ("test", "Test prompts", TEST_PROMPTS)]):
    col = 11 + k; L = chr(64 + col)
    c = pr.cell(5, col, title); c.font = font(bold=True, color="FFFFFF"); c.fill = HEAD; c.border = BOX
    for i, v in enumerate(vals):
        cc = pr.cell(6 + i, col, v); cc.font = font(); cc.border = BOX; cc.alignment = WRAP
    LISTS[key] = f"{PR}!${L}$6:${L}${5 + len(vals)}"
pr.cell(4, 11, "Option lists for sheet 2 and sheet 5").font = font(size=12, bold=True, color=PINK)

def look(key_cell, rng, n, fallback='""'):
    return f'IFERROR(VLOOKUP({key_cell},{rng},{n},FALSE),{fallback})'

# ================================================================ How to use
ws = ws0
r = header(ws, "Brand Voice Workbook", "Write down how your brand sounds, so every writer and every AI tool sounds like you.", [4, 100], V)
r = section(ws, r, "Quick start: pick, then make it yours", 2)
for t in ["Every yellow cell with a dropdown arrow has presets. Pick an archetype, 3 to 5 traits, the channels you use, a few rules and the ban list packs that fit.",
          "The pale teal cells fill in with suggested wording as you pick. Sheet 6 turns all of it into your style guide straight away.",
          "Then make it yours: type over any preset with your own words (yours always wins), and write the example lines. No preset can write those, and they matter most."]:
    ws.cell(r, 1, "·").font = font(bold=True, color=PINK); ws.cell(r, 2, t).font = font(); ws.cell(r, 2).alignment = WRAP; r += 1
r += 1
r = section(ws, r, "What you'll have in about an hour", 2)
for t in ["A personality: 3 to 5 traits, each weighted, with what it sounds like and what it doesn't mean.",
          "One writing style per channel: how formal, how long the sentences run, how you open, how you close, how you format.",
          "Do and don't rules a stranger could follow, and a ban list of words you never want to see.",
          "Five test posts, read aloud and scored.",
          "Your style guide: sheet 6 writes it for you, ready to share with writers or paste into any AI tool. Sheet 7 splits it field by field for Mavic's Brand DNA."]:
    ws.cell(r, 1, "·").font = font(bold=True, color=PINK); ws.cell(r, 2, t).font = font(); ws.cell(r, 2).alignment = WRAP; r += 1
r += 1
r = section(ws, r, "Five steps, then your style guide writes itself", 2)
steps = [
 ("1", "Personality: pick an archetype and 3 to 5 traits that are true today. Weight each one, and add an example line in your voice. (15 min)"),
 ("2", "Tone by channel: pick each channel you use. A suggested tone fills in; change anything that isn't you. (15 min)"),
 ("3", "Do and don't: pick the rules that matter to you, then swap the preset examples for your own. (10 min)"),
 ("4", "Ban list: pick the packs that fit, then add the words your category and competitors overuse. Aim for 20 to 30. (10 min)"),
 ("5", "Test: write or generate five posts, read them aloud, and fix the rule behind every miss, not just the post. (10 min)"),
 ("6", "Style guide: add your brand name on sheet 6, read it through, then share it or copy it into your AI tool. (5 min)"),
 ("7", "Mavic: sheet 7 has the same answers split field by field for Brand DNA. (5 min)"),
]
for n, t in steps:
    ws.cell(r, 1, n).font = font(bold=True, color=PINK); ws.cell(r, 2, t).font = font(); ws.cell(r, 2).alignment = WRAP; r += 1
r += 1
r = section(ws, r, "Why short and specific beats long and complete", 2)
for t in ["Give an AI too little and it fills the gaps with the average of everything it has seen. That is the generic sound.",
          "Give it too much and the rules that matter get buried: language models use information at the start and end of a long input better than information in the middle.",
          "So each part of this workbook asks for a few specific lines, not a brand book."]:
    ws.cell(r, 2, t).font = font(); ws.cell(r, 2).alignment = WRAP; r += 1
ws.cell(r, 2, "Source: Liu et al., “Lost in the Middle: How Language Models Use Long Contexts”, Transactions of the ACL (2024)").font = font(size=9, color=TEAL, underline="single")
ws.cell(r, 2).hyperlink = SRC; r += 2
r = section(ws, r, "Rules of thumb, not research", 2)
ws.cell(r, 2, "3 to 5 traits, 20 to 30 ban list entries, five test posts and the channel suggestions are our starting points, not findings. Change them if your tests say so.").font = font(); ws.cell(r, 2).alignment = WRAP; r += 2
ws.cell(r, 2, "Yellow: yours to fill in. Pale teal: presets and suggestions, filled in for you. Grey italic rows at the top of each table: worked examples for a fictional skincare brand, Bloom Skin, never copied into your guide.").font = font(size=9, italic=True, color=GREY); r += 1
ws.cell(r, 2, "Watch the 3-minute how-to that goes with this workbook").font = font(size=9, color=TEAL, underline="single"); ws.cell(r, 2).hyperlink = PAGE; r += 1

# ================================================================ 1 Personality
ws = wb.create_sheet("1 Personality", 1)
r = header(ws, "1. Personality", "Pick from the presets, then make them yours. Honest, not aspirational: if a competitor would claim the same trait, sharpen it.", [24, 11, 38, 30, 40, 54], V)
ws.column_dimensions["G"].hidden = True; ws.column_dimensions["H"].hidden = True
r = section(ws, r, "Archetype: the character behind your words (pick one, or type your own)", 6)
r = table_head(ws, r, ["Archetype", "", "Your description (optional: leave blank to use the preset)", "", "", "Preset"])
ws.merge_cells(start_row=r - 1, start_column=3, end_row=r - 1, end_column=5)
r = row(ws, r, ["The Trusted Guide", "", "We explain before we sell. We sound like a friend who happens to be a formulator: calm, exact, never preachy. We admit what a product can't do.", "", "", "Example row: Bloom Skin wrote its own description, so the preset is ignored."], example=True)
ws.merge_cells(start_row=r - 1, start_column=3, end_row=r - 1, end_column=5); ws.row_dimensions[r - 1].height = 32
ARCH = r
r = row(ws, r, ["", "", "", "", "", ""], inputs=(1, 3))
ws.merge_cells(start_row=ARCH, start_column=3, end_row=ARCH, end_column=5); ws.row_dimensions[ARCH].height = 62
sug(ws, ARCH, 6, f'=IF(A{ARCH}="","",{look(f"A{ARCH}", AR, 2, chr(34) + "Your own archetype: describe it in column C." + chr(34))}&IFERROR(CHAR(10)&"Usually pairs with: "&VLOOKUP(A{ARCH},{AR},3,FALSE),""))')
ws.cell(ARCH, 7, f'=IF(A{ARCH}="","",IF(C{ARCH}<>"",C{ARCH},{look(f"A{ARCH}", AR, 2)}))')
dd(ws, [f"A{ARCH}"], AR_L)
r += 1
r = section(ws, r, "Traits: 3 to 5 (rule of thumb). Strongest first, with the highest weight.", 6)
r = table_head(ws, r, ["Trait (pick or type)", "Weight, 0 to 100", "What it sounds like (optional: blank uses the preset)", "What it does NOT mean (optional)", "Example line in our voice (yours to write)", "Preset"])
r = row(ws, r, ["Direct", 90, "We say the price and the catch before the pitch.", "Blunt, cold or rude.", "It costs $32. It won't fix rosacea. It will stop the sting.", "Sounds like: We get to the point and say the hard part first.\nNot: Blunt, cold or rude."], example=True)
ws.row_dimensions[r - 1].height = 30
T0 = r
for _ in range(5):
    r = row(ws, r, ["", "", "", "", "", ""], inputs=(1, 2, 3, 4, 5))
    i = r - 1
    sug(ws, i, 6, f'=IF(A{i}="","",IFERROR("Sounds like: "&VLOOKUP(A{i},{TR},2,FALSE)&CHAR(10)&"Not: "&VLOOKUP(A{i},{TR},3,FALSE),"Your own trait: fill in C and D."))')
    ws.cell(i, 7, f'=IF(A{i}="","",IF(C{i}<>"",C{i},{look(f"A{i}", TR, 2)}))')
    ws.cell(i, 8, f'=IF(A{i}="","",IF(D{i}<>"",D{i},{look(f"A{i}", TR, 3)}))')
    ws.row_dimensions[i].height = 32
T1 = r - 1
dd(ws, [f"A{i}" for i in range(T0, T1 + 1)], TR_L)
dv = DataValidation(type="whole", operator="between", formula1="0", formula2="100", allow_blank=True)
dv.error = "Enter a whole number from 0 to 100"; ws.add_data_validation(dv); dv.add(f"B{T0}:B{T1}")
r += 1
ws.cell(r, 1, "Traits so far").font = font(bold=True)
ws.cell(r, 2, f"=COUNTA(A{T0}:A{T1})").font = font(bold=True)
ws.cell(r, 3, f'=IF(B{r}<3,"Add more: aim for 3 to 5",IF(B{r}>5,"Trim to 5 or fewer","In range"))').font = font(bold=True, color=TEAL)
ws.cell(r, 5, f'=IF(COUNTA(A{T0}:A{T1})>COUNTA(E{T0}:E{T1}),"Write an example line for each trait: it is the part no preset can write.","")').font = font(size=9, italic=True, color=PINK)
r += 2
ws.cell(r, 1, "Sharpen test").font = font(bold=True, color=TEAL)
note(ws, r + 1, "Presets are a starting point every brand can pick. What makes the voice yours is the example line and how you rewrite the description: would a customer notice it in our sentences and not in a competitor's?")

# ================================================================ 2 Tone by channel
ws = wb.create_sheet("2 Tone by channel", 2)
cols = ["Channel (pick or type)", "Who it's for, in one sentence", "Formality, 1 (casual) to 5 (formal)", "Sentence length", "How we open", "How we close",
        "Formatting (emoji, lists, line breaks)", "Examples and data", "Product mentions", "Example line (yours to write)"]
r = header(ws, "2. Tone by channel", "Pick a channel and a suggested tone fills in the pale teal row below it. Change any yellow cell with the dropdowns or your own words: yours always wins.", [20, 32, 12, 24, 26, 26, 24, 26, 26, 40], V)
r = table_head(ws, r, cols)
r = row(ws, r, ["Instagram", "Skincare-curious people scrolling for routines that work on sensitive skin.", 2, "Short: under 15 words", "A bold claim",
                "A question that invites comments", "Line breaks, 1 or 2 emoji", "One number or fact per post",
                "Named once, after the problem", "We tested 40 shades. Three made the cut. Which would you pick?"], example=True)
CY = []
for _ in range(8):
    y = r
    r = row(ws, r, [""] * 10, inputs=tuple(range(1, 11)))
    s = r
    sug(ws, s, 1, f'=IF(A{y}="","","suggested")')
    for k, colL in enumerate("BCDEFGHI", 2):
        sug(ws, s, k, f'=IF($A{y}="","",{look(f"$A{y}", CH, k)})')
    sug(ws, s, 10, "")
    ws.row_dimensions[s].height = 28
    r += 1
    CY.append(y)
C_LAST = r - 1
dd(ws, [f"A{y}" for y in CY], CH_L)
dd(ws, [f"C{y}" for y in CY], '"1,2,3,4,5"')
for colL, key in zip("DEFGHI", ["len", "open", "close", "fmt", "data", "prod"]):
    dd(ws, [f"{colL}{y}" for y in CY], LISTS[key])
r += 1
r = note(ws, r, "Pick only the channels you use. A channel with just its name picked still gets the full suggested tone in your guide; change what isn't you.", italic=True, color=GREY)
note(ws, r, "Start with Who it's for: describe your own customers on that channel. It changes the tone more than any other cell.", italic=True, color=GREY)

def eff2(colL, y):
    return f'IF({P2}!{colL}{y}="",{P2}!{colL}{y + 1},{P2}!{colL}{y})'

# ================================================================ 3 Do and don't
ws = wb.create_sheet("3 Do and don't", 3)
r = header(ws, "3. Do and don't", "Rules a new writer, or an AI, could follow without asking you. Pick the ones that matter, then swap the preset examples for your own.", [30, 42, 42, 56], V)
for colL in "EFG": ws.column_dimensions[colL].hidden = True
r = table_head(ws, r, ["Rule (pick or type)", "Do (optional: blank uses the preset)", "Don't (optional)", "Preset"])
r = row(ws, r, ["Be specific", "Ships in 2 days from Singapore.", "Fast, reliable delivery.", "Do: Concrete details: the number, the place, the time.\nDon't: Vague praise: fast, reliable, quality."], example=True)
ws.row_dimensions[r - 1].height = 30
D0 = r
for _ in range(12):
    r = row(ws, r, ["", "", "", ""], inputs=(1, 2, 3))
    i = r - 1
    sug(ws, i, 4, f'=IF(A{i}="","",IFERROR("Do: "&VLOOKUP(A{i},{RU},2,FALSE)&CHAR(10)&{DONT}&VLOOKUP(A{i},{RU},3,FALSE),"Your own rule: fill in B and C."))')
    ws.cell(i, 5, f'=IF(A{i}="","",IF(B{i}<>"",B{i},{look(f"A{i}", RU, 2)}))')
    ws.cell(i, 6, f'=IF(A{i}="","",IF(C{i}<>"",C{i},{look(f"A{i}", RU, 3)}))')
    ws.cell(i, 7, f'=IF(OR(A{i}="",AND(E{i}="",F{i}="")),"",A{i}&" ("&IF(E{i}="","","do: "&E{i})&IF(AND(E{i}<>"",F{i}<>""),"; ","")&IF(F{i}="","","don"&CHAR(39)&"t: "&F{i})&")")')
    ws.row_dimensions[i].height = 30
D1 = r - 1
dd(ws, [f"A{i}" for i in range(D0, D1 + 1)], RU_L)
r += 1
note(ws, r, "These apply on every channel. Five to eight rules is plenty (rule of thumb); the ones you'd correct a new writer on first.", italic=True, color=GREY)

# ================================================================ 4 Ban list
ws = wb.create_sheet("4 Ban list", 4)
r = header(ws, "4. Ban list", "Add whole packs with one click, then your own words: the ones your category and competitors overuse. 20 to 30 entries in total (rule of thumb).", [32, 14, 32, 30, 56], V)
TOT = r
ws.cell(r, 1, "Entries so far").font = font(bold=True)
r += 2
r = section(ws, r, "Starter packs: pick Yes to add a whole list", 5)
r = table_head(ws, r, ["Pack", "Add it?", "Entries", "What's in it", ""])
PK = []
for name, default, cnt, gcell, mcell in PACK_SUM:
    ws.cell(r, 1, name).font = font(); ws.cell(r, 1).border = BOX
    c = ws.cell(r, 2, default); c.fill = INPUT; c.border = BOX; c.font = font(bold=True)
    c = ws.cell(r, 3, f"={cnt}"); c.font = font(); c.border = BOX
    sug(ws, r, 4, f'=LEFT({mcell},70)&IF(LEN({mcell})>70,"...","")')
    ws.merge_cells(start_row=r, start_column=4, end_row=r, end_column=5)
    PK.append((r, gcell, mcell)); r += 1
dd(ws, [f"B{p[0]}" for p in PK], '"Yes,No"', strict=True)
r += 1
r = section(ws, r, "Your own words and phrases", 5)
r = table_head(ws, r, ["Word or phrase", "Type", "Why we ban it", "Use instead", "Goes to the style guide (automatic)"])
r = row(ws, r, ["clinically proven", "Category word", "We can't show the study for every product", "say what was tested and how", "Example row: not copied"], example=True)
O0 = r
for _ in range(20):
    r = row(ws, r, ["", "", "", "", ""], inputs=(1, 2, 3, 4))
    i = r - 1
    ws.cell(i, 5, f'=IF(A{i}="","",A{i}&IF(D{i}="",""," (instead: "&D{i}&")"))').font = font(size=9, color=GREY)
O1 = r - 1
dd(ws, [f"B{i}" for i in range(O0, O1 + 1)], '"Category word,Competitor phrase,Off-brand for us,AI cliche"')
packs_count = "+".join(f'IF(B{p[0]}="Yes",C{p[0]},0)' for p in PK)
ws.cell(TOT, 2, f"=COUNTA(A{O0}:A{O1})+{packs_count}").font = font(bold=True)
ws.cell(TOT, 3, f'=IF(B{TOT}<20,"Add more: aim for 20 to 30",IF(B{TOT}>30,"Over 30: long lists get followed less closely. Drop a pack or trim.","In range"))').font = font(bold=True, color=TEAL)
r += 1
r = section(ws, r, "Everything on your ban list (automatic)", 5)
ALL_G = r
packs_g = ",".join(f'IF(B{p[0]}="Yes",{p[1]},"")' for p in PK)
sug(ws, r, 1, f'=_xlfn.TEXTJOIN("; ",TRUE,{packs_g},_xlfn.TEXTJOIN("; ",TRUE,E{O0}:E{O1}))', size=9)
ws.merge_cells(start_row=r, start_column=1, end_row=r, end_column=5); ws.row_dimensions[r].height = 110; r += 2
note(ws, r, "Ban phrases as well as single words. A short list of specific entries is easier to follow than a long list of vague instructions.", italic=True, color=GREY)
ALL_M = ",".join(f'IF({P4}!B{p[0]}="Yes",{p[2]},"")' for p in PK)

# ================================================================ 5 Test
ws = wb.create_sheet("5 Test", 5)
r = header(ws, "5. Test", "Five posts, read aloud. Every No points at a rule to fix. Pick a test prompt or write your own.", [6, 44, 20, 16, 16, 44], V)
ws.cell(r, 1, "Score").font = font(bold=True)
ws.cell(r, 2, '=COUNTIF(D8:D12,"Yes")&" of 5 sound like us, "&COUNTIF(E8:E12,"Yes")&" of 5 free of banned words"').font = font(bold=True, color=TEAL)
r += 2
r = table_head(ws, r, ["#", "Prompt or brief (pick or type)", "Channel", "Sounds like us read aloud?", "Free of banned words?", "What to fix (which rule, which sheet)"])
assert r == 8, r
for i in range(1, 6):
    r = row(ws, r, [i, "", "", "", "", ""], inputs=(2, 3, 4, 5, 6))
dd(ws, [f"B{i}" for i in range(8, 13)], LISTS["test"])
dd(ws, [f"C{i}" for i in range(8, 13)], CH_L)
dd(ws, [f"D{i}" for i in range(8, 13)] + [f"E{i}" for i in range(8, 13)], '"Yes,No"', strict=True)
r += 1
for t in ["Fix the rule, not the post: change the sheet the miss came from, then run the same prompt again and compare.",
          "Doesn't sound like you? Presets are generic on purpose. Rewrite the trait descriptions in your words and add example lines on sheets 1 and 2.",
          "A banned word slipped through? Check it is on sheet 4 exactly as it appeared, then reread long drafts before they go out."]:
    r = note(ws, r, t)

# ================================================================ 6 Your style guide
ws = wb.create_sheet("6 Your style guide", 6)
ws.column_dimensions["A"].width = 26; ws.column_dimensions["B"].width = 92; ws.sheet_view.showGridLines = False
ws["A1"] = "6. Your style guide"; ws["A1"].font = font(size=18, bold=True, color=NAVY)
ws["A2"] = "Writes itself from sheets 1 to 4. Add your brand name, read it through, then share it with your writers or copy it into any AI tool."; ws["A2"].font = font(size=10, color=GREY)
ws["A3"] = V; ws["A3"].font = font(size=8, color=GREY)
for rr, lab in [(5, "Brand name"), (6, "Last updated")]:
    ws.cell(rr, 1, lab).font = font(bold=True)
    c = ws.cell(rr, 2); c.fill = INPUT; c.border = BOX; c.font = font()
ws["B6"].number_format = "d mmm yyyy"
BN = 'IF($B$5="","our brand",$B$5)'
G0 = 9
r = G0
def gh(text):
    global r
    c = ws.cell(r, 1, text); c.font = font(size=13, bold=True, color=PINK)
    ws.cell(r, 3, f'=CHAR(10)&UPPER(A{r})'); r += 1
def gl(fa, fb, bold_a=True, h=None):
    global r
    if h: ws.row_dimensions[r].height = h
    ca = ws.cell(r, 1, fa); ca.font = font(bold=bold_a, color=NAVY); ca.alignment = WRAP
    cb = ws.cell(r, 2, fb); cb.font = font(); cb.alignment = WRAP
    ws.cell(r, 3, f'=IF(A{r}="",B{r},A{r}&IF(B{r}="","",CHAR(10)&B{r}))')
    r += 1
c = ws.cell(r, 1, '=IF($B$5="","Our",$B$5)&" voice and style guide"'); c.font = font(size=20, bold=True, color=NAVY); ws.cell(r, 3, f'=A{r}'); r += 1
c = ws.cell(r, 1, f'="How "&{BN}&" sounds, on every channel. For anyone, or any AI tool, writing for us."&IF($B$6="",""," Last updated "&TEXT($B$6,"d mmm yyyy")&".")'); c.font = font(size=10, color=GREY); ws.cell(r, 3, f'=A{r}'); r += 2

gh("Who we are")
gl(f'=IF({P1}!A{ARCH}="","(sheet 1: archetype)",{P1}!A{ARCH})', f'={P1}!G{ARCH}&""', h=58)
r += 1
gh("Our personality")
for i in range(T0, T1 + 1):
    gl(f'=IF({P1}!A{i}="","",{P1}!A{i}&IF({P1}!B{i}="",""," ("&{P1}!B{i}&")"))',
       f'=IF({P1}!A{i}="","",IF({P1}!G{i}="","","What it sounds like: "&{P1}!G{i})&IF({P1}!H{i}="","",CHAR(10)&"What it does not mean: "&{P1}!H{i})&IF({P1}!E{i}="","",CHAR(10)&"In our voice: "&{P1}!E{i}))', h=44)
r += 1
gh("How we write, everywhere")
for i in range(D0, D1 + 1):
    on = f'OR({P3}!A{i}="",AND({P3}!E{i}="",{P3}!F{i}=""))'
    gl(f'=IF({on},"",{P3}!A{i})',
       f'=IF({on},"",IF({P3}!E{i}="","","Do: "&{P3}!E{i})&IF(AND({P3}!E{i}<>"",{P3}!F{i}<>""),CHAR(10),"")&IF({P3}!F{i}="","",{DONT}&{P3}!F{i}))', h=30)
r += 1
gh("Channel by channel")
gl("", "Same personality, different room. Formality runs from 1 (casual) to 5 (formal).", bold_a=False)
ws.cell(r - 1, 2).font = font(size=9, italic=True, color=GREY)
for y in CY:
    def part(colL, label, suffix=""):
        e = eff2(colL, y)
        return f'IF({e}="","",CHAR(10)&"{label}"&{e}&"{suffix}")'
    body = "&".join([part("B", "Who it" + "'" + "s for: "), part("C", "Formality: ", " of 5"), part("D", "Sentence length: "),
                     part("E", "How we open: "), part("F", "How we close: "), part("G", "Formatting: "),
                     part("H", "Examples and data: "), part("I", "Product mentions: "), part("J", "Example: ")])
    gl(f'=IF({P2}!A{y}="","",{P2}!A{y})', f'=IF({P2}!A{y}="","",MID({body},2,4000))', h=122)
r += 1
gh("Words we never use")
gl("", f'=IF({P4}!A{ALL_G}="","(sheet 4)",{P4}!A{ALL_G})', bold_a=False, h=110)
r += 1
gh("Before anything goes out")
for k, t in enumerate(["Read it out loud. Does it sound like us?",
                       "Check it against the words we never use.",
                       "Check it fits the channel: length, opening, closing, formatting.",
                       "When something's off, fix the rule in this guide, not just the post. Then try again."], 1):
    gl("", f"{k}. {t}", bold_a=False)
G1 = r - 1
r += 1
ws.cell(r, 1, "Make it yours: what's still generic").font = font(size=12, bold=True, color=TEAL); r += 1
note(ws, r, "Presets get you a working guide in minutes. These are the parts that make it sound like you and nobody else.", color=GREY); r += 1
nT = f'COUNTA({P1}!A{T0}:A{T1})'
checks = [
    ("Example lines", f'=COUNTIFS({P1}!A{T0}:A{T1},"?*",{P1}!E{T0}:E{T1},"?*")&" of "&{nT}&" traits have an example line in your voice (sheet 1)"'),
    ("Your own wording", f'=COUNTIFS({P1}!A{T0}:A{T1},"?*",{P1}!C{T0}:C{T1},"?*")&" of "&{nT}&" traits are described in your words, not the preset (sheet 1)"'),
    ("Channel examples", f'=SUMPRODUCT(({P2}!A{CY[0]}:A{CY[-1]}<>"")*({P2}!J{CY[0]}:J{CY[-1]}<>"")*(MOD(ROW({P2}!A{CY[0]}:A{CY[-1]})-{CY[0]},2)=0))&" of "&SUMPRODUCT(({P2}!A{CY[0]}:A{CY[-1]}<>"")*(MOD(ROW({P2}!A{CY[0]}:A{CY[-1]})-{CY[0]},2)=0))&" channels have an example line (sheet 2)"'),
    ("Your own ban words", f'=COUNTA({P4}!A{O0}:A{O1})&" words of your own on the ban list: add the ones your category and competitors overuse (sheet 4)"'),
]
for k, f in checks:
    ws.cell(r, 1, k).font = font(bold=True)
    c = ws.cell(r, 2, f); c.font = font(color=TEAL); r += 1
r += 1
ws.cell(r, 1, "The whole guide in one cell").font = font(size=12, bold=True, color=TEAL); r += 1
note(ws, r, "Rows are sized for typical answers. If a long answer is cut off, select the rows and double-click a row border to fit.", color=GREY); r += 1
note(ws, r, "Click the cell below and copy it into any AI tool's instructions (a custom GPT, a Claude project, a Gemini Gem), or send it to a writer.", color=GREY); r += 1
ws.column_dimensions["C"].hidden = True
c = ws.cell(r, 1, f'=_xlfn.TEXTJOIN(CHAR(10),TRUE,C{G0}:C{G1})'); c.font = font(size=9); c.alignment = WRAP; c.border = BOX
ws.merge_cells(start_row=r, start_column=1, end_row=r, end_column=2); ws.row_dimensions[r].height = 240
ws.print_area = f"A{G0}:B{G1}"

# ================================================================ 7 Paste into Mavic
ws = wb.create_sheet("7 Paste into Mavic", 7)
r = header(ws, "7. Paste into Mavic", "The same answers as your style guide, split field by field for Mavic's Brand DNA. Nothing to type here.", [24, 66, 40], V)
r = section(ws, r, "Personality: archetype", 3)
r = table_head(ws, r, ["Name", "Description"])
for col, f in [(1, f'=IF({P1}!A{ARCH}="","(optional: sheet 1)",{P1}!A{ARCH})'), (2, f'={P1}!G{ARCH}&""')]:
    c = ws.cell(r, col, f); c.font = font(); c.alignment = WRAP; c.border = BOX
ws.row_dimensions[r].height = 60; r += 2
r = section(ws, r, "Personality: brand traits", 3)
r = table_head(ws, r, ["Name", "Description", "Weight (%)"])
for i in range(T0, T1 + 1):
    fs = [f'=IF({P1}!A{i}="","",{P1}!A{i})',
          f'=IF({P1}!A{i}="","",{P1}!G{i}&IF({P1}!H{i}="",""," It does not mean: "&{P1}!H{i})&IF({P1}!E{i}="",""," Example: "&{P1}!E{i}))',
          f'=IF({P1}!A{i}="","",{P1}!B{i})']
    for col, f in enumerate(fs, 1):
        c = ws.cell(r, col, f); c.font = font(); c.alignment = WRAP; c.border = BOX
    ws.row_dimensions[r].height = 44; r += 1
r += 1
r = section(ws, r, "Writing styles: one per channel", 3)
r = table_head(ws, r, ["Title", "Style guide", "Description (one sentence)"])
rules = f'IF(COUNTIF({P3}!G{D0}:G{D1},"?*")=0,"",CHAR(10)&"Rules on every channel:"&CHAR(10)&_xlfn.TEXTJOIN(CHAR(10),TRUE,{P3}!G{D0}:G{D1}))'
for y in CY:
    def part(colL, label, suffix=""):
        e = eff2(colL, y)
        return f'IF({e}="","","{label}"&{e}&"{suffix}"&CHAR(10))'
    guide = "&".join([part("C", "Tone: formality ", " on a scale of 1 (casual) to 5 (formal)."),
                      part("D", "Sentence length: "), part("E", "Openings: "), part("F", "Closings: "),
                      part("G", "Formatting: "), part("H", "Examples and data: "), part("I", "Product mentions: "),
                      part("J", "Example line in this style: ")])
    off = f'{P2}!A{y}=""'
    for col, f in [(1, f'=IF({off},"",{P2}!A{y})'), (2, f'=IF({off},"",{guide}&{rules})'), (3, f'=IF({off},"",{eff2("B", y)})')]:
        c = ws.cell(r, col, f); c.font = font(); c.alignment = WRAP; c.border = BOX
    ws.row_dimensions[r].height = 150; r += 1
r = note(ws, r, "Only the channels picked on sheet 2 appear here.", italic=True, color=GREY)
r += 1
r = section(ws, r, "Ban list: one line, comma separated", 3)
c = ws.cell(r, 1, f'=_xlfn.TEXTJOIN(", ",TRUE,{ALL_M},_xlfn.TEXTJOIN(", ",TRUE,{P4}!A{O0}:A{O1}))'); c.font = font(); c.alignment = WRAP; c.border = BOX
ws.merge_cells(start_row=r, start_column=1, end_row=r, end_column=3); ws.row_dimensions[r].height = 80; r += 2
ws.cell(r, 1, "Do it in Mavic").font = font(size=12, bold=True, color=TEAL); r += 1
mavic = [
 ("Personality", "Brand DNA > Branding > Personality. Use the pencil on the Archetype tile, then on Brand traits (or + if empty). Add trait for each row above, with its weight, then Save."),
 ("Writing style", "Brand DNA > Branding > Writing style. Add one per channel: paste the title, the one-sentence description and the style guide block above. How many styles you can keep depends on your plan."),
 ("Ban list", "Brand DNA > Branding > Ban list > + Add term. Paste the whole ban list line: terms separated by commas are added one by one and save as you go. Or ask Mavic in chat to suggest a starter list, open the draft and use Add to Brand DNA."),
 ("Test", "In a new chat, type @ and pick your Writing style (and a Customer profile), then ask for a post. Fix the rule in Brand DNA, Save, and run the same request again."),
 ("Before it goes out", "The ban list is a strong nudge, not a hard filter, so read long drafts before you schedule them. Nothing publishes until you do."),
]
for k, t in mavic:
    ws.cell(r, 1, k).font = font(bold=True); ws.cell(r, 1).alignment = WRAP
    c = ws.cell(r, 2, t); c.font = font(); c.alignment = WRAP
    ws.row_dimensions[r].height = 30 if len(t) < 120 else 44; r += 1
for text, url in LINKS:
    r = link(ws, r, text, url, col=2)
r += 1
c = ws.cell(r, 1, "Try it on your own brand at mavic.ai"); c.font = font(size=11, bold=True, color=PINK, underline="single"); c.hyperlink = CTA

# Presets last
wb.move_sheet("Presets", offset=len(wb.sheetnames) - 1 - wb.sheetnames.index("Presets"))
for s in wb.worksheets:
    if s.title != "6 Your style guide": s.page_setup.orientation = "landscape"
    s.page_setup.fitToWidth = 1
    s.sheet_properties.pageSetUpPr.fitToPage = True; s.page_setup.fitToHeight = 0
wb.active = 0
wb.save(OUT)
print("saved", OUT, wb.sheetnames)
