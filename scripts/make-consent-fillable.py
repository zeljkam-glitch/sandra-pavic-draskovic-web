from pathlib import Path
import shutil

from pypdf import PdfReader, PdfWriter
from pypdf.generic import ArrayObject, BooleanObject, DictionaryObject, NameObject, TextStringObject
from reportlab.lib.colors import Color, HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
PRIVATE_OUTPUT = ROOT / "private-documents/suglasnost-sandra-pavic-draskovic.pdf"
STATIC_TEMPLATE = ROOT / "private-documents/suglasnost-sandra-pavic-draskovic-static.pdf"
PUBLIC_OUTPUT = ROOT / "output/pdf/Suglasnost-Sandra-Pavic-Draskovic.pdf"
OVERLAY = ROOT / "tmp/pdfs/consent-fields-overlay.pdf"
FONT_DONOR = ROOT / "tmp/pdfs/consent-font-donor.pdf"
FINAL_TEMP = ROOT / "tmp/pdfs/consent-fillable-final.pdf"
FONT_PATH = Path("/System/Library/Fonts/Supplemental/Arial.ttf")
W, H = A4

TEXT = HexColor("#183F35")
TRANSPARENT = Color(1, 1, 1, alpha=0)


def text_field(c, name, tooltip, x0, top, x1, bottom, font_size=10):
    c.acroForm.textfield(
        name=name,
        tooltip=tooltip,
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
        fieldFlags="required",
    )


def make_overlay():
    OVERLAY.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OVERLAY), pagesize=A4)
    text_field(c, "ime_i_prezime_klijenta", "Ime i prezime klijenta", 45, 720, 226, 765)
    text_field(c, "datum_i_mjesto", "Datum i mjesto", 249, 720, 388, 765)
    text_field(c, "potpis_ime_i_prezime", "Potpis imenom i prezimenom", 411, 720, 550, 765)
    c.showPage()
    c.save()


def make_font_donor():
    pdfmetrics.registerFont(TTFont("ConsentUnicode", str(FONT_PATH)))
    c = canvas.Canvas(str(FONT_DONOR), pagesize=A4)
    c.setFont("ConsentUnicode", 10)
    c.drawString(20, H - 20, "ČĆŽŠĐ čćžšđ")
    c.save()


def combine_with_source():
    base = PdfReader(str(STATIC_TEMPLATE))
    overlay = PdfReader(str(OVERLAY))
    font_donor = PdfReader(str(FONT_DONOR))
    if len(base.pages) != 1 or len(overlay.pages) != 1:
        raise ValueError("Suglasnost mora imati jednu stranicu.")

    writer = PdfWriter()
    writer.clone_document_from_reader(base)
    output_page = writer.pages[0]
    output_page.merge_page(overlay.pages[0], over=True)

    donor_fonts = font_donor.pages[0]["/Resources"]["/Font"]
    unicode_font = next(
        font_ref for font_ref in donor_fonts.values() if font_ref.get_object().get("/Subtype") == "/TrueType"
    )
    unicode_font_ref = unicode_font.clone(writer)
    font_resources = DictionaryObject({NameObject("/FUnicode"): unicode_font_ref})
    default_appearance = "/FUnicode 10 Tf 0.094 0.247 0.208 rg"

    fields = []
    for annotation_ref in output_page.get("/Annots", []):
        annotation = annotation_ref.get_object()
        if annotation.get("/Subtype") != "/Widget":
            continue
        annotation[NameObject("/P")] = output_page.indirect_reference
        annotation[NameObject("/DA")] = TextStringObject(default_appearance)
        fields.append(annotation_ref)

    acroform = DictionaryObject()
    acroform[NameObject("/Fields")] = ArrayObject(fields)
    acroform[NameObject("/DA")] = TextStringObject(default_appearance)
    acroform[NameObject("/DR")] = DictionaryObject({NameObject("/Font"): font_resources})
    acroform[NameObject("/NeedAppearances")] = BooleanObject(True)
    writer._root_object[NameObject("/AcroForm")] = writer._add_object(acroform)

    writer.add_metadata(
        {
            "/Title": "Ispunjiva suglasnost - Sandra Pavić Drašković",
            "/Author": "Sandra Pavić Drašković",
            "/Subject": "Suglasnost koja se može ispuniti na mobitelu ili računalu",
        }
    )
    with FINAL_TEMP.open("wb") as stream:
        writer.write(stream)

    final_reader = PdfReader(str(FINAL_TEMP))
    final_fields = final_reader.get_fields() or {}
    expected = {"ime_i_prezime_klijenta", "datum_i_mjesto", "potpis_ime_i_prezime"}
    if set(final_fields) != expected:
        raise ValueError(f"Nisu sačuvana sva polja: {sorted(final_fields)}")

    widgets = []
    for annotation_ref in final_reader.pages[0].get("/Annots", []):
        annotation = annotation_ref.get_object()
        if annotation.get("/Subtype") == "/Widget":
            widgets.append(annotation)
    if len(widgets) != len(expected) or not all(widget.get("/AP") for widget in widgets):
        raise ValueError("Interaktivna polja nisu ispravno spremljena.")

    data = FINAL_TEMP.read_bytes()
    PRIVATE_OUTPUT.write_bytes(data)
    PUBLIC_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    PUBLIC_OUTPUT.write_bytes(data)
    print(f"Created fillable consent with {len(final_fields)} fields.")


if __name__ == "__main__":
    if not STATIC_TEMPLATE.exists():
        shutil.copyfile(PRIVATE_OUTPUT, STATIC_TEMPLATE)
    make_overlay()
    make_font_donor()
    combine_with_source()
