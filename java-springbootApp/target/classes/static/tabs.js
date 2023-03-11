$(document).ready(function () {
  // Get the current page URL
  var currentPage = window.location.href;

  // Loop through each tab link and check if it matches the current page URL
  $(".tabs a").each(function () {
    var link = $(this).attr("href");

    if (currentPage.indexOf(link) != -1) {
      // Add the 'active' class to the current tab link
      $(this).parent().addClass("active");
    }
  });
});
