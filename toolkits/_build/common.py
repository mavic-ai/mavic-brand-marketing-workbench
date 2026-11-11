from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.formatting.rule import FormulaRule

NAVY = "0B1A5C"; PINK = "E81784"; TEAL = "1D988B"; GREY = "6B6B80"
F = "Arial"
INPUT = PatternFill("solid", fgColor="FFF4C2")
HEAD = PatternFill("solid", fgColor=NAVY)
SUB = PatternFill("solid", fgColor="EEF0F8")
EX = PatternFill("solid", fgColor="F5F5F7")
thin = Side(style="thin", color="D5D7E3")
BOX = Border(left=thin, right=thin, top=thin, bottom=thin)
VERSION = "Version 2.0  ·  10 Nov 2026  ·  mavic.ai/toolkits"

def font(**k):
    k.setdefault("name", F); k.setdefault("size", 10)
    return Font(**k)

def header(ws, title, purpose, widths, version=None):
    for i, w in enumerate(widths):
        ws.column_dimensions[chr(65 + i)].width = w
    ws["A1"] = title; ws["A1"].font = font(size=18, bold=True, color=NAVY)
    ws["A2"] = purpose; ws["A2"].font = font(size=10, color=GREY)
    ws["A3"] = version or VERSION; ws["A3"].font = font(size=8, color=GREY)
    ws.sheet_view.showGridLines = False
    return 5

def section(ws, r, text, ncols):
    ws.cell(r, 1, text).font = font(size=12, bold=True, color=PINK)
    return r + 1

def table_head(ws, r, cols):
    for i, c in enumerate(cols, 1):
        cell = ws.cell(r, i, c)
        cell.font = font(bold=True, color="FFFFFF"); cell.fill = HEAD
        cell.alignment = Alignment(wrap_text=True, vertical="center"); cell.border = BOX
    ws.row_dimensions[r].height = 30
    return r + 1

def row(ws, r, vals, inputs=(), example=False):
    for i, v in enumerate(vals, 1):
        c = ws.cell(r, i, v)
        c.font = font(italic=example, color=GREY if example else "000000")
        c.alignment = Alignment(wrap_text=True, vertical="top"); c.border = BOX
        if example: c.fill = EX
        elif i in inputs: c.fill = INPUT
    return r + 1

def legend(ws, r):
    ws.cell(r, 1, "Yellow cells are yours to fill in. Grey italic rows are worked examples: overwrite or delete them.").font = font(size=9, italic=True, color=GREY)
    return r + 2

def footer(ws, r, mavic_line, link):
    ws.cell(r, 1, "Do it in Mavic").font = font(bold=True, color=TEAL)
    ws.cell(r + 1, 1, mavic_line).font = font(size=9)
    ws.cell(r + 2, 1, link).font = font(size=9, color=TEAL, underline="single")
    ws.cell(r + 2, 1).hyperlink = link
    return r + 4

def dv_list(ws, items, rng):
    dv = DataValidation(type="list", formula1='"' + ",".join(items) + '"', allow_blank=True)
    ws.add_data_validation(dv); dv.add(rng)
