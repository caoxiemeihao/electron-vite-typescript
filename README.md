# electron-vite-typescript
Electron-Main(tsc) + Preload-Script(tsc) + Electron+Renderer(Vite)

## Screenshort

<img src="https://raw.githubusercontent.com/caoxiemeihao/electron-vite-typescript/main/src/renderer/public/screenshort.png" width="470">

## Run Setup

```sh
# clone the project
git clone https://github.com/caoxiemeihao/electron-vite-typescript.git

# enter the project directory
cd electron-vite-typescript

# install dependency
npm install

# develop
npm run dev
```

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
