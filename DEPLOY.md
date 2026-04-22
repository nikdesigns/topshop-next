# Deploy & Publish Checks

## One-command deploy package (root hosting)

Run:

```bash
npm run deploy:root
```

This command will:

1. Run lint checks.
2. Build static export (`out/`).
3. Run static internal link checks against generated HTML.
4. Create a timestamped ZIP in `dist/` for hosting upload.

## Deploying to subfolder/base path (optional)

For subfolder hosting (example: `/topshopawards`), run:

```bash
NEXT_PUBLIC_BASE_PATH=/topshopawards npm run deploy:static
```

## CI checks

GitHub Actions workflow:

- `.github/workflows/ci.yml`

It runs on PRs and pushes to `main`/`master`, and executes:

```bash
npm run ci:check
```
