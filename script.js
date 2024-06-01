let compute=document.getElementById('compute');
let from=document.getElementById('from');
let to=document.getElementById('to');
let days=document.getElementById('days');
let container2=document.getElementById('container2');
let container1=document.getElementById('container1');
let mainHeader=document.getElementById('mainHeader');


let amountExpense="";
let nameId="";
let description="";
let flag=false;

//Compute
let showEstimate=document.getElementById('showEstimate');
compute.addEventListener('click',function(){
    from.textContent="From: "+userSelectDate;
    to.textContent="To: "+userSelectDate;
    days.textContent="Days: 1 day";
    showEstimate.style.display="block";
    console.log(userSelectDate);

})


function addExpense(){
    let expense=document.getElementById('expenseMsg');
    let newExpense=expense.cloneNode(true);
    newExpense.style.display="flex";
    let lastElement=document.getElementById('addNew');
    /*Need to edit*/newExpense.id="expense";
    container2.insertBefore(newExpense,lastElement);
    let expenses=document.getElementsByClassName('expense');
    for(let i=0;i<expenses.length;i++) {
        expenses[i].addEventListener("click", function (event) {
            let clickedExpense = event.currentTarget;
            let nameId=clickedExpense.querySelector('#label1').textContent;
            let amount=clickedExpense.querySelector('#label2').textContent;
            openPopup(nameId,amount," ",true);

        });
    }
}


let plusButton=document.getElementById('plus');
plusButton.addEventListener('click',function(){

    openPopup(nameId, amountExpense, description,flag);
})
openPopup(nameId, amountExpense, description,flag);


//setting info icon
let info=document.getElementById('infoBlock');
info.addEventListener('mouseenter',function(){
    document.body.style.backgroundColor="dimgray";
    container2.style.opacity=".7";
});
info.addEventListener('mouseleave',function(){
    document.body.style.backgroundColor="white";
    container2.style.opacity="1";
});
//


let threelines=document.getElementById('threelines');
threelines.addEventListener('click', function(){
    let container2=document.getElementById('container2');
    container2.innerHTML="";
})

function openPopup(nameId, amountExpense, description,flag) {
    document.body.style.backgroundColor="black";
    container2.style.opacity=".6";
    container1.style.opacity=".6";
    mainHeader.style.opacity=".6";
    mainHeader.style.outline="none";
    mainHeader.style.pointerEvents="none";
    container1.style.pointerEvents="none";
    container2.style.pointerEvents="none";

    // Calculate the center position of the old window
    var centerX = window.screenX + (window.innerWidth / 2);
    var centerY = window.screenY + (window.innerHeight / 2);


    // Create a new frame element
    var newFrame = document.createElement('iframe');
    newFrame.src = 'CalcExpense.html';
    newFrame.width = '700px';
    newFrame.width = '45%';
    newFrame.height = '540';
    newFrame.style.position = 'absolute';
    newFrame.style.right = '18vw';


    newFrame.style.top =  '100px';
    newFrame.style.borderRadius = '40px';
    newFrame.style.border = 'none';

    document.body.appendChild(newFrame);

    newFrame.onload = function() {
        const newFrameDocument = newFrame.contentDocument || newFrame.contentWindow.document;
        let alertDate = newFrameDocument.getElementById('alertDate');
        alertDate.textContent = alertDateFormat;
        let okButton=newFrameDocument.getElementById('ok');
        let cancelButton=newFrameDocument.getElementById('cancel');
        let okCancelButton=newFrameDocument.getElementById('okCancel');
        okButton.addEventListener('click', function(){
            addExpense();
            revertBody();
            document.body.removeChild(newFrame);
        })
        cancelButton.addEventListener('click', function(){
            revertBody();
            document.body.removeChild(newFrame);
        })

        newFrameDocument.getElementById('amount').value = amountExpense;
        newFrameDocument.getElementById('name').value = nameId;
        newFrameDocument.getElementById('description').value = description;

        window.addEventListener('resize',setPosition);
        setPosition();
        function setPosition(){
            if(window.matchMedia("(min-width: 1461px)").matches){
                newFrame.style.right = '18vw';
            }
            else if(window.matchMedia("(max-width: 1461px)").matches) {
                newFrame.style.right = '18vw';
                container2.style.height = '81vh';
            }
            else if(window.matchMedia("(max-width: 1320px)").matches) {
                newFrame.style.right = '16.5vw';
                container2.style.height = '83vh';
            }
            else if(window.matchMedia("(max-width: 1151px)").matches) {
                newFrame.style.right = '14vw';
            }
            else if(window.matchMedia("(max-width: 1020px)").matches) {
                newFrame.style.right = '13.5vw';
                newFrame.style.top =  '97px';
                container2.style.height = '84vh';
            }
            else if(window.matchMedia("(max-width: 955px)").matches) {
                newFrame.style.top =  '95px';
                newFrame.style.right = '11.5vw';
            }
            else if(window.matchMedia("(max-width: 820px)").matches) {
                newFrame.style.left = '45vw';
            }
        }
        if(flag===true){
            newFrameDocument.getElementById('amount').style.fontWeight='bold';
            newFrameDocument.getElementById('amount').style.color='blue';
            newFrameDocument.getElementById('amount').style.fontSize='x-large';
            newFrameDocument.getElementById('name').style.color='blue';
            newFrameDocument.getElementById('name').style.fontWeight='bold';
            newFrameDocument.getElementById('name').style.fontSize='x-large';
            newFrameDocument.getElementById('description').style.color='blue';
            newFrameDocument.getElementById('description').style.fontWeight='bold';
            newFrameDocument.getElementById('description').style.fontSize='x-large';
            newFrameDocument.getElementById('ok').style.display='none';
            newFrameDocument.getElementById('cancel').style.display='none';
            newFrameDocument.getElementById('okCancel').style.display='block';
            newFrameDocument.body.style.pointerEvents="none";
            okCancelButton.style.pointerEvents="auto";
            okCancelButton.addEventListener('click', function(){
                revertBody();
                document.body.removeChild(newFrame);
            })
        }
    }
}
function revertBody(){
    document.body.style.backgroundColor="white";
    container2.style.opacity="1";
    container1.style.opacity="1";
    mainHeader.style.opacity="1";
    mainHeader.style.outline="1px solid lightgrey";
    mainHeader.style.pointerEvents="auto";
    container1.style.pointerEvents="auto";
    container2.style.pointerEvents="auto";
}