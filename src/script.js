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

      $('.brewery-list').empty();
      $('.beer-list-detail').empty();
      $('.beer-label').empty();
      $('.beer-info').empty();
      $('.brewery-image').empty();
      $('.brewery-title').empty();
      $('.brewery-details').empty();
    }

    function screenSelect(navState) {
      switch(navState){
        case 'main':
          console.log('navState= '+navState);
          hideAll();
          $('select').material_select();
          $('.state-dropdown').val('');
          $('.search-screen').show();
          break;
        case 'search':
          console.log('navState= '+navState);
          console.log('STOP');
          hideAll();
          $('.search-screen').show();
          $('.city-input').show();
          $('.search-button').show();
          window.num = 0;
          break;
        case 'breweryList':
          console.log('navState= '+navState);
          hideAll();
          $('.back-button').show();
          $(".brewery-list-screen").show();
          var state = $('#state').val();
          var city = $('#city').val();
          if (!city) {
              var getLocations = 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/locations/?key=e69236fa88100168ab782a0069667bbc&region=' + state;
          } else {
              var getLocations = 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/locations/?key=e69236fa88100168ab782a0069667bbc&region=' + state + '&locality=' + city;
          }
          getBreweryList(getLocations, 1);
          window.currentPage = 1;
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
        case 'beer':
          console.log('navState= '+navState);
          hideAll();
          $('.back-button').show();
          $('.beer-item-screen').show();
          $(".brewery-item-screen").empty();
          window.backButton = 'brewery';
          break;
      }
    }

    $('select').change(function() {
        screenSelect('search');
    });

    $('.search-button').click(function() {
        screenSelect('breweryList');
    });

    $('.back-button').click(function() {
        window.num = 0;
        screenSelect(window.backButton);
    });

    function getBreweryInformationClickHandler() {
        // $('a').click(function(event) {
        $('.get-brewery-info').click(function(event) {
            console.log("THIs has run");
            event.preventDefault();
            console.log("You're here");
            screenSelect('brewery');
            var id = $(this).attr('id');
            if (id){
              addBreweryInformation(id);
            } else{
            }
            // $("a").off('click', getBreweryInformationClickHandler);
            $('.get-brewery-info').off('click', getBreweryInformationClickHandler);
        });
    }

    function getBeerListClickHandler(){
      $('.get-beer-list').click(function(event) {
          event.preventDefault();
          var id = $(this).attr('id');
          addBeerList(id);
          $('.get-beer-list').off('click', getBeerListClickHandler);
      });
    }


    function getBreweryList(getLocations, page) {
        var getLocations = getLocations + "&p=" + page;
        $.get(getLocations, function(dataInit) {

            var currentPage = dataInit.currentPage;
            var totalPages = dataInit.numberOfPages;
            if (!dataInit.data) {
                console.log("no data");
            } else {
                data = dataInit.data;
                for (var i = 0; i < data.length; i++) {
                    var id = data[i].brewery.id;
                    var name = data[i].brewery.name;
                    var city = data[i].locality;
                    window.num += 1;
                    num = window.num;
                    $(".brewery-list").append('<a href="#!" id="'+id+'" class="collection-item get-brewery-info">'+name+', '+city+'</a>');
                }
                getBreweryInformationClickHandler();
                console.log("just got here");
                window.bottomOfPage = false;
            }
        });
    }

    function addBreweryInformation(id) {
        var url = 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/brewery/' + id + '/?key=e69236fa88100168ab782a0069667bbc';
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
                img = './img/beer2-graphic.jpg';
            }
            $(".brewery-image").append('<img class="activator" src="'+img+'">');
            // $(".brewery-title").append('<span class="card-title activator grey-text text-darken-4 brewery-name">'+name+'<i class="material-icons right">more_vert</i></span><p><a href="'+website+'" target="_blank" >'+website+'</a></p>');
            $(".brewery-title").append('<span class="card-title activator grey-text text-darken-4 brewery-name">'+name+'<i class="material-icons right">more_vert</i></span>');
            $(".brewery-details").append('<span class="card-title grey-text text-darken-4">'+name+'<i class="material-icons right">close</i></span>'+
            '<p>Est: '+est+'</p>'+
            '<p>'+desc+'</p>');
        });
    }

    function getBeerList(id) {
        var getBeers = 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/brewery/' + id + '/beers/?key=e69236fa88100168ab782a0069667bbc';
        $.get(getBeers, function(data) {
            data = data.data;
            if (!data) {
            } else {
                $(".beer-list-detail").append("<hr />");
                $(".beer-list-detail").append("<p>Beers:</p>");
                $(".beer-list-detail").append("<hr />");
                for (var i = 0; i < data.length; i++) {
                    var id = data[i].id;
                    var name = data[i].name;
                    $(".beer-list-detail").append("<p><a href='#' id='"+id+" class='.get-beer-list'>" + name + "</a></p>");
                }
                getBeerInformationClickHandler();
             }
        });
    }

    function getBeerInformationClickHandler(){
      $('.get-beer-list').click(function(event) {
          event.preventDefault();
          screenSelect('beer');
          var id = $(this).attr('id');
          console.log("HEEEEEEERE");
          getBeerInformation(id);
          $('.get-beer-list').off('click', getBeerInformationClickHandler);
      });
    }

    function getBeerInformation(id) {
        var url = 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/beer/'+id+'/?key=e69236fa88100168ab782a0069667bbc';

        $.get(url, function(data) {
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
            }
            $(".beer-label").append("<img src='" + label + "'><br>");
            $(".beer-info").append("<div>Name: " + name + "</div><br>");
            $(".beer-info").append("<div>Style: " + style + "</div><br>");
            $(".beer-info").append("<div>Alcohol Per Volume: " + abv + "</div><br>")
            $(".beer-info").append("<div>Available: " + available + "</div><br>")
            $(".beer-info").append("<div>Description: " + desc + "</div>")
        });
    }


    window.bottomOfPage = false;
    $(window).scroll(function() {
      if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
            if ($(".brewery-list-screen").is(":visible")) {
                if (!window.bottomOfPage) {
                    window.bottomOfPage = true;
                    var state = $('#state').val();
                    var city = $('#city').val();
                    window.currentPage += 1;
                    if (!city) {
                        var getLocations = 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/locations/?key=e69236fa88100168ab782a0069667bbc&region=' + state;
                    } else {
                        var getLocations = 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/locations/?key=e69236fa88100168ab782a0069667bbc&region=' + state + '&locality=' + city;
                    }
                    getBreweryList(getLocations, window.currentPage);
                }
            }
        }
    });
});
