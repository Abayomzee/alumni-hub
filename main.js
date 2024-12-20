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

  // Menu
  // Open the overlay and side nav
  $(".menu-btn").on("click", function () {
    $(".overlay").fadeIn(500, function () {
      $(".overlay").addClass("active");
    });
    $(".mobile-side-nav").fadeIn(500, function () {
      $(".mobile-side-nav").addClass("active");
    });
  });

  // Close the overlay and side nav
  $("#btn-close").on("click", function () {
    $(".mobile-side-nav").removeClass("active").fadeOut(500);
    $(".overlay").removeClass("active").fadeOut(500);
  });

  $(".overlay").on("click", function () {
    $(".mobile-side-nav").removeClass("active").fadeOut(500);
    $(".overlay").removeClass("active").fadeOut(500);
  });

  // About us page contact us message
  const baseUrl = "https://alumnihub.azurewebsites.net/support/contact-message";

  // Attach a submit event listener to the form
  $("#contactForm").on("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Disable the submit button and change its text to "Submitting..."
    const submitButton = $("#about_form_submit_btn");
    submitButton.prop("disabled", true).text("Submitting...");

    // Gather data from the form inputs
    const requestData = {
      fullName: $("#about_fullName").val().trim(),
      phoneNumber: $("#about_phoneNumber").val().trim(),
      email: $("#about_email").val().trim(),
      question: $("#about_question").val().trim(),
    };

    // Validate form data (optional)
    if (
      !requestData.fullName ||
      !requestData.phoneNumber ||
      !requestData.email ||
      !requestData.question
    ) {
      // alert("All fields are required.");
      showNotification("bad", "All fields are required.");
      resetButton(submitButton);
      return;
    }

    // Send POST request
    $.ajax({
      url: baseUrl,
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(requestData),
      success: function (response) {
        showNotification("good", "Message sent successfully!");
        $("#contactForm")[0].reset(); // Reset the form
        resetButton(submitButton);
      },
      error: function (xhr, status, error) {
        showNotification("bad", "Error sending message. Please try again.");
        resetButton(submitButton);
      },
    });

    // Function to show notification
    function showNotification(type, message) {
      const notification =
        type === "good" ? $(".good-notification") : $(".bad-notification");
      const notificationText =
        type === "good"
          ? $("#good-notification-text")
          : $("#bad-notification-text");

      notificationText.text(message); // Set the dynamic content
      notification
        .slideDown(300) // Slide in the notification
        .delay(1500) // Wait for 1.5 seconds
        .slideUp(300); // Slide out the notification
    }

    // Function to reset the submit button
    function resetButton(button) {
      button.prop("disabled", false).text("Send Message");
    }
  });

  // Attach a submit event listener to the form
  $("#get_started-form").on("submit", function (e) {
    console.log("hereeeee");
    e.preventDefault(); // Prevent the default form submission

    // Gather data from the form inputs
    const requestData = {
      firstName: $("#started_firstName").val()?.trim() || "",
      lastName: $("#started_lastName").val()?.trim() || "",
      email: $("#started_email").val()?.trim() || "",
      phoneNumnber: $("#started_phoneNumnber").val()?.trim() || "",
      institutionName: $("#started_institutionName").val()?.trim() || "",
      userrole: $("#user-roles-dropdown").val()?.trim() || "",
      country: $("#countries-dropdown").val()?.trim() || "",
    };

    const baseUrl = "https://alumnihub.azurewebsites.net/support/get-started";

    // Disable the submit button and change its text to "Submitting..."
    const submitButton = $("#started_form_submit_btn");
    submitButton.prop("disabled", true).text("Submitting...");

    // Validate form data (optional)
    if (
      !requestData.firstName ||
      !requestData.lastName ||
      !requestData.email ||
      !requestData.phoneNumnber ||
      !requestData.institutionName ||
      !requestData.userrole ||
      !requestData.country
    ) {
      // alert("All fields are required.");
      showNotification("bad", "All fields are required.");
      resetButton(submitButton);
      return;
    }

    // Send POST request
    $.ajax({
      url: baseUrl,
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(requestData),
      success: function (response) {
        showNotification("good", "Message sent successfully!");
        $("#get_started-form")[0].reset(); // Reset the form
        resetButton(submitButton);
      },
      error: function (xhr, status, error) {
        showNotification("bad", "Error sending message. Please try again.");
        resetButton(submitButton);
      },
    });

    // Function to show notification
    function showNotification(type, message) {
      console.log({ message });
      const notification =
        type === "good"
          ? $("#good-notification__gs")
          : $("#bad-notification__gs");
      const notificationText =
        type === "good"
          ? $("#good-notification-text__gs")
          : $("#bad-notification-text__gs");

      notificationText.text(message); // Set the dynamic content
      notification
        .slideDown(300) // Slide in the notification
        .delay(1500) // Wait for 1.5 seconds
        .slideUp(300); // Slide out the notification
    }

    // Function to reset the submit button
    function resetButton(button) {
      button.prop("disabled", false).text("Send Message");
    }
  });

  // ********************* fetch dropdown
  $(document).ready(function () {
    const baseUrl = "https://alumnihub.azurewebsites.net";
    const endpoints = {
      userRoles: "/userrole",
      countries: "/country",
      schools: "/institution",
    };
    const storageKeys = {
      userRoles: "alumni_userRoles",
      countries: "alumni_countries",
      schools: "alumni_institutions",
    };

    // Function to fetch data from an API endpoint using jQuery
    function fetchData(endpoint) {
      return $.ajax({
        url: `${baseUrl}${endpoint}`,
        method: "GET",
        dataType: "json",
        error: function (xhr, status, error) {
          console.error(`Error fetching ${endpoint}:`, error);
        },
      });
    }

    // Function to save data to localStorage
    function saveToStorage(key, data) {
      localStorage.setItem(key, JSON.stringify(data));
    }

    // Function to get data from localStorage
    function getFromStorage(key) {
      const storedData = localStorage.getItem(key);
      return storedData ? JSON.parse(storedData) : null;
    }

    // Function to populate a dropdown
    function populateDropdown(data, dropdownId, placeholderText) {
      const dropdown = $(dropdownId);
      dropdown.empty(); // Clear previous options
      if (data && data.length) {
        dropdown.append(
          `<option value="" disabled selected>${placeholderText}</option>`
        );
        $.each(data, function (index, item) {
          dropdown.append(
            `<option value="${dropdownId === "#schools" ? item?.id : item}">${
              dropdownId === "#schools" ? item?.name : item
            }</option>`
          );
        });
      } else {
        dropdown.append(
          `<option value="" disabled selected>Failed to load data</option>`
        );
      }
    }

    // Initialize dropdowns
    function initializeDropdowns() {
      // Load user roles
      let userRoles = getFromStorage(storageKeys.userRoles);
      if (!userRoles) {
        fetchData(endpoints.userRoles).done(function (response) {
          if (response) {
            saveToStorage(storageKeys.userRoles, response?.data);
            populateDropdown(
              response?.data,
              "#user-roles-dropdown",
              "Select a role"
            );
          }
        });
      } else {
        populateDropdown(userRoles, "#user-roles-dropdown", "Select a role");
      }

      // Load countries
      let countries = getFromStorage(storageKeys.countries);
      if (!countries) {
        fetchData(endpoints.countries).done(function (response) {
          if (response) {
            saveToStorage(storageKeys.countries, response?.data);
            populateDropdown(
              response?.data,
              "#countries-dropdown",
              "Select a country"
            );
          }
        });
      } else {
        populateDropdown(countries, "#countries-dropdown", "Select a country");
      }

      // Load schools
      let schools = getFromStorage(storageKeys.schools);
      if (!schools) {
        fetchData(endpoints.schools).done(function (response) {
          if (response) {
            saveToStorage(storageKeys.schools, response?.data);
            populateDropdown(response?.data, "#schools", "Select a school");
          }
        });
      } else {
        populateDropdown(schools, "#schools", "Select a school");
      }
    }

    // Call initialization
    initializeDropdowns();
  });
});

/**
 * "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phoneNumnber": "string",
  "institutionName": "string",
  "userrole": "string",
  "country": "string"
 */
