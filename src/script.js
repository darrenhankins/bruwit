$(document).ready(function() {



    // var url = 'http://api.brewerydb.com/v2/'+'locations/?'+'key=e69236fa88100168ab782a0069667bbc&'+'locality=denver';
    //  var getLocationsByCity = 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/locations/?key=e69236fa88100168ab782a0069667bbc&locality=denver';
    //  var getLocationsByState = 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/locations/?key=e69236fa88100168ab782a0069667bbc&region=colorado&locality=milliken';

    // var url = 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/brewery/xkRG5v/?key=e69236fa88100168ab782a0069667bbc'

    stateSelect();
    window.num = 0;
    $('select').change(function() {
      $('.city-input').show();
      $('.back').show();
      $('.data').show();
    });

    $('.data').click(function() {
      $('.state-input').val('');
      $('.state-input').show();
      var state = $('#state').val();
      var city = $('#city').val();
      console.log("State: "+state);
      console.log("City: "+city);
      if (!city) {
        var getLocations = 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/locations/?key=e69236fa88100168ab782a0069667bbc&region='+state;
      } else {
        var getLocations = 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/locations/?key=e69236fa88100168ab782a0069667bbc&region='+state+'&locality='+city;
      }
      getDataLocations(getLocations);
    });

    $('.back').click(function() {
      stateSelect();
      $('.state-input').val('');
      $('.state-input').show();
    });



    function stateSelect (){
      $('select').material_select();
      $('.city-input').hide();
      $('.back').hide();
      $('.data').hide();
    }

    var bottomOfPage = false;
    $(window).scroll(function () {
       if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
        //  if (!bottomOfPage) {
          bottomOfPage = true;
          console.log(bottomOfPage);
          // alert('end of page');
          var state = $('#state').val();
          var city = $('#city').val();
          console.log("State: "+state);
          console.log("City: "+city);
          if (!city) {
            var getLocations = 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/locations/?key=e69236fa88100168ab782a0069667bbc&region='+state;
          } else {
            var getLocations = 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/locations/?key=e69236fa88100168ab782a0069667bbc&region='+state+'&locality='+city;
          }
          getDataLocations(getLocations);
        // }
       }
    });


    function getDataLocations(getLocations){
      $.get(getLocations, function(dataInit) {
          console.log("dataInit: "+dataInit);
          console.log("Current Page: "+dataInit.currentPage);
          console.log("Total Page: "+dataInit.numberOfPages);
          var currentPage = dataInit.currentPage;
          var totalPages = dataInit.numberOfPages;


          if (!dataInit.data){
            console.log("no data");
            // PRINT "NO BREWERIES in SPECIFIED LOCATION"
          } else {
            // var data = 'data'+num;
             data = dataInit.data;
            for (var i = 0; i < data.length; i++) {
                  var name = data[i].brewery.name;
                  // PRINT out initital list
                  window.num+=1;
                  num = window.num;
                  $( ".list" ).append( "<p>"+num+" "+name+"</p>" );
                  console.log(num+" "+name);

              }
              window.bottomOfPage = false;
              console.log(window.bottomOfPage);

            // for (var i = 0; currentPage<totalPages; i++ ) {
            //   currentPage += 1;
            //   getLocations+="$p="+currentPage;
            //   data = "data"+currentPage;
            //   console.log(data);
            //   $.get(getLocations, function(newData) {
            //     console.log("Data"+currentPage+": "+newData);
            //     var dataList = newData.data;
            //     console.log(dataList.length);
            //     for (var i = 0; i < dataList.length; i++) {
            //         var name = dataList[i].brewery.name;
            //         // PRINT out initital list
            //         num+=1;
            //         console.log(num+" "+name);
            //     }
            //   });
            // }
          }



          // var dataList = dataInit.data;
          // console.log(dataInit.data.length);
          // for (var i = 0; i < dataList.length; i++) {
          //     var name = dataList[i].brewery.name;
          //     // PRINT out initital list
          //     num+=1;
          //     console.log(num+" "+name);
          // }
          //
          // for (var i = 0; currentPage<totalPages; i++ ) {
          //   currentPage += 1;
          //   getLocations+="$p="+currentPage;
          //   data = "data"+currentPage;
          //   console.log(data);
          //   $.get(getLocations, function(data) {
          //     console.log("Data"+currentPage+": "+data);
          //
          //     var dataList = dataInit.data;
          //     console.log(dataInit.data.length);
          //     for (var i = 0; i < dataList.length; i++) {
          //         var name = dataList[i].brewery.name;
          //         // PRINT out initital list
          //         num+=1;
          //         console.log(num+" "+name);
          //     }
          //   });
          // }


          // no breweries in database for specific location
          // if (!data.data){
          //   console.log("no data");
          //   // PRINT "NO BREWERIES in SPECIFIED LOCATION"
          // } else {
          //   var newData = data.data;
          //   console.log(data.data.length);
          //   for (var i = 0; i < newData.length; i++) {
          //       var name = newData[i].brewery.name;
          //       console.log(name);
          //   }
          // }
      });
    }

      function getBreweryId(url){
      $.get(url, function(data) {
          console.log(data);
            // console.log(data.currentPage);
            // console.log(data.data.length);
            // var d = data.data;
            //   // iterate through roles object
            //   for (var i = 0; i < d.length; i++) {
            //
            //       var name = d[i].name;
            //       console.log(name);
            //       // var $roleOption = ('<option class="role" >' + role + '</option>');
            //       // $('#role').append($roleOption);
            //   }
              //
              // // Select Dropdown
              // $('select').change(function() {
              //     $thisOne = $('select option:selected').text();
              //     for (var i = 0; i < roles.length; i++) {
              //         if ($thisOne === roles[i].title) {
              //             $('.role-preview').attr('src', roles[i].img);
              //         }
              //     }
              // });
          });
        }


});




// Select Dropdown
// $('select').change(function() {
//     $thisOne = $('select option:selected').text();
//     for (var i = 0; i < roles.length; i++) {
//         if ($thisOne === roles[i].title) {
//             $('.role-preview').attr('src', roles[i].img);
//         }
//     }
// });
