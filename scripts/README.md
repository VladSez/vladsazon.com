# Adding photos

The `/photos` page reads from `image-metadata.ts` in this folder. Images are hosted on [ImageKit](https://imagekit.io/dashboard/media-library); the repo keeps source files and metadata, not the production assets.

## Prerequisites

- [libwebp](https://developers.google.com/speed/webp/download) (`cwebp` CLI) — used by `convert-img-to-webp.sh`
- macOS `sips` — used by `generate-img-metadata.sh` to read dimensions (optional helper)
- Access to the ImageKit media library at `vladsazon-blog`

## File naming

Use lowercase, hyphen-separated names:

```
{city}-{month}-{year}-{descriptor}.png
```

Examples: `rome-dec-2025-pasta.png`, `warsaw-june-2021-park.png`

Supported source formats: JPG, JPEG, PNG, HEIC.

## Workflow

### 1. Add the source image

Place the original file in `scripts/blog_input/`:

```bash
cp ~/Downloads/my-photo.png scripts/blog_input/rome-dec-2025-pasta.png
```

### 2. Convert to WebP

From the `scripts/` directory:

```bash
cd scripts
./convert-img-to-webp.sh
```

This writes optimized `.webp` files to `scripts/blog_output/` (quality 82). The script prints before/after sizes for each file.

### 3. Upload to ImageKit

Upload the new `.webp` from `blog_output/` to the `vladsazon-blog` folder on ImageKit. The filename on ImageKit must match the local output filename (e.g. `rome-dec-2025-pasta.webp`).

### 4. Add metadata

Append a new entry to `PHOTOS_METADATA` in `scripts/image-metadata.ts`:

```ts
{
  src: `${BASE_URL}/rome-dec-2025-pasta.webp`,
  width: 960,
  height: 1280,
  alt: "Close-up of rigatoni pasta in creamy tomato sauce topped with grated cheese in a white bowl.",
  location: "Rome, Italy",
  date: "December, 2025",
},
```

| Field      | Description                                                                            |
| ---------- | -------------------------------------------------------------------------------------- |
| `src`      | ImageKit URL — use the `BASE_URL` constant already defined in the file                 |
| `width`    | Pixel width of the WebP (run `sips -g pixelWidth blog_output/your-file.webp` on macOS) |
| `height`   | Pixel height of the WebP                                                               |
| `alt`      | Descriptive text for screen readers                                                    |
| `location` | `"City, Country"` — shown in the lightbox caption                                      |
| `date`     | `"Month, Year"` — shown in the lightbox caption                                        |

Keep entries in chronological order (oldest first) to match the existing gallery.

### 5. Verify locally

```bash
pnpm dev
```

Open [http://localhost:3000/photos](http://localhost:3000/photos) and check the grid thumbnail and lightbox (caption, keyboard navigation).

## How it connects to the app

```
scripts/blog_input/     →  convert-img-to-webp.sh  →  scripts/blog_output/
scripts/blog_output/    →  upload to ImageKit
scripts/image-metadata.ts  →  app/photos/page.tsx  →  PhotoGallery
```

- `app/photos/page.tsx` imports `PHOTOS_METADATA` and passes it to `PhotoGallery`.
- `app/photos/components/photo-gallery.tsx` renders the grid and lightbox using `src`, `alt`, `width`, `height`, `location`, and `date`.

No changes under `app/photos/` are needed when adding a photo — only `image-metadata.ts`.

## Metadata helper

`generate-img-metadata.sh` finds uncommitted source images in `blog_input/`, reads dimensions from their matching `.webp` files in `blog_output/`, and skips images already present in `image-metadata.ts`. It appends complete entries without changing existing metadata and prompts for `alt`, `location`, and `date` so every addition follows the existing `PHOTOS_METADATA` format.

## Tips

- Re-running `convert-img-to-webp.sh` is safe; it overwrites matching files in `blog_output/`.
- `blog_input/` and `blog_output/` are for local processing — commit them only if you want source assets in the repo.
- Write `alt` text as a plain description of what is in the photo, not where it was taken (location and date have their own fields).
