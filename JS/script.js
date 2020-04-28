// Set name input to focus when page loads
window.addEventListener('load', setFocus);

function setFocus () {
    document.getElementById('name').focus(); 
}

// Initially hide other input bar and payment methods
document.getElementById('other-title').style.display = 'none';
document.getElementById('bitcoin').style.display = 'none';
document.getElementById('paypal').style.display = 'none';


// Create other placeholder
document.getElementById('title').addEventListener('click', otherPlaceholder);

function otherPlaceholder () {
   const title = document.getElementById('title')
   const options = title.options[title.selectedIndex].value;
   if (options == 'other') {
       document.getElementById('other-title').style.display = ''
   } else {
    document.getElementById('other-title').style.display = 'none'
   }
}

// Display T-shirt design only when selected
document.getElementById('design').addEventListener('change', getShirtColor);
const colorPuns = document.getElementById('color');
const colorPunsList = document.querySelectorAll('#color option');
const divBox = document.getElementById('colors-js-puns');
const colorLabel = colorPuns.previousElementSibling;
// Create alert <p> and initially hide it
const p = document.createElement('p');
p.textContent = '*Please Select a T-Shirt Theme';
p.style.color = 'red';
p.style.margin = '1.8rem 0 0 4rem';
divBox.appendChild(p);
colorPuns.style.display = 'none';
colorLabel.style.display = 'none';
p.style.display = 'none';

function getShirtColor () {
    const design = document.getElementById('design');
    const theme = design.options[design.selectedIndex].value;
    const colors = document.getElementById('color');
    colors.style.display = 'none';
    
    if (theme == 'js puns') {
        // Display Puns colours
        colorPuns.style.display = '';
        colorLabel.style.display = '';
        p.style.display = 'none';
        for (let i = 0; i < colorPunsList.length; i++) {
            colors[i].style.display = '';
            document.querySelector('option[value="cornflowerblue"]').selected = true
            if (i === 0 || i === 1 || i === 2) continue; colors[i].style.display = 'none';
        }
    } else if (theme == 'heart js') {
        // Display I Heart colours
        colorPuns.style.display = ''
        colorLabel.style.display = '';
        p.style.display = 'none';
        for (let i = 0; i < colorPunsList.length; i++) {
            colors[i].style.display = '';
            document.querySelector('option[value="tomato"]').selected = true;
            if (i === 3 || i === 4 || i === 5) continue; colors[i].style.display = 'none';
            
        }
    } else {
        // Nothing displays
        p.style.display = 'none';
        colorLabel.style.display = 'none';
        colorPuns.style.display = 'none';
    }
}

// Total Cost of Activities Clicked While Excluding Overlap in Time
const checkboxes = document.querySelectorAll('.activities input');

document.querySelector('.activities').addEventListener('change', (e) => {
    let arr = [];
    let total = 0; 
    const clicked = e.target;
    const clickedType = clicked.getAttribute('data-day-and-time');
    const clickedNum = clicked.getAttribute('data-cost');
    const checkNum = document.querySelectorAll('.activities input:checked');
    // Loop through checked activites and put the data attribute into an array
    checkNum.forEach(check => {
        arr.push(check.dataset.cost);   
    });
    // Then loop through the array and calculate the total while parsing the array values into numbers
        arr.forEach(num => {
        total += parseInt(num);
    });
    // Create div that's going to display the running total at the bottom of checkboxes
    const div = document.createElement('div');
    div.className = 'amount';
    const amount = document.querySelector('.amount');
    const activities = document.querySelector('.activities');
    div.textContent = ` Your total is: $${total}`;
    div.style.fontWeight = 'bold';
    activities.appendChild(div);
    // Check to see if the div already exists to avoid multiple divs being created.
    if (amount) {
        amount.remove();
    }
    // Loop through checkboxes
    for (let i = 0; i < checkboxes.length; i++) {
        const checkboxType = checkboxes[i].getAttribute('data-day-and-time');
        const checkboxTypeNum = checkboxes[i].getAttribute('data-cost');
        // If the checkbox clicked matches another with the same data attribute disable the one not clicked 
        if (clickedType === checkboxType && clickedNum === checkboxTypeNum && clicked !== checkboxes[i]) {
            if (clicked.checked) {
                checkboxes[i].disabled = true;
            }else {
                checkboxes[i].disabled = false;
            }
        }
    }
    
});

// Hide payment info for ones not selected
document.getElementById('payment').addEventListener('change', paymentMethod);
document.querySelector('option[value="credit card"]').selected = true;
document.querySelector('option[value="select method"]').style.display = 'none';
function paymentMethod (e) {
    const payment = document.getElementById('payment');
    const selectedOption = payment.options[payment.selectedIndex].value;
    const credit = document.getElementById('credit-card');
    const bitcoin = document.getElementById('bitcoin');
    const paypal = document.getElementById('paypal');
  
    if (selectedOption === 'paypal') {
        paypal.style.display = '';
        credit.style.display = 'none';
        bitcoin.style.display = 'none';
    }else if (selectedOption === 'bitcoin') {
        bitcoin.style.display = '';
        credit.style.display = 'none';
        paypal.style.display = 'none';
    }else {
        credit.style.display = '';
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
    }
    
}

// Form Error messages
function nameValidation () {
    const name = document.getElementById('name');
    const nameValue = name.value;
    
    if (nameValue.length > 1) {
        name.style.borderColor = 'white';
        return true;
    }else {
        name.style.borderColor = 'red';
        return false;
    }
}

function emailValidation () {
    const email = document.getElementById('mail');
    const emailValue = email.value;
    const index = emailValue.indexOf('@');
    const lastIndex = emailValue.lastIndexOf('.');
    
    if (index > 1 && lastIndex > index + 1) {
        email.style.borderColor = 'white';
        return true;
    }else {
        email.style.borderColor = 'red';
        return false;
    } 
}

// Create error message and append to label
const div = document.createElement('div');
div.style.color = 'red';
div.textContent = 'Email must contain an "@" and "."';
const label = document.querySelectorAll('label')[1];
label.appendChild(div);
div.style.display = 'inline';
div.style.fontWeight = 'bold';
div.style.display = 'none';

document.getElementById('mail').addEventListener('keyup', (e) => {
    const email = document.getElementById('mail');
    const emailValue = email.value;
    const index = emailValue.indexOf('@');
    const lastIndex = emailValue.lastIndexOf('.');

    if (index > 1 && lastIndex > index + 1) {
        email.style.borderColor = 'white';
        div.style.display = 'none';
        return true;
    }else {
        email.style.borderColor = 'red';
        div.style.display = '';
        return false;
    } 
});

function otherTitle () {
    const other = document.getElementById('other-title');
    const otherValue = other.value;
    const title = document.getElementById('title');
    const option = title.options[title.selectedIndex].value;
    if (option !== 'other') {
        console.log('title selected:', option);
        return true;
    }else {
        if (otherValue.length > 1) {
            other.style.borderColor = 'white';
            console.log('other title selected and filled');
            return true;
        }else {
            other.style.borderColor = 'red';
            console.log('nothing selected');
            return false;
        }
    }
}

function tshirtValidation () {
    const design = document.getElementById('design');
    const theme = design.options[design.selectedIndex].value;

    if (theme === 'Select Theme') {
        p.style.display = '';
        return false;
    }else {
        p.style.display = 'none';
        console.log('t-shirt chosen');
        return true;
    }
}


function activitiesValidation () {
    const div = document.createElement('div');
    const legend = document.querySelector('.activities legend');
    div.textContent = 'Please select at least one.';
    div.style.color = 'red';
    div.className = 'error';
    const clickedLength = document.querySelectorAll('.activities input:checked').length;
    
    if (clickedLength >= 1) {
        legend.style.color = 'rgba(6, 49, 68, 0.9)';
        legend.textContent = 'Register for Activities';
        return true;
    }else {
        legend.style.color = 'red'
        legend.textContent = 'Please Select at Least One';
        // setTimeout(function (){
        //     legend.style.color = 'rgba(6, 49, 68, 0.9)';
        //     legend.textContent = 'Register for Activities';
        // },5000);
        return false;
    }
}

// Append credit card error message, them hide it
const divCard = document.createElement('div');
const CreditLabel = document.querySelector('#credit-card');
divCard.style.color = 'red';
divCard.textContent = '*Please enter a card number between 13 and 16 digits.'
divCard.style.paddingBottom = '.5rem'
CreditLabel.insertBefore(divCard, CreditLabel.childNodes[0]);
divCard.style.display = 'none';

function paymentValidation() {
    const selectedOption = payment.options[payment.selectedIndex].value;
    if (selectedOption == 'credit card') {
        const payment = document.getElementById('payment');
        const card = document.getElementById('cc-num');
        const cardValue = card.value;
        const reCard = /^[0-9]{13,16}$/;
        const reZip = /^[0-9]{5}$/;
        const reCvv = /^[0-9]{3}$/;
        const zip = document.getElementById('zip');
        const cvv = document.getElementById('cvv');

        if (!reCard.test(cardValue) || !reZip.test(zip.value) || !reCvv.test(cvv.value)) {
            
            if (!reCard.test(cardValue) && !reZip.test(zip.value) && !reCvv.test(cvv.value)) {
                card.style.borderColor = 'red';
                zip.style.borderColor = 'red';
                cvv.style.borderColor = 'red'
                divCard.style.display = '';
                divCard.textContent = 'Please enter valid information below.';
                return false;
            }

                if (!reCard.test(cardValue) && !reZip.test(zip.value)) {
                    card.style.borderColor = 'white';
                    zip.style.borderColor = 'white';
                    cvv.style.borderColor = 'white';
                    card.style.borderColor = 'red';
                    zip.style.borderColor = 'red';
                    cvv.style.borderColor = 'white';
                    divCard.style.display = '';
                    divCard.textContent = '*Please enter a valid Credit Card & ZIP number.'
                    return false;
                }else if (!reZip.test(zip.value) && !reCvv.test(cvv.value)) {
                    card.style.borderColor = 'white';
                    zip.style.borderColor = 'white';
                    cvv.style.borderColor = 'white';
                    zip.style.borderColor = 'red';
                    card.style.borderColor = 'white';
                    cvv.style.borderColor = 'red';
                    divCard.style.display = '';
                    divCard.textContent = '*Please enter valid ZIP & CVV number.';
                    return false;
                }else if (!reCvv.test(cvv.value) && !reCard.test(cardValue)) {
                    card.style.borderColor = 'white';
                    zip.style.borderColor = 'white';
                    cvv.style.borderColor = 'white';
                    cvv.style.borderColor = 'red';
                    zip.style.display = 'white';
                    card.style.borderColor = 'red';
                    divCard.style.display = '';
                    divCard.textContent = '*Please enter valid Credit Card and CVV number.';
                    return false;
                }else if (!reCard.test(cardValue)){
                    card.style.borderColor = 'white';
                    zip.style.borderColor = 'white';
                    cvv.style.borderColor = 'white';
                    card.style.borderColor = 'red';
                    zip.style.borderColor = 'white';
                    cvv.style.borderColor = 'white';
                    divCard.style.display = '';
                    divCard.textContent = 'Please enter a Card number between 13 and 16 digits';
                    return false;
                }else if (!reZip.test(zip.value)) {
                    card.style.borderColor = 'white';
                    zip.style.borderColor = 'white';
                    cvv.style.borderColor = 'white';
                    zip.borderColor = 'red';
                    card.style.borderColor = 'white';
                    cvv.style.borderColor = 'white';
                    divCard.style.display = '';
                    divCard.textContent = '*Please enter a five digit ZIP.'
                    return false;
                }else if (!reCvv.test(cvv.value)) {
                    card.style.borderColor = 'white';
                    zip.style.borderColor = 'white';
                    cvv.style.borderColor = 'white';
                    cvv.style.borderColor = 'red';
                    zip.style.borderColor = 'white';
                    card.borderColor = 'white';
                    divCard.style.display = '';
                    divCard.textContent = '*Please enter a three digit CVV.';
                    return false;
                }else {
                    card.style.borderColor = 'white';
                    zip.style.borderColor = 'white';
                    cvv.style.borderColor = 'white';
                    divCard.style.display = 'none';
                    return true;
                }
            
        }else {
            console.log('success');
            card.style.borderColor = 'white';
            divCard.style.display = 'none';
            return true;
        }
    }else if (selectedOption == 'paypal') {
        console.log('Paypal selected');
        payment.style.borderColor = 'white';
        return true;
    }else if (selectedOption == 'bitcoin') {
        console.log('bitcoin selected');
        payment.style.borderColor = 'white';
        return true;
    }else if (selectedOption == 'select method'){
        payment.style.borderColor = 'red';
        return false
    }else {
        return true;
    }

}

document.querySelector('form').addEventListener('submit', function(e){
    nameValidation();
    emailValidation();
    otherTitle();
    tshirtValidation();
    activitiesValidation();
    paymentValidation();

    if (!nameValidation()) {
        e.preventDefault();
        console.log('Name not inputed');
    }

    if (!emailValidation()) {
        e.preventDefault();
        console.log('Email not inputed or formated correctly');
    }

    if (!otherTitle()) {
        e.preventDefault();
        console.log('other title input is blank');
    }

    if (!tshirtValidation()) {
        e.preventDefault();
        console.log('t-shirt not selected');
    }

    if (!activitiesValidation()) {
        e.preventDefault();
        console.log('No activites selected');
    }

    if (!paymentValidation()) {
        e.preventDefault();
        console.log('credit card not formatted correctly');
    }

    e.preventDefault();
   
});