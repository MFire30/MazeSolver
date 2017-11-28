var matrixGrid1 = [[]];

function initializeGrid() {
	const count = document.getElementById("size").value;
	
	for(var counterY = 0; counterY < count; counterY++){
		matrixGrid1.push([]);
		
		for(var counterX = 0; counterX < count; counterX++){
			var cell = newCell();
			cell.x = counterX;
			cell.y = counterY;
			
			matrixGrid1[counterY].push(cell);
			setCellDiv(cell, count);
			//console.log(matrixGrid1[counterY][counterX]);
		}
	}
	
	console.log(matrixGrid1);
	
}

function setCellDiv(cell, count) {
	var size = (100 / count);
	var newId = cell.x + "-" + cell.y;
	
	$("<div class='square' id='" + newId + "' style='width:" + size + "%; height:" + size + "%'></div>")
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
	
	// console.log(cell);
	return cell;
}