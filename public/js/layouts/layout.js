$(document).ready(function () {

  var bindSignout = function () {
    $('#signout-btn').on('click', function (e) {
      $.ajax({
        type: "DELETE",  // change to method once all good
        url: "/api/signout",
        success: function (response) {
          window.location.href = '/';
        }
      });
    });
  };

  var bindSignup = function () {
    $('#signup').on('submit', function (e) {
      e.preventDefault();
      $('#signup-form-message').text(''); // clears message before submitting

      var user = {
        email   : $('#signup [name="email"]').val(),
        name    : $('#signup [name="name"]').val(),
        username: $('#signup [name="username"]').val(),
        password: $('#signup [name="password"]').val()
      };

      console.log(user);
      // do validation here for the front end. (Bootstrap, HTML & JS)

      $.ajax({
        method: 'POST',
        url: '/api/signup',
        data: user,
        success: function (response) {
          console.log(response);
          $('#signup-form-message').text("Created User");
          $('#signupModal').modal('hide');
          $('#signinModal').modal('show');
        },
        error: function (response) {
          console.log(response);
          $('#signup-form-message').text(response.responseJSON.message);
        }
      });
    });
  };


  var bindSignin = function () {
    $('#signin').on('submit', function (e) {
      e.preventDefault();

      var user = {
        username: $('#signin [name="username"]').val(),
        password: $('#signin [name="password"]').val()
      };

      $.ajax({
        method: 'POST',
        url: '/api/signin',
        data: user,
        dataType: 'JSON',
        success: function(response){
          window.location.href = "/";
          //console.log("create session / logged in", response);
        },
        error: function (response) {
          console.log(response);
        }
      });
    });
  };
  var init = function () {
    bindSignout();
    bindSignup();
    bindSignin();

  };

  init();
});