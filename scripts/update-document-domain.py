from io import BytesIO
from pathlib import Path

from pypdf import PdfReader, PdfWriter
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
DOWNLOADS = Path("/Users/zeljkamikulcic/Downloads")
OUTPUT = ROOT / "output/pdf"


def replace_visible_domain(source: Path, destination: Path, replacements: dict[int, list[dict]]) -> None:
    reader = PdfReader(str(source))
    writer = PdfWriter()
    writer.clone_document_from_reader(reader)

    for page_index, items in replacements.items():
        page = writer.pages[page_index]
        width = float(page.mediabox.width)
        height = float(page.mediabox.height)
        layer_buffer = BytesIO()
        layer = canvas.Canvas(layer_buffer, pagesize=(width, height))

        for item in items:
            x0, top, x1, bottom = item["box"]
            layer.setFillColor(item["background"])
            layer.rect(
                x0 - item.get("left_padding", 30),
                height - bottom - item.get("vertical_padding", 2),
                x1 - x0 + item.get("left_padding", 30) + item.get("right_padding", 2),
                bottom - top + 2 * item.get("vertical_padding", 2),
                stroke=0,
                fill=1,
            )
            layer.setFillColor(item["color"])
            layer.setFont(item.get("font", "Helvetica-Bold"), item["font_size"])
            layer.drawRightString(
                x1,
                height - bottom + item.get("baseline_offset", 1.2),
                item["text"],
            )

        layer.save()
        layer_buffer.seek(0)
        overlay = PdfReader(layer_buffer)
        page.merge_page(overlay.pages[0], over=True)

    destination.parent.mkdir(parents=True, exist_ok=True)
    with destination.open("wb") as stream:
        writer.write(stream)


def main() -> None:
    lime = "#D7F235"
    dark = "#111512"
    green = "#1D4C3D"
    white = "#FFFFFF"
    gray = "#777777"

    replace_visible_domain(
        ROOT / "private-documents/suglasnost-sandra-pavic-draskovic-static.pdf",
        ROOT / "private-documents/suglasnost-sandra-pavic-draskovic-static.pdf",
        {
            0: [
                {
                    "box": (444.164, 811.2525, 549.9683, 819.75),
                    "background": dark,
                    "color": lime,
                    "font_size": 8.35,
                    "left_padding": 38,
                    "baseline_offset": 0.8,
                    "text": "www.sandrapavicdraskovic.com",
                }
            ]
        },
    )

    questionnaire_footer = {
        "box": (452.6836, 822.3625, 543.8288, 827.6125),
        "background": white,
        "color": gray,
        "font": "Helvetica",
        "font_size": 5.15,
        "left_padding": 28,
        "baseline_offset": 0.4,
        "text": "WWW.SANDRAPAVICDRASKOVIC.COM",
    }
    questionnaire_replacements = {
        page: [questionnaire_footer.copy()] for page in range(1, 5)
    }
    questionnaire_replacements[5] = [
        {
            "box": (400.5, 684.0, 521.3908, 693.0),
            "background": dark,
            "color": lime,
            "font_size": 8.8,
            "left_padding": 39,
            "baseline_offset": 0.8,
            "text": "www.sandrapavicdraskovic.com",
        },
        questionnaire_footer.copy(),
    ]
    replace_visible_domain(
        ROOT / "private-documents/upitnik-prije-konzultacije-sandra-pavic-draskovic-static.pdf",
        ROOT / "private-documents/upitnik-prije-konzultacije-sandra-pavic-draskovic-static.pdf",
        questionnaire_replacements,
    )

    replace_visible_domain(
        DOWNLOADS / "Knjizica blagdanskih recepata - Sandra Pavic Draskovic.pdf",
        OUTPUT / "Knjizica-blagdanskih-recepata-Sandra-Pavic-Draskovic.pdf",
        {
            31: [
                {
                    "box": (294.7617, 558.5025, 385.7325, 565.5),
                    "background": dark,
                    "color": lime,
                    "font_size": 6.9,
                    "left_padding": 31,
                    "baseline_offset": 0.65,
                    "text": "www.sandrapavicdraskovic.com",
                }
            ]
        },
    )

    replace_visible_domain(
        DOWNLOADS / "Moja antikancerogena bezglutenska biljna prehrana - redizajn.pdf",
        OUTPUT / "Moja-antikancerogena-bezglutenska-biljna-prehrana-redizajn.pdf",
        {
            69: [
                {
                    "box": (346.8047, 743.85, 452.5223, 752.25),
                    "background": green,
                    "color": lime,
                    "font_size": 8.25,
                    "left_padding": 38,
                    "baseline_offset": 0.8,
                    "text": "www.sandrapavicdraskovic.com",
                }
            ],
            71: [
                {
                    "box": (432.914, 782.25, 549.665, 791.25),
                    "background": green,
                    "color": lime,
                    "font_size": 8.8,
                    "left_padding": 40,
                    "baseline_offset": 0.85,
                    "text": "www.sandrapavicdraskovic.com",
                }
            ],
        },
    )

    replace_visible_domain(
        DOWNLOADS / "Letak - Sandra Pavic Draskovic.pdf",
        OUTPUT / "Letak-Sandra-Pavic-Draskovic.pdf",
        {
            page: [
                {
                    "box": (303.2695, 602.205, 394.0603, 609.0),
                    "background": dark,
                    "color": lime,
                    "font_size": 6.7,
                    "left_padding": 31,
                    "baseline_offset": 0.65,
                    "text": "www.sandrapavicdraskovic.com",
                }
            ]
            for page in (0, 1)
        },
    )


if __name__ == "__main__":
    main()
