var matrixGrid1 = [[]];

function changeCellWall(id, className){
	const coord = extractCoordenates(id);
	
	if(className === "square"){
		$("#" + id).removeClass('square');
		$("#" + id).addClass('square_wall');
		
		matrixGrid1[coord.y][coord.x].isWall = true;
	} else {
		$("#" + id).removeClass('square_wall');
		$("#" + id).addClass('square');
		
		matrixGrid1[coord.x][coord.y].isWall = false;
	}	
}

function extractCoordenates(id){
	const idRegex = /(\d+)-(\d+)/ig;
	const matches = idRegex.exec(id);
	
	return {y: matches[2], x: matches[1]};
}

function setVisited(x, y){
	const divPath = "#" + x + "-" + y;
	$(divPath).removeClass();
	$(divPath).addClass('square_visited');
	matrixGrid1[x][y].visited = true;
}

function setPath(x, y){
	const divPath = "#" + x + "-" + y;
	$(divPath).removeClass();
	$(divPath).addClass('square');
	matrixGrid1[x][y].isWall = false;
	matrixGrid1[x][y].isPath = true;
}

function setChoosen(x, y){
	const divPath = "#" + x + "-" + y;
	$(divPath).removeClass();
	$(divPath).addClass('square_choosen');
}

function resetGrid(){
	matrixGrid1 = [[]];
	$("#grid1").empty();
}

function initializeGrid() {
	const count = document.getElementById("size").value;
	
	if(count > 100){
		const hardWork = confirm("The grid generation for over 100 is way too slow. Are you sure?");
		
		if(!hardWork){
			return;
		}
	}
	
	const isEmpty = $("#grid1").children().length === 0;
	
	if(isEmpty){
		for(var counterX = 0; counterX < count; counterX++){
			if (counterX > 0){ matrixGrid1.push([])};
			
			for(var counterY = 0; counterY < count; counterY++){
				var cell = newCell();
				cell.x = counterX;
				cell.y = counterY;
				
				matrixGrid1[counterX].push(cell);
				setCellDiv(cell, count);
			}
		}	
	} else {
		resetGrid();
		initializeGrid();
	}
}

function setCellDiv(cell, count) {
	const size = (100 / count);
	const newId = cell.x + "-" + cell.y;
	const divOnclickFunc = "onclick='changeCellWall(this.id, this.className)'";
	
	$("<div class='square_wall'" +  divOnclickFunc + "id='" + newId + "' style='width:" + size + "%; height:" + size + "%'></div>")
		.appendTo("#grid1");
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function newCell(){
	var cell = {
		visited: false,
		isWall: true,
		idle: false,
		isPath: false,
		x: 0,
		y: 0
	};
	
	return cell;
}