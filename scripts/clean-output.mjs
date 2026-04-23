#!/usr/bin/env node

import { existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const outDir = join(process.cwd(), 'out');

if (existsSync(outDir)) {
  rmSync(outDir, { recursive: true, force: true });
  console.log('[clean] Removed out directory.');
} else {
  console.log('[clean] out directory not found. Nothing to remove.');
}
