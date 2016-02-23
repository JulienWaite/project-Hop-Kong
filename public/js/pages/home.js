$(document).ready(function () {

  // disable fields when brewery or online store are selected
  var $vendortype = $('#vendor-type');
  $('#vendor-type').on('change', function(){console.log($vendortype.val());
    if (($vendortype.val()) === "Brewery") {
      $('#beer-country').selectpicker('val', 'Hong Kong');
      $('#hk-locality').selectpicker('val', 'All locations');
      $('#beer-country').prop('disabled', true);
      $('#beer-country').selectpicker('refresh');
      $('#hk-locality').prop('disabled', true);
      $('#hk-locality').selectpicker('refresh');
    }
    if (($vendortype.val()) === "Online Store") {
      $('#hk-locality').selectpicker('val', 'All locations');
      $('#hk-locality').prop('disabled', true);
      $('#hk-locality').selectpicker('refresh');
      $('#beer-country').prop('disabled', false);
      $('#beer-country').selectpicker('refresh');
    }
    if (($vendortype.val()) === "Retail Store" || ($vendortype.val()) === "Craft Beer Bar") {
      $('#hk-locality').prop('disabled', false);
      $('#hk-locality').selectpicker('refresh');
      $('#beer-country').prop('disabled', false);
      $('#beer-country').selectpicker('refresh');
    }
  });

  var bindFindVendorButton = function () {
    $('#find-vendor-btn').off().on("click", function (e) {
      e.preventDefault();

      var filters = {
        vendorType    :   $("#vendor-type").val(),
        vendorLocality:   $("#hk-locality").val(),
        beerCountry   :   $("#beer-country").val()
      };

      //console.log($.param(filters));
      window.location.href="/hopkong?" + $.param(filters); // redirects to a new page using the parameters selected above

    });
  };

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
