"""Full-frame service hero stills from the six selected photos.

These are used as faded backdrops behind the hero copy, so they stay full
frame (no cutouts) and keep maximum fidelity.
"""

from pathlib import Path
from PIL import Image, ImageOps

SRC = Path(r"C:\Users\danny\Desktop\Projects\SSC\FOTOS-SSC\fotos")
OUT = Path(r"C:\Users\danny\Desktop\Projects\SSC\ONTRACK\web\public\photos")

SHOTS = [
    ("accounting", "IMG_4536.jpg"),
    ("payroll", "IMG_4109-3.jpg"),
    ("tax-cr", "IMG_4225.jpg"),
    ("einvoice", "IMG_6008.jpg"),
    ("freezone", "IMG_6052.jpg"),
    ("audit", "IMG_6116.jpg"),
]

TARGET = (2800, 1700)

OUT.mkdir(parents=True, exist_ok=True)

for service, filename in SHOTS:
    src = SRC / filename
    out = OUT / f"service-{service}.jpg"

    with Image.open(src) as raw:
        img = ImageOps.exif_transpose(raw).convert("RGB")
        hero = ImageOps.fit(img, TARGET, method=Image.Resampling.LANCZOS, centering=(0.5, 0.45))
        hero.save(out, format="JPEG", quality=95, subsampling=0, optimize=True, progressive=True)

    # Drop the earlier cutout attempt.
    png = OUT / f"service-{service}.png"
    if png.exists():
        png.unlink()

    print(f"{service} {TARGET[0]}x{TARGET[1]} {out.stat().st_size // 1024}kb", flush=True)
