function pickRandomStart(maze){
	const randomX = randomCoordNumber(maze);
	const randomY = randomCoordNumber(maze);
	
	return {x: randomX, y: randomY};
}

function getFrontierWalls(cell, maze){
	const mazeSize = maze.length;
	
	// A frontier cell is a cell with a distance 2 from the current cell
	// and it's a wall
	const validNorth = (cell.y >= 2 && cell.y <= mazeSize) && maze[cell.x][cell.y - 2];
	const validSouth = (cell.y >= 0 && cell.y < mazeSize - 2) && maze[cell.x][cell.y + 2];
	const validWest = (cell.x >=2 && cell.x <= mazeSize) && maze[cell.x - 2][cell.y];
	const validEast = (cell.x >= 0 && cell.x < mazeSize - 2) && maze[cell.x + 2][cell.y];
	
	let walls = [];
	
	// For north cell
	if(validNorth){
		const north = maze[cell.x][cell.y - 2];
		
		if(north.isWall){
			walls.push(north);
			setVisited(north.x, north.y);
		}
	}
	
	// For south cell
	if(validSouth){
		const south = maze[cell.x][cell.y + 2];
		
		if(south.isWall){
			walls.push(south);
			setVisited(south.x, south.y);
		}
	}
	
	// For west cell
	if(validWest){
		const west = maze[cell.x - 2][cell.y];
		
		if(west.isWall){
			walls.push(west);
			setVisited(west.x, west.y);
		}
	}
	
	// For east cell
	if(validEast){
		const east = maze[cell.x + 2][cell.y];
		
		if(east.isWall){
			walls.push(east);
			setVisited(east.x, east.y);
		}
	}
	
	return walls;
}

function getFrontierPaths(cell, maze){
	const mazeSize = maze.length;
	
	// A frontier cell is a cell with a distance 2 from the current cell
	// and it's a wall
	const validNorth = (cell.y >= 2 && cell.y <= mazeSize) && maze[cell.x][cell.y - 2];
	const validSouth = (cell.y >= 0 && cell.y < mazeSize - 2) && maze[cell.x][cell.y + 2];
	const validWest = (cell.x >=2 && cell.x <= mazeSize) && maze[cell.x - 2][cell.y];
	const validEast = (cell.x >= 0 && cell.x < mazeSize - 2) && maze[cell.x + 2][cell.y];
	
	let walls = [];
	
	// For north cell
	if(validNorth){
		const north = maze[cell.x][cell.y - 2];
		
		if(!north.isWall){
			walls.push(north);
		}
	}
	
	// For south cell
	if(validSouth){
		const south = maze[cell.x][cell.y + 2];
		
		if(!south.isWall){
			walls.push(south);
		}
	}
	
	// For west cell
	if(validWest){
		const west = maze[cell.x - 2][cell.y];
		
		if(!west.isWall){
			walls.push(west);
		}
	}
	
	// For east cell
	if(validEast){
		const east = maze[cell.x + 2][cell.y];
		
		if(!east.isWall){
			walls.push(east);
		}
	}
	
	return walls;
}

function calculateBetween(c1, c2){
	const xDiff = c2.x - c1.x;
	const yDiff = c2.y - c1.y;
	let coord = {x: 0, y: 0};
	
	// Difference for X
	if(xDiff === 0){
		coord.x = c1.x;
	} else if (xDiff === 2){
		coord.x = c1.x + 1;
	} else if (xDiff === -2){
		coord.x = c1.x - 1;
	}
	
	// Difference for Y
	if(yDiff === 0){
		coord.y = c1.y;
	} else if (yDiff === 2){
		coord.y = c1.y + 1;
	} else if (yDiff === -2){
		coord.y = c1.y - 1;
	}
	
	return coord;
}

function chooseAndRemoveRandomCell(list){
	const index = Math.floor(Math.random() * list.length);
	const cell = list[index];
	list.splice(index, 1);

	return cell;
}

function randomCell(list){
	return list[Math.floor(Math.random() * list.length)];
}

function findAndRemove(item, list){
	const index = list.indexOf(item);
	list.splice(index, 1);
}

function randomCoordNumber(maze){
	const size = maze.length;
	return Math.abs(Math.floor(((Math.random() * size) - 1)));
}