/**
 * Created by ken on 5/26/15.
 */
$(function() {
    $( "#accordion" ).accordion({ active: false , collapsible: true });
});

$(function() {
    $('a #accordion').on('click', function(){
        $('div #accordion').removeAttribute('display: none');
    })
});
//example of posting JSON data to page. Do not use for final code
var tours = {
    "whiskey": [
        {
            "name": "Hibiki",
            "location": "Osaka, Japan",
            "cost": "$80",
            "type": "Single-malt",
            "flavor": "Smooth",
            "tour": "Available"
        },
        {
            "name": "Jack Dainel's",
            "location": "Tennessee, USA",
            "cost": "$25",
            "type": "Bourbon",
            "flavor": "Sweet",
            "tour": "Available"
        }
    ]
};

$.each(tours.whiskey, function(i, whiskey){
    var div = document.createElement('div');
    var h2 = document.createElement('h2');
    var p = document.createElement('p');
    var title = document.createTextNode(whiskey.name);
    var loc = document.createTextNode(whiskey.location);
    var cost = document.createTextNode(whiskey.cost);
    var type = document.createTextNode(whiskey.type);
    var flavor = document.createTextNode(whiskey.flavor);
    var tour = document.createTextNode(whiskey.tour);

    p.appendChild(loc);
    p.appendChild(cost);
    p.appendChild(type);
    p.appendChild(flavor);
    p.appendChild(tour);
    h2.appendChild(title);
    div.appendChild(h2);
    div.appendChild(p);
});