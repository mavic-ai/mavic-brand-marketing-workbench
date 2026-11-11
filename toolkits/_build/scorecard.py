import sys; sys.path.insert(0, '.')
from common import *
wb = Workbook()
BRAND = "https://mavic.crisp.help/en/category/brand-dna-12kp8ur/"

ws = wb.active; ws.title = "How to use"
r = header(ws, "Brand DNA Scorecard", "Score your brand kit out of 100 and find the gap that makes AI output generic.", [4, 92])
r = section(ws, r, "Three steps, about 30 minutes", 2)
for n, t in [("1", "Scorecard: score each item 0 (missing), 1 (exists but vague) or 2 (specific enough that a stranger could use it)."),
             ("2", "Read your total and the lowest section. Fix the lowest section first: it is usually where generic output comes from."),
             ("3", "Diagnostic test: ask for three captions and read what comes back. The sheet tells you which section the problem lives in.")]:
    ws.cell(r, 1, n).font = font(bold=True, color=PINK); ws.cell(r, 2, t).font = font(); ws.cell(r, 2).alignment = Alignment(wrap_text=True); r += 1
r += 1
ws.cell(r, 2, "Why voice and audience carry more weight than visuals: a logo and colours tell a designer what a post looks like. They tell a writer, or an AI, nothing about what to say or who it is for.").font = font(size=9); ws.cell(r, 2).alignment = Alignment(wrap_text=True); r += 2
r = legend(ws, r)
footer(ws, r, "Each section below matches a section of Brand DNA in Mavic. Score it here, fix it there, then run the diagnostic test in a new chat.", BRAND)

ws = wb.create_sheet("Scorecard")
r = header(ws, "Scorecard", "0 = missing, 1 = exists but vague, 2 = specific. Weights are our rule of thumb; change them if your business needs different ones.", [24, 62, 12, 12, 40])
ws.cell(r, 1, "Total out of 100").font = font(bold=True, size=12)
ws.cell(r, 3).font = font(bold=True, size=14, color=NAVY)
ws.cell(r, 5).font = font(bold=True, color=TEAL)
total_row = r
r += 2
sections = [
 ("Visual identity", 15, ["Primary logo as SVG (or PNG at least 1024 px wide, transparent)", "Icon or simplified mark for small spaces", "Light-on-dark version", "Clear-space rule written down", "Colours with a role each (primary, secondary, accent, neutrals) and hex codes", "One heading font and one body font, with the weights you use"]),
 ("Personality", 10, ["3 to 5 traits that are true today", "Each trait has a line saying what it sounds like"]),
 ("Positioning", 15, ["One sentence: for [audience], [brand] is the [category] that [value]. Unlike [competitor], we [difference].", "A stranger could repeat it correctly after reading it once", "It is true today, not where you hope to be"]),
 ("Writing style", 20, ["Tone described with an example", "Sentence length and rhythm", "How you open and how you close", "Formatting rules (emoji, lists, line breaks)", "A separate style for each main channel", "Three example posts you are proud of"]),
 ("Customer profiles", 15, ["2 to 4 profiles, each with a short name", "Each has a top pain, a top desire and a buying trigger", "Each names where they spend time (channels, communities)"]),
 ("Content themes", 10, ["2 to 4 themes", "Each sits where your knowledge, their interest and a gap competitors leave overlap"]),
 ("Products and services", 5, ["Every product with a one-line description, price and a clean photo"]),
 ("Ban list", 5, ["20 to 30 entries, including words specific to your category"]),
 ("Competitors", 5, ["2 to 5 named, each with what they win on and what they miss"]),
]
r = table_head(ws, r, ["Section", "Item", "Score 0 to 2", "Section score", "Fix first? / notes"])
sec_cells = []
first_score = r
for name, weight, items in sections:
    start = r
    for i, it in enumerate(items):
        r = row(ws, r, [f"{name} (weight {weight})" if i == 0 else "", it, "", "", ""], inputs=(3, 5))
    end = r - 1
    c = ws.cell(start, 4, f'=ROUND(SUM(C{start}:C{end})/{2*len(items)}*{weight},1)')
    c.font = font(bold=True)
    ws.cell(start, 1).font = font(bold=True)
    sec_cells.append((name, weight, start))
last_score = r - 1
dv_list(ws, ["0", "1", "2"], f"C{first_score}:C{last_score}")
dvn = DataValidation(type="whole", operator="between", formula1="0", formula2="2"); 
ws.cell(total_row, 3, "=" + "+".join(f"D{s}" for _, _, s in sec_cells))

r += 1
ws.cell(r, 1, "Lowest section").font = font(bold=True)
pct = ",".join(f"D{s}/{w}" for _, w, s in sec_cells)
names = ",".join(f'"{n}"' for n, _, _ in sec_cells)
ws.cell(r, 2, f'=INDEX({{{names}}},MATCH(MIN({pct}),{{{pct}}},0))') if False else None
# build lowest via helper column F (hidden-ish)
ws.column_dimensions["F"].width = 3
for n, w, s in sec_cells:
    ws.cell(s, 6, f"=D{s}/{w}").font = font(size=7, color="FFFFFF")
helper = ",".join(f"F{s}" for _, _, s in sec_cells)
# MIN over non-contiguous cells is fine; locate the name with nested IFs
expr = '""'
for n, w, s in reversed(sec_cells):
    expr = f'IF(F{s}=MIN({helper}),"{n}",{expr})'
ws.cell(r, 2, "=" + expr).font = font(bold=True, color=PINK)
ws.cell(total_row, 5, f'=IF(AND(C{total_row}>=80,MIN({helper})>=0.5),"Ready: test it in a new chat",IF(C{total_row}>=50,"Gaps to fix: start with the lowest section","Expect generic output: fix voice and audience first"))')
r += 2
ws.cell(r, 1, "Score bands (80 or more with no section under half marks = ready; 50 to 79 = gaps) are our rule of thumb, not a measured threshold.").font = font(size=8, italic=True, color=GREY)

ws = wb.create_sheet("Diagnostic test")
r = header(ws, "Diagnostic test", "Open a new chat and ask: Write three Instagram captions for our most popular product. Then tick what you see.", [42, 34, 40, 16])
r = table_head(ws, r, ["If the captions read as...", "The gap is in...", "Fix", "Seen? (Yes/No)"])
for a, b, c in [("Generic, could be any brand", "Personality and Writing style", "Add traits with example lines; add 3 example posts to the Writing Style"),
                ("Aimed at no one in particular", "Customer profiles", "Add 2 to 4 profiles and @-mention one in the prompt"),
                ("Wrong about the product", "Products and services", "Add a one-line description and price for every product"),
                ("Using words you would never use", "Ban list", "Add those words; remember it is a strong nudge, not a hard filter")]:
    r = row(ws, r, [a, b, c, ""], inputs=(4,))
dv_list(ws, ["Yes", "No"], f"D6:D{r-1}")
r += 1
footer(ws, r, "Source: the diagnostic test in the Mavic help centre's Brand DNA articles.", BRAND)

for s in wb.worksheets:
    s.page_setup.orientation = "landscape"; s.page_setup.fitToWidth = 1
wb.save("/mnt/user-data/outputs/toolkits/Mavic_Brand_DNA_Scorecard_v2.xlsx")
print("saved", sec_cells, total_row)
