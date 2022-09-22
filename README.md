# electron-vite-typescript
Electron-Main(tsc) + Preload-Script(tsc) + Electron+Renderer(Vite)

## Screenshort

<img src="https://raw.githubusercontent.com/caoxiemeihao/electron-vite-typescript/main/src/renderer/public/screenshort.png" width="470">

## Directory

```tree
├─┬ dist
│ ├─┬ main
│ │ └── index.js
│ ├─┬ preload
│ │ └── index.js
│ └─┬ renderer
│   └── index.html
│
├─┬ src
│ ├─┬ main
│ │ └── index.ts    entry of Electron-Main
│ ├─┬ preload
│ │ └── index.ts    entry of Preload-Scripts
│ └─┬ renderer
│   └── index.html  entry of Electron-Renderer
```
