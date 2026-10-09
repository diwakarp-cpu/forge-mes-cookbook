#!/usr/bin/env python3
"""Generate the public Fynd ERP cookbook PDF from the English content catalog."""

from __future__ import annotations

import json
import re
from datetime import date
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    HRFlowable,
    ListFlowable,
    ListItem,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)
from reportlab.platypus.tableofcontents import TableOfContents


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "content" / "cookbooks" / "forge" / "forge-public-guide.json"
OUTPUT = ROOT / "public" / "downloads" / "fynd-erp-product-cookbook.pdf"
SITE_URL = "https://forge-mes-cookbook-dcca2d61.serverless.boltic.app"

PAGE_WIDTH, PAGE_HEIGHT = A4
MARGIN_X = 18 * mm
MARGIN_TOP = 15 * mm
MARGIN_BOTTOM = 15 * mm
CONTENT_WIDTH = PAGE_WIDTH - (2 * MARGIN_X)

INK = colors.HexColor("#111111")
MUTED = colors.HexColor("#5F6368")
SUBTLE = colors.HexColor("#F5F5F3")
LINE = colors.HexColor("#DDDCD8")
ACCENT = colors.HexColor("#F26B21")
ACCENT_SOFT = colors.HexColor("#FFF1E8")
GREEN = colors.HexColor("#1D7A46")


def clean(value: object) -> str:
    """Normalize source text for reliable PDF rendering."""
    text = str(value or "")
    replacements = {
        "\u2010": "-",
        "\u2011": "-",
        "\u2012": "-",
        "\u2013": "-",
        "\u2014": "-",
        "\u2018": "'",
        "\u2019": "'",
        "\u201c": '"',
        "\u201d": '"',
        "\u2026": "...",
        "\u2192": "->",
        "\u00d7": "x",
        "\u00f7": "/",
        "\u00a0": " ",
    }
    for old, new in replacements.items():
        text = text.replace(old, new)
    return re.sub(r"\s+", " ", text).strip()


def esc(value: object) -> str:
    return (
        clean(value)
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


def bullet_list(items: list[str], style: ParagraphStyle, bullet: str = "-") -> ListFlowable:
    return ListFlowable(
        [ListItem(Paragraph(esc(item), style), leftIndent=0) for item in items],
        bulletType="bullet",
        bulletChar=bullet,
        leftIndent=13,
        bulletFontName="Helvetica-Bold",
        bulletFontSize=8,
        bulletColor=ACCENT,
        spaceAfter=6,
    )


class CookbookDocTemplate(BaseDocTemplate):
    def __init__(self, filename: str, **kwargs: object) -> None:
        super().__init__(filename, **kwargs)
        frame = Frame(
            MARGIN_X,
            MARGIN_BOTTOM,
            CONTENT_WIDTH,
            PAGE_HEIGHT - MARGIN_TOP - MARGIN_BOTTOM,
            id="content",
            leftPadding=0,
            rightPadding=0,
            topPadding=0,
            bottomPadding=0,
        )
        self.addPageTemplates(PageTemplate(id="main", frames=[frame], onPage=draw_page))
        self._bookmark_counter = 0

    def beforeDocument(self) -> None:
        self._bookmark_counter = 0
        super().beforeDocument()

    def afterFlowable(self, flowable: object) -> None:
        if not isinstance(flowable, Paragraph):
            return
        style_name = flowable.style.name
        if style_name not in {"SectionTitle", "ArticleTitle"}:
            return
        level = 0 if style_name == "SectionTitle" else 1
        self._bookmark_counter += 1
        key = f"bookmark-{self._bookmark_counter}"
        title = clean(flowable.getPlainText())
        self.canv.bookmarkPage(key)
        self.canv.addOutlineEntry(title, key, level=level, closed=level == 0)
        self.notify("TOCEntry", (level, title, self.page, key))


def draw_page(canvas, doc) -> None:  # type: ignore[no-untyped-def]
    if doc.page == 1:
        return
    canvas.saveState()
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.5)
    canvas.line(MARGIN_X, 14 * mm, PAGE_WIDTH - MARGIN_X, 14 * mm)
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(MARGIN_X, 9 * mm, "FYND ERP PRODUCT COOKBOOK")
    page_label = str(doc.page)
    canvas.drawRightString(PAGE_WIDTH - MARGIN_X, 9 * mm, page_label)
    canvas.restoreState()


def section_chip(label: str, styles: dict[str, ParagraphStyle]) -> Table:
    table = Table([[Paragraph(esc(label).upper(), styles["Chip"])]], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), ACCENT_SOFT),
                ("BOX", (0, 0), (-1, -1), 0.6, ACCENT),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    return table


def heading(text: str, styles: dict[str, ParagraphStyle]) -> Paragraph:
    return Paragraph(esc(text), styles["ContentHeading"])


def build_styles() -> dict[str, ParagraphStyle]:
    base = getSampleStyleSheet()
    return {
        "CoverKicker": ParagraphStyle(
            "CoverKicker",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=10,
            leading=12,
            textColor=ACCENT,
            spaceAfter=11,
            tracking=1.5,
        ),
        "CoverTitle": ParagraphStyle(
            "CoverTitle",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=38,
            leading=42,
            textColor=INK,
            alignment=TA_LEFT,
            spaceAfter=18,
        ),
        "CoverBody": ParagraphStyle(
            "CoverBody",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=14,
            leading=21,
            textColor=MUTED,
            spaceAfter=24,
        ),
        "CoverMeta": ParagraphStyle(
            "CoverMeta",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=9,
            leading=13,
            textColor=MUTED,
        ),
        "StatNumber": ParagraphStyle(
            "StatNumber",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=24,
            leading=26,
            textColor=INK,
            alignment=TA_CENTER,
        ),
        "StatLabel": ParagraphStyle(
            "StatLabel",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8,
            leading=10,
            textColor=MUTED,
            alignment=TA_CENTER,
        ),
        "TOCTitle": ParagraphStyle(
            "TOCTitle",
            parent=base["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=28,
            leading=32,
            textColor=INK,
            spaceAfter=8,
        ),
        "TOCIntro": ParagraphStyle(
            "TOCIntro",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=10,
            leading=15,
            textColor=MUTED,
            spaceAfter=16,
        ),
        "SectionTitle": ParagraphStyle(
            "SectionTitle",
            parent=base["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=28,
            leading=33,
            textColor=INK,
            spaceAfter=12,
        ),
        "SectionDescription": ParagraphStyle(
            "SectionDescription",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=13,
            leading=19,
            textColor=MUTED,
            spaceAfter=18,
        ),
        "ArticleKicker": ParagraphStyle(
            "ArticleKicker",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8,
            leading=10,
            textColor=ACCENT,
            spaceAfter=7,
            tracking=1,
        ),
        "ArticleTitle": ParagraphStyle(
            "ArticleTitle",
            parent=base["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=22,
            leading=25,
            textColor=INK,
            spaceAfter=8,
        ),
        "Summary": ParagraphStyle(
            "Summary",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=10.5,
            leading=14.5,
            textColor=MUTED,
            spaceAfter=12,
        ),
        "URL": ParagraphStyle(
            "URL",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=7,
            leading=9,
            textColor=colors.HexColor("#2457C5"),
            spaceBefore=2,
            spaceAfter=9,
        ),
        "Chip": ParagraphStyle(
            "Chip",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=7,
            leading=8,
            textColor=ACCENT,
        ),
        "ContentHeading": ParagraphStyle(
            "ContentHeading",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=11,
            leading=13.5,
            textColor=INK,
            spaceBefore=7,
            spaceAfter=4,
            keepWithNext=True,
        ),
        "Body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=8.7,
            leading=12.4,
            textColor=INK,
            spaceAfter=3,
        ),
        "FlowNumber": ParagraphStyle(
            "FlowNumber",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8,
            leading=10,
            textColor=colors.white,
            alignment=TA_CENTER,
        ),
        "FlowText": ParagraphStyle(
            "FlowText",
            parent=base["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=9,
            leading=12,
            textColor=INK,
        ),
    }


def build_flow_table(flow: list[str], styles: dict[str, ParagraphStyle]) -> Table:
    rows = []
    for index, item in enumerate(flow, start=1):
        rows.append(
            [
                Paragraph(f"{index:02d}", styles["FlowNumber"]),
                Paragraph(esc(item), styles["FlowText"]),
            ]
        )
    table = Table(rows, colWidths=[12 * mm, CONTENT_WIDTH - 12 * mm])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (0, -1), INK),
                ("BACKGROUND", (1, 0), (1, -1), SUBTLE),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("GRID", (0, 0), (-1, -1), 0.5, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    return table


def build_pdf() -> None:
    catalog = json.loads(SOURCE.read_text(encoding="utf-8"))
    sections = catalog["sections"]
    article_count = sum(len(section["pages"]) for section in sections)
    styles = build_styles()

    doc = CookbookDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        leftMargin=MARGIN_X,
        rightMargin=MARGIN_X,
        topMargin=MARGIN_TOP,
        bottomMargin=MARGIN_BOTTOM,
        title=clean(catalog["title"]),
        author="Fynd",
        subject="Public self-service Fynd ERP product cookbook",
        creator="Fynd ERP Cookbook",
    )

    story = []
    story.extend(
        [
            Spacer(1, 24 * mm),
            Paragraph("PRODUCT DOCUMENTATION", styles["CoverKicker"]),
            Paragraph("Fynd ERP<br/>Product Cookbook", styles["CoverTitle"]),
            HRFlowable(width="100%", thickness=3, color=ACCENT, spaceAfter=16),
            Paragraph(esc(catalog["description"]), styles["CoverBody"]),
            Table(
                [
                    [
                        Paragraph(str(article_count), styles["StatNumber"]),
                        Paragraph(str(len(sections)), styles["StatNumber"]),
                    ],
                    [
                        Paragraph("GUIDED ARTICLES", styles["StatLabel"]),
                        Paragraph("ORDERED STAGES", styles["StatLabel"]),
                    ],
                ],
                colWidths=[CONTENT_WIDTH / 2, CONTENT_WIDTH / 2],
                style=TableStyle(
                    [
                        ("BACKGROUND", (0, 0), (-1, -1), SUBTLE),
                        ("BOX", (0, 0), (-1, -1), 0.7, LINE),
                        ("INNERGRID", (0, 0), (-1, -1), 0.7, LINE),
                        ("TOPPADDING", (0, 0), (-1, 0), 14),
                        ("BOTTOMPADDING", (0, 1), (-1, 1), 14),
                    ]
                ),
            ),
            Spacer(1, 30 * mm),
            Paragraph(
                f"Updated {date.today().strftime('%d %B %Y')} | Searchable PDF | Clickable contents",
                styles["CoverMeta"],
            ),
            Paragraph(SITE_URL, styles["CoverMeta"]),
            PageBreak(),
            Paragraph("Contents", styles["TOCTitle"]),
            Paragraph(
                "Select any entry to jump directly to that article. PDF bookmarks provide the same navigation in compatible readers.",
                styles["TOCIntro"],
            ),
        ]
    )

    toc = TableOfContents()
    toc.levelStyles = [
        ParagraphStyle(
            "TOCSection",
            fontName="Helvetica-Bold",
            fontSize=10,
            leading=14,
            leftIndent=0,
            firstLineIndent=0,
            textColor=INK,
            spaceBefore=7,
        ),
        ParagraphStyle(
            "TOCArticle",
            fontName="Helvetica",
            fontSize=8.5,
            leading=12,
            leftIndent=12,
            firstLineIndent=0,
            textColor=MUTED,
        ),
    ]
    story.extend([toc, PageBreak()])

    for section_index, section in enumerate(sections, start=1):
        story.extend(
            [
                Spacer(1, 30 * mm),
                Paragraph(f"STAGE {section_index:02d}", styles["CoverKicker"]),
                Paragraph(esc(section["title"]), styles["SectionTitle"]),
                HRFlowable(width="22%", thickness=3, color=ACCENT, spaceAfter=14),
                Paragraph(esc(section["description"]), styles["SectionDescription"]),
                Paragraph(
                    f"{len(section['pages'])} guided article{'s' if len(section['pages']) != 1 else ''}",
                    styles["CoverMeta"],
                ),
                PageBreak(),
            ]
        )

        for page_index, page in enumerate(section["pages"]):
            href = f"{SITE_URL}/cookbooks/ERP/Forge/{section['slug']}/{page['slug']}"
            story.extend(
                [
                    Paragraph(esc(section["label"]).upper(), styles["ArticleKicker"]),
                    Paragraph(esc(page["title"]), styles["ArticleTitle"]),
                    Paragraph(esc(page["summary"]), styles["Summary"]),
                    section_chip(page["importance"], styles),
                    Paragraph(f'<link href="{href}">{href}</link>', styles["URL"]),
                ]
            )

            prerequisites = [clean(item) for item in page.get("prerequisites", []) if clean(item)]
            if prerequisites:
                story.extend(
                    [
                        heading("Before you begin", styles),
                        bullet_list(prerequisites, styles["Body"]),
                    ]
                )

            flow = [clean(item) for item in page.get("flow", []) if clean(item)]
            if flow:
                story.extend(
                    [
                        heading("How it works", styles),
                        build_flow_table(flow, styles),
                    ]
                )

            steps = [clean(item) for item in page.get("steps", []) if clean(item)]
            if steps:
                story.extend(
                    [
                        heading("What to do", styles),
                        ListFlowable(
                            [
                                ListItem(Paragraph(esc(item), styles["Body"]), leftIndent=0)
                                for item in steps
                            ],
                            bulletType="1",
                            start="1",
                            leftIndent=18,
                            bulletFontName="Helvetica-Bold",
                            bulletFontSize=8,
                            bulletColor=ACCENT,
                            spaceAfter=6,
                        ),
                    ]
                )

            rules = [clean(item) for item in page.get("rules", []) if clean(item)]
            if rules:
                story.extend(
                    [
                        heading("Rules to remember", styles),
                        bullet_list(rules, styles["Body"]),
                    ]
                )

            checklist = [clean(item) for item in page.get("checklist", []) if clean(item)]
            if checklist:
                story.extend(
                    [
                        heading("Ready when", styles),
                        bullet_list([f"[ ] {item}" for item in checklist], styles["Body"], bullet=""),
                    ]
                )

            is_last = (
                section_index == len(sections)
                and page_index == len(section["pages"]) - 1
            )
            if not is_last:
                story.append(PageBreak())

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc.multiBuild(story)


if __name__ == "__main__":
    build_pdf()
