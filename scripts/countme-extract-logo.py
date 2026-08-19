"""Extract Countme wordmark and embedded images from the brochure."""
from pathlib import Path

import pymupdf

root = Path(r"C:\Users\danny\Desktop\Projects\SSC")
pdf = root / "COUNTME" / "Original COUNTME.pdf"
out = root / "COUNTME" / "_extract"
out.mkdir(parents=True, exist_ok=True)

doc = pymupdf.open(pdf)

# Dump embedded images
for i, page in enumerate(doc):
    for img in page.get_images(full=True):
        xref = img[0]
        info = doc.extract_image(xref)
        ext = info["ext"]
        dest = out / f"embed-p{i + 1}-x{xref}.{ext}"
        dest.write_bytes(info["image"])
        print("embed", dest.name, info["width"], info["height"], info.get("cs"))

# Crop logos from page 4 (cleanest lockups)
page = doc[3]
pix = page.get_pixmap(matrix=pymupdf.Matrix(3, 3), alpha=False)
full = out / "page-4-hi.png"
pix.save(full)
print("hires page 4", pix.width, pix.height)

# Sample a few pixels around likely logo positions to refine crop later
for name, x, y in [("tl", 80, 60), ("br", 1400, 1100), ("tr", 1400, 60)]:
    r, g, b = pix.pixel(min(x * 3 // 2, pix.width - 1), min(y * 3 // 2, pix.height - 1))
    print(name, f"#{r:02x}{g:02x}{b:02x}")
