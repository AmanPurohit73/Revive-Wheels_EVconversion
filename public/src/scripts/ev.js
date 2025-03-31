// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Range slider for battery range
  const rangeSlider = document.getElementById("batteryRange");
  const rangeValue = document.getElementById("rangeValue");

  // Update the range value display when the slider changes
  if (rangeSlider && rangeValue) {
    // Set initial value
    rangeValue.textContent = `${rangeSlider.value} km`;

    // Update when slider moves
    rangeSlider.addEventListener("input", function () {
      rangeValue.textContent = `${this.value} km`;
    });
  }

  // Form validation
  const form = document.querySelector("form");

  if (form) {
    form.addEventListener("submit", function (event) {
      let isValid = true;
      const requiredFields = [
        "username",
        "userphone",
        "userEmail",
        "vehicleNo",
        "vehicleModel",
        "conversionType",
      ];

      // Check required fields
      requiredFields.forEach((fieldId) => {
        const field = document.getElementById(fieldId);
        if (field && (!field.value || field.value.trim() === "")) {
          isValid = false;
          field.style.borderColor = "red";
        } else if (field) {
          field.style.borderColor = "rgb(182, 182, 182)";
        }
      });

      // Validate email format
      const emailField = document.getElementById("userEmail");
      if (emailField && emailField.value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value)) {
          isValid = false;
          emailField.style.borderColor = "red";
        }
      }

      // Validate phone number (10 digits)
      const phoneField = document.getElementById("userphone");
      if (phoneField && phoneField.value) {
        if (phoneField.value.length !== 10 || isNaN(phoneField.value)) {
          isValid = false;
          phoneField.style.borderColor = "red";
        }
      }

      // If validation fails, prevent form submission
      if (!isValid) {
        event.preventDefault();
        alert("Please fill all required fields correctly.");
      } else {
        // Store form data in localStorage for the confirmation page
        const formData = {
          name: document.getElementById("username").value,
          phone: document.getElementById("userphone").value,
          email: document.getElementById("userEmail").value,
          vehicleNo: document.getElementById("vehicleNo").value,
          vehicleModel: document.getElementById("vehicleModel").value,
          conversionType: document.getElementById("conversionType").value,
          batteryRange: document.getElementById("batteryRange").value,
          budget: document.getElementById("conversionBudget").value,
        };

        localStorage.setItem("evConversionData", JSON.stringify(formData));
      }
    });
  }

  // Add change event listeners to remove red border when user fixes input
  const allInputs = document.querySelectorAll("input, select, textarea");
  allInputs.forEach((input) => {
    input.addEventListener("change", function () {
      if (this.value && this.value.trim() !== "") {
        this.style.borderColor = "rgb(182, 182, 182)";
      }
    });
  });

  // Add information tooltips for conversion types
  const conversionSelect = document.getElementById("conversionType");
  if (conversionSelect) {
    conversionSelect.addEventListener("change", function () {
      let infoMessage = "";

      switch (this.value) {
        case "full":
          infoMessage =
            "Full EV Conversion: Complete replacement of combustion engine with electric motor and battery system.";
          break;
        case "hybrid":
          infoMessage =
            "Hybrid Conversion: Adds electric components while keeping the original engine for dual power sources.";
          break;
        case "partial":
          infoMessage =
            "Partial EV Conversion: Replaces some components with electric alternatives for improved efficiency.";
          break;
      }

      if (infoMessage) {
        alert(infoMessage);
      }
    });
  }
});
