class TileMap {

  constructor() {

    this.dimension = 100;

    this.tileXamount = Math.ceil(width / this.dimension)
    this.tileYamount = Math.ceil(height / this.dimension)


    this.tiles = new Map();

    // for(let i = 0; i < this.tileXamount; i++) {
    //     for(let y = 0; y < this.tileXamount; y++) {
    //         this.tiles.set(`${i},${y}`, new Array())
    //     }
    // } 

    //this.tiles = Array3D(this.tileXamount, this.tileYamount, 1)


  }

  deletePoint(point) {
    if (point != undefined) {
      let TileX = Math.floor(point.pos.x / this.dimension)
      let TileY = Math.floor(point.pos.y / this.dimension)
      let tile = this.tiles.get(`${TileX},${TileY}`);
      //this.tiles.delete(`${TileX},${TileY}`);
      if(tile != undefined) {
        let idx = tile.indexOf(point)
        if (idx != -1) tile.splice(idx, 1);
      }
      
    }

  }

  updatePoint(point) {

    let lastTileX = Math.floor(point.lastPos.x / this.dimension)
    let lastTileY = Math.floor(point.lastPos.y / this.dimension)
    let newTileX = Math.floor(point.pos.x / this.dimension)
    let newTileY = Math.floor(point.pos.y / this.dimension)

    //console.log(`ltx = ${lastTileX} lty = ${lastTileY} ntx = ${newTileX}, nty = ${newTileY}`);

    if (lastTileX != newTileX || lastTileY != newTileY) {
      //let idx = this.tiles[lastTileX][lastTileY].indexOf(point)
      let oldTile = this.tiles.get(`${lastTileX},${lastTileY}`);
      if (oldTile != undefined) {
        let idx = oldTile.indexOf(point)
        if (idx != -1) {
          oldTile.splice(idx, 1);
          this.tiles.set(`${lastTileX},${lastTileY}`, oldTile)
        }
      }

      //console.log(`${newTileX},${newTileY}`);
      let newTile = this.tiles.get(`${newTileX},${newTileY}`) || [];
      newTile.push(point);
      this.tiles.set(`${newTileX},${newTileY}`, newTile);
    }

  }

  getTile(point) {
    let newTileX = Math.floor(point.pos.x / this.dimension)
    let newTileY = Math.floor(point.pos.y / this.dimension)
    let tile = this.tiles.get(`${newTileX},${newTileY}`) || [];
    if (tile == undefined) {
      console.log(point.pos.x, point.pos.y, newTileY, newTileY);
    }
    return tile
    // return this.tiles[newTileX, newTileY]
  }

}

function Array2D(x, y) {
  let arr = Array(x);
  for (let i = 0; i < y; i++) {
    arr[i] = Array(y);
  }
  return arr;
}

function Array3D(x, y, z) {
  let arr = Array2D(x, y);
  for (let i = 0; i < y; i++) {
    for (let j = 0; j < z; j++) {
      arr[i][j] = Array(z);
    }
  }
  return arr;
}