$(document).ready(function() {
  $(".tweet-text").on("input", function() {
    const maxChar = 140;
    const currentLength = maxChar - $(this).val().length;
    const counter = $(this).parent().find(".counter");
    if (currentLength < 0) {
      $(counter).addClass("limitExceeded");
    }
    if (currentLength >= 0) {
      $(counter).removeClass("limitExceeded");
    }

    $(counter).html(currentLength);
  });
});