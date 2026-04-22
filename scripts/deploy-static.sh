#!/usr/bin/env bash
set -euo pipefail

effective_base_path="${NEXT_PUBLIC_BASE_PATH:-}"
if [[ -z "${effective_base_path}" || "${effective_base_path}" == "/" ]]; then
  echo "==> Target: site root (/)"
else
  echo "==> Target: subfolder (${effective_base_path})"
fi

echo "==> Running pre-publish checks"
npm run lint
npm run build
npm run check:links

echo "==> Creating deploy archive"
mkdir -p dist
timestamp="$(date +%Y%m%d-%H%M%S)"
archive_name="topshop-static-${timestamp}.zip"
archive_path="dist/${archive_name}"

(cd out && zip -qr "../${archive_path}" .)

echo "==> Deploy package ready: ${archive_path}"
echo "Upload the ZIP contents to your hosting target."
