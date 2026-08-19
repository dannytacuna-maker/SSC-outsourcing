from PIL import Image
import numpy as np

src = r"C:\Users\danny\Desktop\Projects\WEBSITE\SSC\COUNTME\web\public\logo-countme-source.png"
out_light = r"C:\Users\danny\Desktop\Projects\WEBSITE\SSC\COUNTME\web\public\logo-countme-on-light.png"
out_dark = r"C:\Users\danny\Desktop\Projects\WEBSITE\SSC\COUNTME\web\public\logo-countme.png"

im = Image.open(src).convert("RGBA")
arr = np.array(im)
r, g, b, a = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], arr[:, :, 3]

# Remove near-white background
white = (r > 240) & (g > 240) & (b > 240)
alpha = np.where(white, 0, 255).astype(np.uint8)

# Green ME letters (keep)
green = (g > 90) & (g > r + 12) & (g > b + 8) & (~white)

# Dark COUNT letters
dark = (~white) & (~green) & (r < 120)

light_arr = arr.copy()
light_arr[:, :, 3] = alpha

dark_arr = arr.copy()
dark_arr[dark, 0:3] = 255
dark_arr[:, :, 3] = alpha

# Trim transparent padding
def trim(img: Image.Image) -> Image.Image:
    bbox = img.getbbox()
    if not bbox:
        return img
    return img.crop(bbox)

light = trim(Image.fromarray(light_arr))
dark = trim(Image.fromarray(dark_arr))

light.save(out_light, optimize=True)
dark.save(out_dark, optimize=True)
print("light", light.size)
print("dark", dark.size)
