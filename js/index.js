/**
 * Created by ken on 5/26/15.
 */
$(function() {
    $('#effect').hide();
    $('#button').on('click', function(){
        $('#effect').slideToggle(1000);
    })
});

var db = $.ajax({
    url: "https://api.mongolab.com/api/1/databases/whiskey/collections/tuesday",
    data: {
        apiKey: "LVnHGETiXJi3beH77dTNrrgbN54PPtB1",
        q: "{name: {$exists: true}}.sort({name: 1})"
    }
});

//$.each(db.responseJSON, function(tour){
//    console.log(tour.name);
//});
console.log(db);