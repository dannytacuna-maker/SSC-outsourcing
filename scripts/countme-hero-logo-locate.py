from PIL import Image
import numpy as np

im = Image.open(r"C:\Users\danny\Desktop\Projects\WEBSITE\SSC\COUNTME\web\public\photos\hero-office.jpg")
arr = np.array(im)
h, w = arr.shape[:2]
r = arr[:, :, 0].astype(int)
g = arr[:, :, 1].astype(int)
b = arr[:, :, 2].astype(int)

x0, x1 = int(w * 0.28), int(w * 0.72)
y0, y1 = int(h * 0.45), int(h * 0.65)
region = np.zeros((h, w), dtype=bool)
region[y0:y1, x0:x1] = True
mask = (
    region
    & (g > 110)
    & (g > r + 18)
    & (g > b)
    & (r > 70)
    & (b > 60)
    & (b < 160)
)
ys, xs = np.where(mask)
print("pixels", len(xs))
print("x pct", round(xs.min() / w, 3), round(xs.max() / w, 3), "mean", round(xs.mean() / w, 3))
print("y pct", round(ys.min() / h, 3), round(ys.max() / h, 3), "mean", round(ys.mean() / h, 3))

bins = np.linspace(0.28, 0.72, 23)
hist, edges = np.histogram(xs / w, bins=bins)
for i, c in enumerate(hist):
    print(f"{edges[i]:.3f}-{edges[i+1]:.3f} {c:5d} {'#' * int(c / 80)}")

print("y hist")
ybins = np.linspace(0.45, 0.65, 21)
hist, edges = np.histogram(ys / h, bins=ybins)
for i, c in enumerate(hist):
    print(f"{edges[i]:.3f}-{edges[i+1]:.3f} {c:5d} {'#' * int(c / 50)}")
