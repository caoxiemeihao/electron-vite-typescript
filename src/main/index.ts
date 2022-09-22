import { app, BrowserWindow } from 'electron'
import path from 'path'

// The built directory structure
//
// ├─┬ dist
// │ ├─┬ main
// │ │ └── index.js
// │ ├─┬ preload
// │ │ └── index.js
// │ ├─┬ renderer
// │ │ └── index.html

process.env.ROOT = path.join(__dirname, '../..')
process.env.DIST = path.join(process.env.ROOT, 'dist')
process.env.VITE_PUBLIC = app.isPackaged
  ? path.join(process.env.ROOT, 'dist/renderer')
  : path.join(process.env.ROOT, 'src/renderer/public')
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow
const preload = path.join(process.env.DIST, 'preload/index.js')

function bootstrap() {
  win = new BrowserWindow({
    webPreferences: {
      preload,
    },
  })

  if (app.isPackaged) {
    win.loadFile(path.join(process.env.VITE_PUBLIC, 'index.html'))
  } else {
    win.loadURL(process.env.VITE_SERVER_URL)
  }
}

app.whenReady().then(bootstrap)
