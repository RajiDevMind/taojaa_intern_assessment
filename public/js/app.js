const scroll = document.scrollTo({
  top: 410, // Scroll to 100px from the top
  behavior: "smooth", // Optional: smooth scrolling effect
});

// adding event to 'add item' btn
$("button[type=submit]").on("click", (e) => {
  e.preventDefault();

  // get user input values
  const firstName = $('input[name="fname"]').val();
  const lastName = $('input[name="lname"]').val();
  const email = $('input[name="email"]').val();

  if (!firstName || !lastName || !email) {
    return alert("Invalid Input? Empty entry not allowed!");
  }

  $.ajax({
    url: "/create-user",
    method: "POST",
    data: { firstName: firstName, lastName: lastName, email: email }, // Note: key representation of req.body.snack_name in the server
    success: function (response) {
      if (response) {
        alert("User was Successfully Created");
        location.reload();
        scroll;
      }
      return;
    },
    error: function () {
      alert("Unable to Add Item!");
    },
  });
});

// delete user
$(".user-containers .details .deleteBtn").on("click", (e) => {
  e.preventDefault();
  const id = $(e.target).closest(".details").attr("data-id"); // Retrieve the ID from the clicked button's parent
  const confirmAtion = confirm("Are you to delete user?");
  if (confirmAtion) {
    $.ajax({
      url: `/${id}`,
      method: "DELETE",
    })
      .then((response) => {
        $(`.user-containers .details[data-id=${id}]`).remove(); // Remove the user container from the UI
      })
      .catch((error) => {
        alert("Failed to delete user. Please try again."); // Display error message
      });
  } else {
    alert("Delete Cancelled");
  }
});

// update user
$("button[type=button]").on("click", (e) => {
  e.preventDefault();

  // Select input fields
  let firstName = $("input[name='fname']").val();
  let lastName = $("input[name='lname']").val();
  let email = $("input[name='email']").val();

  let url = window.location.href; // Getting URL of the current page
  let match = url.match(/\/update\/(\d+)/); // Regular expression to extract userId from URL

  if (match) {
    let id = match[1]; // Extracted ID
    $.ajax({
      url: "/update/" + id,
      type: "PUT",
      data: { firstName: firstName, lastName: lastName, email: email },
      success: function (response) {
        alert(response.msg);
        window.location.assign("/");
        scroll;
      },
      error: function (xhr, status, error) {
        console.error("Error updating user:", error);
      },
    });
  } else {
    console.log("ID not found in URL");
  }
});
