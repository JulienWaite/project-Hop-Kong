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

  bindFindVendorButton();
});
