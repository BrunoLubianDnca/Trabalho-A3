// Diagnose client-side runtime errors by launching a browser and collecting console logs.
// Usage:
// 1) npm i -D playwright
// 2) npx playwright install --with-deps
// 3) node tools/diagnose.js

const { chromium } = require('playwright')

const portsToTry = [5173, 5174, 5175]
;(async ()=>{
  const browser = await chromium.launch()
  const page = await browser.newPage()
  const logs = []
  page.on('console', msg => {
    const text = `[${msg.type()}] ${msg.text()}`
    logs.push(text)
    console.log(text)
  })
  page.on('pageerror', err => {
    const text = `[pageerror] ${err.message}`
    logs.push(text)
    console.log(text)
  })
  for(const port of portsToTry){
    try{
      const url = `http://localhost:${port}/`
      console.log('Trying', url)
      await page.goto(url, { waitUntil: 'load', timeout: 5000 })
      console.log('Loaded', url)
      // wait a moment to collect console logs / runtime errors
      await page.waitForTimeout(1200)
      // capture HTML snapshot
      const html = await page.content()
      console.log(`--- HTML snapshot (first 800 chars) for ${url} ---`)
      console.log(html.slice(0,800))
      // if we have any console errors, stop and report
      if(logs.length){
        console.log('\nConsole logs captured (most recent first):')
        console.log(logs.slice(-30).join('\n'))
      } else {
        console.log('No console logs captured for', url)
      }
      await browser.close()
      return
    }catch(e){
      console.error('Failed to load', port, e.message)
    }
  }
  await browser.close()
  console.log('Tried ports', portsToTry.join(','), '- no server responded')
})()
