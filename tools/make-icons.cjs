// アプリのアイコン（icon-192.png・icon-512.png）を作る。生成りの紙に、家とプラグと朱の「！」。
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of [192, 512]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#f3efe4"/>
      <path d="M50 12 L88 44 L80 44 L80 86 L20 86 L20 44 L12 44 Z" fill="#fffdf7" stroke="#1d2a3f" stroke-width="3" stroke-linejoin="round"/>
      <rect x="32" y="50" width="22" height="26" rx="3" fill="#123554"/>
      <rect x="38" y="44" width="3.5" height="8" fill="#123554"/><rect x="44.5" y="44" width="3.5" height="8" fill="#123554"/>
      <path d="M43 76 C43 82 58 80 64 84" fill="none" stroke="#123554" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="66" cy="54" r="11" fill="#b23a24"/>
      <text x="66" y="60.5" font-size="17" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="900">!</text></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", `icon-${s}.png`), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();
