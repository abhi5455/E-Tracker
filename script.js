let compute=document.getElementById('compute');
let from=document.getElementById('from');
let to=document.getElementById('to');
let days=document.getElementById('days');
let expenses=document.getElementById('expense');
let container2=document.getElementById('container2');

let showEstimate=document.getElementById('showEstimate');
compute.addEventListener('click',function(){
    from.textContent="From: "+userSelectDate;
    to.textContent="To: "+userSelectDate;
    days.textContent="Days: 1 day";
    showEstimate.style.display="block";
    console.log(userSelectDate);

    addExpense();

    openPopup();
})

function addExpense(){
    let expense=document.getElementById('expenseMsg');
    let newExpense=expense.cloneNode(true);
    newExpense.style.display="flex";
    let lastElement=document.getElementById('addNew');
    newExpense.id="expense";
    container2.insertBefore(newExpense,lastElement);
}

let info=document.getElementById('infoBlock');
info.addEventListener('mouseenter',function(){
    document.body.style.backgroundColor="dimgray";
    container2.style.opacity=".7";
});
info.addEventListener('mouseleave',function(){
    document.body.style.backgroundColor="white";
    container2.style.opacity="1";
});



let threelines=document.getElementById('threelines');
threelines.addEventListener('click', function(){
    let container2=document.getElementById('container2');
    container2.innerHTML="";
})

function openPopup() {
    // Calculate the center position of the old window
    var centerX = window.screenX + (window.innerWidth / 2);
    var centerY = window.screenY + (window.innerHeight / 2);

    // Calculate the position of the new frame to center it relative to the old window
    var newFrameWidth = 400;
    var newFrameHeight = 400;
    var newX = centerX - (newFrameWidth / 2);
    var newY = centerY - (newFrameHeight / 2);

    // Create a new frame element
    var newFrame = document.createElement('iframe');
    newFrame.src = 'CalcExpense.html';
    newFrame.width = newFrameWidth;
    newFrame.height = newFrameHeight;
    newFrame.style.position = 'absolute';
    newFrame.style.left = '10px';
    newFrame.style.top =  '20px';

    // Add the frame to the document body
    //document.body.appendChild(newFrame);
}