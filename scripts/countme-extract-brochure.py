"""Render Countme brochure pages and sample dominant colors."""
from pathlib import Path

import fitz  # PyMuPDF

root = Path(r"C:\Users\danny\Desktop\Projects\SSC")
pdf = root / "COUNTME" / "Original COUNTME.pdf"
out = root / "COUNTME" / "_extract"
out.mkdir(parents=True, exist_ok=True)

doc = fitz.open(pdf)
print("pages", doc.page_count)
for i, page in enumerate(doc):
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
    dest = out / f"page-{i + 1}.png"
    pix.save(dest)
    print("wrote", dest.name, pix.width, pix.height)

    # Sample a grid of colors, skip near-white paper
    counts = {}
    step = 8
    for y in range(0, pix.height, step):
        for x in range(0, pix.width, step):
            r, g, b = pix.pixel(x, y)
            if r > 245 and g > 245 and b > 245:
                continue
            if r < 18 and g < 18 and b < 18:
                key = (0, 0, 0)
            else:
                key = (r // 16 * 16, g // 16 * 16, b // 16 * 16)
            counts[key] = counts.get(key, 0) + 1
    top = sorted(counts.items(), key=lambda kv: -kv[1])[:12]
    print("  colors", [(f"#{r:02x}{g:02x}{b:02x}", n) for (r, g, b), n in top])
