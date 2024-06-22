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
}

function deleteExpense(){
    let Child=document.getElementById('canbeDeleted');
    container2.removeChild(Child);
}

let plusButton=document.getElementById('plus');
plusButton.addEventListener('click',function(){

    openPopup(nameId, amountExpense, groupName, description,flag);
})
//openPopup(nameId, amountExpense, description,flag);


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

function openPopup(nameId, amountExpense, groupName, description,flag) {
    blurBody();

    // Create a new frame element
    var newFrame = document.createElement('iframe');
    newFrame.src = 'CalcExpense.html';
    newFrame.width = '700px';
    newFrame.width = '45%';
    newFrame.height = '590';
    newFrame.style.position = 'absolute';

    let leftPos=(container1.offsetWidth)+((container2.offsetWidth-Math.round(document.body.offsetWidth*(45/100)))/2);
    newFrame.style.left=leftPos.toString()+'px';
    window.addEventListener('resize',function(){
        let leftPos=(container1.offsetWidth)+((container2.offsetWidth-Math.round(document.body.offsetWidth*(45/100)))/2);
        newFrame.style.left=leftPos.toString()+'px';
        resizeOpenPopup();
    })

    newFrame.style.top =  '90px';
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
        let deleteButton=newFrameDocument.getElementById('delete');
        okButton.addEventListener('click', function(){
            function okButtonFlag(){
                if((newFrameDocument.getElementById('name').value==="")||(newFrameDocument.getElementById('amount').value==="")||(newFrameDocument.getElementById('error').style.display==="block")){
                    if(newFrameDocument.getElementById('name').value==="")
                        newFrameDocument.getElementById('error1').style.display="block";
                    if((newFrameDocument.getElementById('amount').value==="")||(newFrameDocument.getElementById('error').style.display==="block"))
                        newFrameDocument.getElementById('error').style.display="block";
                    //newFrameDocument.getElementById('cancel').style.outline="1px solid red";
                    return false;
                }
                return true;
            }
            let addExpenseFlag=okButtonFlag();
            if(!addExpenseFlag)
                return;
            addExpense(newFrameDocument.getElementById('name').value,newFrameDocument.getElementById('amount').value,newFrameDocument.getElementById('groupName').value,newFrameDocument.getElementById('description').value);
            revertBody();
            document.body.removeChild(newFrame);
        })
        cancelButton.addEventListener('click', function(){
            revertBody();
            document.body.removeChild(newFrame);
        })
        okCancelButton.addEventListener('click', function(){
            document.body.removeChild(newFrame);
            clickedExpense.id=clickedExpenseOriginalId;
            revertBody();
        })
        deleteButton.addEventListener('click', function(){
            //deleteExpense();
            document.body.removeChild(newFrame);
            let word=newFrameDocument.getElementById('name').value;
            let extractedWord=word.substring(0,7);
            let fillerStr="";
            if(word.length>extractedWord.length){
                fillerStr="...";
            }
            askToDelete(extractedWord+fillerStr);
        })

        newFrameDocument.getElementById('amount').value = amountExpense;
        newFrameDocument.getElementById('name').value = nameId;
        newFrameDocument.getElementById('groupName').value = groupName;
        newFrameDocument.getElementById('description').value = description;

        if(flag===true){
            newFrameDocument.getElementById('name').style.color='black';
            newFrameDocument.getElementById('name').style.fontWeight='bold';
            newFrameDocument.getElementById('name').style.fontSize='large';
            newFrameDocument.getElementById('name').style.fontFamily='Century Schoolbook';
            newFrameDocument.getElementById('amount').style.fontWeight='bold';
            newFrameDocument.getElementById('amount').style.color='red';
            newFrameDocument.getElementById('amount').style.fontSize='x-large';
            newFrameDocument.getElementById('amount').style.fontFamily='Century Schoolbook';
            newFrameDocument.getElementById('groupName').style.fontWeight='bold';
            newFrameDocument.getElementById('groupName').style.fontSize='17px';
            newFrameDocument.querySelector('label').style.fontSize='15px';
            newFrameDocument.getElementById('groupName').style.fontFamily='Arial';
            newFrameDocument.getElementById('groupName').style.fontWeight='normal';
            newFrameDocument.getElementById('description').style.color='black';
            newFrameDocument.getElementById('description').style.fontSize='16px';
            newFrameDocument.getElementById('description').style.fontFamily='Arial';
            newFrameDocument.getElementById('ok').style.display='none';
            newFrameDocument.getElementById('cancel').style.display='none';
            newFrameDocument.getElementById('okCancel').style.display='block';
            newFrameDocument.getElementById('delete').style.display='block';
            let popuplabels=newFrameDocument.getElementsByClassName('popUplabel');
            for(let i=0;i<popuplabels.length;i++){
                popuplabels[i].style.color='#333333';
                popuplabels[i].style.fontSize='19px';
                popuplabels[i].style.fontFamily='Calibri';
            }
            newFrameDocument.body.style.pointerEvents="none";
            okCancelButton.style.pointerEvents="auto";
            deleteButton.style.pointerEvents="auto";
            newFrameDocument.body.style.background='linear-gradient(45deg, rgb(0, 255, 255,0.78), rgb(255, 105, 180,0.75))';
            //newFrameDocument.body.style.background='linear-gradient(45deg, #00BFFF, lightgrey)';
            newFrameDocument.getElementById('description').style.pointerEvents="auto";
            newFrameDocument.getElementById('description').style.cursor="default";
            newFrameDocument.getElementById('description').readOnly="true";
            /*let popupInputs=newFrameDocument.getElementsByClassName('popupInputs');
            for(let i=0;i<popupInputs.length;i++){
                //popupInputs[i].style.backgroundColor="lightgray";
                popupInputs[i].style.color="black";
                popupInputs[i].style.outline="none";
                popupInputs[i].style.fontFamily="Arial";
                newFrameDocument.body.style.opacity=".7"
            }*/
        }
    }
    resizeOpenPopup();
    function resizeOpenPopup(){
        const mediaQuery =window.matchMedia("(max-width: 690px)")
        if(mediaQuery.matches) {
            leftPos = ((container2.offsetWidth - Math.round(document.body.offsetWidth * (90 / 100))) / 2)-5;
            newFrame.style.left = leftPos.toString() + 'px';
            newFrame.width="90%";
            newFrame.style.position="fixed";
            let topPos=80;
            newFrame.style.top = topPos.toString() + 'px';
        }
        else{
            leftPos=(container1.offsetWidth)+((container2.offsetWidth-Math.round(document.body.offsetWidth*(45/100)))/2);
            newFrame.style.left=leftPos.toString()+'px';
            newFrame.width = '45%';
            newFrame.style.position = 'absolute';
            newFrame.style.top =  '90px';
            /*Need to Modify*/
            if(matchMedia("(max-width: 1500px)").matches){
                container1.style.height = "659px"
                container2.style.height = "634px";
            }
            else {
                container1.style.height = "659px"
                container2.style.height = "597px";
            }
        }
    }
}
function revertBody(){
    document.getElementById('pseudoBox').style.display="none";
}
function blurBody(){
    document.getElementById('pseudoBox').style.display="block";
}