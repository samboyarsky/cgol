class Board{
    constructor(x, y) {
        this.width = x || 10;
        this.height = y || 10;
        this.grid = this.buildGrid();
    }
    buildGrid() {
        //var out = new Array(this.width);
        var out = []
        for(var x = 0; x < this.width; x++){
            out[out.length] = []
            for(var y = 0; y < this.height; y++){
                out[x][y] = false;
            }
        }
        return out;
    }
    neighborCount(x,y){
        var count = 0;
        if(x > 0            &&                      this.grid[x-1][y])   { count++; }
        if(x > 0            && y > 0             && this.grid[x-1][y-1]) { count++; }
        if(x > 0            && y < this.height-1 && this.grid[x-1][y+1]) { count++; }
        if(x < this.width-1 &&                      this.grid[x+1][y])   { count++; }
        if(x < this.width-1 && y > 0             && this.grid[x+1][y-1]) { count++; }
        if(x < this.width-1 && y < this.height-1 && this.grid[x+1][y+1]) { count++; }
        if(                    y > 0             && this.grid[x]  [y-1]) { count++; }
        if(                    y < this.height-1 && this.grid[x]  [y+1]) { count++; }
        return count
    }
    update(){
        var newGrid = this.buildGrid();
        for(var x = 0; x < this.width; x++){
            for(var y = 0; y < this.height; y++){
                // Any live cell with fewer than two live neighbors dies, as if caused by under-population.
                // Any live cell with two or three live neighbors lives on to the next generation.
                // Any live cell with more than three live neighbors dies, as if by overcrowding.
                // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
                var nc = this.neighborCount(x,y);
                if(this.grid[x][y] && (nc == 2 || nc ==3)){
                    newGrid[x][y] = true;
                }
                else if (!this.grid[x][y] && nc == 3){
                    newGrid[x][y] = true;
                }
                else{
                    newGrid[x][y] = false;
                }
            }
        }
        this.grid = newGrid;
    }
    setLive(x, y){
        this.grid[x][y] = true;
    }
    print(){
        for(var x = 0; x < this.width; x++){
            var line = "";
            for(var y = 0; y < this.height; y++){
                line += this.grid[x][y] + " ";
            }
            console.log(line + "\n");
        }
    }
}

function clickCell(who){
    //console.log(who.data.x)
    //console.log(who.data.elem);
    console.log(this.getAttribute('x'))
    if(b.grid[who.data.x][who.data.y]){
        b.grid[who.data.x][who.data.y] = false;
        who.data.elem.removeClass('live');
    }
    else{
        b.grid[who.data.x][who.data.y] = true;
        who.data.elem.addClass('live');
    }

}

function buildTable(){
    var $table = $('#game_of_life_grid');
    $table.empty();
    for(var x = 0; x < b.width; x++){
        var $tr = $('<tr>');
        $table.append($tr)
        // $tr.appendTo($table)
        for(var y = 0; y < b.height; y++){

            var $td = $('<td>');
            // $td.attr("x", x);
            // $td.attr("y", y);
            // $td.attr("id", 'cell' + x + '_' + y);
            $td.click({ x:x, y:y, elem:$td }, clickCell);
            // $td.click({}, clickCell);
            if(b.grid[x][y]) { $td.addClass('live'); }
            $table.append($td)
        }
    }
}

function doUpdate(){
    b.update();
    //buildTable();
}

function toad(){
    b.setLive(3,3);
    b.setLive(4,3);
    b.setLive(5,3);
    b.setLive(4,4);
    b.setLive(5,4);
    b.setLive(6,4);

}
function blinker(){
    b.setLive(4,4);
    b.setLive(4,5);
    b.setLive(4,6);
}

b = new Board(50,50);
//blinker();
//toad();
buildTable();
