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
		console.error("The grid must be empty!");
	}
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