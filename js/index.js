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
    $.each(data, function (i, tour) {
        var $distDiv = $(document.createElement('div'));
        $distDiv.addClass('col-md-7');
        var $distA = $(document.createElement('a'));
        $distA.attr('href', '#');
        var $distImg = $(document.createElement('img'));
        $distImg.addClass('img-responsive').attr('src', IMAGE_PATH + tour["distillery-image"]);
        var $descriptionDiv = $(document.createElement('div'));
        $descriptionDiv.addClass('col-md-5');
        var $whiskeyH3 = $(document.createElement('h3'));
        var $priceH4 = $(document.createElement('h4'));
        var $typeH4 = $(document.createElement('h4'));
        var $descriptionP = $(document.createElement('p'));

        $whiskeyH3.text(tour.whiskey);
        $priceH4.text(tour.price);
        $typeH4.text(tour.type);
        $descriptionP.text(tour.description);
        //appending image to a tag, then appending a to div, then appending new div with a and image to div row
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

//<div class="col-md-6">
//<img class="img-responsive" src="images/hibiki-12.jpg">
//<h1>The Whiskey</h1>
//<p>Colour:  Aurulent (Gold-Coloured) or Melichrous (Honey-like).  Maybe Luteous (Golden-yellow).</p>
//</div>
//<div class="col-md-6">
//<img class="img-responsive" src="images/osaka.jpg">
//<h1>The City</h1>
//<p>Description - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium veniam exercitationem expedita laborum at voluptate. Labore, voluptates totam at aut nemo deserunt rem magni pariatur quos perspiciatis atque eveniet unde.</p>
//</div>


var dropdown = function (data) {
    $.each(data, function (i, tour){

    })
};
 var tours;
$.ajax({
    url: "https://api.mongolab.com/api/1/databases/whiskey/collections/whiskies",
    data: {
        apiKey: "LVnHGETiXJi3beH77dTNrrgbN54PPtB1",
        q: "{whiskey: {$exists: true}}"
    },
    success: function(data) {
        tours = data;
    }
});
//I want the the tours object with my preloaded data to fade in over 1000 milliseconds once the scroll event listeners registers the position as greater than 200, and ONLY ONCE
$(window).on('scroll', function(e){
    if($(window).scrollTop() == 100) {
        listTabs(tours);
    }
});
