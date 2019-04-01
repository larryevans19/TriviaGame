$(document).ready(function () {

    console.log(triviaTime.questions.Q2);
    //Event Listeners
    //Game Intro Start Button Click, with a 3 second delay
    $("#intro").on('click', function () {
        delayButtonAlert = setTimeout(function () {
            triviaTime.intro();
        }, 3000);
    })
    //Answer Buttons Clicks
    $(document).on('click', ".choices", triviaTime.choiceCheck);

});

//Game Object
const triviaTime = {

    //Questions Object
    questions: {
        Q1: `How many points did Georgia Tech score in their college football all-time record setting shut-out
            of Cumberland College in 1916?`,
        Q2: `This Georgia Tech legend, who was killed in the line of duty during World War II, finished 3rd in the Heisman Trophy voting following his only season of college football in 1941, the highest ever finish by a freshman until 2004:`,
        Q3: `This head football coach holds the record for the most victories in Georgia Tech history, with 165:`,
        Q4: `This Georgia Tech legend, who was inducted into the College Football Hall of Fame in 2014, won the Davey O'Brien Award as the 
            top quarterback in college football and was runner-up for the Heisman Trophy in 1999:`,
        Q5: `In 2007, this Georgia Tech team defeated UCLA to capture the NCAA Championship in their sport:`,
        Q6: `The Georgia Tech baseball team played in the College World Series in all of the following seasons except:`,
        Q7: `Georgia Tech defeated Nebraska 45-21 in this bowl game to finish the 1990 season as the nation's only undefeated Division
            I team and secure a share of the school's 4th college football national championship:`,
        Q8: `This Georgia Tech alum, who became the first player ever to win golf's Grand Slam, is the only athlete in American
            history to receive 2 ticker tape parades through New York City:`,
        //EXTRA QUESTIONS TO BUILD OUT THE OBJECT FOR EXTENDED PLAY
        // Q9:  `Which of the following Georgia Tech track and field alums won a gold medal in the Summer Olympic Games?`,
        // Q10: `This Georgia Tech football alum, who was inducted into the College Football Hall of Fame in 2018, set the NFL
        //      record for the most receiving yards in a single season with 1,964 yards in 2012:`,
        // Q11: `Will Bynum's layup with 1.5 seconds remaining defeated this school in the NCAA Final Four to advance Georgia Tech to the
        //      2004 NCAA Division I Men's Basketball Championship Game.`,
        // Q12: `The Georgia Tech alum is one of only 5 switch hitters in the history of Major League Baseball to hit over 400 home runs in his career.`,
    },

    //Answers Object
    answers: {
        Q1: "222",
        Q2: "Clint Castleberry",
        Q3: "Bobby Dodd",
        Q4: "Joe Hamilton",
        Q5: "Women's Tennis",
        Q6: "1985",
        Q7: "Citrus",
        Q8: "Bobby Jones",
        //EXTRA ANSWERS TO BUILD OUT THE OBJECT FOR EXTENDED PLAY
        // Q9: "All of the Above",
        // Q10: "Calvin Johnson",
        // Q11: "Oklahoma State",
        // Q12: "Mark Teixeira"
    },

    //Choices Array Object
    choices: {
        Q1: ["113", "205", "222", "146"],
        Q2: ["Joe Guyon", "Clint Castleberry", "Pepper Rodgers", "Bill Fincher"],
        Q3: ["John Heisman", "William Alexander", "Bobby Dodd", "Paul Johnson"],
        Q4: ["Joe Hamilton", "Kim King", "Billy Lothridge", "Shawn Jones"],
        Q5: ["Baseball", "Women's Tennis", "Men's Basketball", "Golf"],
        Q6: ["1985", "1994", "2002", "2006"],
        Q7: ["Rose", "Sugar", "Orange", "Citrus"],
        Q8: ["Bobby Jones", "Charlie Yates", "Larry Mize", "Watts Gunn"],
        //EXTRA CHOICES TO BUILD OUT THE OBJECT FOR EXTENDED PLAY
        // Q9: ["Derrick Adkins", "Derek Mills", "Angelo Taylor", "All of the Above"],
        // Q10: ["Kelly Campbell", "Demaryius Thomas", "Dez White", "Calvin Johnson"],
        // Q11: ["Duke", "Kansas", "Oklahoma State", "Michigan State"],
        // Q12: ["Jason Varitek", "Mark Teixeira", "Nomar Garciaparra", "Matt Weiters"]
    },

    //Final Stats Object for Correct and Incorrect Answers on the "Game Over" Screen
    stats: {
        correct: 0,
        incorrect: 0,

    },

    //Scoreboard Object and Properties
    scoreboard: {
        techScore: 0,
        oppScore: 0,
        quarter: 1,
        clock: 0,
    },

    //Other Game Controls
    controls: {
        currentIndex: 0,
        intervalId: 0,
        clockRunning: false,
    },


    //Game Function Methods

    //Game Over function is called once the determined number of questions have been asked.  
    gameOver: function () {
        //Zero out the game clock because the game is over
        $("#clock").text("00:00");
        //Empty the question div on the scoreboard
        $("#question").empty();
        //Empty the choices div on the scoreboard
        $("#choices").empty();
        //Check the football score to see if Tech won, UGA won, or if it was a tie 
        //If Tech won, we'll call the function that plays the Georgia Tech fight song to celebrate.
        //We'll also display a congratulatory message on the scoreboard. 
        if (triviaTime.scoreboard.techScore > triviaTime.scoreboard.oppScore) {
            triviaTime.victory();
            $("#message").text("JACKETS WIN!");
            //If it's a TIE, we tell the player it's a tie and to play again!
        } else if (triviaTime.scoreboard.techScore === triviaTime.scoreboard.oppScore) {
            $("#message").html("<h1 class='display-2'><strong>IT'S A TIE! PLAY AGAIN!</strong></h1>");
            //If Tech didn't win, and it's not a tie, it means it's a loss.  The crowd will boo that.  And the
            //scoreboard will display a message showing how we feel about UGA.
        } else {
            triviaTime.boo();
            $("#message").html("<h1 class='display-2'><strong>TO HELL WITH GEORGIA!</strong></h1>");
        }
        //In the empty question div, we will display the final question stats for the game in terms of correct
        //and incorrect answers.
        $("#question").html(`CORRECT ANSWERS: <strong>${triviaTime.stats.correct}</strong><br>
                            INCORRECT ANSWERS: <strong>${triviaTime.stats.incorrect}</strong>`)
        //We create and display a button for the player to click to start a new game.
        const playButton = $("<button class='btn btn-outline-warning btn-block'>");
        playButton.text("CLICK TO PLAY AGAIN!");
        playButton.attr("id", "start");
        $("#choices").append(playButton)
        //Listen for the player to click the button to start a new game and call the start game function.
        $("#start").on('click', function () {
            delayButtonAlert = setTimeout(function () {
                triviaTime.start();
            }, 2000);
        });
    },

    //Clock function turns on the game clock and sets the interval
    clock: function () {
        //The initial setting is for the clock to not be running.
        triviaTime.controls.clockRunning = false;
        // console.log("Start Time:", triviaTime.scoreboard.clock);
        // console.log("Clock Face:", triviaTime.clockFace(triviaTime.scoreboard.clock))
        //We call the clockFace function to correctly display the time depending on if there are
        //10 seconds or less than 10 seconds on the clock.
        $("#clock").text(triviaTime.clockFace(triviaTime.scoreboard.clock));
        //Set the clock interval for 1 second and run the clock.  Calls the counting function
        if (!triviaTime.controls.clockRunning) {
            triviaTime.controls.intervalId = setInterval(triviaTime.countDown, 1000);
            triviaTime.controls.clockRunning = true;
        }
    },

    //The Count Down function runs the clock down.  It also notes if the clock expires on a question
    //and triggers appropriate functions
    countDown: function () {
        //If the clock hasn't reached 0 yet, we'll count it down 1 second at a time and display the
        //running time.
        if (triviaTime.scoreboard.clock > 0) {
            triviaTime.scoreboard.clock--;
            $("#clock").text(triviaTime.clockFace(triviaTime.scoreboard.clock))
            //if the clock has hit 0, we'll clear the interval to stop the clock, and indicate that the clock
            //is not longer running. 
        } else {
            // debugger;
            clearInterval(triviaTime.controls.intervalId);
            clockRunning = false;
            //if the clock hit 0 on a question, the player ran out of time and the question is counted as incorrect.
            triviaTime.stats.incorrect++;
            //store the answer to the question that was just missed to display on the scoreboard.
            let answerChoice = Object.values(triviaTime.answers)[triviaTime.controls.currentIndex];
            //adjust the question index to determine the next question that is pulled from the object.
            triviaTime.controls.currentIndex++
            //For our football theme, we divide the game into quarters like a real football game. 
            //There are 8 questions in the game's initial version, so every 2 questions is a quarter.  I
            //used the oculus to see if the new index is a multiple of 2.  If it is, we increment the quarter
            //on the scoreboard (unless the quarter is already the 4th).
            if (triviaTime.controls.currentIndex % 2 === 0 && triviaTime.scoreboard.quarter <= 3) {
                triviaTime.scoreboard.quarter++;
                $("#quarter").text(triviaTime.scoreboard.quarter)
            };
            //if time expired on the question, we give UGA a touchdown.  We call the function for when UGA scores to
            //do the stuff we need on the scoreboard.
            triviaTime.scoreboard.oppScore += 7;
            $("#opp").text(triviaTime.scoreboard.oppScore);
            let resultScore = 7;
            delayButtonAlert = setTimeout(function () {
                triviaTime.uga(resultScore, answerChoice);
            }, 1000);

        }
    },

    //Intro function hides the game title intro div and shows the initially hidden area of the scoreboard where the game
    //is played.  Then we call the function to start the game.
    intro: function () {

        $(".intro").hide();
        $(".play").show();
        triviaTime.start();
    },

    //Start Game Function
    start: function () {
        //Reset the stat counters, scoreboard scores, and index control to 0, the quarter to 1, and the game clock to 10.
        //Calls the play function.
        triviaTime.stats.correct = 0;
        triviaTime.stats.incorrect = 0;
        triviaTime.scoreboard.clock = 10;
        $("#clock").text("00:10");
        triviaTime.controls.currentIndex = 0;
        triviaTime.scoreboard.techScore = 0;
        $("#tech").text(triviaTime.scoreboard.techScore);
        triviaTime.scoreboard.oppScore = 0;
        $("#opp").text(triviaTime.scoreboard.oppScore);
        triviaTime.scoreboard.quarter = 1;
        $("#quarter").text(triviaTime.scoreboard.quarter)
        triviaTime.play();

    },

    //Play function controls the questions
    play: function () {
        //clear the message and choices divs of any messages from the previous question result. 
        $("#message").empty();
        $("#choices").empty();

        //set the play clock back to 10 for the new question
        triviaTime.scoreboard.clock = 10;
        $("#clock").text("00:10");


        //store the current question from the object and display it on the scoreboard.
        let playQuestion = Object.values(triviaTime.questions)[triviaTime.controls.currentIndex];
        $("#question").text(playQuestion);

        //store the choices for the current questions.
        let playChoices = Object.values(triviaTime.choices)[triviaTime.controls.currentIndex];

        //create and display buttons for all of the choices. assign a data value with the answers.
        for (let i = 0; i < playChoices.length; i++) {
            const playButton = $("<button class='btn btn-outline-warning btn-block'>")
            playButton.text(playChoices[i]);
            playButton.addClass("choices");
            playButton.attr("data-name", playChoices[i]);
            $("#choices").append(playButton);
        };

        //call the clock function to run the clock
        triviaTime.clock();
    },

    //Choice Check Function to See if Answer is Correct
    choiceCheck: function () {

        //After question is answer we want to make sure the clock isn't running.
        clearInterval(triviaTime.controls.intervalId);
        triviaTime.controls.clockRunning = false;

        //We store the amount of time that was on the clock when the player answered the question
        //since this helps determine whether a touchdown or a field goal is awarded.
        let answerTime = triviaTime.scoreboard.clock;
        console.log("Answer Time:", answerTime);

        //We store the data value which corresponds to the answer for the button that was clicked.
        let answer = $(this).attr("data-name");
        console.log("answer:", answer);
        //We store the correct answer from the object to compare to the answer on the button that was clicked.
        let answerChoice = Object.values(triviaTime.answers)[triviaTime.controls.currentIndex];
        console.log("answerChoice:", answerChoice);

        //If the answer for the button that was clicked matches the correct answer from the object...
        if (answer === answerChoice) {
            //increment the correct answer counter.
            triviaTime.stats.correct++;
            //increment the index control
            triviaTime.controls.currentIndex++
            //see if the question was answered with 4 or more questions left.
            if (answerTime > 3) {
                //if so it's a TD and we'll call the function that does the stuff we want and pass in
                //that it was a TD and what the correct answer was to show on the scoreboard.
                triviaTime.scoreboard.techScore += 7;
                let resultScore = 7;
                $("#tech").text(triviaTime.scoreboard.techScore);
                delayButtonAlert = setTimeout(function () {
                    triviaTime.tech(resultScore, answerChoice);
                }, 1000);
            } else { //if it wasn't a TD, it's a FG and we'll call the function that does the stuff we want and
                //pass in that it was a FG and what the correct answer was to show on the scoreboard.
                triviaTime.scoreboard.techScore += 3;
                let resultScore = 3;
                $("#tech").text(triviaTime.scoreboard.techScore);
                delayButtonAlert = setTimeout(function () {
                    triviaTime.tech(resultScore, answerChoice);
                }, 1000);
            }

            console.log("Correct Count:", triviaTime.stats.correct)
            console.log("Current Index:", triviaTime.controls.currentIndex)

            //if the player didn't get it right, we know they got it wrong...
        } else {
            //increment the incorrect answer counter
            triviaTime.stats.incorrect++;
            //increment the index control for the next question
            triviaTime.controls.currentIndex++
            //check to see how much time was on the clock when the question was answered
            //to determine whether a TD or FG is awarded.
            if (answerTime > 3) {
                triviaTime.scoreboard.oppScore += 7;
                let resultScore = 7;
                $("#opp").text(triviaTime.scoreboard.oppScore);
                delayButtonAlert = setTimeout(function () {
                    triviaTime.uga(resultScore, answerChoice);
                }, 1000);
            } else {
                triviaTime.scoreboard.oppScore += 3;
                let resultScore = 3;
                $("#opp").text(triviaTime.scoreboard.oppScore);
                delayButtonAlert = setTimeout(function () {
                    triviaTime.uga(resultScore, answerChoice);
                }, 1000);
            }
            console.log("Incorrect Count:", triviaTime.stats.incorrect)
            console.log("Current Index:", triviaTime.controls.currentIndex)
        }

        //Check the index control to see if the oculus of 2 is true.  If so, we know to increment
        //the quarter on the scoreboard (unless it's already the 4th)
        console.log("oculus:", (triviaTime.controls.currentIndex % 2 === 0));
        if (triviaTime.controls.currentIndex % 2 === 0 && triviaTime.scoreboard.quarter <= 3) {
            triviaTime.scoreboard.quarter++;
            $("#quarter").text(triviaTime.scoreboard.quarter)
            console.log("quarter:", triviaTime.scoreboard.quarter);
        }
    },

    //Cheer function is called if the player got the question right so the crowd can show love.
    cheer: function () {
        const audioCheer = document.createElement("audio");
        audioCheer.setAttribute("src", "assets/cheer.mp3");
        audioCheer.load();
        audioCheer.play();
        delayButtonAlert = setTimeout(function () {
            audioCheer.pause();
        }, 5000);
    },

    //Victory function is called if the player won the game so the band can show love.
    victory: function () {
        const audioVictory = document.createElement("audio");
        audioVictory.setAttribute("src", "assets/GT.mp3");
        audioVictory.load();
        audioVictory.play();
        $("#start").on('click', function () {
            audioVictory.pause();
        });
    },

    //Boo function is called if the player got the answer wrong so the crowd can rag on the player.
    boo: function () {
        var audioBoo = document.createElement("audio");
        audioBoo.setAttribute("src", "assets/boo.mp3");
        audioBoo.load();
        audioBoo.play();
        delayButtonAlert = setTimeout(function () {
            audioBoo.pause();
        }, 5000);
    },

    //Tech function is called when the player gets an answer right.  It calls the cheer function, and 
    //clears the question from the scoreboard so we can display the right result messages on the scoreboard
    //depending on if a TD or FG was scored.
    tech: function (resultScore, answerChoice) {
        triviaTime.cheer();
        // debugger;
        console.log("The Correct Answer was:", answerChoice);
        $("#choices").empty();
        $("#question").html("<h2> The Correct Answer was:</h2><h1><strong>" + answerChoice + "</strong></h1>");

        if (resultScore === 7) {
            $("#message").text("TOUCHDOWN TECH!")
        } else {
            $("#message").text("FIELD GOAL TECH!")
        }
        //chill for 5 seconds on the scoreboard after the question, then call the play function
        //to go to the next question, unless the index control tells us we've asked all the questions.  If
        //we've asked all the questions, we call the game over function to trigger the final scoreboard messages.
        if (triviaTime.controls.currentIndex < Object.values(triviaTime.questions).length) {
            delayButtonAlert = setTimeout(function () {
                triviaTime.play();
            }, 5000);
        } else {
            delayButtonAlert = setTimeout(function () {
                triviaTime.gameOver();
            }, 5000);
        }
    },

    //UGA function is called when the player gets an answer wrong.  It calls the boo function, and 
    //clears the question from the scoreboard so we can display the right result messages on the scoreboard
    //depending on if a TD or FG was scored.  After a 5 second chill, it will then call the play function for the next question or the
    //game over function if all questions have been asked.
    uga: function (resultScore, answerChoice) {
        triviaTime.boo();
        $("#question").html("<h2> The Correct Answer was:</h2><h1><strong>" + answerChoice + "</strong></h1>");
        $("#choices").empty();

        if (resultScore === 7) {
            $("#message").text("TOUCHDOWN UGA")
        } else {
            $("#message").text("FIELD GOAL UGA")
        }
        if (triviaTime.controls.currentIndex < Object.values(triviaTime.questions).length) {
            delayButtonAlert = setTimeout(function () {
                triviaTime.play();
            }, 5000);
        } else {
            delayButtonAlert = setTimeout(function () {
                triviaTime.gameOver();
            }, 5000);
        }
    },

    //clockFace takes the game time and displays it correctly on the scoreboard depending on if there
    //are 10 seconds left or less than 10 seconds (have to add a 0).
    clockFace: function (time) {
        var clockDisplay

        if (time > 9) {
            clockDisplay = `00:${time}`
        } else if (time <= 9) {
            clockDisplay = `00:0${time}`
        }
        return clockDisplay
        console.log("clockDisplay:", clockDisplay);
    }

}