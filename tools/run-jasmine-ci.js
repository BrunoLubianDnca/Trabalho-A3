// tools/run-jasmine-ci.js
// Runs the Jasmine browser runner headless via Playwright and exits non-zero on failures.

const { chromium } = require('playwright')

const portsToTry = [5173, 5174, 5175]

;(async ()=>{
  const browser = await chromium.launch()
  const page = await browser.newPage()
  for(const port of portsToTry){
    const url = `http://localhost:${port}/jasmine/index.html`
    try{
      console.log('Trying', url)
      await page.goto(url, { waitUntil: 'load', timeout: 8000 })
      // wait for the specs container to appear
      await page.waitForSelector('.jasmine-specs', { timeout: 8000 })
      // wait until at least one spec is rendered or a short timeout
      await page.waitForFunction(() => {
        return document.querySelectorAll('.jasmine-specs .jasmine-spec').length > 0
      }, { timeout: 10000 })

      // give Jasmine a moment to finish running
      await page.waitForTimeout(800)

      const failed = await page.evaluate(()=>{
        return document.querySelectorAll('.jasmine-specs .jasmine-failed').length
      })
      const total = await page.evaluate(()=>{
        return document.querySelectorAll('.jasmine-specs .jasmine-spec').length
      })

      console.log(`Jasmine specs found: ${total}, failures: ${failed}`)
      if(failed === 0){
        await browser.close()
        console.log('All Jasmine specs passed')
        process.exit(0)
      } else {
        // print failing spec titles
        const failures = await page.evaluate(()=>{
          return Array.from(document.querySelectorAll('.jasmine-specs .jasmine-failed')).map(el => el.innerText.trim())
        })
        console.error('Jasmine failures:\n', failures.join('\n'))
        await browser.close()
        process.exit(2)
      }
    }catch(e){
      console.log('Failed to load', url, e.message)
      // try next port
    }
  }
  await browser.close()
  console.error('No dev server responded on ports', portsToTry.join(','))
  process.exit(1)
})()
