$(document).ready(function () {
  var bindAddBookmark = function () {
    $('#bookmark-add-btn').off().on("click", function (e) {
      e.preventDefault();

      var vendor_id = window.location.pathname.split('/vendors/')[1]; // just obtaims the id displayed in the window

      $.ajax({
        method: "POST",
        url: "/api/bookmarks",
        data: {vendor_id: vendor_id},
        success: function (response) {
          console.log(response);
          $('#bookmark-remove-btn').data('id', response.bookmark_id);
          $('#bookmark-add-btn').hide();
          $('#bookmark-remove-btn').show();
        },
        error: function (response) {
          console.log(response);
        }
      });
    });
  };

  var  bindRemoveBookmark = function () {
    $('#bookmark-remove-btn').off().on("click", function (e) {
      e.preventDefault();

      var $button = $(this);
      var bookmark_id = $button.data('id');

      $.ajax({
        method: 'DELETE',
        url: '/api/bookmarks/' + bookmark_id,
        success: function (response, status) {
          console.log(response);
          $('#bookmark-add-btn').show();
          $('#bookmark-remove-btn').hide();
        },
        error: function (response, status) {
          console.log(response);
        }
      });
    });
  };

  var bindPromptButton = function () {
    $('#bookmark-prompt-btn').off().on("click", function (e) {
      e.preventDefault();
        console.log("Hello Jules");
        $('#signinModal').modal('show');
    });
  };

  var init = function () {
    bindAddBookmark();
    bindRemoveBookmark();
    bindPromptButton();
  };

  init();
});