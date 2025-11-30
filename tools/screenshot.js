// Optional: Playwright script to capture screenshots automatically
// Usage:
// 1) npm i -D playwright
// 2) npx playwright install --with-deps
// 3) node tools/screenshot.js

const { chromium } = require('playwright')
const fs = require('fs')
const path = require('path')

;(async ()=>{
  const out = path.resolve(process.cwd(),'screenshots')
  if(!fs.existsSync(out)) fs.mkdirSync(out)
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })

  const urls = [
    { url: 'http://localhost:5173/', name: 'login-desktop' },
    { url: 'http://localhost:5173/dashboard', name: 'dashboard-desktop' },
    { url: 'http://localhost:5173/class/1', name: 'class-desktop' },
    { url: 'http://localhost:5173/jasmine/index.html', name: 'jasmine-desktop' }
  ]

  for(const u of urls){
    try{
      await page.goto(u.url, { waitUntil: 'networkidle' })
      await page.screenshot({ path: path.join(out, `${u.name}.png`), fullPage: true })
      console.log('Saved', u.name)
    }catch(e){
      console.error('Failed to capture', u.url, e.message)
    }
  }

  // mobile emulation
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await page.screenshot({ path: path.join(out, `login-mobile.png`), fullPage: true })
  await browser.close()
  console.log('Done. Screenshots saved to', out)
})()
