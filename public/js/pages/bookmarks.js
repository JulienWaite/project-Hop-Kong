$(document).ready(function () {


  var bindDeleteBookmarkButton = function () {
    $('.delete-bookmark-btn').off().on("click", function (e) {
      e.preventDefault();

      var $button = $(this);
      var bookmark_id = $button.data("id");

      $.ajax({
        method: 'DELETE',
        url: '/api/bookmarks/' + bookmark_id,
        data: {bookmark_id: bookmark_id},
        success: function (response, status) {
          console.log(response);
          $button.parent().remove();
        },
        error: function (response, status) {
          console.log(response);
        // console.log("Jules");
        // console.log(bookmark_id);
        }
      });
    });
  };
  var init = function () {
    bindDeleteBookmarkButton();
  };

  init();

});