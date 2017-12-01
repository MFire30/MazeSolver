function generateMaze(maze){
	const initialCoord = pickRandomStart(maze);
	let path = [];
	
	// Setting the random start point to a path
	setPath(initialCoord.x, initialCoord.y);
	path.push(matrixGrid1[initialCoord.x][initialCoord.y]);
	console.log('initial', matrixGrid1[initialCoord.x][initialCoord.y]);
	
	// Getting starting point walls
	let remainingWalls = getFrontierWalls(maze[initialCoord.x][initialCoord.y], maze);
	console.log("remainingWalls");
	console.log(remainingWalls);
	
	// NOTE: Using a 'sleep' function for giving time for jQuery to work better.
	while(remainingWalls.length > 0){
		
		// Picking one from the wall frontier
		const fCell = randomCell(remainingWalls);
		//setChoosen(fCell.x, fCell.y);
		sleep(10);
		console.log('fCell', fCell);
		
		// Get frontier paths for the choosen cell
		const fCellFrontierPaths = getFrontierPaths(maze[fCell.x][fCell.y], maze);
		console.log('fCellFrontierPaths', fCellFrontierPaths);
		
		// Get a random frontier path cell
		const randomPathCell = randomCell(fCellFrontierPaths);
		//setChoosen(randomPathCell.x, randomPathCell.y);
		sleep(15);
		console.log('randomPathCell', randomPathCell);
		
		// Set between cell to path
		const coordBetween = calculateBetween(randomPathCell, fCell);
		console.log('coordBetween', coordBetween);
		setPath(coordBetween.x, coordBetween.y);
		sleep(15);
		
		// Computing frontier wall cells for the fCell
		const newFrontierWalls = getFrontierWalls(maze[fCell.x][fCell.y], maze);
		console.log('newFrontierWalls', newFrontierWalls);
		
		// Remove from remainingWalls
		findAndRemove(fCell, remainingWalls);
		setPath(fCell.x, fCell.y);
		remainingWalls = remainingWalls.concat(newFrontierWalls);
		sleep(20);
		
		path.push(fCell);
		console.log('concatFinal', remainingWalls);
	}
	
	console.log('Available path', path);
}