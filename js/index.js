/*Created by ken on 5/26/15.*/
//$(document).ready(function(){
//    $.ajax({
//        url: "https://api.mongolab.com/api/1/databases/whiskey/collections/whiskies",
//        data: {
//            apiKey: "LVnHGETiXJi3beH77dTNrrgbN54PPtB1",
//            q: '{whiskey: "Hibiki"}'
//        },
//        success: function(data) {
//            displayTours(data);
//            var options = {
//                trigger : 'hover'
//            };
//            $('[data-toggle="popover"]').popover(options);
//            //$('#slideToggle').on('click', function(){
//            //    $('.myTarget').slideToggle(1000);
//            //});
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
            $('#carousel').hide(1000);
            $('#newContent').remove();
            displayTours(data);
            var options = {
                trigger : 'hover'
            };
            $('[data-toggle="popover"]').popover(options);
            //$('#slideToggle').unbind().click( function(){
            //    $('.target').slideToggle(1000);
            //})
            //var total = $('<h3>');
            //$('input:checkbox').on('change', function(){
            //    var price = 0;
            //    if(!$('input:checked').length){
            //        $('#cost > h3').remove();
            //    } else {
            //        $('#cost > h3').remove();
            //        $.each($('input:checked'), function(i, item){
            //            price += parseInt($(item).attr('value'));
            //            total.text('$' + price);
            //        });
            //        $('#cost').append(total);
            //    }
            //});
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
            $('.col-md-offset-4 > button, .content').remove();
            if(searchTerm.length >= 2){
                $('.tour, .target').remove();
                displayTours(data);
            }
            var options = {
                trigger : 'hover'
            };
            $('[data-toggle="popover"]').popover(options);
            //var total = $('<h3>');
            //$('input:checkbox').on('change', function(){
            //    var price = 0;
            //    if(!$('input:checked').length){
            //        $('#cost > h3').remove();
            //    } else {
            //        $.each($('input:checked'), function(i, item){
            //            price += parseInt($(item).attr('value'));
            //            total.text('$' + price);
            //        });
            //        $('#cost').append(total);
            //    }
            //});
        }
    })
});

var displayTours = function(data) {
    var IMAGE_PATH = 'images/';
    $.each(data, function (i, tour) {
        //intro row elements
        var $all = $('<div>').addClass('tour');
        var $tourDiv = $('<div>').addClass('content');
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
        //var $buttonDiv = $('<div>').addClass('col-md-offset-4 col-md-4');
        //var $button = $('<button>').attr('id', 'slideToggle')
        //    .addClass('btn btn-default btn-lg btn-block')
        //    .attr('type', 'button');
        //$button.text('Detailed Information');
        //$buttonDiv.append($button);

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
        $tourInfoSection.append($tourImg).append($tourName).append($tourDetails);
        $cityInfoSection.append($cityImg).append($cityName).append($locationDetails);

        //setting up form div
        var $activityDiv = $('<div>').addClass('row myForm');
        var $formDiv = $('<div>').addClass('col-md-offset-4 col-md-4');
        var $form = $('<form>');
        var $formH1 = $('<h1>').text('Sample Activities');

        $form.append($formH1);

        for (var k=0; k < tour.activity.length; k++) {
            var $checkDiv = $('<div>').addClass('checkbox');
            var $label = $('<label>').addClass('activity-box');
            var $input = $('<input>').attr('type', 'checkbox');
            var $inputA = $('<a>').attr('tabindex', k)
                .addClass('activity-title')
                .attr('role', 'button')
                .attr('data-toggle', 'popover')
                .attr('data-trigger', 'hover');
                $input.attr('value', tour.activity[k]["activity-cost"]);
                $inputA.attr('data-content', tour.activity[k]["activity-description"])
                    .text(tour.activity[k]["activity-name"]);
                $label.append($input).append($inputA);
                $checkDiv.append($label);
                $form.append($checkDiv);
            }

        $formDiv.append($form);
        $activityDiv.append($formDiv);
        //
        //var $budgetDiv = $('<div>').addClass('col-md-6');
        //var $budgetH1 = $('<h1>').text('Sample Budget');
        //var $budget = $('<div>').attr('id', 'cost');
        //
        //$budgetDiv.append($budgetH1).append($budget);
        //
        //$activityDiv.append($budgetDiv);

        //appending to the whole containing div
        $detailDiv.append($tourInfoSection)
            .append($cityInfoSection);

        $hiddenDiv.append($detailDiv).append($activityDiv);
        $all.append($tourDiv).append($hiddenDiv);

        //append from first element
        $('#appendHere').hide().append($all)
            .fadeIn();
        //add in below only if I want a button
        //.append($buttonDiv)
        var total = $('<h3>');
        $('input:checkbox').on('change', function(){
            var price = 0;
            if(!$('input:checked').length){
                $('#cost > h3').remove();
            } else {
                $('#cost > h3').remove();
                $.each($('input:checked'), function(i, item){
                    price += parseInt($(item).attr('value'));
                    total.text('Sample Budget: ' + '$' + price);
                });
                $('#cost').append(total);
            }
        });
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

//if(!$('#cost > h3').text().length){
//    $('#cost').hide();
//} else if ($('#cost > h3').text().length > 0){
//    $('#cost').show();
//}

