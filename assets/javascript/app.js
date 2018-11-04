(function() {

    $(document).ready(function() { 
        // VARIABLES

        // Global Variable
        var currentQuestion;
        var imgOne;
        var imgTwo;
        var correctAnswer;
        var correctAnswer;
        var q = 0;
        var userChoice;
        var correctCount = 0;
        var incorrectCount = 0;
        var intervalId;

        // Question Array
        var questionsAnswersArray = [{
                question: "What was the name of the dog adopted by April and Andy?",
                answer: "Champion",
                incorrectAnswers: ["Bartholomew", "Cooper", "Spot"],
                firstImg: "assets/images/dog.jpg",
                secondImg: "assets/images/dog2.jpg"
            },
            {
                question: "Which city was Pawnee's South American sister city?",
                answer: "Boraqua, Venezuela",
                incorrectAnswers: ["Sao Paolo, Brazil", "Cuenca, Ecuador", "Aracaju, Brazil"],
                firstImg: "assets/images/sistercity2.png",
                secondImg: "assets/images/sistercity.png"
            },
            {
                question: "What was the name of the city planner who left the show after season 2?",
                answer: "Mark Brandanawicz",
                incorrectAnswers: ["Ron Swanson", "Chris Traeger", "Ben Wyatt"],
                firstImg: "assets/images/mark.png",
                secondImg: "assets/images/mark2.jpg"
            },
            {
                question: "What was the name of the 'premiere, high-end, all-media entertainment conglomerate' created Tom Haverford and Jean-Ralphio Saperstein?",
                answer: "Entertainment 720",
                incorrectAnswers: ["Snake Lounge", "Tom's Bistro", "Sweetums"],
                firstImg: "assets/images/720.jpg",
                secondImg: "assets/images/720-2.jpeg"
            },
            {
                question: "Where was Jerry Gergich's favorite place to travel? ",
                answer: "Muncie",
                incorrectAnswers: ["Indianapolis", "Eagleton", "Naperville"],
                firstImg: "assets/images/jerry.jpg",
                secondImg: "assets/images/muncie.png"
            },
            {
                question: "What is the name of Pawnee's most visited park?",
                answer: "Ramsett Park",
                incorrectAnswers: ["Lot 42", "Tucker Park", "Pawnee Park"],
                firstImg: "assets/images/park.JPG",
                secondImg: "assets/images/ramsett.JPG"
            },
            {
                question: "What was the name of Ben Wyatt's hometown?",
                answer: "Partridge, MN",
                incorrectAnswers: ["Indianapolis, IN", "Peartree, OH", "Cincinnati, OH"],
                firstImg: "assets/images/icetown.jpg",
                secondImg: "assets/images/icetown2.jpg"
            },
            {
                question: "What substance flooded part of Pawnee after an explation at the Sweetums factory?",
                answer: "molasses",
                incorrectAnswers: ["corn syrup", "soda", "whipped cream"],
                firstImg: "assets/images/sweetums.jpg",
                secondImg: "assets/images/sweetums2.jpg"
            },
            {
                question: "Which of Donna Meagle's cousins was a famous R&B singer?",
                answer: "Ginuwine",
                incorrectAnswers: ["Timbaland", "Danja", "Jay-Z"],
                firstImg: "assets/images/donna.jpg",
                secondImg: "assets/images/ginuwine.jpg"
            },
            {
                question: "What character did Andy Dwyer turn into when performing for children?",
                answer: "Johnny Karate",
                incorrectAnswers: ["Max Kick", "Burt Maclan", "Rat Mouse"],
                firstImg: "assets/images/karate.jpg",
                secondImg: "assets/images/karate2.jpg"
            }
        ];


        // FUNCTIONS

        // Function below is Fisher-Yates Shuffle (https://bost.ocks.org/mike/shuffle)
        
        function shuffleQuestions() {

            var currentIndex = questionsAnswersArray.length,
                temporaryValue, randomIndex;

            // While there remain questions to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining question...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current question.
                temporaryValue = questionsAnswersArray[currentIndex];
                questionsAnswersArray[currentIndex] = questionsAnswersArray[randomIndex];
                questionsAnswersArray[randomIndex] = temporaryValue;
            }
        }

        // Function to animate each new question
        function spin() {
            $("#answer-choices, #question-img-box").addClass("slide-up");
        }

        // Timer
        var timer = {

            // Set timer to 10 seconds
            seconds: 10,

            // Count down
            decrement: function() {
                timer.seconds--;
                $("#time-remaining").html("&nbsp;&nbsp;" + timer.seconds);

                // Conditional to say "second" if timer is at 1
                if (timer.seconds === 1) {
                    $("#seconds").html("second");
                } else {
                    $("#seconds").text("seconds");
                }

                // Wrong answer if timer runs out
                if (timer.seconds === 0) {
                    incorrectCount++;
                    $("#" + correctAnswer).addClass("correct");
                    $("#right-wrong").html("<p>Oh No, Time's Up!</p><p>It was <span class='correct-text'>" + correctAnswer + "</span>.</p>");
                    timer.stop();
                    $("#answer-choices").removeClass("active");
                    $("#question-img-box").html(imgTwo);
                    setTimeout(displayQuestion, 3000);
                }
            },

            // Function to start / reset timer
            run: function() {

                clearInterval(intervalId);
                intervalId = setInterval(timer.decrement, 1000);

                // Displays timer in html
                $("#timer").html("Time remaining: <span id='time-remaining'>10</span> <span id='seconds'>seconds</span>");
                $("#time-remaining").text(10);
                timer.seconds = 10;
            },

            // Function to stop timer
            stop: function() {

                clearInterval(intervalId);
            }
        };

        // Function to display questions from questions array

        function displayQuestion() {

            // Animates each question 
            spin();

            // Conditional to stop when there are no questions left
            if (q < questionsAnswersArray.length) {

                // Clears previous content
                $("#current-question, #answer-choices, #question-img-box, #right-wrong").empty();
                timer.run();

                // Stores each question as current question
                currentQuestion = questionsAnswersArray[q].question;

                // Stores question images in variables
                imgOne = $("<img class='img-fluid'>").attr("src", questionsAnswersArray[q].firstImg);
                imgTwo = $("<img class='img-fluid'>").attr("src", questionsAnswersArray[q].secondImg);

                // Shows the current question in html
                $("#current-question").append("<h2>" + currentQuestion + "</h2>");
                $("#question-img-box").append(imgOne);

                // Stores answer choices in new array
                var answers = [];
                answers = [questionsAnswersArray[q].answer, questionsAnswersArray[q].incorrectAnswers[0], questionsAnswersArray[q].incorrectAnswers[1], questionsAnswersArray[q].incorrectAnswers[2]];

                // Shuffles answers in the array (Fisher-Yates Shuffle again)
                var currentIndex = answers.length,
                    temporaryValue, randomIndex;

                // While there remain answers to shuffle...
                while (0 !== currentIndex) {

                    // Pick a remaining answer...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;

                    // And swap it with the current answer.
                    temporaryValue = answers[currentIndex];
                    answers[currentIndex] = answers[randomIndex];
                    answers[randomIndex] = temporaryValue;
                }

                // Stores each correct answer in new variable
                correctAnswer = questionsAnswersArray[q].answer;

                // Makes answer choices enabled again
                $("#answer-choices").addClass("active");

                // Loops through shuffled array to create list items to show in html
                for (var i = 0; i < 4; i++) {
                    $("#answer-choices").append("<li class='answer-choice text-center' id='" + answers[i] + "'>" + answers[i] + "</li>");
                }

                // Increase question number by 1
                q++;

            // Ends game after no remaining questions
            } else {
                endGame();
            }
        }

        // Start game functions
        function startGame() {
            shuffleQuestions();
            displayQuestion();
        }

        // End game functions
        function endGame() {
            timer.stop();
            $("#current-question, #answer-choices, #timer, #right-wrong, #question-img-box").empty();
            $("#result-box").html("<button id='results' style='opacity:.75;'><i class='fa fa-calculator'></i> Click Here To See Your Results </button>");
        }

        // Results functions
        function results() {
            $(".result-count").append("<h2 class='mb-1'>Here Are Your Results</h2>").append("<p>Correct answers: " + correctCount + "</p>").append("<p>Incorrect answers: " + incorrectCount + "</p>");
            if (correctCount > 7) {
                $(".taly").append("<img class='img-fluid mt-3'l src='assets/images/leslie.jpg' alt='Leslie Knope' />");
                $(".result-count").append("<p class='mt-3'>You know as much as Leslie about Pawnee!</p>");

            } else if (correctCount > 3 & correctCount < 8) {
                $(".result-count").append("<img class='img-fluid mt-3' src='assets/images/treat.jpeg' alt='Treat Yo Self' />");
                $(".result-count").append("<p class='mt-3'>You need to treat yo'self to more trivia</p>");

            } else {
                $(".result-count").append("<img class='img-fluid mt-3' src='assets/images/gergich.png' alt='Jerry Gergich' />");
                $(".result-count").append("<p class='mt-3'>Oh no, you're a Jerry!</p>");
            }
        }


        // CLICK EVENTS

        // Answer guesses
        $(document).on("click", ".active .answer-choice", function() {
            timer.stop();
            userChoice = $(this).text();

            // Conditional if answer clicked is correct
            if (userChoice === correctAnswer) {
                correctCount++;
                $(this).addClass("correct");
                $("#right-wrong").html("<p class='correct-text'>YOU GOT IT!</p>");
                $("#answer-choices").removeClass("active");
                $("#question-img-box").html(imgTwo);
                setTimeout(displayQuestion, 2000);

            // Conditional if answer clicked is incorrect
            } else {
                incorrectCount++;
                $(this).addClass("wrong");
                $("#" + correctAnswer).addClass("correct");
                $("#right-wrong").html("<p>TOO BAD!</p><p>The correct answer is <span class='correct-text'>" + correctAnswer + "</span></p>");
                $("#answer-choices").removeClass("active");
                $("#question-img-box").html(imgTwo);
                setTimeout(displayQuestion, 2000);
            }
        });

        // Start game
        $("#start-game").on("click", function() {
            $(".header-container").hide();
            $("main").show();
            startGame();
        });

        // Results
        $(document).on("click", "#results", function() {
            $("#current-question").empty();
            $("main").hide();
            $(".endgame").show();
            results();
        });

        // Reset
        $(document).on("click", "#reset-game", function() {
            $(".result-count, #result-box").empty();
            $(".endgame").hide();
            $(".header-container").show();
            q = 0;
            correctCount = 0;
            incorrectCount = 0;
        });

    });
})();