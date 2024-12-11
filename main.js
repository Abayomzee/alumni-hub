// JavaScript code using jQuery
$(document).ready(function () {
  console.log("jQuery is ready!");

  // FAQ
  $(document).ready(function () {
    console.log("Clickeddd");
    // Initially hide all .faq__answer elements
    $(".faq__answer").hide();

    // Handle click event on .faq__toggler
    $(".faq__toggler").click(function () {
      // Hide all .faq__answer elements
      $(".faq__answer").slideUp(300);

      // Reset all toggler icons to '+'
      $(".faq__toggler span:last-child").text("+");

      // Find the associated .faq__answer for this toggler
      const answer = $(this).next(".faq__answer");

      if (answer.is(":hidden")) {
        // Show the associated .faq__answer
        answer.slideDown(300);
        // Change the toggler icon to 'x'
        $(this).find("span:last-child").text("-");
      }
    });
  });
});
