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
    success: function (succesful) {
      if (succesful) {
        location.reload();
      }
      return;
    },
    error: function () {
      alert("Unable to Add Item!");
    },
  });
  alert("Added Successfully");
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
