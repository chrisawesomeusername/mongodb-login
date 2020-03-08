console.log('hey');

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
    $('adminPage').hide()
    $('#homePage').show()
  });
  $('#viewUserBtn').click(function(){
    $.ajax({
      url : '192.168.33.10:3000/allUsers',
      type : 'GET',
      dataType : 'json',
      success : function(usersFromMongo){
        console.log(usersFromMongo);
      },//success
      error : function(){
        console.log('could not call api');
      }
    });
  });
});
