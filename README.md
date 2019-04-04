# techdegree-project3

## Interactive Form

Practice in making a "smart form" that reacts to user input while maintaining Progressive Enhancement.

## Getting Started

Download the project and extract the files from the zipped folder. Open the index.html file.

## Features

Name input field highlights box and displays tooltip if user navigates away and leaves input blank.
Email input field highlights box and displays tooltip as user begins typing. Error visuals disappear when email format is correct.
When "Other" is selected from the Job dropdown, an input box appears for the user to type into.
Color option for T-shirt design remains hidden until the user selects a design, and then only shows the colors for the selected design.
If no activities are selected and the user tries to submit the form, an error message appears and the form is not submitted.
Credit card payment option is selected by default. Different information will be displayed depending on what is selected from the payment dropdown.
Only when credit card is selected are the credit card information input fields checked for validity.
Credit card number input field displays tooltip as user begins typing. Error visuals disappear when the correct number of digits is entered.
    Field will display different tooltip depending on if the field is blank or if the user has entered a number too long or too short.
Zip Code and CVV input boxes display tooltip as user begins typing. Error visuals disappear when correct number of digits are entered.

Self note: Credit card number validation has conditional error message
CC num, zip code, cvv, email validation has real-time error messages

## Dependencies

JQuery