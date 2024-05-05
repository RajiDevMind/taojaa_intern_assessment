// // Template to instantly display an item without page reload
// const dataTemplate = (snackName, id, is_favorite, image) => {
//   const divContainer = $("<div>").attr({
//     class: "content-snack-list",
//     id: id,
//   });
//   const img = $("<img>").attr({
//     src: "/images/chipie.jpeg",
//     // src: image,
//     alt: snackName,
//   });

//   const pTag = $("<p>");

//   const btn = $("<button>").attr({
//     class: "btn btn-default favorites",
//     "data-id": id,
//     "data-state": is_favorite,
//   });

//   pTag.html(snackName);
//   btn.html("Add to favorite");

//   divContainer.append(img, pTag, btn);

//   return divContainer;
// };

// // Display if successful
// const succesful = (snackData) => {
//   const name = snackData.snack;
//   const id = snackData.id;
//   const img = snackData.image;
//   const is_favorite = snackData.is_favorite;

//   const instantResponse = dataTemplate(name, id, img, is_favorite);

//   $(".content-snack").prepend(instantResponse);
//   $("input").val("");
// };

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
    success: function () {
      alert("Added Successfully");
    },
    error: function () {
      alert("Unable to Add Item!");
    },
  });
});

// delete user
$(".user-container .details .deleteBtn").on("click", (e) => {
  e.preventDefault();
  const id = $(e.target).closest(".details").attr("data-id"); // Retrieve the ID from the clicked button's parent
  $.ajax({
    url: `/${id}`,
    method: "DELETE",
  })
    .then((response) => {
      alert(response.message); // Display success message
      $(e.target).closest(".user-container").remove(); // Remove the user container from the UI
    })
    .catch((error) => {
      console.error("Failed to delete user:", error);
      alert("Failed to delete user. Please try again."); // Display error message
    });
});

// // Update Favorites

// const addFavorites = (snack) => {
//   const id = snack.id;
//   // ajax syntax to select id and remove
//   $(`#${id}`).remove();
// };

// //Listen to d entire doc. select .favorites class
// $(document).on("click", ".favorites", () => {
//   const id = $(".favorites").attr("data-id"); // this / .favorites class
//   const value = $(".favorites").attr("data-state");

//   let conditionValue = value === "0" ? false : true;

//   $.ajax({
//     url: `/${id}/${conditionValue}`,
//     method: "PUT",
//   })
//     .then(addFavorites)
//     .catch(failedToDelete);
// });
