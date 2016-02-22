$(document).ready(function () {

  var bindFindVendorButton = function () {
    $('#find-vendor-btn').off().on("click", function (e) {
      //window.location.href = "/hopkong?locality=Central";
    });
  };

$('#vendor-type').on('change', function(){console.log("it changed"); });
  // $('#vendor-type').on('change', function(){
  //  console.log("it changed");
  // });


//console.log('#vendor-type').val();

  var init = function () {
    bindFindVendorButton();
  };

  init();
  // var bindFindVendorButton = function () {
  //   $('#find-vendor-btn').off().on("click", function (e) {
  //     e.preventDefault();

  //     var vendorType  = $("#vendor-type").val();
  //     var locality    = $("#hk-locality").val();
  //     var beerCountry = $("#beer-country").val();

  //     console.log(locality, vendorType, beerCountry);

  //     $.ajax({
  //       method: "GET",
  //       url: "/api/vendors",
  //       success: function (response) {
  //         console.log(response);

  //         response.forEach(function (obj) {
  //           console.log(obj.name);
  //         });
  //       }
  //     });
  //   });
  // };

  // // utility function
  // var createNewImage = function (id, image, name) {
  //   var newLine = '' +
  //     '<div class="col-lg-3 col-md-4 col-xs-6 thumb">'+
  //     '<a class="thumbnail" href="/vendors/'+ id +'">'+
  //     '<img class="img-responsive"' + ' src=' + image + ' alt="' + name +'">' +
  //     '</a>' +
  //     '</div>';

  //   $('#images').append(newLine);
  // };

  // var getAllVendors = function () {
  //   $.ajax({
  //     url: "/api/vendors",
  //     method: "GET",
  //     success: function (response, status) {
  //       response.forEach(function (elem) {
  //         createNewImage(elem._id, elem.image, elem.name);
  //       });
  //     },
  //     error: function (response, status) {
  //       console.log(response);
  //     }
  //   });
  // };


});
