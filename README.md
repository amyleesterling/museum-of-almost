# The Museum of Almost

Ideas that didn't quite work out.

A tiny interactive museum of impossible objects:

- **A compass for getting lost.** It points toward something you haven't tried.
- **An umbrella for clouds.** Sometimes the sky needs its rain back.
- **One spare minute.** No appointments. No useful purpose required.

Admission is free. You may touch the exhibits.

## Visit locally

Open **index.html** in a modern browser. Everything is included in that one file: no account, packages, server, or network connection required.

For a local development server, run this from the repository folder:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Then visit <http://127.0.0.1:8000>.

## Make something almost

The illustrations and interactions live in `src/museum.html`. The standalone page's colors, buttons, metadata, and document structure live in `src/shell.html`.

After editing either file, rebuild the checked-in page:

```sh
python scripts/build.py
```

The build uses Python 3.10 or newer and its standard library. Visitors only need a browser. Any static web host can serve the generated `index.html`.

The museum follows the visitor's light or dark appearance, supports keyboard navigation, announces exhibit changes to screen readers, and skips motion when reduced motion is requested. Illustrations are drawn with Canvas; there are no external fonts, images, analytics, or libraries.

## How this happened

Amy gave Codex a prompt to make whatever it wanted. It made a small museum. Amy gave the museum a home.
