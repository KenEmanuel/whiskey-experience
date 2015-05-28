/**
 * Created by ken on 5/26/15.
 */
$(function() {
    $('#effect').hide();
    $('#button').on('click', function(){
        $('#effect').slideToggle(1000);
    })
});

$.ajax({
    url: "https://api.mongolab.com/api/1/databases/whiskey/collections/tuesday",
    data: {
        apiKey: "LVnHGETiXJi3beH77dTNrrgbN54PPtB1",
        q: "{name: 'Glinlevit'})"
    },
    success: function(data) {
        $.each(data, function (i, data) {
            $('h3').text(data.name);
            $('#price').text(data.cost);
            $('#type').text(data.type);
        })
    }
});


