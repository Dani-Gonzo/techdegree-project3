const credit = $("#credit-card")
const paypal = credit.next();
const bitcoin = credit.next().next();
const emailInput = $("#mail")[0];

$(document).ready(function() {
    $("#name").focus();
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
nameTip.insertAfter($("#name"));

let emailTip = $('<span class="email-tip"></span>').text("Please enter a valid email address: example@example.com");
emailTip.insertAfter($("#mail"));

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
    return /^[a-z]+\s[a-z]+$/i.test(name);
}

function ValidEmailCheck(email) {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

// Create credit card info validation


// Shows "other job" input box if "other" is selected
$("#title").change(function(e) {
    if ($(e.target).val() == "other") {
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

    if ($(e.target).prop("name") == "all") {
        UpdateTotal("all", 200);
    }
    else if ($(e.target).prop("name") == "js-frameworks") {
        DisableCheck("js-frameworks", "express");
        UpdateTotal("js-frameworks", 100);
    }
    else if ($(e.target).prop("name") == "js-libs") {
        DisableCheck("js-libs", "node");
        UpdateTotal("js-libs", 100);
    }
    else if ($(e.target).prop("name") == "express") {
        DisableCheck("express", "js-frameworks");
        UpdateTotal("express", 100);
    }
    else if ($(e.target).prop("name") == "node") {
        DisableCheck("node", "js-libs");
        UpdateTotal("node", 100);
    }
    else if ($(e.target).prop("name") == "build-tools") {
        UpdateTotal("build-tools", 100);
    }
    else if ($(e.target).prop("name") == "npm") {
        UpdateTotal("npm", 100);
    }
});

$("#payment").change(function(e) {
    credit.hide();
    paypal.hide();
    bitcoin.hide();

    if ($(e.target).val() == "credit card") {
        credit.show();
    }
    else if ($(e.target).val() == "paypal") {
        paypal.show();
    }
    else if ($(e.target).val() == "bitcoin") {
        bitcoin.show();
    }
});

 // Show or hide the tooltip
 function ShowHideToolTip(show, element) {
    if (show) {
        element.style.display = "inherit";
      } else {
        element.style.display = "none";
      }
}

function Listener(validation) {
    return e => {
        const text = e.target.value;
        const valid = validation(text);
        const show = text !== "" && !valid;
        const tip = e.target.nextElementSibling;
        ShowHideToolTip(show, tip);
    };
}

emailInput.addEventListener("input", Listener(ValidEmailCheck));

$("button").click(function(e) {
    e.preventDefault();

});