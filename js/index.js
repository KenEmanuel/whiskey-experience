/**
 * Created by ken on 5/26/15.
 */
//$(document).ready(function(){
//    $.ajax({
//        url: "https://api.mongolab.com/api/1/databases/whiskey/collections/whiskies",
//        data: {
//            apiKey: "LVnHGETiXJi3beH77dTNrrgbN54PPtB1",
//            q: '{whiskey: "Glenlivet"}'
//        },
//        success: function(data) {
//            displayTours(data);
//        }
//    })
//});

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
    })
};

$('#tags').on('keypress', function(){
    var searchTerm = $('#tags').val();
    $.ajax({
        url: "https://api.mongolab.com/api/1/databases/whiskey/collections/whiskies",
        data: {
            apiKey: "LVnHGETiXJi3beH77dTNrrgbN54PPtB1",
            q: '{$or: [' +
            '{whiskey: {$regex: "' + searchTerm + '", $options: "i"}},' +
            '{location: {$regex: "' + searchTerm + '", $options: "i"}},' +
            '{price: {$regex: "' + searchTerm + '", $options: "i"}},' +
            '{type: {$regex: "' + searchTerm + '", $options: "i"}},' +
            '{flavor: {$regex: "' + searchTerm + '", $options: "i"}}' +
            ']' +
            '}'
        },
        success: function(data) {
            if(searchTerm.length >= 2){
                $('.tour, .target').detach();
                displayTours(data);
            }
        }
    })
});

var displayTours = function(data) {
    var IMAGE_PATH = 'images/';
    $.each(data, function (i, tour) {
        //intro row elements
        var $tourDiv = $('<div>').addClass('tour');
        var $distDiv = $('<div>').addClass('col-md-7');
        var $distA = $('<a>').attr('href', '#');
        var $distImg = $('<img>').addClass('img-responsive').attr('src', IMAGE_PATH + tour["whiskey-image"]);
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
        var $detailDiv = $('<div>').addClass('row target');
        var $tourInfoSection = $('<div>').addClass('col-md-5 col-md-offset-1');
        var $cityInfoSection = $('<div>').addClass('col-md-5');
        var $tourImg = $('<img>').addClass('img-responsive')
            .attr('src', IMAGE_PATH + tour["distillery-image"]);
        var $cityImg = $('<img>').addClass('img-responsive')
            .attr('src', IMAGE_PATH + tour["location-image"]);
        var $tourName = $('<h1>').text(tour["distillery-name"]);
        var $cityName = $('<h1>').text(tour.location);
        var $tourDetails = $('<p>').text(tour["tour-details"]);
        var $locationDetails = $('<p>').text(tour["location-details"]);

        $tourInfoSection.append($tourImg).append($tourName).append($tourDetails);
        $cityInfoSection.append($cityImg).append($cityName).append($locationDetails);
        $detailDiv.append($tourInfoSection).append($cityInfoSection);

        //append from first element
        $('#appendHere').hide().append($tourDiv).append($detailDiv).fadeIn();
    });
};

$(window).on('scroll', function(){
    if($(window).scrollTop() + $(window).height() == $(document).height()) {
        var empty = $('#tags').val();
        if(empty == '') {
            //second if statement checks if search field has value. If not, the default ajax requests happens
            getTours($('.tour').length, 4);
        }
    }
});


