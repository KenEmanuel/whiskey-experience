/**
 * Created by ken on 5/26/15.
 */
$(function() {
    $('#effect').hide();
    $('#button').on('click', function(){
        $('#effect').slideToggle(1000);
    })
});

var IMAGE_PATH = 'images/';

var listTabs = function(data) {
    $.each(data, function (i, data) {
        var $distDiv = $(document.createElement('div'));
        $distDiv.addClass('col-md-7');
        var $distA = $(document.createElement('a'));
        $distA.attr('href', '#');
        var $distImg = $(document.createElement('img'));
        $distImg.addClass('img-responsive').attr('src', IMAGE_PATH + data["distillery-image"]);
        var $descriptionDiv = $(document.createElement('div'));
        $descriptionDiv.addClass('col-md-5');
        var $whiskeyH3 = $(document.createElement('h3'));
        var $priceH4 = $(document.createElement('h4'));
        var $typeH4 = $(document.createElement('h4'));
        var $descriptionP = $(document.createElement('p'));

        $whiskeyH3.text(data.whiskey);
        $priceH4.text(data.price);
        $typeH4.text(data.type);
        $descriptionP.text(data.description);
        //appending image to a tag, then appending a to div, then prepending new div with a and image to div row
        $distA.append($distImg);
        $distDiv.append($distA);
        $('#appendHere').append($distDiv);
        //appending description. append from first element
        $descriptionDiv.append($whiskeyH3);
        $descriptionDiv.append($typeH4);
        $descriptionDiv.append($priceH4);
        $descriptionDiv.append($descriptionP);
        $('#appendHere').append($descriptionDiv);
    })
};

$.ajax({
    url: "https://api.mongolab.com/api/1/databases/whiskey/collections/whiskies",
    data: {
        apiKey: "LVnHGETiXJi3beH77dTNrrgbN54PPtB1",
        q: "{whiskey: {$exists: true}}"
    },
    success: listTabs(data)
});


