import type { AssetYear } from '@/lib/assets-downloads';

export const ASSET_ACCESS_SESSION_KEY = 'topshop-assets-access-granted';
export const ASSET_ACCESS_YEARS_SESSION_KEY = 'topshop-assets-access-years';

export type AssetAccessRule = {
  hash: string;
  years: AssetYear[];
};

export const ASSET_ACCESS_CODE_RULES: AssetAccessRule[] = [
  {
    hash: 'b0acbb1a580c450b52b22a8c06cc2cfd0f9a9a442996a5d5ad4bb1bbd3c490b9',
    years: [2026],
  },
  {
    hash: 'fc5b03c4abc572bc821eafadb34b36adde39214d1d2667dd3146110e34ef98f7',
    years: [2025],
  },
  {
    hash: 'd5698eaff7b7250fae7e2bfbf4771439d476599cb5b3cb8446517a4bf28edcd7',
    years: [2024],
  },
  {
    hash: '80fc24a987827851aaa77fde45d91ea9c81abb412865001ed3041a8f916263aa',
    years: [2023],
  },
  {
    hash: '076ba09f6c6818cad2b686554cc5ea6e3a27596c00a537e8d86a191d723244ed',
    years: [2022],
  },
  {
    hash: 'b093660df585c4c01b3b91b282f39322e51033c4c6c5da1e6e29c61837ceff4c',
    years: [2021],
  },
  {
    hash: '44a19b0d87b3a895bb6f3edd584116aeabdfd1f75844dff546f297ee0167ac87',
    years: [2020],
  },
  {
    hash: '3485799415cbbff05080683fdef59f6156df45b0938673aa03debc26a4a2db57',
    years: [2019],
  },
];

export const ASSET_ACCESS_CODE_HASHES = ASSET_ACCESS_CODE_RULES.map(
  (rule) => rule.hash,
);

export const ASSET_ACCESS_HELP_TEXT =
  'Need access? Contact support for a year-specific code. Keep only active hashes/rules in this file and remove expired ones.';

// TS-ASSET-2026-V9Q2
// TS-ASSET-2025-L3M8
// TS-ASSET-2024-K7R1
// TS-ASSET-2023-P4D6
// TS-ASSET-2022-H8T5
// TS-ASSET-2021-N2C9
// TS-ASSET-2020-B6W3
// TS-ASSET-2019-F1X7
