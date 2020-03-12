(function(){
  $('#btn-contact-submit').click(function(event){
    if (event){
      event.preventDefault()
    }
    var visitor = {
      name: $('#contact-form-name').val(),
      email: $('#contact-form-email').val(),
      message: $('#contact-form-message').val()
    }
    $.ajax({
      url: '/api/subscriber',
      type: 'POST',
      data: visitor,
      success: function(response){
        console.log('Subscriber created: ' + JSON.stringify(response))
      },
      error: function(response){
        console.log('Something went wrong ' + JSON.stringify(response))
      }
    })
  })
})()