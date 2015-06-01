var tours = {
    "whiskey": [
        {
            "whiskey": "Hibiki",
            "type": "Single-malt",
            "flavor": "Sweet",
            "price": "$80",
            "location": "Japan",
            "description": "Slips down easier than a greased eel in an oilslick.  This is tremendous.  A hugely impressive feat of blending that proves, if there were any remaining doubt, that Japanese whisky can equal or beat anything produced in Scotland at this moment in time.",
            "location-details": "Osaka is a vibrant city full of great nightlife and good food, with nature and historical monuments nearby.",
            "tour-details": "This tour is available 9:30AM to 5:00PM everyday. Reservation required.",
            "activity-one": "Hiking",
            "activity-two": "Eating",
            "activity-three": "Drinking",
            "whiskey-image": "hibiki-12.jpg",
            "location-image": "osaka.jpg",
            "distillery-image": "yamazaki-dist.jpg"
        },
        {
            "whiskey": "Glenlivet",
            "type": "Single-malt Scotch",
            "flavor": "Sweet",
            "price": "$30",
            "location": "Scotland",
            "description": "There is a cereally brightness to the flavor, developing out of the initial burn with notes of vanilla, spices, and brown sugar. Reminds me of hot oatmeal with brown sugar and cinnamon. There is something Bourbon-like about the dry notes, like a corn syrupy sweetness instead of a malty one, but it is a pleasant sweetness.",
            "location-details": "Located in the Scottish highlands, you can enjoy the breathtaking Glens and Lochs that dot the Scottish countryside.",
            "tour-details": "Available from May 15 to November 15. Reservation required.",
            "activity-one": "Drink",
            "activity-two": "Eating",
            "activity-three": "Hikes",
            "whiskey-image": "glenlivet.jpg",
            "location-image": "ballindalloch.jpg",
            "distillery-image": "glenlivet-dist.jpg"
        },
        {
            "whiskey": "Jack Daniel's",
            "type": "Bourbon",
            "flavor": "Sweet",
            "price": "$20",
            "location": "USA",
            "description": "All in all, when tasting Jack Daniel's Black Label it becomes readily apparent why this whiskey is one of the top selling spirits in the world. Quality, consistency and approachability are the hallmarks of Jack Daniels and Black Label is the flagship marque for this famous company.",
            "location-details": "Nashville, TN, is a vibrant city filled with activities. Surrounded by beautiful nature, the city itself is host to a variety of country music and delicious BBQ.",
            "tour-details": "Free, and available year-round.",
            "activity-one": "Hiking",
            "activity-two": "Drinking",
            "activity-three": "Eating",
            "whiskey-image": "jack-daniels.jpg",
            "location-image": "nashville.jpg",
            "distillery-image": "jd-dist.jpg"
        },
        {
            "whiskey": "Kavalan",
            "type": "Single-malt Scotch",
            "flavor": "Sweet",
            "price": "$90",
            "location": "Taiwan",
            "description": "I get strong apple notes up front this time around, followed by healthy citrus character. Otherwise my notes mimic those I had in 2011. The palate drips with honey, balanced with modest toast-and-cereal notes, vanilla, and and touches of nougat. The finish brings a pleasant bit of fruit to the forefront before fading away. Straightforward, a bit rustic, and quite simple, it drinks like a young single malt Scotch, modest yet full of life. 80 proof.",
            "location-details": "Located in Taipei, the capital city of Taiwan. Taiwan is surrounded by beautiful mountains with great hiking and natural hot springs to relax in. At night, the city's markets come alive offering a wide range of delicious foods.",
            "tour-details": "Free, reservation required.",
            "activity-one": "Eating",
            "activity-two": "Drinking",
            "activity-three": "Hiking",
            "whiskey-image": "kavalan.jpg",
            "location-image": "shilin.jpg",
            "distillery-image": "yilan.jpg"
        }
    ]
};

$.each(tours.whiskey, function(i, whiskey) {
    console.log(whiskey);
    $.ajax({
            url: "https://api.mongolab.com/api/1/databases/whiskey/collections/whiskies?apiKey=LVnHGETiXJi3beH77dTNrrgbN54PPtB1",
            data: JSON.stringify(whiskey),
            type: "POST",
            contentType: "application/json"
        }
    );
});
