class TileMap {

    constructor() {

        const dimension = 100;

        this.tileXamount = Math.ceil( width / dimension)
        this.tileYamount = Math.ceil( height / dimension)

       
        this.tiles = new Map();

        for(let i = 0; i < this.tileXamount; i++) {
            for(let y = 0; y < this.tileXamount; y++) {
                this.tiles.set(`${i},${y}`, new Array())
            }
        } 

        //this.tiles = Array3D(this.tileXamount, this.tileYamount, 1)


    }

    

    deletePoint(point) {
        let TileX = Math.floor(point.pos.x / this.tileXamount)
        let TileY = Math.floor(point.pos.y / this.tileYamount)
        let tile = this.tiles.get(`${TileX},${TileY}`);
        //this.tiles.delete(`${TileX},${TileY}`);
        let idx = tile.indexOf(point)
        if (idx != -1) tile.splice(idx , 1);
    }



    updatePoint(point) {

        let lastTileX = Math.floor(point.lastPos.x / this.tileXamount)
        let lastTileY = Math.floor(point.lastPos.y / this.tileYamount)
        let newTileX  = Math.floor(point.pos.x / this.tileXamount)
        let newTileY  = Math.floor(point.pos.y / this.tileYamount)

        //console.log(`ltx = ${lastTileX} lty = ${lastTileY} ntx = ${newTileX}, nty = ${newTileY}`);

        if (lastTileX != newTileX || lastTileY != newTileY){
            //let idx = this.tiles[lastTileX][lastTileY].indexOf(point)
            let oldTile = this.tiles.get(`${lastTileX},${lastTileY}`);
            let idx = oldTile.indexOf(point)
            if (idx != -1) {
                tile.splice(idx , 1);
                this.tiles.set(`${TileX},${TileY}`, oldTile )

            }
            console.log(`${newTileX},${newTileY}`);
            let newTile = this.tiles.get(`${newTileX},${newTileY}`);
            newTile.push(point);
            this.tiles.set(`${newTileX},${newTileY}`, newTile);
        }

    } 

    getTile(point) {
        let newTileX = Math.floor(point.pos.x / this.tileXamount)
        let newTileY = Math.floor(point.pos.y / this.tileYamount)
        return this.tiles.get(`${newTileX},${newTileY}`);
        // return this.tiles[newTileX, newTileY]
    }

}

function Array2D(x, y){
    let arr = Array(x);
     for(let i = 0; i < y; i++){
      arr[i] = Array(y);
     }
     return arr;
   }
   
   function Array3D(x, y, z){
    let arr = Array2D(x, y);
         for(let i = 0; i < y; i++){
          for(let j = 0; j < z; j++){
           arr[i][j] = Array(z);
          }
         }
     return arr;
   }