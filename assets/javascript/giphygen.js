var add; 
var objs = [];
$(document).on("click", "#add", function(event) {
    event.preventDefault();
    add = $("input#input").val();
    getGiph();
    $("input#input").val('');
    
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
        populate();
        console.log(objs[0]);
        console.log(objs[0].rating);
        console.log(objs[0].images);
        console.log(objs[0].images.downsized.url);
    });
    
};

function populate() {
    var newDivR = $("<div>").attr("class","row");
    var a = $("<img>").attr("src",objs[0].images.downsized_still.url);
    var b = $("<h5>").html("rating: " + objs[0].rating);
    var c = $("<div>").html(b);
    c.append(a);
    newDivR.html(c);
    $("#giphsA").empty();
    $("#giphsA").html(newDivR);

}