$(document).ready(function() {



    // var url = 'http://api.brewerydb.com/v2/'+'locations/?'+'key=e69236fa88100168ab782a0069667bbc&'+'locality=denver';
    //  var getLocationsByCity = 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/locations/?key=e69236fa88100168ab782a0069667bbc&locality=denver';
    //  var getLocationsByState = 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/locations/?key=e69236fa88100168ab782a0069667bbc&region=colorado&locality=milliken';

    // var url = 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/brewery/xkRG5v/?key=e69236fa88100168ab782a0069667bbc'

    stateSelect();

    $('select').change(function() {
        window.num = 0;

        $('.city-input').show();
        $('.back').show();
        $('.data').show();
    });

    $('.data').click(function() {
        $('.state-input').val('');
        $('.state-input').hide();
        $('.city-input').hide();
        $('.back').show();
        $('.data').hide();


        var state = $('#state').val();
        var city = $('#city').val();
        console.log("State: " + state);
        console.log("City: " + city);
        if (!city) {
            var getLocations = 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/locations/?key=e69236fa88100168ab782a0069667bbc&region=' + state;
        } else {
            var getLocations = 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/locations/?key=e69236fa88100168ab782a0069667bbc&region=' + state + '&locality=' + city;
        }
        window.currentPage = 1;
        getDataLocations(getLocations, 1);
    });


    function addClickHandler() {
        $("a").click(function(event) {
            event.preventDefault();
            var id = $(this).attr('id');
            console.log("addClickHandler: " + id);
            addBreweryInfo(id);
        });
    }

    // function addContactInfoClickHandler() {
    //     $("a").click(function(event) {
    //         event.preventDefault();
    //         var id = $(this).attr('id');
    //         console.log(id);
    //         addBreweryInfo(id);
    //     });
    // }

    // function getBeerListClickHandler(){
    //   $("a").click(function(event) {
    //       event.preventDefault();
    //       var id = $(this).attr('id');
    //       console.log(id);
    //       addBeerList(id);
    //   });
    // }

    function getBeerList(id) {
        $(".list").empty();
        $(".list").hide();
        var getBeers = 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/brewery/' + id + '/beers/?key=e69236fa88100168ab782a0069667bbc';
        console.log("beerList: " + getBeers);

        $.get(getBeers, function(data) {
            data = data.data;
            console.log(data);

            // if (!data.name) {
            // console.log("no data");
            // PRINT "NO BREWERIES in SPECIFIED LOCATION"

            // } else {
            $(".beer-list").show();
            $(".beer-list").append("<hr />");
            $(".beer-list").append("<p>Beers:</p>");
            $(".beer-list").append("<hr />");
            for (var i = 0; i < data.length; i++) {
                var id = data[i].id;
                var name = data[i].name;
                console.log(name);

                // PRINT out initital list
                // window.num += 1;
                // num = window.num;
                $(".beer-list").append("<p><a href=''>" + name + "</a></p>");
                // console.log(num + " " + name);
            }
            // }
            //
            // getBeerListClickHandler();
            // window.bottomOfPage = false;
            // console.log(window.bottomOfPage);
        });
    }

    function addBreweryInfo(id) {
        $(".list").hide();
        $('.data').hide();
        // var url = 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/brewery/' + id + '/locations/?key=e69236fa88100168ab782a0069667bbc';
        var url = 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/brewery/' + id + '/?key=e69236fa88100168ab782a0069667bbc';

        console.log(url);

        $.get(url, function(data) {
            console.log(data);
            var name = data.data.name;
            if (data.data.website) {
                var website = data.data.website;
            } else {
                var website = "";
            }
            if (data.data.established) {
                var est = data.data.established;
            } else {
                var est = "N/A";
            }
            if (data.data.images) {
                var img = data.data.images.squareMedium;
            } else {
                img = 'http://placehold.it/250x250';
            }

            var address = data.streetAddress;
            var locality = data.locality;
            var region = data.region;
            var searchAddress = address + ', ' + locality + ', ' + region;

            console.log(img);
            console.log(website);

            $(".brewery").append("<div><img src='" + img + "'></div>");
            $(".brewery").append("<div>Est: " + est + "</div>");
            $(".brewery").append("<div>Name: " + name + "</div>");
            $(".brewery").append("<div>Web: <a href='" + website + "' target='_blank'>" + website + "</a></div>");
            getBeerList(id);
            // $(".brewery").append("<div><a href="">Contact Info:</a></div>");
            // $(".brewery").append("<div><a href="">Show Beers</a></div>");
            // $(".brewery").append("<div><a href='" + searchAddress + "'>" + searchAddress + "</a></div>");
        });
    }

    $('.back').click(function() {
        stateSelect();
        $(".list").empty();
        $('.state-input').val('');
        $('.state-input').show();
        $('.city-input').show();
        $('.data').show();
        window.num = 0;

    });

    function stateSelect() {
        $('select').material_select();
        $('.city-input').hide();
        $('.back').hide();
        $('.data').hide();
    }

    window.bottomOfPage = false;
    $(window).scroll(function() {
        // console.log("windowScroll: "+$(window).scrollTop());
        // console.log("documentHeight: "+$(document).height());
        // console.log("windowHeight: "+$(window).height());
        // console.log("document-WindowHeight-10: "+($(document).height() - $(window).height() - 10));

        // -10 indicates how far away from end of page user must be before function executes. This gives you the flexibility to adjust the behavior as needed.
        if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
            if ($(".list").is(":visible")) {
                if (!window.bottomOfPage) {
                    window.bottomOfPage = true;
                    console.log(window.bottomOfPage);
                    var state = $('#state').val();
                    var city = $('#city').val();
                    console.log("State: " + state);
                    console.log("City: " + city);
                    window.currentPage += 1;
                    if (!city) {
                        var getLocations = 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/locations/?key=e69236fa88100168ab782a0069667bbc&region=' + state;
                    } else {
                        var getLocations = 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/locations/?key=e69236fa88100168ab782a0069667bbc&region=' + state + '&locality=' + city;
                    }
                    getDataLocations(getLocations, window.currentPage);
                }
            }
        }
    });


    function getDataLocations(getLocations, page) {
        var getLocations = getLocations + "&p=" + page;
        $.get(getLocations, function(dataInit) {

            var currentPage = dataInit.currentPage;
            var totalPages = dataInit.numberOfPages;
            console.log(dataInit);
            console.log("Current Page: " + dataInit.currentPage);
            console.log("Total Page: " + dataInit.numberOfPages);

            if (!dataInit.data) {
                console.log("no data");
                // PRINT "NO BREWERIES in SPECIFIED LOCATION"

            } else {
                data = dataInit.data;
                for (var i = 0; i < data.length; i++) {
                    var id = data[i].brewery.id;
                    var name = data[i].brewery.name;
                    var city = data[i].locality;

                    // PRINT out initital list
                    window.num += 1;
                    num = window.num;
                    $(".list").append("<p>" + num + " <a href='' id='" + id + "'>" + name + "</a>, " + city + "</p>");
                    console.log(num + " " + name);

                }
                addClickHandler();
                window.bottomOfPage = false;
                console.log(window.bottomOfPage);
            }
        });
    }

    function getBreweryId(url) {
        $.get(url, function(data) {
            console.log(data);

        });
    }


});
