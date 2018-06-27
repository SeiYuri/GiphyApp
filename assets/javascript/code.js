$(document).ready(function () {
    var heroes = ["Captain America", "Loki", "Black Widow", "Thor"];

    function displayGifButtons() {
        $("#gif-gallery").empty();
        for (var i = 0; i < heroes.length; i++) {
            var heroButton = $("<button>");
            heroButton.addClass("newHero");
            heroButton.addClass("button-holder")
            heroButton.attr("data-hero", heroes[i]);
            heroButton.text(heroes[i]);
            $("#gif-gallery").append(heroButton);
        }
    }
    function addNewButton() {
        $("#addHero").on("click", function () {
            var newHero = $("#submit-hero").val().trim();
            if (newHero == "") {
                return false;
            }
            heroes.push(newHero);

            displayGifButtons();
            return false;
        });
    }
    function displayGifs() {
        var newHero = $(this).attr("data-hero");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newHero + "&api_key=rh2cJimgYjXVqUaYIx03pVJarqNKrxFA&limit=5";
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
  
    $(document).on("click", ".newHero", displayGifs);
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