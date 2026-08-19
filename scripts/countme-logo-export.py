"""Rebuild Countme logos from the cleanest brochure embeds."""
from pathlib import Path

import numpy as np
from PIL import Image

src = Path(r"C:\Users\danny\Desktop\Projects\SSC\COUNTME\_extract")
out = Path(r"C:\Users\danny\Desktop\Projects\SSC\COUNTME\web\public")
out.mkdir(parents=True, exist_ok=True)

# Dark wordmark already white COUNT + green ME on black
dark_src = Image.open(src / "embed-p2-x36.png").convert("RGBA")
d = np.array(dark_src).astype(np.float32)
r, g, b, a = d[:, :, 0], d[:, :, 1], d[:, :, 2], d[:, :, 3]
# Knock out near-black
black = (r < 28) & (g < 28) & (b < 28)
# Green letters
green = (g > r + 18) & (g > b + 8) & (g > 40)
# Everything else (COUNT + gold hairline) → white with coverage from luminance
lum = 0.299 * r + 0.587 * g + 0.114 * b
cover = np.clip(lum * (a / 255), 0, 255)
out_a = np.where(black, 0, np.where(green, a, cover))
out_rgb = np.stack(
    [
        np.where(green, r, 255),
        np.where(green, g, 255),
        np.where(green, b, 255),
    ],
    axis=-1,
)
dark = np.dstack([out_rgb, out_a]).astype(np.uint8)
dark_im = Image.fromarray(dark, "RGBA")
box = dark_im.getbbox()
dark_im = dark_im.crop(box)
# Sample ME
da = np.array(dark_im)
gm = (da[:, :, 1] > da[:, :, 0] + 18) & (da[:, :, 1] > da[:, :, 2] + 8) & (da[:, :, 3] > 200)
if gm.any():
    mean = da[gm][:, :3].mean(axis=0)
    print("dark ME", tuple(int(x) for x in mean), "#{0:02x}{1:02x}{2:02x}".format(*[int(x) for x in mean]))
dark_im.save(out / "logo-countme.png", optimize=True)
print("dark", dark_im.size)

# Light lockup from JPEG — paper knockout, keep charcoal + green
light_src = Image.open(src / "embed-p1-x19.jpeg").convert("RGBA")
la = np.array(light_src).astype(np.float32)
r, g, b = la[:, :, 0], la[:, :, 1], la[:, :, 2]
lum = 0.299 * r + 0.587 * g + 0.114 * b
green = (g > r + 18) & (g > b + 8) & (g > 50)
alpha = np.clip((248 - lum) * (255 / 55), 0, 255)
alpha = np.where(green, np.maximum(alpha, 235), alpha)
la[:, :, 3] = alpha
light_im = Image.fromarray(la.astype(np.uint8), "RGBA")
light_im = light_im.crop(light_im.getbbox())
# Wordmark only
wm = light_im.crop((0, 0, light_im.width, int(light_im.height * 0.56)))
wm = wm.crop(wm.getbbox())
wm.save(out / "logo-countme-on-light.png", optimize=True)
print("light wm", wm.size)
light_im.save(out / "logo-countme-lockup.png", optimize=True)
print("lockup", light_im.size)
