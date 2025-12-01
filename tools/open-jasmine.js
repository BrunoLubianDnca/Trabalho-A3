// tools/open-jasmine.js
// Tenta localizar o dev server Vite em portas comuns e abre /jasmine/index.html no navegador (Windows `start`).
// Uso: node tools/open-jasmine.js

const http = require('http')
const { exec } = require('child_process')

const ports = [5173, 5174, 5175]
const path = '/jasmine/index.html'

function checkPort(port){
  return new Promise((resolve) => {
    const req = http.request({ method: 'GET', host: 'localhost', port, path, timeout: 1500 }, (res) => {
      resolve(res.statusCode >= 200 && res.statusCode < 500)
    })
    req.on('error', ()=>resolve(false))
    req.on('timeout', ()=>{ req.destroy(); resolve(false) })
    req.end()
  })
}

(async ()=>{
  for(const port of ports){
    process.stdout.write(`Checking http://localhost:${port}${path} ... `)
    const ok = await checkPort(port)
    if(ok){
      console.log('found')
      const url = `http://localhost:${port}${path}`
      // Windows: use start, Linux/Mac: try open
      const cmd = process.platform === 'win32' ? `start ${url}` : process.platform === 'darwin' ? `open ${url}` : `xdg-open ${url}`
      exec(cmd, (err)=>{
        if(err) console.error('Failed to open browser:', err.message)
        else console.log('Opened', url)
        process.exit(0)
      })
      return
    }
    console.log('no')
  }
  console.log('No dev server detected on ports', ports.join(',') + '.')
  console.log('Start the dev server with `npm run dev` and then re-run this script, or open the Jasmine URL manually.')
  process.exit(1)
})()
