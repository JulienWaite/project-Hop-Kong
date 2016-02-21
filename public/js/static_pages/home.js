$(document).ready(function () {

  var bindFindVendorButton = function () {
    $('#find-vendor-btn').off().on("click", function (e) {
      e.preventDefault();

      var locality    = $("#hk-locality").val();
      var vendorType  = $("#vendor-type").val();
      var beerCountry = $("#beer-country").val();

      console.log(locality, vendorType, beerCountry);

      $.ajax({
        method: "GET",
        url: "/api/vendors",
        success: function (response) {
          console.log(response);

          response.forEach(function (obj) {
            console.log(obj.name);
          });
        }
      });
    });
  };


  // utility function
  var createNewImage = function (id, image, name) {
    var newLine = '' +
      '<div class="col-lg-3 col-md-4 col-xs-6 thumb">'+
      '<a class="thumbnail" href="#">'+
      '<img class="img-responsive"' + ' src=' + image + ' alt="' + name +'">' +
      '</a>' +
      '</div>';

    $('#images').append(newLine);
  };



  var getAllVendors = function () {
    $.ajax({
      url: "/api/vendors",
      method: "GET",
      success: function (response, status) {
        response.forEach(function (elem) {
          createNewImage(elem._id, elem.image, elem.name);
        });
        //bindButtons();
      },
      error: function (response, status) {
        console.log(response);
      }
    });
  };







  var init = function () {
    getAllVendors();
    bindFindVendorButton();
  };

  init();

});
