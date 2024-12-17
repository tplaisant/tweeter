$(document).ready(function() {
  $("#tweet-text").on('input', function() {
    let charCount = $(this).val().length;
    let counter = $('.counter');

    console.log(counter.text());

    counter.text(140 - charCount);
    if (charCount > 140) {
      counter.addClass('counter-red');
    } else {
      counter.removeClass('counter-red');
    }
  });
});