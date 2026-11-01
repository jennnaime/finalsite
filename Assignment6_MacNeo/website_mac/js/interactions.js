/* =========================================================
   Assignment 6 - Part 1: jQuery features for the MacNeo site
   Task 1  selectors, events, .val() / .text() / .toggleClass()
   Task 2  FAQ with slide effects + fading status message
   Task 3  live search + category filter
   Task 4  wishlist with delegated .on() handlers
   Task 5  pre-order form validation

   jQuery is loaded before this file on every page.
   The code starts when the page is ready: $(document).ready(...).
   ========================================================= */

$(document).ready(function () {
  /* ---------------- Task 1: theme and greeting ---------------- */

  $("#themeToggle").on("click", function () {
    $("body").toggleClass("dark");

    const isDark = $("body").hasClass("dark");

    $(this).text(isDark ? "Light mode" : "Dark mode");
    $(this).attr("aria-pressed", isDark ? "true" : "false");
  });

  $("#greetingForm").on("submit", function (event) {
    event.preventDefault();

    const name = $("#nameInput").val().trim();
    const message = $("#greetingMessage");

    if (name === "") {
      message.text("Please write your name first, then we can say hello.");
    } else {
      message.text("Welcome to MacNeo, " + name + "! Your next laptop is already waiting for you.");
    }
  });

  /* ---------------- Task 2: FAQ accordion ---------------- */

  $(".faq-question").on("click", function () {
    const button = $(this);
    const answer = $("#" + button.attr("aria-controls"));
    const isOpen = button.attr("aria-expanded") === "true";

    button.attr("aria-expanded", isOpen ? "false" : "true");

    
    answer.stop(true, true).slideToggle(250);
  });

  /* ---------------- Task 3: search and categories ---------------- */

  let activeCategory = "all";

  $(".category-btn").on("click", function () {
    activeCategory = $(this).data("category");

    $(".category-btn").removeClass("active").attr("aria-pressed", "false");
    $(this).addClass("active").attr("aria-pressed", "true");

    filterCards();
  });

  $("#featureSearch").on("input", function () {
    filterCards();
  });

  function filterCards() {
    const query = $("#featureSearch").val().trim().toLowerCase();
    const cards = $(".grid-card");
    let shown = 0;

    cards.each(function () {
      const card = $(this);
      const title = card.find("h3").text().toLowerCase();
      const category = card.data("category");

      const textMatch = title.indexOf(query) !== -1;
      const categoryMatch = activeCategory === "all" || category === activeCategory;

      if (textMatch && categoryMatch) {
        card.show();
        shown = shown + 1;
      } else {
        card.hide();
      }
    });

    $("#searchCount").text(shown + " of " + cards.length + " features shown");
    $("#searchEmpty").toggle(shown === 0);
  }

  // correct numbers when the page opens (only on the page with the search field)
  if (document.getElementById("featureSearch")) {
    filterCards();
  }

  /* ---------------- Task 4: wishlist ---------------- */

  function updateWishlistCount() {
    const count = $("#wishlist li").length;

    $("#wishlistCount").text(count);
    $("#wishlistEmpty").toggle(count === 0);
  }

  $("#wishlistForm").on("submit", function (event) {
    event.preventDefault();

    const text = $("#wishlistInput").val().trim();
    const message = $("#wishlistMessage");

    if (text === "") {
      message.stop(true, true).fadeIn(200);
      return;
    }

    message.stop(true, true).hide();

    const item = $("<li>");
    item.append($("<span>").text(text));
    item.append($('<button type="button" class="remove-button">Remove</button>'));
    $("#wishlist").append(item);

    $("#wishlistInput").val("").trigger("focus");
    updateWishlistCount();

    // second effect: the status message fades in and then fades out again
    $("#wishlistToast").stop(true, true).fadeIn(200).delay(1200).fadeOut(400);
  });

  // delegated handler: works for items that are added later too
  $("#wishlist").on("click", ".remove-button", function () {
    $(this).closest("li").remove();
    updateWishlistCount();
  });

  updateWishlistCount();

  /* ---------------- Task 5: pre-order form ---------------- */

  $("#preorderForm").on("submit", function (event) {
    event.preventDefault();

    const name = $("#poName").val().trim();
    const email = $("#poEmail").val().trim();
    const model = $("#poModel").val();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let isValid = true;

    if (name.length < 2) {
      $("#poNameError").text("Please write your name, at least 2 letters.");
      $("#poName").addClass("invalid");
      isValid = false;
    } else {
      $("#poNameError").text("");
      $("#poName").removeClass("invalid");
    }

    if (!emailPattern.test(email)) {
      $("#poEmailError").text("Please write a correct email, for example aisha@mail.com.");
      $("#poEmail").addClass("invalid");
      isValid = false;
    } else {
      $("#poEmailError").text("");
      $("#poEmail").removeClass("invalid");
    }

    if (model === "") {
      $("#poModelError").text("Please choose a model.");
      $("#poModel").addClass("invalid");
      isValid = false;
    } else {
      $("#poModelError").text("");
      $("#poModel").removeClass("invalid");
    }

    if (!isValid) {
      $("#poSuccess").hide();
      return;
    }

    $("#poSuccess")
      .text("Thank you, " + name + "! Your " + model + " is reserved. This is a demo: nothing was sent or charged.")
      .stop(true, true)
      .fadeIn(300);

    $("#preorderForm")[0].reset();
  });

});

