//---------------------- INITIALIZE ---------------------------
addEventListener("DOMContentLoaded", () => {
//------- LOAD ASSETS ------
    const assets = {
        brick: new Image(),
        chippedBrick: new Image()
    };

    assets.brick.src = "assets/brickLight.png";
    assets.chippedBrick.src = "assets/brickLightChipped.png";

    const tileMap = {
        0: assets.brick,
        1: assets.chippedBrick
    };

//------- GET OBJECT -------
    const canvas = document.getElementById("ruinCanvas");
    const canvasContext = canvas.getContext("2d");

    canvas.width = 600;
    canvas.height = 200;

// Tile and grid dimensions
    const tileHeight = 30;
    const tileWidth = 30;
    const rows = Math.ceil(canvas.height / tileHeight);
    const cols = Math.ceil(canvas.width / tileWidth);

    let grid = Array.from({ length: rows }, () => Array(cols).fill(0));

    Promise.all([
        new Promise((resolve) => (assets.brick.onload = resolve)),
        new Promise((resolve) => (assets.chippedBrick.onload = resolve))
    ]).then(() => {
        console.log("Assets loaded.");
        createRuins(grid, rows, cols);
        drawRuins(grid, rows, cols, tileMap, tileWidth, tileHeight, canvasContext);
    });

});


//------------------------ GENERATE ------------------------

function createRuins(grid, rows, cols) {
    for (let y = 0; y < rows; y++) {

        for (let x = 0; x < cols; x++) {

            grid[y][x] = Math.random() < 0.8 ? 0 : 1; // 80% brick, 20% chipped
        }
    }
}


//------------------------ DRAW ---------------------------
function drawRuins(grid, rows, cols, tileMap, tileWidth, tileHeight, context) {
    for (let y = 0; y < rows; y++) {

        for (let x = 0; x < cols; x++) {

            const tileType = grid[y][x];

            if (tileMap.hasOwnProperty(tileType)) {

                context.drawImage(
                    tileMap[tileType], // Image source
                    x * tileWidth,     // X position on canvas
                    y * tileHeight,    // Y position on canvas
                    tileWidth,         // Tile width
                    tileHeight         // Tile height
                );
            }

            else 
                console.warn(`No image found for tile type: ${tileType}`);

        }
    }
}
