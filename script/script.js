console.log('hey');
console.log(sessionStorage);
let url;

$(document).ready(function(){
  $('#heading').click(function(){
    $(this).css('background', 'teal');
  });

  $('#adminPage').hide();
  $('#adminBtn').click(function(){
    $('#adminPage').show();
    $('#homePage').hide();
  });

  $('#homeBtn').click(function(){
    $('#homePage').show()
    $('adminPage').hide()
  });
  $.ajax({
    url : 'config.json',
    type : 'GET',
    dataType : 'json',
    success : function(configData){
      console.log(configData);
      url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;
      console.log(url);
    },//success
    error : function(){
      console.log('could not call api');
    }//error
  });//ajax


  $('#viewUserBtn').click(function(){

    //get url and port from config.json
    $.ajax({
      url : `${url}/allUsers`,
      type : 'GET',
      dataType : 'json',
      success : function(usersFromMongo){
        console.log(usersFromMongo);
      },//success
      error : function(){
        console.log('could not call api');
      }//error
    });//ajax
  });


  $('#viewProductBtn').click(function(){
    //get url and port from config.json
    $.ajax({
      url : `${url}/allProduct`,
      type : 'GET',
      dataType : 'json',
      success : function(productFromMongo){
        console.log(productFromMongo);
        document.getElementById('productCards').innerHtml = "";

        for (let i = 0; i < productFromMongo.length; i++) {
          document.getElementById('productCards').innerHtml +=
          `<div class="col">
            <h3 class="">${productFromMongo[i].name}</h3>
            <h4 class="">${productFromMongo[i].price}</h4>
          </div>`
        }
      },//success
      error : function(){
        console.log('could not call api');
      }//error
    });//ajax
  });

  $('#loginForm').submit(function(){
    event.preventDefault();
    let username = $('#username').val();
    let password = $('#password').val();
    $.ajax({
      url : `${url}/loginUser`,
      type : 'POST',
      data: {
        username : username,
        password : password
      },
      success : function(loginData){
        console.log(loginData);
        if (loginData === 'User not found. Please register.') {
          alert('Register Please');
        } else {
          sessionStorage.setItem('userId',loginData['_id']);
          sessionStorage.setItem('userName',loginData['username']);
          sessionStorage.setItem('userEmail',loginData['email']);
          console.log(sessionStorage);
        }
      },//success
      error : function(){
        console.log('could not call api');
      }//error
    });//ajax
  });
});
