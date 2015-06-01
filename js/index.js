/**
 * Created by ken on 5/26/15.
 */
var getTours = function(toursOffset, numOfTours) {
    $.ajax({
        url: "https://api.mongolab.com/api/1/databases/whiskey/collections/whiskies",
        data: {
            apiKey: "LVnHGETiXJi3beH77dTNrrgbN54PPtB1",
            q: "{whiskey: {$exists: true}}",
            sk: toursOffset,
            l: numOfTours
        },
        success: function(data) {
            displayTours(data);
        }
    });
};

var displayTours = function(data) {
    var IMAGE_PATH = 'images/';
    $.each(data, function (i, tour) {
        //intro row elements
        var $tourDiv = $('<div>').addClass('tour');
        var $distDiv = $('<div>').addClass('col-md-7');
        var $distA = $('<a>').attr('href', '#');
        var $distImg = $('<img>').addClass('img-responsive').attr('src', IMAGE_PATH + tour["distillery-image"]);
        var $descriptionDiv = $('<div>').addClass('col-md-5');
        var $whiskey = $('<h3>').text('Name: ' + tour.whiskey);
        var $price = $('<h4>').text('Price: ' + tour.price);
        var $type = $('<h4>').text('Type: ' + tour.type);
        var $flavor = $('<h4>').text('Flavor: ' + tour.flavor);
        var $description = $('<p>').text(tour.description);

        //appending intro image to a tag, then appending a to intro div
        $distDiv.append($distA.append($distImg));

        //appending intro description
        $.each([$whiskey, $type, $price, $flavor, $description], function (i, el){
            $descriptionDiv.append(el);
        });
        $tourDiv.append($distDiv).append($descriptionDiv);

        //detail row elements
        var $detailDiv = $('<div>').addClass('row');
        var $tourInfoDiv = $('<div>').addClass('col-md-6');
        var $cityInfoDiv = $('<div>').addClass('col-md-6');
        var $tourImg = $('<img>').addClass('img-responsive').attr('src', IMAGE_PATH + tour["whiskey-image"]);
        var $cityImg = $('<img>').addClass('img-responsive').attr('src', IMAGE_PATH + tour["location-image"]);
        var $tourH1 = $('<h1>').text(tour["distillery-name"]);
        var $cityH1 = $('<h1>').text(tour.location);

        //append from first element
        $('#appendHere').hide().append($tourDiv).fadeIn();
    });
};

//<!--<div class="col-md-6">-->
//<!--<img class="img-responsive" src="images/hibiki-12.jpg">-->
//<!--<h1>The Whiskey</h1>-->
//<!--<p>Colour:  Aurulent (Gold-Coloured) or Melichrous (Honey-like).  Maybe Luteous (Golden-yellow).</p>-->
//<!--</div>-->
//    <!--<div class="col-md-6">-->
//    <!--<img class="img-responsive" src="images/osaka.jpg">-->
//<!--<h1>The City</h1>-->
//<!--<p>Description - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium veniam exercitationem expedita laborum at voluptate. Labore, voluptates totam at aut nemo deserunt rem magni pariatur quos perspiciatis atque eveniet unde.</p>-->
//<!--</div>-->

$(window).on('scroll', function(){
    if($(window).scrollTop() + $(window).height() == $(document).height()) {
        //the first argument is the offset, the second argument is how many i want to load in
        getTours($('.tour').length, 4);
    }
});
