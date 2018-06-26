$(document).ready(function () {
    // An array of heroes, new heroes will be pushed into this array;
    var heroes = ["Captain America", "Loki", "Black Widow", "Thor"];

    // Creating Functions & Methods
    // Function that displays all gif buttons
    function displayGifButtons() {
        $("#gif-gallery").empty();
        for (var i = 0; i < heroes.length; i++) {
            var heroButton = $("<button>");
            heroButton.addClass("action");
            heroButton.addClass("button-holder")
            heroButton.attr("data-hero", heroes[i]);
            heroButton.text(heroes[i]);
            $("#gif-gallery").append(heroButton);
        }
    }
    // Function to add a new action button
    function addNewButton() {
        $("#addHero").on("click", function () {
            var action = $("#submit-hero").val().trim();
            if (action == "") {
                return false;
            }
            heroes.push(action);

            displayGifButtons();
            return false;
        });
    }
    // Function that displays all of the gifs
    function displayGifs() {
        var action = $(this).attr("data-hero");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=rh2cJimgYjXVqUaYIx03pVJarqNKrxFA&limit=5";
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
            .done(function (response) {
                $("#gifsView").empty();
                var results = response.data;
                console.log(response);
                if (results == "") {
                    alert("Who dis? No .gifs for this person... or, thing.");
                }
                for (var i = 0; i < results.length; i++) {

                    var gifDiv = $("<div>");
                    gifDiv.addClass("gifDiv");
                    var gifRating = $("<p>").text("Rating: " + results[i].rating);
                    gifDiv.append(gifRating);
                    gifRating.addClass("rating");
                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                    gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                    gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
                    gifImage.attr("data-state", "still");
                    gifImage.addClass("image");
                    gifDiv.append(gifImage);
                    $("#gifsView").prepend(gifDiv);
                }
            });
    }

    displayGifButtons();
    addNewButton();
  
    $(document).on("click", ".action", displayGifs);
    $(document).on("click", ".image", function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }
        else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
});