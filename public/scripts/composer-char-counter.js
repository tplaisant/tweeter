$(document).ready(function() {
  $("#tweet-text").on('input', function() {
    let charCount = $(this).val().length;
    // console.log(this);
    $('.counter').val(140 - charCount);
    if (charCount > 140) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'black');
    }
  });
});