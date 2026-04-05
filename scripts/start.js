#!/usr/bin/env node
/**
 * EchoClip Startup Script
 *
 * Starts the DTE Runtime Bridge and then launches the Paperclip server
 * with the deep-tree-echo company profile.
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const company = process.argv.find(a => a.startsWith('--company='))?.split('=')[1]
  ?? process.argv[process.argv.indexOf('--company') + 1]
  ?? 'deep-tree-echo';

console.log(`[EchoClip] Starting with company profile: ${company}`);

// 1. Start the DTE Runtime Bridge
const bridge = spawn('node', [
  join(ROOT, 'packages/adapters/dte-local/src/server/runtime-bridge.ts'),
], { stdio: 'inherit', env: { ...process.env, DTE_ADVENTURE_PATH: process.env.DTE_ADVENTURE_PATH ?? join(ROOT, '../echo-adventure') } });

bridge.on('error', (err) => {
  console.warn(`[EchoClip] DTE bridge failed to start: ${err.message}. Continuing without live DTE runtime.`);
});

// 2. Start the Paperclip server (if present)
const paperclipServer = join(ROOT, '../paperclip/packages/server/src/index.ts');
const server = spawn('node', [paperclipServer, '--company', company], {
  stdio: 'inherit',
  env: { ...process.env, ECHOCLIP_COMPANY: company },
});

server.on('error', (err) => {
  console.error(`[EchoClip] Paperclip server failed: ${err.message}`);
  process.exit(1);
});

process.on('SIGINT', () => {
  bridge.kill();
  server.kill();
  process.exit(0);
});
