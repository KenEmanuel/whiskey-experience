/*Created by ken on 5/26/15.*/
$(document).ready(function() {

    var displayTours = function(data) {
        var IMAGE_PATH = 'images/';
        $.each(data, function (i, tour) {
            //intro row elements
            var $all = $('<div>').addClass('tour');
            var $tour = $('<div>');
            var $distillery = $('<div>').addClass('col-md-7');
            var $distilleryImg = $('<img>').addClass('img-responsive')
                .attr('src', IMAGE_PATH + tour["whiskey-image"]);
            var $description = $('<div>').addClass('col-md-5');
            var $whiskey = $('<h1>').text(tour.whiskey);
            var $price = $('<h4>').text('MSRP: ' + tour.price);
            var $type = $('<h4>').text('Type: ' + tour.type);
            var $flavor = $('<h4>').text('Flavor: ' + tour.flavor);
            var $descriptionText = $('<p>').text(tour.description);
            //appending intro content
            $distillery.append($distilleryImg);
            $.each([$whiskey, $type, $price, $flavor, $descriptionText],
                function (i, el) {
                    $description.append(el);
                });
            $tour.append($distillery).append($description);
            //detail row elements
            var $target = $('<div>').addClass('target');
            var $detail = $('<div>').addClass('row');
            var $tourInfo = $('<div>').addClass('col-md-6');
            var $cityInfo = $('<div>').addClass('col-md-6');
            var $tourImg = $('<img>').addClass('img-responsive')
                .attr('src', IMAGE_PATH + tour["distillery-image"]);
            var $cityImg = $('<img>').addClass('img-responsive')
                .attr('src', IMAGE_PATH + tour["location-image"]);
            var $tourName = $('<h3>').text(tour["distillery-name"]);
            var $cityName = $('<h3>').text(tour.location);
            var $tourDetails = $('<p>').addClass('details')
                .text(tour["tour-details"]);
            var $locationDetails = $('<p>').addClass('details')
                .text(tour["location-details"]);
            //appending detail content
            $tourInfo.append($tourName)
                .append($tourImg)
                .append($tourDetails);
            $cityInfo.append($cityName)
                .append($cityImg)
                .append($locationDetails);
            $detail.append($tourInfo)
                .append($cityInfo);
            $target.append($detail);
            $all.append($tour)
                .append($target);
            //append from first element
            $('#mainContent').hide()
                .append($all)
                .fadeIn();
        });
    };

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
            },
            complete: function() {
                $('#carousel').hide(1000);
            }
        })
    };

    $('#search').on('keypress', function() {
        var searchTerm = $('#search').val();
        $('#carousel').hide(1000);
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
                if(searchTerm.length >= 2) {
                    $('.tour').remove();
                    displayTours(data);
                }
            }
        })
    });

    $(window).on('scroll', function() {
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
            var search = $('#search').val();
            if(search == '') {
                getTours($('.tour').length, 4);
            }
        }
    });

    var $newHeight = $(document).height();
    $('body').css('height', $newHeight + 30);
});