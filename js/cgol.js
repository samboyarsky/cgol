class Board{
    constructor(x, y) {
        this.width = x || 10
        this.height = y || 10
        this.grid = this.buildGrid()
    }

    buildGrid() {
        var out = []
        for(var x = 0; x < this.width; x++){
            out[out.length] = []
            for(var y = 0; y < this.height; y++){
                out[x][y] = false
            }
        }
        return out
    }

    neighborCount(x,y){
        var count = 0
        if(x > 0            &&                      this.grid[x-1][y])   { count++ }
        if(x > 0            && y > 0             && this.grid[x-1][y-1]) { count++ }
        if(x > 0            && y < this.height-1 && this.grid[x-1][y+1]) { count++ }
        if(x < this.width-1 &&                      this.grid[x+1][y])   { count++ }
        if(x < this.width-1 && y > 0             && this.grid[x+1][y-1]) { count++ }
        if(x < this.width-1 && y < this.height-1 && this.grid[x+1][y+1]) { count++ }
        if(                    y > 0             && this.grid[x]  [y-1]) { count++ }
        if(                    y < this.height-1 && this.grid[x]  [y+1]) { count++ }
        return count
    }

    update(){
        var newGrid = this.buildGrid()
        for(var x = 0; x < this.width; x++){
            for(var y = 0; y < this.height; y++){
                // Any live cell with fewer than two live neighbors dies, as if caused by under-population.
                // Any live cell with two or three live neighbors lives on to the next generation.
                // Any live cell with more than three live neighbors dies, as if by overcrowding.
                // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
                var nc = this.neighborCount(x,y)
                var $curr = $('#cell_' + x + '_' + y)
                if( (this.grid[x][y] && nc == 2) || nc ==3 ){
                    newGrid[x][y] = true
                    $curr.addClass('live')
                }
                else{
                    newGrid[x][y] = false
                    $curr.removeClass('live')
                }
            }
        }
        this.grid = newGrid
    }

    print(){
        for(var x = 0; x < this.width; x++){
            var line = ''
            for(var y = 0; y < this.height; y++){
                line += this.grid[x][y] + ' '
            }
            console.log(line + '\n')
        }
    }
}

function clickCell(){
    var x = this.getAttribute('x')
    var y = this.getAttribute('y')
    if(b.grid[x][y]){
         $(this).removeClass('live')
    }
    else{
         $(this).addClass('live')
    }
    b.grid[x][y] = !b.grid[x][y]
}

function buildTable(){
    var $table = $('#game_of_life_grid')
    // $table.empty()
    for(var x = 0; x < b.width; x++){
        var $tr = $('<tr>')
        for(var y = 0; y < b.height; y++){
            var $td = $('<td>')
            $td.attr({x:x,y:y,id:'cell_' + x + '_' + y})
            $td.click(clickCell);
            $tr.append($td)
        }
        $table.append($tr)
    }
}

function doUpdate(){
    b.update()
}

b = new Board(50, 50)
buildTable()

var interval_id = null
$('#goButton').click(function (){
    if(!interval_id){
        interval_id = setInterval(doUpdate, 500)
    }
})
$('#stopButton').click(function (){
    interval_id = clearTimeout(interval_id)
})
