var add; 
var objs = [];
$(document).on("click", "#add", function(event) {
    event.preventDefault();
    add = $("input#input").val();
    getGiph();
    $("input#input").val('');
    
});
$(document).on("click", ".gif", function(event) {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

function getGiph() {
    var aKey = '&api_key=92vKLfVYVZ51WHhYfCVLwPZbuJurXFc1&limit=10';
    var url = 'http://api.giphy.com/v1/gifs/search?q=';
    $.ajax({
        url: url + add + aKey,
        method: "GET"
    }).then(function(giph){
        for (i = 0; i < 11; i ++) {
            objs[i] = giph.data[i];
        }
        create();
        create();
        console.log(objs[0]);
        console.log(objs[0].rating);
        console.log(objs[0].images);
        console.log(objs[0].images.original.url);
        console.log(objs[0].images.original_still.url);
    });
    
};

function create() {
    var newDivR = $("<div>").attr("class","row");
    $("#giphsA").empty();
    for (i = 0; i < 3; i ++ ) {
        var a = $("<img>").attr({
            class: 'gif',
            src: objs[i].images.original_still.url, 
            "data-still":objs[i].images.original_still.url,
            "data-animate":objs[i].images.original.url,
            "data-state": "still"
        });
        var b = $("<h5>").html("rating: " + objs[i].rating);
        var c = $("<div>").html(b);
        c.append(a);
        newDivR.append(c);
    }   
    $("#giphsA").append(newDivR);

}