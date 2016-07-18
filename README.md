# three.js-box-viewer

view a 3D shape made out of boxes.

complimentary to the package [stl-to-boxes](https://git.autodesk.com/t-merrn/stl-to-boxes)

## setup

    npm install

## usage

to watch index.js, and serve the static assets

    npm run dev

now you can open localhost:9999 in your browser, and edit index.js

## using your own mesh

use [stl-to-boxes](https://git.autodesk.com/t-merrn/stl-to-boxes) to produce some json, and save it to a .json file.

for example,

    python stltoboxes.py my-cool-mesh.sl 100 100 100 5 10 3 > boxified-mesh.json

now, you could `require('/path/to/boxified-mesh.json')` in `index.js`, setting the boxWidth, boxHeight and boxDepth parameters to 5, 10, 3, respectively.

## license

BSD
