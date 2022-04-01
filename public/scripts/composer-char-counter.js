$(document).ready(function() {
  console.log("I'm ready!")
  const maxTwitterCharCount = 140;

  $('textarea').on('input', function () {
  let remaining = maxTwitterCharCount - $(this).val().length;
  const counter = $(".counter");
  $(counter).text(remaining);
  let count = $(this).val().length
  if (count > maxTwitterCharCount) {
    $(counter).addClass("counterNegative");
  } else {
    $(counter).removeClass("counterNegative");
  }
  });
 
});