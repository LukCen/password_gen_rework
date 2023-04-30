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

interface States {
    includeSmall: boolean,
    includeLarge: boolean,
    includeNumbers: boolean,
    includeSpecial: boolean

}

let state: States = {
    includeSmall: false,
    includeLarge: false,
    includeNumbers: false,
    includeSpecial: false
}

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

let generatePassword = () => {
    let possibleChars: string = updatePassword();
    let endResult: string | null = ''

    for(let i = 0; i < 12; i++){
        const randomIndex = Math.floor(Math.random()* possibleChars.length)
        endResult += possibleChars[randomIndex]
    }

    
    result.value = endResult
    console.log(endResult.length)
   
}

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

btnGenerate.addEventListener('click', () => {
    generatePassword()
})