"""Build the standalone museum with only the Python standard library."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
fragment = (ROOT / "src" / "museum.html").read_text(encoding="utf-8")
shell = (ROOT / "src" / "shell.html").read_text(encoding="utf-8")
marker = "<!-- MUSEUM -->"
if shell.count(marker) != 1:
    raise ValueError("The page shell must contain exactly one museum marker.")

# Keep the original exhibit fragment editable while giving the standalone page
# a conventional heading hierarchy.
fragment = fragment.replace('<h2 class="museum-heading">The Museum of Almost</h2>',
                            '<h1 class="museum-heading">The Museum of Almost</h1>')
fragment = fragment.replace(".museum-caption h3", ".museum-caption h2")
fragment = fragment.replace("<h3 data-name>", "<h2 data-name>").replace("</h3>", "</h2>")
destination = ROOT / "index.html"
destination.write_text(shell.replace(marker, fragment), encoding="utf-8", newline="\n")
print(f"Built {destination.name} ({destination.stat().st_size:,} bytes)")
