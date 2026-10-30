// Captures a real screenshot of every live project into public/screens/<slug>.jpg
// Run once:  npx playwright install chromium  &&  npm run screenshots
import { chromium } from "playwright";
import { readFileSync, mkdirSync } from "node:fs";

const projects = JSON.parse(readFileSync(new URL("../src/data/projects.json", import.meta.url), "utf8"));
mkdirSync("public/screens", { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
for (const p of projects) {
  try {
    await page.goto(p.url, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `public/screens/${p.slug}.jpg`, type: "jpeg", quality: 80 });
    console.log("ok  ", p.slug);
  } catch (e) { console.log("FAIL", p.slug, e.message); }
}
await browser.close();
