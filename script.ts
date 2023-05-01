const smallLetters: string = 'abcdefghijklmnopqrstuvwxyz';
const largeLetters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers: string = '0123456789';
const specials: string = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

let result: HTMLInputElement | null = document.querySelector('#result') ;

const checkSmall: HTMLInputElement | null = document.querySelector('#smallLetters');
const checkLarge: HTMLInputElement | null = document.querySelector('#largeLetters');
const checkNumbers: HTMLInputElement | null = document.querySelector('#numbers');
const checkSpecial: HTMLInputElement | null = document.querySelector('#special')

const btnGenerate: HTMLButtonElement | null = document.querySelector('.generate');

const sliderLength: HTMLInputElement | null = document.querySelector('#passwordLength')
const sliderValue: HTMLOutputElement | null = document.querySelector('output');


// i dont even recall why i went for interfaces here, probably some compatibility issues down the line, anyway it does the job
interface States {
    includeSmall: boolean,
    includeLarge: boolean,
    includeNumbers: boolean,
    includeSpecial: boolean

}

// lets me dynamically watch for user options being selected/deselected
let state: States = {
    includeSmall: false,
    includeLarge: false,
    includeNumbers: false,
    includeSpecial: false
}

// creates a final string for password gen, based on which options user selects - the string is REMADE every time an option is selected or deselected 
const updatePassword = () => {
    let finalPassword: string = ''

    if(state.includeSmall){
        finalPassword += smallLetters
    }

    if(state.includeLarge){
        finalPassword += largeLetters
    }

    if(state.includeNumbers){
        finalPassword += numbers
    }

    if(state.includeSpecial){
        finalPassword += specials
    }

    if(finalPassword.length > 0){
        return finalPassword
    }
}

// takes a final string, generated based on user's selections, and creates a string serving as the password from the selected options. not perfect, sometimes will omit a character type despite it being selected (since its randomized) but i'll fix it later
let generatePassword = () => {
    let possibleChars: string = updatePassword();
    let endResult: string | null = ''

    let finalLength: number = parseInt(sliderLength.value)

    for(let i = 0; i < finalLength; i++){
        const randomIndex = Math.floor(Math.random()* possibleChars.length)
        endResult += possibleChars[randomIndex]
    }

    result.value = endResult
    console.log(endResult.length)
   
}

// checks for checkboxes below - not perfect, refreshing the page will refresh the booleans to false, but will NOT change the checked state of the checkboxes itself, will fix later
checkSmall.addEventListener('change', () => {
    state.includeSmall = !state.includeSmall
    console.log(`Small enabled : ${state.includeSmall}`)
})

checkLarge.addEventListener('change', () => {
    state.includeLarge = !state.includeLarge
    console.log(`Large enabled : ${state.includeLarge}`)
})

checkNumbers.addEventListener('change', () => {
    state.includeNumbers = !state.includeNumbers
    console.log(`Numbers enabled : ${state.includeNumbers}`)
})

checkSpecial.addEventListener('change', () => {
    state.includeSpecial = !state.includeSpecial
    console.log(`Special enabled: ${state.includeSpecial}`)
})


// make password come out when button click - throws an error in the console if no options are selected, but the error doesn't stop the program from working (you can select a character for generating a password, and it'll work fine) so error in the console it is for now
btnGenerate.addEventListener('click', () => {
    generatePassword()
})

// handle showing values in the output field
sliderLength.addEventListener('input', () => {
    sliderValue.value = sliderLength.value
})