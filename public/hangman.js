var list, word, wordArr, badGuessesLeft, correctGuesses, allGuesses, gameOver;
var loaded = false; 

function getList(){
	$.get("/words", function (data){
	//for options, use: $.get("/words?count=10", function (data){
		list = data;
		hasLoaded();
	 }, 'JSON');
}

function resetVariables(){
	badGuessesLeft = 6;
	correctGuesses = 0;
	allGuesses = {};
	gameOver = false;	
}

function cleanUpBoard(){
	$("#guesses-left").text(badGuessesLeft+'/6');
	$('#banner').text('');
	$('#word').empty();
	$('#bad-guesses').empty();
}

function chooseWord(list){
	word = list[Math.floor(Math.random() * list.length)];
}

function buildWordArray(word){
	var letters = word.split('');
	wordArr = letters.map(function(x){
		return x.toUpperCase();
	});
}


function populateBoard(wordArr){
	for (var i = 0; i < wordArr.length; i++){
		var div = document.createElement("div");
		div.innerText = '_';
		div.setAttribute('class', 'letter');
		div.setAttribute('id', i);
		$('#word').append(div);
	}	
}

function logGuess(e){
	if (!gameOver){	
		if (e.which > 64 && e.which < 123){
			var guess = e.key.toUpperCase();
			if (!allGuesses[guess]){
				allGuesses[guess] = guess;
				evaluateGuess(guess);				
			}			
		}
	}
}

function evaluateGuess(guess){
	var goodGuess = false;	
	for (var i = 0; i < wordArr.length; i++){
		if (guess == wordArr[i]){
			$("#"+i).text(guess);
			goodGuess = true;
			correctGuesses++;
			if (correctGuesses == wordArr.length){
				youWin();
			}
		} 
	}
	if (goodGuess == false){
		logBadGuess(guess);
	}
}

function logBadGuess(guess){
	var div = document.createElement("div");
	div.innerText = guess;
	div.setAttribute('class', 'letter');
	$('#bad-guesses').append(div);
	badGuessesLeft--;
	$("#guesses-left").text(badGuessesLeft+'/6');
	if (badGuessesLeft == 0){
			youLose();
	}
}

function youWin(){
	gameOver = true;
	$('#banner').text('You win! 😃');
}

function youLose(){
	gameOver = true
	$('#banner').text('You lose! 😭');
	reveal();
}

function reveal(){
	for (var i = 0; i < wordArr.length; i++){
		$("#"+i).text(wordArr[i]); 
	}
}

function setListeners(){
	addEventListener('keypress', logGuess);
	$('#new').on('click', newGame);
}

function hasLoaded(){
	newGame();
	$('.container').toggle();		
}

function newGame(){
	resetVariables();
	cleanUpBoard();
	chooseWord(list);
	buildWordArray(word);
	populateBoard(wordArr);
}

$(function(){
	setListeners();
	getList();
});



