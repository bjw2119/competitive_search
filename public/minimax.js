(function(){

	/*
	 *

	The function "makeMove" is already written for you.
	It will choose moves intelligently once minimax,
	which it invokes, evaluates different board-states
	intelligently.  It is the only function invoked when
	you play against the computer after starting up
	the server.

	However, even though this function is finished
	you should read it to understand what is going on
	within it, and so that you can understand the
	API for the state object.

	Input: A state, representing the Connect 4 board.

    Output: Returns an integer indicating the column
    where the piece will be dropped.

	This is the only function called when
	you are playing against your agent.

	*/

	var makeMove = function(state){


		var playerMoving = state.nextMovePlayer;
		//To get the side whose turn it (is either
		//an 'x' or an 'o'), check state.nextMovePlayer

		var allLegalMoves = state.legalMoves();
		// state.legalMoves returns an array of integer values,
		// which indicate the locations (0 through 6)
		// where one can currently legally drop
		// a connect four piece.  (Obviously, if a column
		// is full, it will not return the index of that
		// column.)

		var newState = state.move(allLegalMoves[0]);
		// To get a successor state following a move,
		// just call state.move(someMove).  This returns
		// the board state after that move has been made.
		// It autmatically switches the player whose
		// move it is, and so on and so forth
		//
		// Note that state is immutable; invoking state.move
		// does NOT change the original state, but
		// returns a new one.

		var depth = 3
		return max(allLegalMoves, function(move){
			var potentialState = state.move(move)
			return minimax(potentialState, depth, playerMoving)
			//return minimaxAlphaBetaWrapper(potentialState, depth, playerMoving)
		});
		// The guts of the make-move function.
		// The function max(arr, func) returns the element
		// from the array which gives the highest value
		// according to the function passed into it.
		//
		// So this function looks
	}

	/*Max: Ancillary function.*/
	var max = function(arr, func){
		return arr.reduce(function(tuple, cur, index){
			var value = func(cur)
			return (tuple.value >= value) ? tuple : {element: cur, value: value};
		},{element: arr[0], value: func(arr[0])}).element;
	}

	/*
	The function "heuristic" is one you must (mostly)
	write

	Input: state, maximizingPlayer.  The state will be
	a state object.  The maximizingPlayer will be either
	an 'x' or an 'o', and is the player whose advantage
	is signified by positive numbers.

	Output: A number evaluating how good the state is from
	the perspective of the player who is maximizing.

	A useful method on state here would be state.numLines.
	This function takes an integer and a player
	like this "state.numLines(2,'x')" and returns the
	number of lines of that length which that player
	has.  That is, it returns the number of contiguous linear
	pieces of that length that that player has.

	This is useful because, generally speaking, it is better
	to have lots of lines that fewer lines, and much better
	to have longer lines than shorter lines.

	You'll need to pass the tests defined in minimax_specs.js.
	*/
	var heuristic = function(state, maximizingPlayer){

		var minimizingPlayer = (maximizingPlayer == 'x') ? 'o' : 'x';
		//This is how you can retrieve the minimizing player.

				var twoWeight = 1;
				var threeWeight = 4;
				// var fourWeight = 100;



        var linesOfLengthTwoForMax = state.numLines(2, maximizingPlayer);
        if (state.numLines(4, maximizingPlayer)>0) return 100;
        var linesOfLengthThreeForMax = state.numLines(3, maximizingPlayer);
        var linesofLengthTwoForMin = state.numLines(2, minimizingPlayer);
        if(state.numLines(4, minimizingPlayer)>0) return -100;
        var linesOfLengthThreeForMin = state.numLines(3, minimizingPlayer);

        var minScore = (threeWeight*linesOfLengthThreeForMin)+(twoWeight*linesofLengthTwoForMin);
        var maxScore = (threeWeight*linesOfLengthThreeForMax)+(twoWeight*linesOfLengthTwoForMax);

        return maxScore-minScore;
        //An example

        //Your code here.  Don't return random, obviously.
		// return Math.random()
	}



	/*
    The function "minimax" is one you must write.

    Input: state, depth, maximizingPlayer.  The state is
    an instance of a state object.  The depth is an integer
    greater than zero; when it is zero, the minimax function
    should return the value of the heuristic function.

    Output: Returns a number evaluating the state, just
    like heuristic does.

	You'll need to use state.nextStates(), which returns
	a list of possible successor states to the state passed in
	as an argument.

	You'll also probably need to use state.nextMovePlayer,
	which returns whether the next moving player is 'x' or 'o',
	to see if you are maximizing or minimizing.

	That should be about all the API from State that you need to
	know, I believe.
	*/
	var minimax = function(state, depth, maximizingPlayer){
		var minimizingPlayer = (state.maximizingPlayer == 'x') ? 'o' : 'x';
		var possibleStates = state.nextStates();
		var currentPlayer = state.nextMovePlayer;
		var possibleValues = [];

		if(possibleStates.length ===0 || depth===0) return heuristic(state, maximizingPlayer);

		if(depth>0)	{
			for(var i =0; i<possibleStates.length; i++){
				possibleValues.push(minimax(possibleStates[i], depth-1, maximizingPlayer))
			}
			if(maximizingPlayer =='x'){
				// var q = possibleValues[0];
				// if(possibleValues.every(function(val){return value==q})) return possibleValues[Math.floor(possibleValues.length/2)];
				// return Math.max.apply(null,possibleValues);}
			else {
				return Math.min.apply(null, possibleValues);}
		}

	}



	/* minimaxAlphaBetaWrapper is a pre-written function, but it will not work
	   unless you fill in minimaxAB within it.

	   It is called with the same values with which minimax itself is called.*/
	var minimaxAlphaBetaWrapper = function(state, depth, maximizingPlayer){

	    /*
	    You will need to write minimaxAB for the extra credit.
	    Input: state and depth are as they are before.  (Maximizing player
	    is closed over from the parent function.)

	    Alpha is the BEST value currently guaranteed to the maximizing
	    player, if they play well, no matter what the minimizing player
	    does; this is why it is a very low number to start with.

	    Beta is the BEST value currently guaranteed to the minimizing
	    player, if they play well, no matter what the maximizing player
	    does; this is why it is a very high value to start with.
		*/
		var minimaxAB = function(state, depth, alpha, beta){
		}

		return minimaxAB(state, depth, -100000,100000)
	}




	//Ignore everything here.
	//Ignore, ignore, ignore.
	if(typeof window === 'undefined'){
		module.exports = {
			makeMove: makeMove,
			minimax: minimax,
			heuristic: heuristic
		}
	}else {
		set('makeMove', makeMove)
	}

})()
