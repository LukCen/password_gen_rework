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
let state = {
    includeSmall: false,
    includeLarge: false,
    includeNumbers: false,
    includeSpecial: false
};
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
let generatePassword = () => {
    let possibleChars = updatePassword();
    let endResult = '';
    for (let i = 0; i < 12; i++) {
        const randomIndex = Math.floor(Math.random() * possibleChars.length);
        endResult += possibleChars[randomIndex];
    }
    result.value = endResult;
    console.log(endResult.length);
};
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
btnGenerate.addEventListener('click', () => {
    generatePassword();
});
