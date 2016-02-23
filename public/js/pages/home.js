$(document).ready(function () {

  // disable fields when brewery or online store are selected

  var $vendortype = $('#vendor-type');
  var $hklocality = $('#hk-locality');
  var $beercountry = $('#beer-country');

  var onVendorTypeChanged = function() {
    if ($vendortype.val() === "Brewery") {
      $hklocality.selectpicker('val', 'All Locations');
      $beercountry.selectpicker('val', 'Hong Kong');
      $beercountry.prop('disabled', true);
      $beercountry.selectpicker('refresh');
      $hklocality.prop('disabled', true);
      $hklocality.selectpicker('refresh');
    }
    if ($vendortype.val() === "Online Store") {
      $hklocality.selectpicker('val', 'All Locations');
      $hklocality.prop('disabled', true);
      $hklocality.selectpicker('refresh');
      $beercountry.prop('disabled', false);
      $beercountry.selectpicker('refresh');
    }
    if ($vendortype.val() === "All Vendors" || $vendortype.val() === "Retail Store" || $vendortype.val() === "Craft Beer Bar") {
      $hklocality.prop('disabled', false);
      $hklocality.selectpicker('refresh');
      $beercountry.prop('disabled', false);
      $beercountry.selectpicker('refresh');
    }
  };

  $vendortype.off().on('change', function(){
    //console.log($vendortype.val());
    localStorage.hopkongVendorType = $vendortype.val(); // storing the selections for the session
    onVendorTypeChanged();
    localStorage.hopkongHKLocality = $hklocality.val();
    localStorage.hopkongBeerCountry = $beercountry.val();
  });

  $hklocality.off().on('change', function(){
    localStorage.hopkongHKLocality = $hklocality.val(); // storing the selections for the session
  });

  $beercountry.off().on('change', function(){
    localStorage.hopkongBeerCountry = $beercountry.val(); // storing the selections for the session
  });

  var setFilterValFromStorage = function($filter, storageKey, defaultVal) {
    var localValue = localStorage[storageKey];
    if (localValue === null) {
      localStorage.setItem(storageKey, defaultVal);
    } else {
      $filter.selectpicker('val', localValue);
      $filter.selectpicker('refresh');
    }
  };

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

    $vendortype.selectpicker();
    $hklocality.selectpicker();
    $beercountry.selectpicker();

    setFilterValFromStorage($vendortype, 'hopkongVendorType', 'All Vendors');
    onVendorTypeChanged();
    setFilterValFromStorage($hklocality, 'hopkongHKLocality', 'All Locations');
    setFilterValFromStorage($beercountry, 'hopkongBeerCountry', 'All Countries');
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
