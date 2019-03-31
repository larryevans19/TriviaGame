$(document).ready(function () {

    console.log(triviaTime.questions.Q2);

    triviaTime.start()
    //Event Listeners
    //Start Button Clicks
    $("#start").on('click', triviaTime.start());
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
        Q8: `This Georgia Tech alum, who became the first golfer ever to win the sport's Grand Slam, is the only athlete in American
            history to receive 2 ticker tape parades through New York City:`,
        // Q9:  `Which of the following Georgia Tech track and field alums won a gold medal in Summer Olympic Games?`,
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
        // Q9: ["Derrick Adkins", "Derek Mills", "Angelo Taylor", "All of the Above"],
        // Q10: ["Kelly Campbell", "Demaryius Thomas", "Dez White", "Calvin Johnson"],
        // Q11: ["Duke", "Kansas", "Oklahoma State", "Michigan State"],
        // Q12: ["Jason Varitek", "Mark Teixeira", "Nomar Garciaparra", "Matt Weiters"]
    },

    //Final Stats Object for Game Over Summary
    stats: {
        correct: 0,
        incorrect: 0,
        qCount: 0,
    },

    //Scoreboard Object and Properties
    scoreboard: {
        techScore: 0,
        oppScore: 0,
        quarter: 1,
        clock: 0,
    },

    //Other Controls
    controls: {
        currentIndex: 0,
    },
    //Game Function Methods

    gameOver: function () {
        $("#question").empty();
        $("#choices").empty();
        $("#question").text("GAME OVER BITCH!")
        const playButton = $("<button class='btn btn-outline-warning btn-block'>");
        playButton.text("CLICK TO PLAY AGAIN!");
        playButton.attr("id", "start");
        $("#choices").append(playButton)
        $("#start").on('click', function () {
            delayButtonAlert = setTimeout(function () {
                triviaTime.start();
            }, 2000);
        });


    },

    clock: function () {
        var intervalId;
        var clockRunning = false;
        triviaTime.scoreboard.clock = 8;
        $("#clock").text(`00:0${triviaTime.scoreboard.clock}`);
        if (!clockRunning) {
            intervalId = setInterval(triviaTime.scoreboard.clock--, 1000);
            clockRunning = true;
        }
    },
    //
    // intro: function() {
    //     //Start Button Click Listener
    //     $("#start").on('click', triviaTime.start);
    //     $(".intro").hide();
    //     $(".play").show();
    // },
    //Start Game Function
    start: function () {
        triviaTime.correct = 0;
        triviaTime.incorrect = 0;
        triviaTime.scoreboardclock = 10;
        triviaTime.controls.currentIndex = 0;
        triviaTime.play();

    },

    //Next Question Function
    play: function () {

        $("#choices").empty();

        let playQuestion = Object.values(triviaTime.questions)[triviaTime.controls.currentIndex];
        $("#question").text(playQuestion);

        let playChoices = Object.values(triviaTime.choices)[triviaTime.controls.currentIndex];



        for (let i = 0; i < playChoices.length; i++) {
            const playButton = $("<button class='btn btn-outline-warning btn-block'>")
            playButton.text(playChoices[i]);
            playButton.addClass("choices");
            playButton.attr("data-name", playChoices[i]);
            $("#choices").append(playButton);
        };

    },


    //Choice Check Function to See if Answer is Correct
    choiceCheck: function () {

        let clockTime
        let answer = $(this).attr("data-name");
        console.log("answer:", answer);
        let answerChoice = Object.values(triviaTime.answers)[triviaTime.controls.currentIndex];
        console.log("answerChoice:", answerChoice);

        if (answer === answerChoice) {
            //call correct answer function to show message
            triviaTime.correct++;
            triviaTime.controls.currentIndex++
            console.log("Correct Count:", triviaTime.correct)
            console.log("Current Index:", triviaTime.controls.currentIndex)

            //check to see how much time was left to know how to adjust scoreboard
            // if clockTime 

            //increment current index 
            //check to see if it's the next quarter
        } else {
            //call incorrect answer function to show message
            triviaTime.incorrect++;
            triviaTime.controls.currentIndex++

            console.log("Incorrect Count:", triviaTime.incorrect)
            console.log("Current Index:", triviaTime.controls.currentIndex)
            //check to see how much time was left to know how to adjust scoreboard

            //increment current index

            //check to see if it's the next quarter and game is over




        }
        if (triviaTime.controls.currentIndex < Object.values(triviaTime.questions).length) {
            triviaTime.play();
        } else {
            triviaTime.gameOver()
        }


    },


    //Chill Function to Wait After Each Question is over before moving to the next question
    chill: function () {
        // const chillOut

        // setTimeout()
    }



}