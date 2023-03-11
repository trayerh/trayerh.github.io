const wrapper = document.getElementById("tiles");
let boxWidth = 120;
let boxHeight = 120;

let columns = Math.floor(document.body.clientWidth / boxWidth),
    rows = Math.floor(document.body.clientHeight / boxHeight);

// console.log(rows)
// console.log(columns)

const createTile = index => {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    return tile;
}

const createTiles = quantity => {
    Array.from(Array(quantity)).map((tile, index) => {
        wrapper.appendChild(createTile(index));
    })
}

createTiles(columns * rows);

const createGrid = () => {
    wrapper.innerHTML = "";

    columns = Math.floor(document.body.clientWidth / boxWidth);
    row = Math.floor(document.body.clientHeight / boxHeight);

    wrapper.style.setProperty("--columns", columns);
    wrapper.style.setProperty("--rows", rows);
    

    createTiles(columns * rows);
    // console.log(rows)
    // console.log(columns)
}

createGrid();

window.onresize = () => createGrid();