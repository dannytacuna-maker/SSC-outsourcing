from pathlib import Path
import numpy as np
from PIL import Image, ImageFilter
from rembg import remove

SRC = Path(r"C:\Users\danny\Desktop\Projects\SSC\FOTOS-SSC\fotos")
OUT = Path(r"C:\Users\danny\Desktop\Projects\SSC\ONTRACK\web\public\photos")

# Selected six only. Cutouts for people scenes; soft transparent vignette for rooms.
SHOTS = [
    ("accounting", "IMG_4536.jpg", "cutout"),
    ("payroll", "IMG_4109-3.jpg", "cutout"),
    ("tax-cr", "IMG_4225.jpg", "cutout"),
    ("einvoice", "IMG_6008.jpg", "vignette"),
    ("freezone", "IMG_6052.jpg", "vignette"),
    ("audit", "IMG_6116.jpg", "cutout"),
]

OUT.mkdir(parents=True, exist_ok=True)


def soft_vignette(img: Image.Image) -> Image.Image:
    """High-res photo with edges fading to true transparency for dark portfolios."""
    img = img.convert("RGBA")
    w, h = img.size
    y, x = np.ogrid[:h, :w]
    cx, cy = (w - 1) / 2, (h - 1) / 2
    # Elliptical falloff — keeps the center sharp, dissolves into the page.
    rx, ry = w * 0.52, h * 0.52
    dist = np.sqrt(((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2)
    alpha = np.clip(1.15 - dist, 0, 1)
    alpha = (alpha**1.35 * 255).astype(np.uint8)
    arr = np.array(img)
    arr[:, :, 3] = np.minimum(arr[:, :, 3], alpha)
    out = Image.fromarray(arr, "RGBA")
    return out.filter(ImageFilter.GaussianBlur(radius=0.35))


def make_cutout(img: Image.Image) -> Image.Image:
    cut = remove(img.convert("RGB"))
    bbox = cut.getbbox()
    if bbox:
        cut = cut.crop(bbox)
    # If rembg left almost nothing, fall back to vignette of the original.
    arr = np.array(cut)
    if (arr[:, :, 3] > 20).mean() < 0.08:
        return soft_vignette(img)
    return cut


for service, filename, mode in SHOTS:
    src = SRC / filename
    out = OUT / f"service-{service}.png"
    print(f"{mode} {service} …", flush=True)

    with Image.open(src) as raw:
        raw = raw.convert("RGB")
        raw.thumbnail((2400, 2400), Image.Resampling.LANCZOS)
        result = make_cutout(raw) if mode == "cutout" else soft_vignette(raw)

    result.thumbnail((2200, 2200), Image.Resampling.LANCZOS)
    result.save(out, format="PNG", optimize=True)

    jpg = OUT / f"service-{service}.jpg"
    if jpg.exists():
        jpg.unlink()

    arr = np.array(result)
    opaque = round(100 * (arr[:, :, 3] > 20).mean(), 1)
    print(
        f"{service} {result.size[0]}x{result.size[1]} "
        f"{out.stat().st_size // 1024}kb opaque%{opaque}",
        flush=True,
    )
