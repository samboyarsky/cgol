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

    randomSeed(density){
        for(var x = 0; x < this.width; x++){
            for(var y = 0; y < this.height; y++){
                if(Math.random() < density){
                    this.grid[x][y] = true
                    $('#cell_' + x + '_' + y).addClass('live')
                }
            }
        }
    }

}

function clickCell(){
    let x = this.getAttribute('x')
    let y = this.getAttribute('y')

    $(this).toggleClass('live')
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

var clock = null
var b
function newGame(){

    b = new Board($('#rows').val(), $('#cols').val())
    buildTable()


    $('#goButton').click(function (){
        if(!clock){
            clock = setInterval(doUpdate, $('#clockSpeed').val())
        }
    })
    $('#stopButton').click(function (){
        clock = clearTimeout(clock)
    })
    $("#randomizeButton").click(function(){ b.randomSeed($("#density")) })
    $('#setup').css('display', 'none')
    $('#game').css('display', 'block')
}

$('#startButton').click(newGame)


