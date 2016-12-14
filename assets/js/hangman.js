      
      var gameOver;
      var guessesLeft;
    	// var word ="purple";
    	var wordDic = ["purple", "america","easy","difficulty","charlotte","mountains","ocean","pepperoni","gypsy","buffoon","growth","strength","dominate","welcome","reinforce","stalwart","pockets","rutabaga"];


    	// create hangWord, create stringWord, pick word

    	var hangWord;
    	var stringWord;
    	var wrongLetters;
    	var wrongString;
    	var alph = ("abcdefghijklmnopqrstuvwxyz").split("");
      var sumoStatus;
      var word;
      var wins = 0;
      var keyPressed = false;

      unloadScrollBars();
      restart();

      //event listener for reset button
      $( ".reset" ).click(function() {
        restart();
      });
      

    	// initial method calls here
      function restart(){
        //reset you lose text to sumo gold amount
        $("#loser").html("Bags of Sumo Gold: <span id = \"wins\">0</span>");
        //resets shaking
        document.getElementById("man").className = "man"; 
        // reset variables
        hangWord = [];
        stringWord="_";
        wrongLetters = [];
        //show canvas
        document.getElementById("man").style.height = "550px";
        gameOver = false;
        guessesLeft = 9;
        sumoStatus = guessesLeft;
        document.getElementById("guesses").innerHTML = guessesLeft;
        $("#ricelbs").text(wins*40);
        $("#wins").text(wins);
        
        word = pickWord();
        createHangWord();
        createStringWord();
        window.addEventListener("load", drawSumo());
        document.getElementById("word").innerHTML = stringWord;
        wrongString = wrongLetters.join("");
        document.getElementById("wrongs").innerHTML = wrongString;

      }

      // function pressAnyKey(){
      //   keyPressed = true;
      // }

      function endGame(){
        var delay=7000; //1.5 seconds

              // show final frame 

        setTimeout(function() {
          
          console.log(wins);
          gameOver = true;
          restart();
          $("#winnerStory").addClass('hiddenStory');
       }, delay);            

      }

      //draw sumo
      window.addEventListener("load", drawSumo());

     //  document.getElementById("guesses").innerHTML = guessesLeft;

    	// word = pickWord();
    	// createHangWord();
    	// createStringWord();

    	console.log(stringWord);
    	console.log(hangWord);


    	// create hangWord, create stringWord, pick word

  	function pickWord(){
      var n = wordDic.length;
  		var r = Math.floor(Math.random() * n);
  		var word = wordDic[r];
  		console.log(word);
  		console.log(r);
  		return word;
  	}



  	function createHangWord(){
  		for (i = 0; i < word.length; i++){
  			hangWord.push("_");
  		}
  	}

  	function createStringWord(){
  		for (i = 0; i < word.length-1; i++){
  			stringWord += "_";
  		}
  	}

    	function isGuessRight(guess){
    		for (i = 0; i < word.length; i++) {
    			if (word.charAt(i) === guess)
    				return true
    		}
    		return false;
    	}

    	function replaceCorrects(guess) {
    		var replaceIndex =[];
    		for (i = 0; i < word.length; i++) {
    			if (word.charAt(i) === guess)
    				replaceIndex.push(i);
    		}
    		return replaceIndex;
    	}

    	function addGuess(guess, replaceIndex) {
    		for (i in replaceIndex) {
    			var x = replaceIndex[i];
    			hangWord[x] = guess;
    		}
    	}

    	function win() {
    		for (i in hangWord) {
    			if (hangWord[i] === "_"){
    				return false;
    			}
    		}

    		return true;
    	}

    	function isInWrongs(char) {
    		for (i in wrongLetters){
    			if (char === wrongLetters[i])
    				return true;
    		}
    		return false;
    	}

    	function addWrong(char) {
    			if (!isInWrongs(char)) {
    				guessesLeft -= 1;
            sumoStatus = guessesLeft;
            drawSumo();
            if (guessesLeft === 2) {
              document.getElementById("man").className = "man shake-slow shake-constant"; 
            }

            if (guessesLeft === 0) {

              // show sumoDying.png

              var canvas = document.getElementById("man");
              var ctx = canvas.getContext("2d");
              var imageObj = new Image();
              imageObj.src=("assets/images/sumoDying.png");
              imageObj.onload = function(){
                ctx.drawImage(imageObj, 1, 1);
              }

              // add delay
              var delay=4500; //1.5 seconds

              // show final frame 

              setTimeout(function() {
                //stops shaking
                document.getElementById("man").className = "man"; 
                var canvas = document.getElementById("man");
                var ctx = canvas.getContext("2d");
                var imageObj = new Image();
                imageObj.src=("assets/images/sumo0.png");
                imageObj.onload = function(){
                  ctx.drawImage(imageObj, 1, 1);
                }
              }, delay);            
            
            }

  	  			document.getElementById("guesses").innerHTML = guessesLeft;
  	  			wrongLetters.push(char);
  	  			wrongString = wrongLetters.join("");
  	  			document.getElementById("wrongs").innerHTML = wrongString;
  	  		}
    	}

    	function isLetter(letter) {
    		for (i in alph) {
    			if (alph[i] === letter)
    				return true;
    		}
    		return false;
    	}

      function youWin() {
        document.getElementById("man").style.height = "0px";
        wins+=1;
        $("#wins").text(wins);
        $(".winnerStory").removeClass('hiddenStory');
        $("#ricelbs").text(wins*40);
        endGame();
      }


                //key detection
    	document.onkeyup = function (event) {
          if (!keyPressed) {
            keyPressed = true;
            $('.anyKey').html("");
          }
          else {
            var letter = String.fromCharCode(event.keyCode).toLowerCase();
            console.log(letter);
      			if(isLetter(letter) && guessesLeft > 0){
    	  			addGuess(letter, replaceCorrects(letter));
    	  			console.log(hangWord);
    	  			console.log(win());
    	  			stringWord = hangWord.join("");
    	  			document.getElementById("word").innerHTML = stringWord;
    	  			if (win()){
    	  				youWin();
    	  			}
    	  			if (!isGuessRight(letter)) {
    	  				addWrong(letter);
    	  			}

    	  			

    	  			if (guessesLeft === 0) {
    	  				$('#loser').text("YOU LOSE!");
                endGame();
              }
      			}
        }

    	}

      function drawSumo() {

              var canvas = document.getElementById("man");
              var ctx = canvas.getContext("2d");
              var imageObj = new Image();
              imageObj.src=("assets/images/sumo" + sumoStatus + ".png");
              imageObj.onload = function(){
                if (sumoStatus != 0)
                  ctx.drawImage(imageObj, 1, 1);
              }
      }

    	

    	document.getElementById("word").innerHTML = stringWord;
    	// document.getElementById("wrongs").innerHTML = wrongString;


      function reloadScrollBars() {
           document.documentElement.style.overflow = 'auto';  // firefox, chrome
           document.body.scroll = "yes"; // ie only
           }

        function unloadScrollBars() {
          document.documentElement.style.overflow = 'hidden';  // firefox, chrome
          document.body.scroll = "no"; // ie only
          }

