/*Created by ken on 5/26/15.*/
$(document).ready(function(){
    $.ajax({
        url: "https://api.mongolab.com/api/1/databases/whiskey/collections/whiskies",
        data: {
            apiKey: "LVnHGETiXJi3beH77dTNrrgbN54PPtB1",
            q: '{whiskey: "Hibiki"}'
        },
        success: function(data) {
            displayTours(data);
        }
    });
    var options = {
        trigger : 'hover'
    };
    $('[data-toggle="popover"]').popover(options);
});

console.log($('[data-toggle="popover"]'));

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
            $('#carousel').hide(1000);
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
            $('#carousel').hide(1000);
            if(searchTerm.length >= 2){
                $('.tour, .target').remove();
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

        //button div
        var $buttonDiv = $('<div>').addClass('col-md-offset-4 col-md-4');
        var $button = $('<button>').attr('id', 'slideToggle')
            .addClass('btn btn-default btn-lg btn-block')
            .attr('type', 'button');
        $button.text('Detailed Information');
        $buttonDiv.append($button);

        //detail row elements
        var $hiddenDiv = $('<div>').addClass('myTarget');
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
        $tourInfoSection.append($tourImg).append($tourName).append($tourDetails);
        $cityInfoSection.append($cityImg).append($cityName).append($locationDetails);

        //setting up form div
        var $activityDiv = $('<div>').addClass('row myForm');
        var $formDiv = $('<div>').addClass('col-md-6');
        var $form = $('<form>');
        var $formH1 = $('<h1>').text('Sample Activities');

        $form.append($formH1);

        for (var k=0; k < tour.activity.length; k++) {
            var $checkDiv = $('<div>').addClass('checkbox');
            var $label = $('<label>').addClass('activity-box');
            var $input = $('<input>').attr('type', 'checkbox');
            var $inputA = $('<a>').addClass('activity-title')
                .attr('tabindex', k)
                .attr('role', 'button')
                .attr('data-toggle', 'popover')
                .attr('data-trigger', 'hover');
            $.each(tour.activity, function(i, act){
                $input.attr('value', act["activity-cost"]);
                $inputA.attr('data-content', act["activity-description"])
                    .text(act["activity-name"]);
            });
            $label.append($input).append($inputA);
            $checkDiv.append($label);
            $form.append($checkDiv);
        }

        $formDiv.append($form);
        $activityDiv.append($formDiv);

        //appending to the whole containing div
        $detailDiv.append($tourInfoSection)
            .append($cityInfoSection);

        $hiddenDiv.append($detailDiv).append($activityDiv);

        //append from first element
        $('#appendHere').hide().append($tourDiv)
            .append($buttonDiv)
            .append($hiddenDiv)
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

var total = $('<h3>');

$('input:checkbox').on('change', function(){
    var price = 0;
    if(!$('input:checked').length){
        $('#cost > h3').remove();
    } else {
        $.each($('input:checked'), function(i, item){
            price += parseInt($(item).attr('value'));
            total.text('$' + price);
        });
        $('#cost').append(total);
    }
});

$('#slideToggle').on('click', function(){
    $('.myTarget').slideToggle(1000);
});
