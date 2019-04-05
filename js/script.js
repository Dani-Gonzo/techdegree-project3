const credit = $("#credit-card")
const paypal = credit.next();
const bitcoin = credit.next().next();
const ccInput = $("#cc-num");
const zipInput = $("#zip");
const cvvInput = $("#cvv");
const emailInput = $("#mail");
const nameInput = $("#name");
const activitiesField = $(".activities");

$(document).ready(function() {
    nameInput.focus();
    $("#other-title").hide();
    $("#colors-js-puns").hide();
    paypal.hide();
    bitcoin.hide();
    // Disable selecting "Select Payment Method"
    $("#payment option[value='select_method']").prop("disabled", true);
    // Make "Credit Card" selected on page load
    $("#payment option[value='credit card']").prop("selected", true);
});

 // Append a div in the .activities fieldset to hold the "Total: "
$(".activities").append("<div class='total'></div>");
let amount = 0;
const total = $(".total").append('<label>Total: $<span id="totalAmount"></span></label>').hide();

// Create tooltip span elements and append them to appropriate input fields
let nameTip = $('<span class="name-tip"></span>').text("Name field cannot be blank");
nameTip.insertAfter(nameInput);

let emailTip = $('<span class="email-tip"></span>').text("Please enter a valid email address: example@example.com");
emailTip.insertAfter(emailInput);

let activitiesTip = $('<span class="activities-tip"></span>').text("Please select at least one activity to attend");
activitiesTip.insertAfter(activitiesField);

let CCTipBlank = $('<span class="cc-tip-blank"></span>').text("Please enter a credit card number");
CCTipBlank.insertAfter(ccInput);

let CCTipInvalid = $('<span class="cc-tip-invalid"></span>').text("Please enter a number between 13 and 16 digits long");
CCTipInvalid.insertAfter(ccInput);

let zipTip = $('<span class="zip-tip"></span>').text("Please enter a 5-digit number");
zipTip.insertAfter(zipInput);

let cvvTip = $('<span class="cvv-tip"></span>').text("Please enter a 3-digit number");
cvvTip.insertAfter(cvvInput);

// Updates total dollar amount based on selected (or unselected) workshop
function UpdateTotal(checkedActivity, dollars) {
    const isChecked = $("input[name=" + checkedActivity + "]").is(":checked");
    if (isChecked) {
        amount += dollars;
    }
    else if (!isChecked) {
        amount -= dollars;
    }
    $("#totalAmount").text(amount);
}

// Disables conflicting workshops based on selected (or unselected) workshop
function DisableCheck(checkedActivity, activityToChange) {
    const isChecked = $("input[name=" + checkedActivity + "]").is(":checked");
    $("input[name=" + activityToChange + "]").prop("disabled", isChecked).parent().css("color", isChecked ? "gray" : "");
}
 // Input field validation checks
function ValidNameCheck(name) {
    return /^[^\s]+[a-z\s'-]+$/i.test(name);
}

function ValidEmailCheck(email) {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

// Create credit card info validation
function ValidCCNumCheck(ccNum) {
    return /^[0-9]{13,16}$/.test(ccNum);
}

function ValidZipCheck(zipNum) {
    return /^[0-9]{5}$/.test(zipNum);
}

function ValidCVVCheck(cvvNum) {
    return /^[0-9]{3}$/.test(cvvNum);
}

// Shows "other job" input box if "other" is selected
$("#title").change(function(e) {
    if ($(e.target).val() === "other") {
        $("#other-title").show();
    }
    else {
        $("#other-title").hide();
    }
});

// Shows appropriate color options based on design selected
$("#design").change(function(e) {
    $("#colors-js-puns").show();
    $("#color option").hide();
    $("#color").val(null);
    if ($(e.target).val() == "js puns") {
        $("#color option[value='cornflowerblue']").show();
        $("#color option[value='darkslategrey']").show();
        $("#color option[value='gold']").show();
    }
    else if ($(e.target).val() == "heart js") {
        $("#color option[value='tomato']").show();
        $("#color option[value='steelblue']").show();
        $("#color option[value='dimgrey']").show();
    }
    else {
        $("#colors-js-puns").hide();
    }
});

// Updates conflicting options and total dollar amount
$(".activities input").change(function(e) {

    total.show();

    if ($(e.target).prop("name") === "all") {
        UpdateTotal("all", 200);
    }
    else if ($(e.target).prop("name") === "js-frameworks") {
        DisableCheck("js-frameworks", "express");
        UpdateTotal("js-frameworks", 100);
    }
    else if ($(e.target).prop("name") === "js-libs") {
        DisableCheck("js-libs", "node");
        UpdateTotal("js-libs", 100);
    }
    else if ($(e.target).prop("name") === "express") {
        DisableCheck("express", "js-frameworks");
        UpdateTotal("express", 100);
    }
    else if ($(e.target).prop("name") === "node") {
        DisableCheck("node", "js-libs");
        UpdateTotal("node", 100);
    }
    else if ($(e.target).prop("name") === "build-tools") {
        UpdateTotal("build-tools", 100);
    }
    else if ($(e.target).prop("name") === "npm") {
        UpdateTotal("npm", 100);
    }
});

// Hide payment details until option is selected
$("#payment").change(function(e) {
    credit.hide();
    paypal.hide();
    bitcoin.hide();

    if ($(e.target).val() === "credit card") {
        credit.show();
    }
    else if ($(e.target).val() === "paypal") {
        paypal.show();
    }
    else if ($(e.target).val() === "bitcoin") {
        bitcoin.show();
    }
});

// Show or hide the tooltip
function ShowHideToolTip(show, element, inputElement) {
    if (show) {
        element.style.display = "inherit";
        inputElement.style.border = "3px solid rgb(170, 41, 41)";
    } 
    else {
        element.style.display = "none";
        inputElement.style.borderColor = "transparent";
    }
}

// Check that value of input element is valid. If not, show appropriate tip
function Validate(targetElement, validation) {
    const text = targetElement.value;
    const valid = validation(text);
    const show = !valid;
    const tip = targetElement.nextElementSibling;
    ShowHideToolTip(show, tip, targetElement);
    // Return true or false if tip is shown or not
    return show;
}

// Check for valid CC number and show appropriate tip based on if there are numbers inputted or not
function ValidateCC(targetElement) {
    const text = targetElement.value;
    const valid = ValidCCNumCheck(text);
    const show = !valid;
    let tip = null;
    // If field is empty, show "Enter a number" tooltip
    if (text === "") {
        tip = targetElement.nextElementSibling.nextElementSibling;
        ShowHideToolTip(false, targetElement.nextElementSibling, targetElement);
    }
    // If field contains numbers but not enough or too many, show "Enter a number between 13-16 digits" tooltip
    else {
        tip = targetElement.nextElementSibling;
        ShowHideToolTip(false, targetElement.nextElementSibling.nextElementSibling, targetElement);
    }
    // If "Other Job Role" input box is displayed, shift CC info tooltips
    if ($("#title").val() === "other") {
        CCTipBlank.css("top", "1195px");
        CCTipInvalid.css("top", "1195px");
        zipTip.css("top", "1195px");
        cvvTip.css("top", "1195px");
    }
    ShowHideToolTip(show, tip, targetElement);
    // Return true or false if tip is shown or not
    return show;
}

// Run validation checks on input fields as user types
emailInput.on("input", e => { Validate(e.target, ValidEmailCheck) });
zipInput.on("input", e => { Validate(e.target, ValidZipCheck) });
ccInput.on("focus", e => { ValidateCC(e.target) });
ccInput.on("input", e => { ValidateCC(e.target) });
cvvInput.on("input", e => { Validate(e.target, ValidCVVCheck) });
// Run validation check on name input when user focuses away from input field
nameInput.on("blur", e => { Validate(e.target, ValidNameCheck) });

// Validate all necessary fields are filled in appropriately when user submits form
$("form").on("submit", function(e) {
    // Store validated or not boolean values into variables
    const invalidName = Validate(nameInput[0], ValidNameCheck);
    const invalidEmail = Validate(emailInput[0], ValidEmailCheck);
    const activityUnchecked = $('.activities input[type=checkbox]:checked').length == 0;
    const invalidCCNum = ValidateCC(ccInput[0]);
    const invalidZipNum = Validate(zipInput[0], ValidZipCheck);
    const invalidCVVNum = Validate(cvvInput[0], ValidCVVCheck);

    // If paypal or bitcoin selected, only check name, email and activity fieldset
    if ($("#payment").val() === "paypal" || $("#payment").val() === "bitcoin") {
        // If field checks come back true, prevent form from being submitted
        if (invalidName || invalidEmail || activityUnchecked) {
            e.preventDefault();
        }
        // Focus on field that needs updating and show tip
        if (invalidName) {
            nameInput.focus();
        } 
        else if (invalidEmail) {
            emailInput.focus();
        }
        else if (activityUnchecked) {
            $("input[name=all]")[0].focus();
            ShowHideToolTip(true, activitiesTip[0]);
        }
    }
    // If credit card selected, check all necessary fields, including credit card information
    else if ($("#payment").val() === "credit card") {
        // If field checks come back true, prevent form from being submitted
        if (invalidName || invalidEmail || activityUnchecked || invalidCCNum || invalidZipNum || invalidCVVNum) {
            e.preventDefault();
        }
        // Focus on field that needs updating and show tip
        if (invalidName) {
            nameInput.focus();
        } 
        else if (invalidEmail) {
            emailInput.focus();
        }
        else if (activityUnchecked) {
            $("input[name=all]")[0].focus();
            ShowHideToolTip(true, activitiesTip[0]);
        }
        else if (invalidCCNum) {
            ccInput.focus();
        }
        else if (invalidZipNum) {
            zipInput.focus();
        }
        else if (invalidCVVNum) {
            cvvInput.focus();
        }
    }
});