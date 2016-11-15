$(document).ready(function() {

    stateSelect();

    // var url = 'http://api.brewerydb.com/v2/'+'locations/?'+'key=e69236fa88100168ab782a0069667bbc&'+'locality=denver';
     var url = 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/locations/?key=e69236fa88100168ab782a0069667bbc&locality=denver&p=1';

    // var url = 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/brewery/xkRG5v/?key=e69236fa88100168ab782a0069667bbc'


    $('select').change(function() {
      $('.city-input').show();
      $('.back').show();
      $('.data').show();
      // $(this).hide();
      // $('.state-input').hide();
      var state = $(this).val();
      console.log(state);
    });


    $('.data').click(function() {
      $('.state-input').val('');

      $('.state-input').show();
      // getBreweryId(url);
      getData(url);

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

    function getData(url){
    $.get(url, function(data) {
        console.log(data);
          console.log(data.currentPage);
          console.log(data.data.length);
          // var d = data.data;
          var d = data.data;

            // iterate through roles object
            for (var i = 0; i < d.length; i++) {

                var name = d[i].brewery.name;
                console.log(name);
                // var $roleOption = ('<option class="role" >' + role + '</option>');
                // $('#role').append($roleOption);
            }
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
