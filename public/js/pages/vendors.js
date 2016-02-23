$(document).ready(function () {
  var bindBookmarkButton = function () {
    $('#bookmark-btn').off().on("click", function (e) {
      e.preventDefault();

      var vendor_id = window.location.pathname.split('/vendors/')[1]; // just obtaims the id displayed in the window

      $.ajax({
        method: "POST",
        url: "/api/bookmarks",
        data: {vendor_id: vendor_id},
        success: function (response) {
          var $button = $('#bookmark-btn');
          $button.text('Bookmarked');
          console.log(response);
        },
        error: function (response) {
          console.log(response);
        }
      });
    });
  };

  var init = function () {
    bindBookmarkButton();
  };

  init();
});