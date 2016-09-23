
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();

    var address = streetStr + ", " + cityStr;

    var streetViewUrl = "http://maps.googleapis.com/maps/api/"
    +"streetview?size=600x400&"
    +"location="+ address
    +"&key=AIzaSyBcq3tXrgu0YImQVgBd_YYpt2e_BjzOYWw";

    $greeting.text('So you want to live in ' + address);

    $body.append('<img class="bgimg" src="' + streetViewUrl + '">');

    var nytUrl =  "https://api.nytimes.com/svc/search/v2/articlesearch.json?"
                    +"q=" + cityStr + "&sort=newest&api-key?ce75a359dc0643059d0cd352c349d412"



    $.getJSON( nytUrl, function (data) {
        $nytHeaderElem.text('New York Times Articles About ' + cityStr);

        articles = data.response.docs;
        for (var i = articles.length - 1; i >= 0; i--) {
            var article = articles[i];
            $nytElem.append(
                '<li class="article">'
                +   '<a href="' + article.web_url + ' "> ' + article.headline.main
                +       '</a>'
                +   '<p>' + article.snippet + '</p>'
                +'</li>');
        };
    } );

    return false;
};

$('#form-container').submit(loadData);
