import type { AssetYear } from '@/lib/assets-downloads';

export const ASSET_ACCESS_SESSION_KEY = 'topshop-assets-access-granted';
export const ASSET_ACCESS_YEARS_SESSION_KEY = 'topshop-assets-access-years';
export const ASSET_ACCESS_SCOPES_SESSION_KEY = 'topshop-assets-access-scopes';

export const ASSET_ACCESS_SCOPES = ['winner', 'finalist'] as const;
export type AssetAccessScope = (typeof ASSET_ACCESS_SCOPES)[number];

export type AssetAccessRule = {
  hash: string;
  years: AssetYear[];
  scopes: AssetAccessScope[];
};

export const ASSET_ACCESS_CODE_RULES: AssetAccessRule[] = [
  {
    hash: 'b0acbb1a580c450b52b22a8c06cc2cfd0f9a9a442996a5d5ad4bb1bbd3c490b9',
    years: [2026],
    scopes: ['finalist'],
  },
  {
    hash: 'fc5b03c4abc572bc821eafadb34b36adde39214d1d2667dd3146110e34ef98f7',
    years: [2025],
    scopes: ['finalist'],
  },
  {
    hash: 'd5698eaff7b7250fae7e2bfbf4771439d476599cb5b3cb8446517a4bf28edcd7',
    years: [2024],
    scopes: ['finalist'],
  },
  {
    hash: '80fc24a987827851aaa77fde45d91ea9c81abb412865001ed3041a8f916263aa',
    years: [2023],
    scopes: ['finalist'],
  },
  {
    hash: '076ba09f6c6818cad2b686554cc5ea6e3a27596c00a537e8d86a191d723244ed',
    years: [2022],
    scopes: ['finalist'],
  },
  {
    hash: 'b093660df585c4c01b3b91b282f39322e51033c4c6c5da1e6e29c61837ceff4c',
    years: [2021],
    scopes: ['finalist'],
  },
  {
    hash: '44a19b0d87b3a895bb6f3edd584116aeabdfd1f75844dff546f297ee0167ac87',
    years: [2020],
    scopes: ['finalist'],
  },
  {
    hash: '3485799415cbbff05080683fdef59f6156df45b0938673aa03debc26a4a2db57',
    years: [2019],
    scopes: ['finalist'],
  },
  {
    hash: '01bec749f49428cf0505663631217006f4e718a4413c48b9e62a1d6e7dddbefa',
    years: [2026],
    scopes: ['winner'],
  },
  {
    hash: 'f84c1d56b466296f5feb10ad530dccf7aa803867e1884102e7c3dad837bcc5d4',
    years: [2025],
    scopes: ['winner'],
  },
  {
    hash: 'b6877f34f8b5b8665de31c1696682bb233e00108f9c8b002a9f4009b661799f7',
    years: [2024],
    scopes: ['winner'],
  },
  {
    hash: 'c00a6b0b54a0a90f4fd9571005d25a33f7bfff8766fd2646895498a522961ccc',
    years: [2023],
    scopes: ['winner'],
  },
  {
    hash: '941bb0b751cffb782452688c8896b77da207ea2137cfdfd3668519aac7e221c6',
    years: [2022],
    scopes: ['winner'],
  },
  {
    hash: 'db7dc4d24dcff9c9a94cb28c2c890cd2f2376bcdca562fd6dc8a69a934311cbf',
    years: [2021],
    scopes: ['winner'],
  },
  {
    hash: '75197ee5c2068391eb66a59d3793e96d731238db491292ae6cf52ea499bed72c',
    years: [2020],
    scopes: ['winner'],
  },
  {
    hash: '9f877207a425a5dd5271ca70a277d665ff384ae6145f7bbb136c231bb35fab9a',
    years: [2019],
    scopes: ['winner'],
  },
];

export const ASSET_ACCESS_CODE_HASHES = ASSET_ACCESS_CODE_RULES.map(
  (rule) => rule.hash,
);

export const ASSET_ACCESS_HELP_TEXT =
  'Need access? Contact support for year-specific and role-specific codes. Keep only active hashes/rules in this file and remove expired ones.';

// Finalist-only codes:
// TS-ASSET-2026-V9Q2
// TS-ASSET-2025-L3M8
// TS-ASSET-2024-K7R1
// TS-ASSET-2023-P4D6
// TS-ASSET-2022-H8T5
// TS-ASSET-2021-N2C9
// TS-ASSET-2020-B6W3
// TS-ASSET-2019-F1X7

// Winner-only codes:
// TS-WINNER-2026-J6P4
// TS-WINNER-2025-Q8N2
// TS-WINNER-2024-M5T9
// TS-WINNER-2023-R3K7
// TS-WINNER-2022-L4D8
// TS-WINNER-2021-H7V6
// TS-WINNER-2020-C2X5
// TS-WINNER-2019-B9F1
