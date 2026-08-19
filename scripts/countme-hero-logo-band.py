from PIL import Image
import numpy as np

im = Image.open(r"C:\Users\danny\Desktop\Projects\WEBSITE\SSC\COUNTME\web\public\photos\hero-office.jpg")
arr = np.array(im)
h, w = arr.shape[:2]
r = arr[:, :, 0].astype(int)
g = arr[:, :, 1].astype(int)
b = arr[:, :, 2].astype(int)

# COUNTME band
y0, y1 = int(h * 0.50), int(h * 0.64)
x0, x1 = int(w * 0.20), int(w * 0.80)
crop = arr[y0:y1, x0:x1]
lum = crop.mean(axis=2)

print("COUNTME band lum mean", lum.mean(), "std", lum.std())
# horizontal profile
hp = lum.mean(axis=0)
step = max(1, len(hp) // 40)
for i in range(0, len(hp), step):
    v = hp[i : i + step].mean()
    xp = (x0 + i) / w
    print(f"x={xp:.3f} {v:6.1f} {'#' * int(v / 4)}")

print("\n--- SSC plate band ---")
y0s, y1s = int(h * 0.18), int(h * 0.38)
crop2 = arr[y0s:y1s, x0:x1]
hp2 = crop2.mean(axis=(0, 2))
for i in range(0, len(hp2), step):
    v = hp2[i : i + step].mean()
    xp = (x0 + i) / w
    print(f"x={xp:.3f} {v:6.1f} {'#' * int(v / 5)}")
