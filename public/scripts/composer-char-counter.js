$(document).ready(function() {
  $("#tweet-text").on('input', function() {
    let charCount = $(this).val().length;
    let counter = $('.counter');

    counter.text(140 - charCount);
    if ((140 - charCount) < 0) {
      counter.addClass('counter-red');
    } else {
      counter.removeClass('counter-red');
    }
  });
});