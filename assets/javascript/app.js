$(document).ready(function() {

//Click Listeners
//Start Button
$("#start").on('click', triviaTime.start);
//Answer Buttons
$("#choice").on('click', triviaTime.choiceCheck);

//Game Object
var triviaTime = {

    //Questions Object
    questions: {
        1: `How many points did Georgia Tech score in their college football all-time record setting shut-out
            of Cumberland College in 1916?`,
        2: `This Georgia Tech legend, who was killed in the line of duty during World War II, finished 3rd
            in the Heisman Trophy voting following his only season of college football in 1941, the highest ever
            finish by a freshman until 2004:`,
        3: `This head football coach holds the record for the most victories in Georgia Tech history, with 165:`,
        4: `This Georgia Tech legend, who was inducted into the College Football Hall of Fame in 2014, won the Davey O'Brien Award as the 
            top quarterback in college football and was runner-up for the Heisman Trophy in 1999:`,
        5: `In 2007, this Georgia Tech team defeated UCLA to capture the NCAA Championship in their sport:`,
        6: `The Georgia Tech baseball team played in the College World Series in all of the following seasons except:`
        7: `Georgia Tech defeated Nebraska 45-21 in this bowl game to finish the 1990 season as the nation's only undefeated Division
            I team and secure a share of the school's 4th college football national championship:`, 
        8:  `Which of the following Georgia Tech track and field alums won a gold medal in Summer Olympic Games?`,
        9:  `This Georgia Tech alum, who became the first golfer ever to win the sport's Grand Slam, is the only athlete in American
            history to receive 2 ticker tape parades in New York City:`,
        10: `This Georgia Tech football alum, who was inducted into the College Football Hall of Fame in 2018, set the NFL
             record for the most receiving yards in a single season with 1,964 yards in 2012:`,
        11: `Will Bynum's layup with 1.5 seconds remaining defeated this school in the NCAA Final Four to advance Georgia Tech to the
             2004 NCAA Division I Men's Basketball Championship Game.` 
    }
    
    //Answers Object
    answers: {
        1: "222",
        2: "Clint Castleberry",
        3: "Bobby Dodd",
        4: "Joe Hamilton",
        5: "Women's Tennis",
        6: "1985",
        7: "Citrus",
        8: "All of the Above",
        9: "Bobby Jones",
        10: "Calvin Johnson",
        11: "Oklahoma State",
    }

    //Choices Array Object
    choices: {
        1: ["113", "205", "222", "146"],
        2: ["Joe Guyon", "Clint Castleberry", "Pepper Rodgers", "Bill Fincher"],
        3: ["John Heisman", "William Alexander", "Bobby Dodd", "Paul Johnson"],
        4: ["Joe Hamilton", "Kim King", "Billy Lothridge", "Shawn Jones"],
        5: ["Baseball" , "Women's Tennis", "Men's Basketball", "Golf"],
        6: ["1985", "1994", "2002", "2006"],
        7: ["Rose", "Sugar", "Orange", "Citrus"],
        8: ["Derrick Adkins", "Derek Mills", "Angelo Taylor", "All of the Above"],
        9: ["Bobby Jones", "Charlie Yates", "Larry Mize", "Watts Gunn"],
        10: ["Kelly Campbell", "Demaryius Thomas", "Dez White", "Calvin Johnson"],
        11: ["Duke", "Kansas", "Oklahoma State", "Michigan State"]
    },

    //Game Properties
    correct: 0,
    missed: 0,
    clock: 0, 

    //Game Function Methods

    //
    intro: function() {
        //Start Button Click Listener
        $("#start").on('click', triviaTime.start);
        $(".intro").hide();
        $(".play").show();
    },
    //Start Game Function
    start: function() {
        triviaTime.correct = 0;
        triviaTime.missed = 0;

    },

    //Next Question Function
    next: function() {

    },

    //Choice Check Function to See if Answer is Correct
    choiceCheck: function() {

    },

    //Chill Function to Wait After Each Question is over before moving to the next question
    chill: function() {

    },





}





































});