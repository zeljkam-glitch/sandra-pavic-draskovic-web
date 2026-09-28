from __future__ import annotations

import csv
from io import BytesIO
from pathlib import Path

import pdfplumber
from pypdf import PdfReader, PdfWriter
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output/pdf"
DATA_OUTPUT = ROOT / "docs/recipe-yields.csv"
FONT_PATH = Path("/System/Library/Fonts/Supplemental/Arial Bold.ttf")
FONT_NAME = "RecipeYieldArialBold"


BILJNA = {
    16: ("01", "Salata od šparoga, rajčice, celera i krumpira", "4 PORCIJE"),
    17: ("02", "Salata od krastavaca i koromača", "4 PORCIJE"),
    18: ("03", "Salata od mrkve", "2 PORCIJE"),
    19: ("04", "Osvježavajuća salata", "4 PORCIJE"),
    20: ("05", "Ljetna salata", "2 PORCIJE"),
    21: ("06", "Osvježavajuća rukola salata", "2 PORCIJE"),
    22: ("07", "Batat salata", "2 PORCIJE"),
    23: ("08", "Lagana voćno-zelena salata", "4 PORCIJE"),
    24: ("09", "Salata od cikle i leće", "4 PORCIJE"),
    25: ("10", "Salata od slanutka", "4 PORCIJE"),
    26: ("11", "Sendvič od peršin salate", "4 PORCIJE"),
    27: ("12", "Zelena salata od jagoda", "4 PORCIJE"),
    28: ("13", "Salata od prokulica", "4 PORCIJE"),
    29: ("14", "Šarena salata", "4 PORCIJE"),
    30: ("15", "Batat salata", "4 PORCIJE"),
    31: ("16", "Krumpir salata s divljim šparogama", "4 PORCIJE"),
    33: ("17", "Temeljac od povrća", "OKO 1,2 L"),
    34: ("18", "Juha od muškatne buče", "4 PORCIJE"),
    35: ("19", "Žuta juha od brokule", "4 PORCIJE"),
    36: ("20", "Zelena juha od brokule", "4 PORCIJE"),
    37: ("21", "Juha od hokaido buče", "4 PORCIJE"),
    38: ("22", "Juha od koromača i badema", "2 PORCIJE"),
    39: ("23", "Juha od graška", "3 PORCIJE"),
    40: ("24", "Juha od batata i leće", "4 PORCIJE"),
    41: ("25", "Jednostavna juha od koromača", "4 PORCIJE"),
    43: ("26", "Varivo od slatkog kupusa", "6 PORCIJA"),
    44: ("27", "Varivo od povrća i prosa", "6 PORCIJA"),
    45: ("28", "Varivo od leće", "4 PORCIJE"),
    46: ("29", "Varivo od slanutka i blitve", "4 PORCIJE"),
    47: ("30", "Varivo od poriluka, batata i kelja", "6 PORCIJA"),
    48: ("31", "Varivo od povrća", "4 PORCIJE"),
    49: ("32", "Varivo od brokule i prosa", "4 PORCIJE"),
    50: ("33", "Rižoto od povrća", "4 PORCIJE"),
    51: ("34", "Rižoto s blitvom", "2 PORCIJE"),
    52: ("35", "Rižoto od cvjetače i graška", "4 PORCIJE"),
    53: ("36", "Rižoto od cvjetače i tikvica", "4 PORCIJE"),
    54: ("37", "Veganski quiche", "8 PORCIJA"),
    55: ("38", "Tikvice punjene povrćem", "2 PORCIJE"),
    56: ("39", "Falafel", "24-30 KOMADA"),
    57: ("40", "Tacosi-tortilje od leće i oraha", "4 PORCIJE / 5-6 TORTILJA"),
    58: ("41", "Ploške od batata", "4 PORCIJE"),
    59: ("42", "Pomfrit bez masnoća", "4 PORCIJE"),
    60: ("43", "Batat pomfrit bez masnoća", "4 PORCIJE"),
    61: ("44", "Rezanci od batata sa šparogama i paprikom", "6 PORCIJA"),
    62: ("45", "Bezglutenski špageti od buče s povrćem", "2 PORCIJE"),
    63: ("46", "Popečci od mrkve, tikvica i krumpira", "8 POPEČAKA"),
    64: ("47", "Mini pizze od krumpira/batata", "8 MINI PIZZA"),
    65: ("48", "Bolognese od leće", "4 PORCIJE"),
    66: ("49", "Wok povrće", "3 PORCIJE"),
    67: ("50", "Buča i toskanski kelj", "4 PORCIJE"),
}


BLAGDANSKA = {
    5: ("01", "Francuska salata, kuhana varijanta", "4-6 PORCIJA"),
    6: ("02", "Francuska salata, sirova varijanta", "4 PORCIJE"),
    7: ("03", "Juha od hokaido buče", "4 PORCIJE"),
    8: ("04", "Sushi od krastavaca", "OKO 16 KOMADA"),
    9: ("05", "Krekeri od heljde", "30-40 KREKERA"),
    10: ("06", "Krekeri i pogačice od sjemenki", "OKO 24 KOMADA"),
    11: ("07", "Kruh od heljde i suncokreta", "1 MANJI KRUH / 8-10 KRIŠKI"),
    13: ("08", "Namaz od avokada", "2-3 PORCIJE"),
    14: ("09", "Povrtni namaz 'ajvar'", "OKO 500 G"),
    15: ("10", "Namaz s paprikom", "OKO 250 G"),
    16: ("11", "Namaz od indijskih oraščića", "OKO 300 G"),
    17: ("12", "Tikvice u umaku od rajčica", "2 PORCIJE"),
    18: ("13", "Povrtne rolice", "4-5 ROLICA"),
    19: ("14", "Falafeli s osvježavajućim kremastim umakom", "12-14 FALAFELA"),
    20: ("15", "Lazanje", "4 PORCIJE"),
    21: ("16", "Pizza s tijestom od heljde i 'sirom' od tikvica", "3-4 MINI PIZZE"),
    23: ("17", "Torta od mrkve i jabuka", "8 KRIŠKI"),
    24: ("18", "Pita od jabuka", "12 KRIŠKI"),
    25: ("19", "Raw brownies", "16 KOMADA"),
    26: ("20", "Orange-kakao torta", "12-14 KRIŠKI"),
    27: ("21", "Torta s malinama", "12-14 KRIŠKI"),
    28: ("22", "Spicy čips od kelja", "4 PORCIJE"),
    29: ("23", "Puding od kakija", "3 PORCIJE"),
    30: ("24", "After Eight energetske kuglice", "18-20 KUGLICA"),
    31: ("25", "Mirisne i sočne kiflice s lješnjacima", "OKO 12 KIFLICA"),
}


def add_yields(source: Path, labels: dict[int, tuple[str, str, str]], kind: str) -> None:
    reader = PdfReader(str(source))
    writer = PdfWriter()
    writer.clone_document_from_reader(reader)

    with pdfplumber.open(str(source)) as layout_pdf:
        for page_number, (_, _, label) in labels.items():
            page = writer.pages[page_number - 1]
            layout_page = layout_pdf.pages[page_number - 1]
            width = float(page.mediabox.width)
            height = float(page.mediabox.height)
            expected_height = 6.6 if kind == "biljna" else 5.6
            category_words = [
                word
                for word in layout_page.extract_words()
                if 50 <= word["x0"] <= 110
                and abs(word["height"] - expected_height) < 0.45
                and word["text"] not in {"ILUSTRACIJA", "JELA", "SASTOJCI", "POSTUPAK"}
            ]
            if not category_words:
                raise ValueError(f"Nije pronađen red kategorije na stranici {page_number}: {source.name}")
            category_top = min(word["top"] for word in category_words)

            buffer = BytesIO()
            layer = canvas.Canvas(buffer, pagesize=(width, height))
            layer.setFillColor("#1D4C3D")
            if kind == "biljna":
                size = 6.6 if len(label) <= 20 else 5.8
                x = 543.0
            else:
                size = 5.6 if len(label) <= 19 else 5.1
                x = 385.0
            layer.setFont(FONT_NAME, size)
            layer.drawRightString(x, height - category_top - expected_height, label)
            layer.save()
            buffer.seek(0)
            page.merge_page(PdfReader(buffer).pages[0], over=True)

    temporary = source.with_suffix(".with-yields.pdf")
    with temporary.open("wb") as stream:
        writer.write(stream)
    temporary.replace(source)


def write_catalog() -> None:
    DATA_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with DATA_OUTPUT.open("w", newline="", encoding="utf-8-sig") as stream:
        writer = csv.writer(stream, delimiter=";")
        writer.writerow(["izdanje", "broj_recepta", "stranica", "naziv", "prinos"])
        for edition, recipes in (
            ("Moja antikancerogena, bezglutenska biljna prehrana", BILJNA),
            ("Knjižica blagdanskih recepata", BLAGDANSKA),
        ):
            for page, (number, title, label) in recipes.items():
                writer.writerow([edition, number, page, title, label.title()])


def main() -> None:
    pdfmetrics.registerFont(TTFont(FONT_NAME, str(FONT_PATH)))
    add_yields(
        OUTPUT / "Moja-antikancerogena-bezglutenska-biljna-prehrana-redizajn.pdf",
        BILJNA,
        "biljna",
    )
    add_yields(
        OUTPUT / "Knjizica-blagdanskih-recepata-Sandra-Pavic-Draskovic.pdf",
        BLAGDANSKA,
        "blagdanska",
    )
    write_catalog()


if __name__ == "__main__":
    main()
