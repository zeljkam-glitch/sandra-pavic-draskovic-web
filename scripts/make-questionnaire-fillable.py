from pathlib import Path
import shutil
import subprocess
import sys

from pypdf import PdfReader, PdfWriter
from pypdf.generic import (
    ArrayObject,
    BooleanObject,
    DictionaryObject,
    NameObject,
    TextStringObject,
)
from reportlab.lib.colors import Color, HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "output/pdf/Upitnik-prije-konzultacije-Sandra-Pavic-Draskovic.pdf"
PRIVATE_OUTPUT = ROOT / "private-documents/upitnik-prije-konzultacije-sandra-pavic-draskovic.pdf"
STATIC_TEMPLATE = ROOT / "private-documents/upitnik-prije-konzultacije-sandra-pavic-draskovic-static.pdf"
OVERLAY = ROOT / "tmp/pdfs/questionnaire-fields-overlay.pdf"
FINAL_TEMP = ROOT / "tmp/pdfs/questionnaire-fillable-final.pdf"
W, H = A4

TEXT = HexColor("#183F35")
GREEN = HexColor("#1B5846")
LIME = HexColor("#D7F235")
DARK = HexColor("#22251F")
TRANSPARENT = Color(1, 1, 1, alpha=0)


def box_from_top(x0: float, top: float, x1: float, bottom: float):
    return x0, H - bottom, x1 - x0, bottom - top


def text_field(c, name, x0, top, x1, bottom, multiline=False, font_size=9):
    flags = "multiline" if multiline else ""
    c.acroForm.textfield(
        name=name,
        tooltip=name.replace("_", " ").title(),
        x=x0,
        y=H - bottom,
        width=x1 - x0,
        height=bottom - top,
        value="",
        fontName="Helvetica",
        fontSize=font_size,
        textColor=TEXT,
        fillColor=TRANSPARENT,
        borderColor=None,
        borderWidth=0,
        forceBorder=False,
        fieldFlags=flags,
    )


def check_field(c, name, x, top, size=11):
    c.acroForm.checkbox(
        name=name,
        tooltip=name.replace("_", " ").title(),
        x=x,
        y=H - top - size,
        size=size,
        checked=False,
        buttonStyle="check",
        shape="square",
        borderWidth=0,
        borderColor=None,
        fillColor=TRANSPARENT,
        textColor=GREEN,
        forceBorder=False,
    )


def add_page_two(c):
    # Replace the introductory eyebrow without changing the banner design.
    c.setFillColor(DARK)
    c.rect(82, H - 92, 205, 21, stroke=0, fill=1)
    c.setFillColor(LIME)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(90, H - 88, "PRIJE NEGO KRENEMO")

    text_field(c, "q01_ime_i_prezime", 84.7, 252, 283.5, 285.7)
    text_field(c, "q02_broj_mobitela", 312, 252, 544.5, 285.7)
    text_field(c, "q03_tjelesna_tezina", 84.7, 307, 283.5, 340.5)
    text_field(c, "q04_tjelesna_visina", 312, 307, 544.5, 340.5)
    text_field(c, "q05_godiste", 84.7, 362, 283.5, 395.2)
    text_field(c, "q06_zanimanje", 312, 362, 544.5, 395.2)
    text_field(c, "q07_povijest_bolesti", 84.7, 482, 544.5, 584.2, True)
    text_field(c, "q08_cjepivo_covid", 84.7, 646, 544.5, 664.5)
    text_field(c, "q09_preboljeni_covid", 84.7, 728, 544.5, 750)


def add_page_three(c):
    text_field(c, "q10_ciste_ili_polipi", 84.7, 82, 544.5, 130.5, True)

    # Large touch targets sit over the existing numbered stress boxes.
    x_positions = [84.7, 119.2, 153.0, 186.7, 221.2, 255.0, 288.7, 323.2, 357.0, 390.7]
    for index, x in enumerate(x_positions, start=1):
        check_field(c, f"q11_stres_{index}", x, 216.7, 28)

    text_field(c, "q12_znojenje", 84.7, 285, 544.5, 334.5, True)
    text_field(c, "q13_stolica", 84.7, 365, 544.5, 389.2)
    text_field(c, "q14_bolesti_tijekom_zivota", 84.7, 495, 544.5, 581.2, True)
    text_field(c, "q15_amalgamske_plombe", 84.7, 625, 544.5, 676.5, True)


def add_page_four(c):
    text_field(c, "q16_obiteljska_anamneza", 84.7, 90, 544.5, 188.2, True)
    text_field(c, "q17_trudnoce_i_glukoza", 84.7, 220, 544.5, 268.5, True)
    text_field(c, "q18_spavanje", 84.7, 350, 544.5, 403.5, True)
    text_field(c, "q19_tjelovjezba", 84.7, 430, 544.5, 483.7, True)

    columns = [(204.7, 318.0), (318.0, 431.2), (431.2, 544.5)]
    rows = [(590.2, 615.7), (615.7, 641.2), (641.2, 666.7), (666.7, 692.2)]
    for row_index, (top, bottom) in enumerate(rows, start=1):
        for day_index, (x0, x1) in enumerate(columns, start=1):
            text_field(
                c,
                f"q20_tlak_red_{row_index}_dan_{day_index}",
                x0 + 2,
                top + 2,
                x1 - 2,
                bottom - 2,
                font_size=7.5,
            )
    text_field(c, "q21_puls", 84.7, 728, 544.5, 756.7)


def add_page_five(c):
    for day_index, (top, bottom) in enumerate(
        [(176.2, 201.7), (201.7, 227.2), (227.2, 252.7)], start=1
    ):
        text_field(c, f"q22_urin_dan_{day_index}", 204.7, top + 2, 406.5, bottom - 2)

    text_field(c, "q23_simptomi", 84.7, 347, 544.5, 417.7, True)

    columns = [(204.7, 318.0), (318.0, 431.2), (431.2, 544.5)]
    rows = [(470.2, 524.2), (524.2, 578.2), (578.2, 631.5), (631.5, 685.5)]
    for meal_index, (top, bottom) in enumerate(rows, start=1):
        for day_index, (x0, x1) in enumerate(columns, start=1):
            text_field(
                c,
                f"q24_prehrana_obrok_{meal_index}_dan_{day_index}",
                x0 + 2,
                top + 2,
                x1 - 2,
                bottom - 2,
                True,
                7.5,
            )
    text_field(c, "q25_tekucina", 84.7, 726, 544.5, 775.5, True)


def add_page_six(c):
    text_field(c, "q26_lijekovi", 84.7, 121, 544.5, 144, True, 8)
    text_field(c, "q26_vitamini_i_minerali", 84.7, 182, 544.5, 204.7, True, 8)

    left = ["urin", "kks", "urea", "kreatinin", "urati", "egfr", "kolesterol", "trigliceridi", "crp"]
    right = ["jetreni_enzimi", "glukoza", "fe", "hb", "feritin", "d_vitamin", "b12", "zn", "se"]
    row_tops = [270.5, 296, 320.7, 345.5, 371, 395.7, 420.5, 446, 470.7]
    for label, top in zip(left, row_tops):
        check_field(c, f"q27_{label}", 84.7, top, 10)
    for label, top in zip(right, row_tops):
        check_field(c, f"q27_{label}", 329.2, top, 10)

    text_field(c, "datum", 51, 577, 283.5, 611.5)
    text_field(c, "potpis_ime_i_prezime", 312, 577, 544.5, 611.5)


def make_overlay():
    OVERLAY.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OVERLAY), pagesize=A4)
    page_builders = [None, add_page_two, add_page_three, add_page_four, add_page_five, add_page_six]
    for builder in page_builders:
        if builder:
            builder(c)
        c.showPage()
    c.save()


def combine_with_source():
    base = PdfReader(str(SOURCE))
    overlay = PdfReader(str(OVERLAY))
    if len(base.pages) != len(overlay.pages):
        raise ValueError("Broj stranica izvornika i sloja s poljima nije jednak.")

    writer = PdfWriter()
    writer.clone_document_from_reader(base)

    fields = ArrayObject()
    for page_index, overlay_page in enumerate(overlay.pages):
        output_page = writer.pages[page_index]
        # Keep the original vector page intact and place only our correction layer above it.
        output_page.merge_page(overlay_page, over=True)

        # merge_page already carries the widget annotations over. Reuse those
        # references for the AcroForm so every field appears exactly once.
        for annotation_ref in output_page.get("/Annots", []):
            annotation = annotation_ref.get_object()
            if annotation.get("/Subtype") != "/Widget":
                continue
            annotation[NameObject("/P")] = output_page.indirect_reference
            fields.append(annotation_ref)

    source_acroform = overlay.trailer["/Root"]["/AcroForm"].get_object()
    acroform = DictionaryObject()
    acroform[NameObject("/Fields")] = fields
    acroform[NameObject("/DA")] = TextStringObject(source_acroform.get("/DA", "/Helv 0 Tf 0 g"))
    acroform[NameObject("/DR")] = source_acroform["/DR"].clone(writer)
    # Ask PDF viewers to refresh field appearances after editing. This keeps
    # saved values visible across desktop and mobile PDF apps.
    acroform[NameObject("/NeedAppearances")] = BooleanObject(True)
    writer._root_object[NameObject("/AcroForm")] = writer._add_object(acroform)

    writer.add_metadata(
        {
            "/Title": "Ispunjivi upitnik prije konzultacije - Sandra Pavić Drašković",
            "/Author": "Sandra Pavić Drašković",
            "/Subject": "Upitnik koji se može ispuniti na mobitelu ili računalu",
        }
    )
    with FINAL_TEMP.open("wb") as stream:
        writer.write(stream)

    final_reader = PdfReader(str(FINAL_TEMP))
    fields = final_reader.get_fields() or {}
    if len(fields) < 65:
        raise ValueError(f"Nisu sačuvana sva interaktivna polja: pronađeno {len(fields)}.")
    for page in final_reader.pages:
        for annotation in page.get("/Annots", []):
            obj = annotation.get_object()
            if obj.get("/Subtype") == "/Widget" and not obj.get("/AP"):
                raise ValueError("Interaktivno polje nema izgled za prikaz.")

    data = FINAL_TEMP.read_bytes()
    SOURCE.write_bytes(data)
    PRIVATE_OUTPUT.write_bytes(data)
    print(f"Created fillable questionnaire with {len(fields)} fields.")


if __name__ == "__main__":
    shutil.copyfile(STATIC_TEMPLATE, SOURCE)
    shutil.copyfile(STATIC_TEMPLATE, PRIVATE_OUTPUT)
    subprocess.run([sys.executable, str(ROOT / "scripts/redesign-questionnaire-cover.py")], check=True)
    make_overlay()
    combine_with_source()
