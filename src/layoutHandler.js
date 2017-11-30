var matrixGrid1 = [[]];

function changeCellWall(id, className){
	const coord = extractCoordenates(id);

	if(className === "square"){
		$("#" + id).className = "square_wall";
		$("#" + id).removeClass('square');
		$("#" + id).addClass('square_wall');

		matrixGrid1[coord.y][coord.x].isWall = true;
	} else {
		$("#" + id).removeClass('square_wall');
		$("#" + id).addClass('square');

		matrixGrid1[coord.y][coord.x].isWall = false;
	}
}

function extractCoordenates(id){
	const idRegex = /(\d+)-(\d+)/ig;
	const matches = idRegex.exec(id);

	return {y: matches[2], x: matches[1]};
}

function resetGrid(){
	matrixGrid1 = [[]];
	$("#grid1").empty();
}

function initializeGrid() {
	const count = document.getElementById("size").value;
	const isEmpty = $("#grid1").children().length === 0;

	if(isEmpty){
		for(var counterX = 0; counterX < count; counterX++){
			matrixGrid1.push([]);

			for(var counterY = 0; counterY < count; counterY++){
				var cell = newCell();
				cell.x = counterX;
				cell.y = counterY;

				matrixGrid1[counterX].push(cell);
				setCellDiv(cell, count);
			}
		}
	} else {
		$("#" + id).className = "square_wall";
		$("#" + id).removeClass('square');
		console.error("The grid must be empty!");
	}
}

function solveD(cellOrigin, cellDestine, time){
	var solution = false;
	cellOrigin.visited = true;
	if(cellOrigin.x == cellDestine.x && cellOrigin.y == cellDestine.y){
		console.log("Cheguei!");
		solution = true;
	}
	else{
		for(var i=-1; i<=1; i+=2){
			if(isBound(cellOrigin.x+i) && !solution){
				var neighbor = matrixGrid1[cellOrigin.x+i][cellOrigin.y];
				if(neighbor.visited == false && neighbor.isWall == false){
					solution = solveD(neighbor, cellDestine, time+1);
				}
			}
			if(isBound(cellOrigin.y+i) && !solution){
				var neighbor = matrixGrid1[cellOrigin.x][cellOrigin.y+i];
				if(neighbor.visited == false && neighbor.isWall == false){
					solution = solution || solveD(neighbor, cellDestine, time+1);
				}
			}
		}
	}
	if(solution){
		paintSolution(cellOrigin, time);
	}
	return solution;
}

function paintSolution(cell, time){
	setTimeout(function(){
		$("#" + cell.y + "-" + cell.x).className = "square_idle";
		$("#" + cell.y + "-" + cell.x).removeClass('square');
		$("#" + cell.y + "-" + cell.x).addClass('square_idle');
		cell.idle = true;
		console.log(cell.x + " " + cell.y);
	}, 100*time);
}

function isBound(number){
	return number >= 0 && number < 10;
}

function test(){
	solveD(matrixGrid1[1][1], matrixGrid1[9][9], 1);
}

function setCellDiv(cell, count) {
	const size = (100 / count);
	const newId = cell.x + "-" + cell.y;
	const divOnclickFunc = "onclick='changeCellWall(this.id, this.className)'";

	$("<div class='square'" +  divOnclickFunc + "id='" + newId + "' style='width:" + size + "%; height:" + size + "%'></div>")
		.appendTo("#grid1");
}

function newCell(){
	var cell = {
		visited: false,
		isWall: false,
		idle: false,
		x: 0,
		y: 0
	};

	return cell;
}
