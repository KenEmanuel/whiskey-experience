/*Created by ken on 5/26/15.*/
$(document).ready(function(){
    if($(window).scrollTop() + $(window).height() == $(document).height()){
        var $newHeight = $(document).height();
        $('body').css('height', $newHeight + 3);
    }
});

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
            $('#newContent').remove();
            displayTours(data);
            var options = {
                trigger : 'hover'
            };
            $('[data-toggle="popover"]').popover(options);
        },
        complete: function() {
            $('#carousel').hide(1000);
        }
    })
};

$('#tags').on('keypress', function(){
    var searchTerm = $('#tags').val();
    $('#carousel').hide(1000);
    $('#newContent').remove();
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

            $('.col-md-offset-4 > button, .content').remove();
            if(searchTerm.length >= 2){
                $('.tour, .target').remove();
                displayTours(data);
            }
            var options = {
                trigger : 'hover'
            };
            $('[data-toggle="popover"]').popover(options);
        }
    })
});

var displayTours = function(data) {
    var IMAGE_PATH = 'images/';
    $.each(data, function (i, tour) {
        //intro row elements
        var $all = $('<div>').addClass('tour');
        var $tourDiv = $('<div>');
        var $distDiv = $('<div>').addClass('col-md-7');
        var $distA = $('<a>').attr('href', '#');
        var $distImg = $('<img>').addClass('img-responsive').attr('src', IMAGE_PATH + tour["whiskey-image"]);
        var $descriptionDiv = $('<div>').addClass('col-md-5');
        var $whiskey = $('<h3>').text(tour.whiskey);
        var $price = $('<h4>').text('MSRP: ' + tour.price);
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
        var $hiddenDiv = $('<div>').addClass('target');
        var $detailDiv = $('<div>').addClass('row');
        var $tourInfoSection = $('<div>').addClass('col-md-6');
        var $cityInfoSection = $('<div>').addClass('col-md-6');
        var $tourImg = $('<img>').addClass('img-responsive')
            .attr('src', IMAGE_PATH + tour["distillery-image"]);
        var $cityImg = $('<img>').addClass('img-responsive')
            .attr('src', IMAGE_PATH + tour["location-image"]);
        var $tourName = $('<h1>').text(tour["distillery-name"]);
        var $cityName = $('<h1>').text(tour.location);
        var $tourDetails = $('<p>').addClass('details')
            .text(tour["tour-details"]);
        var $locationDetails = $('<p>').addClass('details')
            .text(tour["location-details"]);
        //setting up the detail section
        $tourInfoSection.append($tourName).append($tourImg).append($tourDetails);
        $cityInfoSection.append($cityName).append($cityImg).append($locationDetails);

        $detailDiv.append($tourInfoSection)
            .append($cityInfoSection);

        $hiddenDiv.append($detailDiv);
        $all.append($tourDiv).append($hiddenDiv);

        //append from first element
        $('#appendHere').hide().append($all)
            .fadeIn();
    });
};

$(window).on('scroll', function(){
    if($(window).scrollTop() + $(window).height() == $(document).height()) {
        var empty = $('#tags').val();
        if(empty == '') {
            getTours($('.tour').length, 4);
        }
    }
});