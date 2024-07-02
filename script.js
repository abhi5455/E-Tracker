let compute=document.getElementById('compute');
let from=document.getElementById('from');
let to=document.getElementById('to');
let days=document.getElementById('days');
let container2=document.getElementById('container2');
let container1=document.getElementById('container1');
let mainHeader=document.getElementById('mainHeader');
let noExpenseText=document.getElementById("noExpenseText");

function getTimeStamp(){
    let today = new Date();
    let hours = today.getHours().toString().padStart(2, '0');
    let minutes = today.getMinutes().toString().padStart(2, '0');
    let seconds = today.getSeconds().toString().padStart(2, '0');
    let day=userSelectDate.split(' ').join('');
    return hours + minutes + seconds+"00" + day;
}

container2.style.height=(container2.offsetHeight).toString()+'px';

let amountExpense="";
let nameId="";
let groupName="";
let description="";
let flag=false;
let threeLinesFlag=false;
let clickedExpense;
let clickedExpenseOriginalId;


function addExpense(name,amount,groupName,description){

    noExpenseText.style.display="none";

    let expense=document.getElementById('expenseMsg');
    let newExpense=expense.cloneNode(true);
    newExpense.style.display="flex";
    let lastElement=document.getElementById('addNew');
    /*Need to edit*/newExpense.id=getTimeStamp();
    newExpense.querySelector('#label1').textContent=name;
    newExpense.querySelector('#label2').textContent="₹"+amount;
    newExpense.querySelector('#label3').textContent=description;
    newExpense.querySelector('#label4').textContent=groupName;
    newExpense.querySelector('#expenseFooter').textContent=userSelectDate;
    container2.insertBefore(newExpense,lastElement);
    let expenses=document.getElementsByClassName('expense');
    for(let i=0;i<expenses.length;i++) {
        expenses[i].addEventListener("click", function (event) {
            event.stopImmediatePropagation();
            clickedExpense = event.currentTarget;
            clickedExpenseOriginalId=clickedExpense.id;
            clickedExpense.id="canbeDeleted"
            let nameId=clickedExpense.querySelector('#label1').textContent;
            let amount=clickedExpense.querySelector('#label2').textContent;
            let groupName=clickedExpense.querySelector('#label4').textContent;
            let description=clickedExpense.querySelector('#label3').textContent;
            if(description==="") {
                description = "No description";
            }
            if(groupName===""){
                groupName= "No Category Added";
            }
            openPopup(nameId,amount,groupName,description,true);
        });
    }

    let expenseLabel11=document.getElementsByClassName('label11');
    for(let i=0;i<expenseLabel11.length;i++) {
        expenseLabel11[i].style.fontSize="22px";
    }
}

function deleteExpense(){
    let Child=document.getElementById('canbeDeleted');
    container2.removeChild(Child);
}

let plusButton=document.getElementById('plus');
plusButton.addEventListener('click',function(){

    openPopup(nameId, amountExpense, groupName, description,flag);
})


//setting info icon
let info=document.getElementById('infoBlock');
info.addEventListener('mouseenter',function(){
    document.body.style.backgroundColor="dimgray";
    container2.style.opacity=".7";
    if(matchMedia('(max-width: 690px)').matches){
        document.getElementById('pseudoBox').style.display="block";
        document.getElementById('pseudoBox').style.top="70px";
        document.getElementById('pseudoBox').style.opacity=".5";
    }
});
info.addEventListener('mouseleave',function(){
    document.body.style.backgroundColor="white";
    container2.style.opacity="1";
    if(matchMedia('(max-width: 690px)').matches){
        document.getElementById('pseudoBox').style.display="none";
        document.getElementById('pseudoBox').style.top="0";
    }
});
//


let threelines=document.getElementById('threelines');
dateUpdate.onclick=function(){ threelines.click() }
threelines.addEventListener('click', function(){
    if(threeLinesFlag===false) {
        container1.style.display = "none";
        threeLinesFlag=true;
    }
    else{
        container1.style.display="flex";
        threeLinesFlag=false;
    }
})

function revertBody(){
    document.getElementById('pseudoBox').style.display="none";

    document.getElementById('name').style.fontFamily = 'Arial';
    document.getElementById('amount').style.fontWeight = 'normal';
    document.getElementById('amount').style.color = 'black';
    document.getElementById('amount').style.fontSize = 'large';
    document.getElementById('amount').style.fontFamily = 'Arial';
    document.getElementById('category').style.fontWeight = 'normal';
    document.getElementById('category').style.fontSize = 'large';
    document.querySelector('label').style.fontSize = 'large';
    document.getElementById('description').style.fontSize = 'large';

    for (let i = 0; i < calcExpPopupLabels.length; i++) {
        calcExpPopupLabels[i].style.color = 'black';
        calcExpPopupLabels[i].style.fontSize = 'large';
        calcExpPopupLabels[i].style.fontFamily = 'Calibri';
    }

    okCancelButton.style.display = 'none';
    deleteButton.style.display = 'none';
    okButton.style.display = 'block';
    cancelButton.style.display = 'block';
    document.getElementById('error').style.display = 'none';
    document.getElementById('error1').style.display = 'none';
    document.getElementById('name').readOnly = false;
    document.getElementById('amount').readOnly = false;
    document.getElementById('category').readOnly = false;
    document.getElementById('description').readOnly = false;
}
function blurBody(){
    document.getElementById('pseudoBox').style.display="block";
    document.getElementById('pseudoBox').style.height = document.body.clientHeight + 'px';
    window.addEventListener('resize', function (){
        document.getElementById('pseudoBox').style.height = document.body.clientHeight + 'px';
    })
}

let pseudoBox=document.getElementById('pseudoBox');
pseudoBox.addEventListener('click',function(){
    revertBody();
    calcExpPopup.style.display = 'none';
    computePopup.style.display="none";
    searchBy.style.display="block";
    document.getElementById("groupName").value="";
    document.getElementById("searchByLabel").style.display="none";
})