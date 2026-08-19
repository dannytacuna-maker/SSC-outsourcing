"""Build OnTrack favicon: orange arrow + white \"On\" on black."""

from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(r"C:\Users\danny\Desktop\Projects\SSC\ONTRACK")
SRC = ROOT / "LOGO" / "ontrack-logo-white-4000w.png"
PUBLIC = ROOT / "web" / "public"
APP = ROOT / "web" / "src" / "app"
LOGO = ROOT / "LOGO"

# Crop just the orange bracket + \"On\" (exclude \"Track\")
CROP = (40, 80, 1280, 1480)

with Image.open(SRC) as raw:
    full = ImageOps.exif_transpose(raw).convert("RGBA")

mark = full.crop(CROP)

# Drop near-black paper leftovers so only white type + orange mark remain
px = mark.load()
w, h = mark.size
for y in range(h):
    for x in range(w):
        r, g, b, a = px[x, y]
        if a < 8:
            px[x, y] = (0, 0, 0, 0)
            continue
        # Keep orange
        if r > 170 and g < 150 and b < 120:
            continue
        # Keep light type as pure white
        lum = 0.299 * r + 0.587 * g + 0.114 * b
        if lum > 150:
            cover = min(255, int((lum - 40) * 1.15))
            px[x, y] = (255, 255, 255, cover)
            continue
        px[x, y] = (0, 0, 0, 0)

bbox = mark.getbbox()
mark = mark.crop(bbox)

# Square black canvas with padding
side = max(mark.size) + int(max(mark.size) * 0.18)
canvas = Image.new("RGBA", (side, side), (10, 10, 10, 255))
ox = (side - mark.width) // 2
oy = (side - mark.height) // 2
canvas.paste(mark, (ox, oy), mark)

# Export sizes
sizes = {
    LOGO / "ontrack-favicon-on.png": 1024,
    PUBLIC / "favicon-32.png": 32,
    PUBLIC / "favicon-48.png": 48,
    PUBLIC / "apple-touch-icon.png": 180,
}

for path, size in sizes.items():
    out = canvas.resize((size, size), Image.Resampling.LANCZOS)
    out.save(path, format="PNG", optimize=True)
    print(path.name, f"{size}x{size}", path.stat().st_size // 1024, "kb")

# Multi-resolution ICO for Next app router + public
ico_sizes = [16, 32, 48]
ico_images = [
    canvas.resize((s, s), Image.Resampling.LANCZOS).convert("RGBA")
    for s in ico_sizes
]
for dest in (APP / "favicon.ico", PUBLIC / "favicon.ico"):
    ico_images[0].save(
        dest,
        format="ICO",
        sizes=[(s, s) for s in ico_sizes],
        append_images=ico_images[1:],
    )
    print(dest.name, dest.stat().st_size // 1024, "kb")

# Also store master square PNG used by SVG fallback reference
canvas.resize((512, 512), Image.Resampling.LANCZOS).save(
    PUBLIC / "favicon-512.png", format="PNG", optimize=True
)
print("done")
