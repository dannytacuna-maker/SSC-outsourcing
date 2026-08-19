"""Raster Countme favicons from the tally mark."""
from pathlib import Path

from PIL import Image, ImageDraw

out = Path(r"C:\Users\danny\Desktop\Projects\SSC\COUNTME\web\public")
out.mkdir(parents=True, exist_ok=True)

def mark(size: int) -> Image.Image:
    im = Image.new("RGBA", (size, size), (7, 9, 7, 255))
    draw = ImageDraw.Draw(im)
    pad = int(size * 0.08)
    radius = int(size * 0.22)
    draw.rounded_rectangle(
        [pad, pad, size - pad, size - pad],
        radius=radius,
        fill=(0, 128, 55, 255),
    )
    white = (244, 255, 248, 255)
    row_h = max(2, int(size * 0.055))
    y1 = int(size * 0.36)
    y2 = int(size * 0.62)
    gap = int(size * 0.045)
    w1 = int(size * 0.13)
    x = int(size * 0.25)
    for _ in range(3):
        draw.rounded_rectangle([x, y1, x + w1, y1 + row_h], radius=1, fill=white)
        x += w1 + gap
    w2 = int(size * 0.105)
    x = int(size * 0.25)
    for _ in range(4):
        draw.rounded_rectangle([x, y2, x + w2, y2 + row_h], radius=1, fill=white)
        x += w2 + gap
    return im

for name, size in [("favicon-32.png", 32), ("apple-touch-icon.png", 180), ("favicon-192.png", 192)]:
    mark(size).save(out / name, optimize=True)
    print("wrote", name)

# ICO from 32 + 48
mark(48).save(out / "favicon.ico", format="ICO", sizes=[(32, 32), (48, 48)])
print("wrote favicon.ico")
