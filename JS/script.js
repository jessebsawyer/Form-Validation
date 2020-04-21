// Set name input to focus when page loads
window.addEventListener('load', setFocus);

function setFocus () {
    document.getElementById('name').focus(); 
}

// Initially hide other input bar
document.getElementById('other-title').style.display = 'none';


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
document.getElementById('design').addEventListener('click', getShirtColor);
const colorPuns = document.getElementById('color');
colorPuns.style.display = 'none';

function getShirtColor () {
    const design = document.getElementById('design');
    const theme = design.options[design.selectedIndex].value;
    const colors = document.getElementById('color');
    colors.style.display = 'none';
    
    if (theme == 'js puns') {
        // Display Puns colours
        colorPuns.style.display = '';
        for (let i = 3; i < colors.length; i++) {
            colors[i].style.display = 'none';
        }
    } else if (theme == 'heart js') {
        // Display I Heart colours
        colorPuns.style.display = ''
        for (let i = 0; i < colors.length; i++) {
            if (i == 1 ) continue; colors[i].style.display = 'none';
        }
    } else {
        // Display all
        colorPuns.style.display = 'none';
    }
}

// Total Cost of Activities Clicked While Excluding Overlap in Time
const checkboxes = document.querySelectorAll('.activities input');

document.querySelector('.activities').addEventListener('change', (e) => {
    const clicked = e.target;
    const clickedType = clicked.getAttribute('data-day-and-time');
    const clickedNum = clicked.getAttribute('data-cost');
    let arr = [];
    let total = 0; 
    const checkNum = document.querySelectorAll('.activities input:checked');
    checkNum.forEach(check => {
        arr.push(check.dataset.cost);   
    });
        arr.forEach(num => {
        total += parseInt(num);
    });
    // console.log(total);
    console.log(arr);
    const h2 = document.createElement('div');
    const activities = document.querySelector('.activities');
    h2.textContent = ` Your total is: $${total}`;
    h2.style.fontWeight = 'bold';
    activities.appendChild(h2);
    for (let i = 0; i < checkboxes.length; i++) {
        const checkboxType = checkboxes[i].getAttribute('data-day-and-time');
        const checkboxTypeNum = checkboxes[i].getAttribute('data-cost');
        
        if (clickedType === checkboxType && clickedNum === checkboxTypeNum && clicked !== checkboxes[i]) {
            if (clicked.checked) {
                checkboxes[i].disabled = true;
            }else {
                checkboxes[i].disabled = false;
            }
        }
    }
    
});