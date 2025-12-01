// tools/run-jasmine-node.cjs
// Runs the jasmine specs in Node by exposing a global `window` and loading the rules file.

// Ensure we have a global window object so jasmine/regras.js attaches to it
global.window = global

// Load regras.js so it populates window.regras
require('../jasmine/regras.js')

// Create a Jasmine runner
const Jasmine = require('jasmine')
const jasmine = new Jasmine()

// Configure to load the spec file from jasmine/ folder
jasmine.loadConfig({
  spec_dir: 'jasmine',
  spec_files: ['regras.spec.js'],
  helpers: [],
  random: false,
  seed: null
})

// Suppress default Jasmine reporter output to keep logs neat but still show failures
// Use the default reporter so we can see test output in the terminal

// Run and forward results via exit code
jasmine.execute()
  .then(() => {
    // jasmine.execute does not resolve with failures; rely on process exit
  })
  .catch(err => {
    console.error('Jasmine runner error:', err)
    process.exit(2)
  })
