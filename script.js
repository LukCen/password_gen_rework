"use strict";
const smallLetters = 'abcdefghijklmnopqrstuvwxyz';
const largeLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const specials = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
let result = document.querySelector('#result');
const checkSmall = document.querySelector('#smallLetters');
const checkLarge = document.querySelector('#largeLetters');
const checkNumbers = document.querySelector('#numbers');
const checkSpecial = document.querySelector('#special');
const btnGenerate = document.querySelector('.generate');
const sliderLength = document.querySelector('#passwordLength');
const sliderValue = document.querySelector('output');
/**
 *
 */
let checkboxReset = (lowercase, uppercase, nums, spec) => {
    if (lowercase.checked) {
        lowercase.checked = false;
    }
    if (uppercase.checked) {
        uppercase.checked = false;
    }
    if (nums.checked) {
        nums.checked = false;
    }
    if (spec.checked) {
        spec.checked = false;
    }
    result.value = '';
};
// resets checkboxes on page reload, to prevent confusion and for a more polished look
window.onload = () => { checkboxReset(checkSmall, checkLarge, checkNumbers, checkSpecial); };
// lets me dynamically watch for user options being selected/deselected
let state = {
    includeSmall: false,
    includeLarge: false,
    includeNumbers: false,
    includeSpecial: false
};
// creates a final string for password gen, based on which options user selects - the string is REMADE every time an option is selected or deselected 
const updatePassword = () => {
    let finalPassword = '';
    if (state.includeSmall) {
        finalPassword += smallLetters;
    }
    if (state.includeLarge) {
        finalPassword += largeLetters;
    }
    if (state.includeNumbers) {
        finalPassword += numbers;
    }
    if (state.includeSpecial) {
        finalPassword += specials;
    }
    if (finalPassword.length > 0) {
        return finalPassword;
    }
};
// takes a final string, generated based on user's selections, and creates a string serving as the password from the selected options. not perfect, sometimes will omit a character type despite it being selected by the user (since its randomized indexes from a string) but i'll fix it later
let generatePassword = () => {
    let possibleChars = updatePassword();
    let endResult = '';
    let finalLength = parseInt(sliderLength.value);
    for (let i = 0; i < finalLength; i++) {
        const randomIndex = Math.floor(Math.random() * possibleChars.length);
        endResult += possibleChars[randomIndex];
    }
    result.value = endResult;
    console.log(endResult.length);
};
// checks for checkboxes below - not perfect, refreshing the page will refresh the booleans to false, but will NOT change the checked state of the checkboxes itself, will fix later
checkSmall.addEventListener('change', () => {
    state.includeSmall = !state.includeSmall;
    console.log(`Small enabled : ${state.includeSmall}`);
});
checkLarge.addEventListener('change', () => {
    state.includeLarge = !state.includeLarge;
    console.log(`Large enabled : ${state.includeLarge}`);
});
checkNumbers.addEventListener('change', () => {
    state.includeNumbers = !state.includeNumbers;
    console.log(`Numbers enabled : ${state.includeNumbers}`);
});
checkSpecial.addEventListener('change', () => {
    state.includeSpecial = !state.includeSpecial;
    console.log(`Special enabled: ${state.includeSpecial}`);
});
// make password come out when button click - throws an error in the console if no options are selected, but the error doesn't stop the program from working (you can select a character for generating a password, and it'll work fine) so error in the console it is for now
btnGenerate.addEventListener('click', () => {
    generatePassword();
});
// handle showing values in the output field
sliderLength.addEventListener('input', () => {
    sliderValue.value = sliderLength.value;
});
