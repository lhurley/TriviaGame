$('#begin').click(function()
{   
    $("#gamePanel").toggle();  
    $('#gameJumbo').toggle(); 
    $('#arrow_hover').toggle();
});

$(document).ready(function(){
	//Game object
var triviaGame = {

//Array t hold question and answers
	qAndA:[{
		number: "1",
		question: "how many floppy disks would it take to equal 1 Gigabyte of storage?",
			ans1: "1000",
			ans2: "711",
			ans3: "34",
			ans4: "269",
			},
	   {
	   	number: "2",
	   	question: "how many words does the average 6 year old know?",
			ans1: "700",
			ans2: "10,400",
			ans3: "2,600",
			ans4: "12,000",
			},
		{
		number: "3",
	   	question: "when was cheez whiz invented?",
			ans1: "1944",
			ans2: "1970",
			ans3: "1993",
			ans4: "1952",
			},
	   {
	   	number: "4",
	   	question: "what is the size of the biggest snowflake ever recorded?",
			ans1: "15 inches",
			ans2: "1 foot",
			ans3: "4 inches",
			ans4: "1 centimeter",
			},
	   {
	   	number: "5",
	   	question: "how many time zones does Russia have?",
			ans1: "8",
			ans2: "11",
			ans3: "2",
			ans4: "4",
			},
		{
		number: "6",
	   	question: "how many albums has Tupac sold since he died?",
			ans1: "75,000,000",
			ans2: "100,000",
			ans3: "5,000,000",
			ans4: "500,500",
			},
		{
		number: "7",
	   	question: "how much time do NFL players actually play?",
			ans1: "5 minutes",
			ans2: "1 hour",
			ans3: "42 minutes",
			ans4: "11 minutes",
			},
		{
		number: "8",
		question: "how much does a baby blue whale weigh at birth?",
		    ans1: "450 pounds",
		    ans2: "1,000 pounds",
		    ans3: "200 tons",
		    ans4: "10 tons",
			}],

	correctAnswers: ['711', '2,600', '1952', '15 inches', '11', '75,000,000', '11 minutes', '200 tons'],//array to hold correct answers
	userAnswers: [],

	numberCount: 0,
	questionCount: 0,
	beginInt: 0,

	timer: 20,
	btnClicked: false,
	numberCorrect: 0,
	numberIncorrect: 0,
	numberUnAnswered: 0,

	beginGame: function(){	
		if(triviaGame.questionCount == triviaGame.qAndA.length){

			triviaGame.gameFinished();
			triviaGame.timer = 20;

		} else {

			if(triviaGame.questionCount >= 1){
				clearInterval(triviaGame.displayNextInt);
				$('#gameStart').show();
				$('#divAnswers').hide();
				triviaGame.timer = 20;
				$('#time').html(triviaGame.timer); //??
			}

			$('span.numbers').html(triviaGame.qAndA[triviaGame.numberCount].number);
			$('p.questions').html(triviaGame.qAndA[triviaGame.questionCount].question);
			$('button.answer1').html(triviaGame.qAndA[triviaGame.questionCount].ans1);
			$('button.answer2').html(triviaGame.qAndA[triviaGame.questionCount].ans2);
			$('button.answer3').html(triviaGame.qAndA[triviaGame.questionCount].ans3);
			$('button.answer4').html(triviaGame.qAndA[triviaGame.questionCount].ans4);

			triviaGame.beginInt = setInterval(triviaGame.countDown, 1000);

		}

	},
//Cound down timer 
	countDown: function(){

		triviaGame.timer--;
		$('#time').html(triviaGame.timer);

		if(triviaGame.timer == 0){

			triviaGame.oufOfTime();

		} else if(triviaGame.btnClicked == true && triviaGame.correctAnswers[triviaGame.questionCount] == triviaGame.userAnswers[triviaGame.questionCount]){
		
			triviaGame.answersCorrect();

		} else if(triviaGame.btnClicked == true && triviaGame.correctAnswers[triviaGame.questionCount] != triviaGame.userAnswers[triviaGame.questionCount]){

			triviaGame.answersWrong();
			
		}

	},
//If option by player is correct
	answersCorrect: function(){

		if(newImg != ""){

			$('#pic').empty();
		}

		$('#divAnswers').show();
		$('#gameStart').hide();
		$('#outOfTime').hide();
		$('#wrongMsg').hide();	
		$('#correctMsg').show();
		$('#pCorrectAnswer').hide();	
		$('#answers').css('display', 'block');
		$('#timeRemaining').css('display', 'block');
		$('#elapsedTime').html(triviaGame.timer);

		clearInterval(triviaGame.beginInt);

		var newImg = $("<img>").attr('src', triviaGame.qAndA[triviaGame.questionCount].imgUrl).attr('width', '130px','height', '130px').attr('id', 'correctMovieImage');

		$('#pic').append(newImg);		
		triviaGame.btnClicked = false;

		triviaGame.displayNextInt = setInterval(triviaGame.beginGame, 3000);
		triviaGame.numberCorrect++;
		triviaGame.questionCount++;
		triviaGame.numberCount++;
	},
//if options by user is incorrect
	answersWrong: function(){

		if(newImg != ""){

			$('#pic').empty();
		}

		$('#divAnswers').show();
		$('#gameStart').hide();
		$('#outOfTime').hide();
		$('#wrongMsg').show();
		$('#correctMsg').hide();
		$('#pCorrectAnswer').show();
		$('#pCorrectAnswer span').html(triviaGame.correctAnswers[triviaGame.questionCount]);
		$('#timeRemaining').css('display', 'block');
		$('#elapsedTime').html(triviaGame.timer);
		clearInterval(triviaGame.beginInt);

		var newImg = $("<img>").attr('src', triviaGame.qAndA[triviaGame.questionCount].imgUrl).attr('width', '115px').attr('id', 'correctMovieImage');

		$('#pic').append(newImg);

		triviaGame.btnClicked = false;
		triviaGame.displayNextInt = setInterval(triviaGame.beginGame, 5000);
		triviaGame.numberIncorrect++;
		triviaGame.questionCount++;
		triviaGame.numberCount++;
	},
//If the player is out of time 
	oufOfTime: function(){

		if(newImg != ""){

			$('#pic').empty();
		}

		triviaGame.userAnswers.push(""); 
		$('#divAnswers').show();
		$('#gameStart').hide();
		$('#pCorrectAnswer span').html(triviaGame.correctAnswers[triviaGame.questionCount]);
		$('#pCorrectAnswer').show();
		$('#correctMsg').hide();
		$('#wrongMsg').hide();		
		$('#timeRemaining').css('display', 'block');
		$('#elapsedTime').html(triviaGame.timer);	
		clearInterval(triviaGame.beginInt);
		var newImg = $("<img>").attr('src', triviaGame.qAndA[triviaGame.questionCount].imgUrl).attr('width', '115px').attr('id', 'correctMovieImage');

		$('#pic').append(newImg);

		triviaGame.numberUnAnswered++;

		triviaGame.displayNextInt = setInterval(triviaGame.beginGame, 5000);

		triviaGame.questionCount++;	

	},
//Restart function
	restart: function(){

		triviaGame.numberCount = 0;
		triviaGame.questionCount = 0;
		triviaGame.userAnswers.length = 0;
		$('#time').html("20");

		triviaGame.beginGame();
		$('#gameStart').show();
		$('#gameComplete').hide();
		$('#completePanel').hide();
		clearInterval(triviaGame.displayNextInt);
		$('#elapsedTime').empty();
		triviaGame.numberCorrect = 0;
		triviaGame.numberIncorrect = 0;
		triviaGame.numberUnAnswered = 0;
	},
//Game Ends - Resets the DOM
	gameFinished: function(){

		$('#divAnswers').hide();
		$('#gameStart').hide();
		$('#gameJumbo').hide(); 
		$('#gamePanel').hide();

		$('#gameComplete').css('display', 'block');
		$('#completePanel').css('display', 'block');

		$('#gameOverCorrect span').html(triviaGame.numberCorrect);
		$('#gameOverIncorrect span').html(triviaGame.numberIncorrect);
		$('#unanswered span').html(triviaGame.numberUnAnswered);
		triviaGame.timer = 20;
	}
};



//Game begins on click of the start button 
	$('#begin').on('click', function(){

		$('div#gameStart').css('display', 'block');
		$('#btnWrapper').css('display', 'none');
		$('.numbers').html(triviaGame.beginGame);
		$('.questions').html(triviaGame.beginGame);
		$('#panelButton').css('display', 'none');
		$('#questionmark').css('display', 'none');
		$('#startJumbo').css('display', 'none');
	});
//once the player hits options
	$('.answers').on('click', function(){

		triviaGame.userAnswers.push($(this).text());
		triviaGame.btnClicked = true;

	});
//once the player hits restart - calls function restart
	$('#restartPlaceholder').on('click', function(){

		triviaGame.restart();
		
	});


});//End 



//back to home page arrow

var counter = 1;
document.getElementById('rect').onclick = function() {
  if (counter == 1) {
  document.getElementById("first").setAttribute("opacity", 1);
  document.getElementById("second").setAttribute("opacity", 0);
  counter = 0;
  }
  else {
  document.getElementById("first").setAttribute("opacity", 0);
  document.getElementById("second").setAttribute("opacity", 1);
  counter = 1;
  }
}


var counter2 = 1;
document.getElementById('rect2').onclick = function() {
  if (counter2 == 1) {
  document.getElementById("first2").setAttribute("opacity", 1);
  document.getElementById("second2").setAttribute("opacity", 0);
  counter2 = 0;
  }
  else {
  document.getElementById("first2").setAttribute("opacity", 0);
  document.getElementById("second2").setAttribute("opacity", 1);
  counter2 = 1;
  }
}

var counter5 = 1;
document.getElementById('rectanx').onclick = function() {
  if (counter5 == 1) {
  document.getElementById("firstx").setAttribute("opacity", 1);
  document.getElementById("secondx").setAttribute("opacity", 0);
  counter5 = 0;
  }
  else {
  document.getElementById("firstx").setAttribute("opacity", 0);
  document.getElementById("secondx").setAttribute("opacity", 1);
  counter5 = 1;
  }
}










