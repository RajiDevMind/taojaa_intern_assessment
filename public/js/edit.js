// Function to make AJAX call and populate the form
function populateForm() {
  let url = window.location.href; // Getting URL of the current page
  let match = url.match(/\/update\/(\d+)/); // Regular expression to extract userId from URL

  if (match) {
    let id = match[1]; // Extracted ID
    $.ajax({
      url: `/update/${id}`,
      method: "GET",
      success: function (user) {
        $('input[name="fname"]').val(user.firstName);
        $('input[name="lname"]').val(user.lastName);
        $('input[name="email"]').val(user.email);
      },
      //   success: function (data) {
      //     // To be able to center the res to d textbox, Parse the HTML content
      //     var parsedHtml = $(data);

      //     // Find the elements containing the data
      //     var firstNameInput = parsedHtml.find('input[name="fname"]');
      //     var lastNameInput = parsedHtml.find('input[name="lname"]');
      //     var emailInput = parsedHtml.find('input[name="email"]');

      //     // Check if elements are found
      //     if (
      //       firstNameInput.length > 0 &&
      //       lastNameInput.length > 0 &&
      //       emailInput.length > 0
      //     ) {
      //       // Extract data
      //       var firstName = firstNameInput.val();
      //       var lastName = lastNameInput.val();
      //       var email = emailInput.val();

      //       // Log the extracted data to debug
      //       console.log("First Name:", firstName);
      //       console.log("Last Name:", lastName);
      //       console.log("Email:", email);

      //       // Populate the form fields
      //       $('input[name="fname"]').val(firstName);
      //       $('input[name="lname"]').val(lastName);
      //       $('input[name="email"]').val(email);
      //     } else {
      //       console.log("Input fields not found in HTML response.");
      //     }
      //   },
      error: function (xhr, status, error) {
        console.error("Error:", status, error);
      },
    });
  } else {
    console.log("ID not found in URL");
  }
}
$(document).ready(function () {
  populateForm();
});
