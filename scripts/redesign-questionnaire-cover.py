from pathlib import Path

from pypdf import PdfReader, PdfWriter
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "output/pdf/Upitnik-prije-konzultacije-Sandra-Pavic-Draskovic.pdf"
TEMP_COVER = ROOT / "tmp/pdfs/questionnaire-cover.pdf"
TEMP_OUTPUT = ROOT / "tmp/pdfs/questionnaire-final.pdf"
PUBLIC_OUTPUT = SOURCE
PRIVATE_OUTPUT = ROOT / "private-documents/upitnik-prije-konzultacije-sandra-pavic-draskovic.pdf"

GREEN = "#1B5846"
LIME = "#D7F235"
WHITE = "#FFFFFF"
LINE = "#6F978B"


def create_cover() -> None:
    TEMP_COVER.parent.mkdir(parents=True, exist_ok=True)

    pdfmetrics.registerFont(
        TTFont("CoverSans", "/System/Library/Fonts/Supplemental/Arial.ttf")
    )
    pdfmetrics.registerFont(
        TTFont("CoverSansBold", "/System/Library/Fonts/Supplemental/Arial Bold.ttf")
    )
    pdfmetrics.registerFont(
        TTFont("CoverSerif", "/System/Library/Fonts/Supplemental/Georgia.ttf")
    )

    width, height = A4
    c = canvas.Canvas(str(TEMP_COVER), pagesize=A4)
    c.setTitle("Upitnik prije konzultacije - Sandra Pavić Drašković")
    c.setAuthor("Sandra Pavić Drašković")

    c.setFillColor(GREEN)
    c.rect(0, 0, width, height, stroke=0, fill=1)

    margin = 46
    right = width - margin

    c.setFillColor(WHITE)
    c.setFont("CoverSansBold", 11)
    c.drawRightString(right, height - 48, "Sandra Pavić Drašković")

    c.setFillColor(LIME)
    c.setFont("CoverSansBold", 9)
    c.drawString(margin, 205, "PRIJE KONZULTACIJE")

    c.setFillColor(WHITE)
    c.setFont("CoverSerif", 55)
    c.drawString(margin, 145, "Upitnik.")

    c.setFont("CoverSans", 13)
    c.drawString(margin, 105, "Ispuni ga prije prvog susreta, da razgovor")
    c.drawString(margin, 89, "može krenuti od tebe.")

    label_x = 340
    value_x = right
    rows = [
        ("PITANJA", "27"),
        ("DIJELOVI", "8"),
        ("MJERENJA", "3 dana"),
    ]
    y = 188
    for label, value in rows:
        c.setStrokeColor(LINE)
        c.setLineWidth(0.6)
        c.line(label_x, y + 18, value_x, y + 18)
        c.setFillColor(LIME)
        c.setFont("CoverSansBold", 8.5)
        c.drawString(label_x, y, label)
        c.setFillColor(WHITE)
        c.setFont("CoverSans", 10.5)
        c.drawRightString(value_x, y, value)
        y -= 32
    c.setStrokeColor(LINE)
    c.line(label_x, y + 18, value_x, y + 18)

    c.showPage()
    c.save()


def replace_cover() -> None:
    original = PdfReader(str(SOURCE))
    cover = PdfReader(str(TEMP_COVER))

    writer = PdfWriter()
    writer.add_page(cover.pages[0])
    for page in original.pages[1:]:
        writer.add_page(page)

    metadata = dict(original.metadata or {})
    metadata.update(
        {
            "/Title": "Upitnik prije konzultacije - Sandra Pavić Drašković",
            "/Author": "Sandra Pavić Drašković",
        }
    )
    writer.add_metadata(metadata)

    with TEMP_OUTPUT.open("wb") as stream:
        writer.write(stream)

    data = TEMP_OUTPUT.read_bytes()
    PUBLIC_OUTPUT.write_bytes(data)
    PRIVATE_OUTPUT.write_bytes(data)


if __name__ == "__main__":
    create_cover()
    replace_cover()
