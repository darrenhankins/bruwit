$(document).ready(function() {

  // search-screen
  // buttons
  // brewery-list-screen
  // brewery-item-screen & beer-list-screen
  // beer-item-screen

    screenSelect('main');
    function hideAll() {
      $('.city-input').hide();
      $('.search-button').hide();
      $('.back-button').hide();
      $('.search-screen').hide();
      $('.brewery-list-screen').hide();
      $('.brewery-item-screen').hide();
      $('.beer-list-screen').hide();
      $('.beer-item-screen').hide();
    }
    window.prevState = "";

    function screenSelect(navState) {
      switch(navState){
        case 'main':
          console.log('navState= '+navState);
          $('select').material_select();
          $('.state-dropdown').val('');
          hideAll();
          $('.search-screen').show();
          // $('.brewery-list-screen').empty();
          break;
        case 'search':
          console.log('navState= '+navState);
          hideAll();
          $('.search-screen').show();
          $('.city-input').show();
          $('.search-button').show();
          break;
        case 'breweryList':
          console.log('navState= '+navState);
          hideAll();
          // $('.state-dropdown').val('');
          // $('.state-dropdown').hide();
          $('.back-button').show();
          $(".brewery-list-screen").show();
          window.backButton = 'search';
          break;
        case 'brewery':
          console.log('navState= '+navState);
          hideAll();
          $('.back-button').show();
          $('.brewery-item-screen').show();
          $('.beer-list-screen').show();
          window.backButton = 'breweryList';
          break;
        // case 'beersList':
        //   console.log('navState= '+navState);
        //   window.backButton = 'breweryList';
        //   break;
        case 'beer':
          console.log('navState= '+navState);
          hideAll();
          $('.back-button').show();
          $('.beer-item-screen').show();
          // $(".brewery-item-screen").empty();
          window.backButton = 'brewery';
          break;
      }
    }


    // BUTTONS
    $('select').change(function() {
        window.num = 0;
        screenSelect('search');
        // $('.city-input').show();
        // $('.search-button').show();
    });

    $('.search-button').click(function() {
        screenSelect('breweryList');
        // $('.state-dropdown').val('');
        // $('.state-dropdown').hide();
        // $('.city-input').hide();
        // $('.back-button').show();
        // $('.search-button').hide();
        // $('.search-screen').hide();
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
        getBreweryList(getLocations, 1);
    });

    $('.back-button').click(function() {
        window.num = 0;
        // $('.search-button').show();
        // $('.brewery-list-screen').empty();
        // $('.state-dropdown').val('');
        // $('.state-dropdown').show();
        // $('.city-input').show();
        // $('.back-button').hide();
        screenSelect("main");
        console.log("TEST");
    });

    // function goto(backButton) {
    //   screenSelect('main');
    // }

    function getBreweryInformationClickHandler() {
        $("a").click(function(event) {
            event.preventDefault();
            screenSelect('brewery');
            var id = $(this).attr('id');
            console.log("------> getBreweryInformationClickHandler: " + id);
            if (id){
              addBreweryInformation(id);
            } else{
              console.log("-----> ID not found.");
            }
            // $("a").off('click', getBreweryInformationClickHandler);
        });
    }

    function getBeerListClickHandler(){
      $("a").click(function(event) {
          event.preventDefault();
          // screenSelect('beer');
          var id = $(this).attr('id');
          console.log(id);
          addBeerList(id);
          $("a").off('click', getBeerListClickHandler);
      });
    }


    function getBreweryList(getLocations, page) {
        // $(".brewery-list-screen").show();
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
                    window.num += 1;
                    num = window.num;
                    // $(".brewery-list").append("<p>" + num + " <a href='' id='" + id + "'>" + name + "</a>, " + city + "</p>");
                    $(".brewery-list").append('<a href="#!" id="'+id+'" class="collection-item">'+name+', '+city+'</a>');
                    console.log(num + " " + name);
                }
                console.log("You're HERE 2!!!");
                getBreweryInformationClickHandler();
                window.bottomOfPage = false;
                console.log(window.bottomOfPage);
            }
        });
    }

    function addBreweryInformation(id) {
        // $('.brewery-item-screen').show();
        // $(".brewery-list-screen").hide();
        // $(".beer-info").hide();
        // $('.search-button').hide();
        // var url = 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/brewery/' + id + '/locations/?key=e69236fa88100168ab782a0069667bbc';
        var url = 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/brewery/' + id + '/?key=e69236fa88100168ab782a0069667bbc';

        console.log(url);
        console.log("BreweryID: ---------> "+id);
        getBeerList(id);

        $.get(url, function(data) {
            console.log(data);
            var name = data.data.name;
            if (data.data.website) {
                website = data.data.website;
            } else {
                website = "";
            }
            if (data.data.established) {
                est = data.data.established;
            } else {
                est = "N/A";
            }
            if (data.data.description) {
                desc = data.data.description;
            } else {
                desc = "N/A";
            }
            if (data.data.images) {
                img = data.data.images.squareMedium;
            } else {
                // img = 'http://placehold.it/250x250';

                img = './img/beer2-graphic.jpg';
            }

            // var address = data.streetAddress;
            // var locality = data.locality;
            // var region = data.region;
            // var searchAddress = address + ', ' + locality + ', ' + region;

            console.log(img);
            console.log(website);

            $(".brewery-image").append('<img class="activator" src="'+img+'">');
            $(".brewery-title").append('<span class="card-title activator grey-text text-darken-4 brewery-name">'+name+'<i class="material-icons right">more_vert</i></span><p><a href="'+website+'" target="_blank" >'+website+'</a></p>');
            $(".brewery-details").append('<span class="card-title grey-text text-darken-4">'+name+'<i class="material-icons right">close</i></span>'+
            '<p>Est: '+est+'</p>'+
            '<p>'+desc+'</p>');



            console.log("YOU .....Here!");
            // getBeerInformation();
            // $(".brewery-item-screen").append("<div><a href="">Contact Info:</a></div>");
            // $(".brewery-item-screen").append("<div><a href="">Show Beers</a></div>");
            // $(".brewery-item-screen").append("<div><a href='" + searchAddress + "'>" + searchAddress + "</a></div>");
        });
    }

    function getBeerList(id) {
        // $('.beer-item-screen').show();
        // $(".brewery-list-screen").empty();
        // $(".brewery-list-screen").hide();
        var getBeers = 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/brewery/' + id + '/beers/?key=e69236fa88100168ab782a0069667bbc';
        console.log("beerList: " + getBeers);

        $.get(getBeers, function(data) {
            data = data.data;
            console.log(data);

            if (!data) {
            // console.log("no data");
            // PRINT "NO BREWERIES in SPECIFIED LOCATION"
             } else {
                // $(".beer-list-screen").show();
                $(".beer-list-detail").append("<hr />");
                $(".beer-list-detail").append("<p>Beers:</p>");
                $(".beer-list-detail").append("<hr />");

                for (var i = 0; i < data.length; i++) {
                    var id = data[i].id;
                    var name = data[i].name;
                    console.log(name);

                    $(".beer-list-detail").append("<p><a href='#' id='"+id+"'>" + name + "</a></p>");
                }
                getBeerInformationClickHandler();
             }
        });
    }

    function getBeerInformationClickHandler(){
      $("a").click(function(event) {
          event.preventDefault();
          screenSelect('beer');
          var id = $(this).attr('id');
          console.log("BeerID ---------> "+id);
          getBeerInformation(id);
          // $(".brewery-item-screen").empty();

          $("a").off('click', getBeerInformationClickHandler);
      });
    }

    function getBeerInformation(id) {
        // $(".beer-list-screen").hide();
        // $(".beer-info").show();

        // var url = 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/brewery/' + id + '/locations/?key=e69236fa88100168ab782a0069667bbc';
        // var url = 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/brewery/' + id + '/?key=e69236fa88100168ab782a0069667bbc';
        var url = 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/beer/'+id+'/?key=e69236fa88100168ab782a0069667bbc';
        console.log(url);

        $.get(url, function(data) {
          console.log("heeeeerrreERE")
            console.log(data);
            if (data.data.name){
                var name = data.data.name;
            } else {
                var name = "N/A";
            }
            if (data.data.description){
              var desc = data.data.description;
            } else {
              var desc = "N/A";
            }
            if (data.data.abv){
              var abv = data.data.abv;
            } else {
              var abv = "N/A";
            }
            if (data.data.style.shortName){
              var style = data.data.style.shortName;
            } else {
              var style = "N/A";
            }
            if (data.data.available && data.data.available.name){
              var available = data.data.available.name;
            } else {
              var available = "N/A";
            }
            if (data.data.labels && data.data.labels.medium){
              var label = data.data.labels.medium;
            } else {
              var label = './img/beer3-graphic.png';
              // var label = 'http://placehold.it/250x250';

            }
            $(".beer-label").append("<img src='" + label + "'><br>");
            $(".beer-info").append("<div>Name: " + name + "</div><br>");
            $(".beer-info").append("<div>Style: " + style + "</div><br>");
            $(".beer-info").append("<div>Alcohol Per Volume: " + abv + "</div><br>")
            $(".beer-info").append("<div>Available: " + available + "</div><br>")
            $(".beer-info").append("<div>Description: " + desc + "</div>")



            // $(".brewery-item-screen").append("<div>Web: <a href='" + website + "' target='_blank'>" + website + "</a></div>");
            // getBeerList(id);
            // $(".brewery-item-screen").append("<div><a href="">Contact Info:</a></div>");
            // $(".brewery-item-screen").append("<div><a href="">Show Beers</a></div>");
            // $(".brewery-item-screen").append("<div><a href='" + searchAddress + "'>" + searchAddress + "</a></div>");
        });
    }


    window.bottomOfPage = false;
    $(window).scroll(function() {
        // console.log("windowScroll: "+$(window).scrollTop());
        // console.log("documentHeight: "+$(document).height());
        // console.log("windowHeight: "+$(window).height());
        // console.log("document-WindowHeight-10: "+($(document).height() - $(window).height() - 10));

        // -10 indicates how far away from end of page user must be before function executes. This gives you the flexibility to adjust the behavior as needed.
        if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
            if ($(".brewery-list-screen").is(":visible")) {
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
                    console.log("You're HERE!!!");
                    getBreweryList(getLocations, window.currentPage);
                }
            }
        }
    });

});
