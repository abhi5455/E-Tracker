let compute=document.getElementById('compute');
let from=document.getElementById('from');
let to=document.getElementById('to');
let days=document.getElementById('days');
let container2=document.getElementById('container2');
let container1=document.getElementById('container1');
let mainHeader=document.getElementById('mainHeader');

container2.style.height=(container2.offsetHeight).toString()+'px';

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


function addExpense(name,amount,description){
    let expense=document.getElementById('expenseMsg');
    let newExpense=expense.cloneNode(true);
    newExpense.style.display="flex";
    let lastElement=document.getElementById('addNew');
    /*Need to edit*/newExpense.id="expense";
    newExpense.querySelector('#label1').textContent=name;
    newExpense.querySelector('#label2').textContent=amount;
    newExpense.querySelector('#label3').textContent=description;
    container2.insertBefore(newExpense,lastElement);
    let expenses=document.getElementsByClassName('expense');
    for(let i=0;i<expenses.length;i++) {
        expenses[i].addEventListener("click", function (event) {
            event.stopImmediatePropagation();
            let clickedExpense = event.currentTarget;
            let nameId=clickedExpense.querySelector('#label1').textContent;
            let amount=clickedExpense.querySelector('#label2').textContent;
            let description=clickedExpense.querySelector('#label3').textContent;
            if(description==="") {
                description = "No description";
            }
            openPopup(nameId,amount,description,true);

        });
    }
}
addExpense("Food","1000","efwygidcsuhcb");
addExpense("Outing","2500","Yay!");
addExpense("Outing","2500","");



let plusButton=document.getElementById('plus');
plusButton.addEventListener('click',function(){

    openPopup(nameId, amountExpense, description,flag);
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



    // Create a new frame element
    var newFrame = document.createElement('iframe');
    newFrame.src = 'CalcExpense.html';
    newFrame.width = '700px';
    newFrame.width = '45%';
    newFrame.height = '540';
    newFrame.style.position = 'absolute';

    let leftPos=297+((container2.offsetWidth-Math.round(document.body.offsetWidth*(45/100)))/2);
    newFrame.style.left=leftPos.toString()+'px';
    window.addEventListener('resize',function(){
        let leftPos=297+((container2.offsetWidth-Math.round(document.body.offsetWidth*(45/100)))/2);
        newFrame.style.left=leftPos.toString()+'px';
    })

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
            function okButtonFlag(){
                if((newFrameDocument.getElementById('name').value==="")||(newFrameDocument.getElementById('amount').value==="")||(newFrameDocument.getElementById('error').style.display==="block")){
                    if(newFrameDocument.getElementById('name').value==="")
                        newFrameDocument.getElementById('error1').style.display="block";
                    if((newFrameDocument.getElementById('amount').value==="")||(newFrameDocument.getElementById('error').style.display==="block"))
                        newFrameDocument.getElementById('error').style.display="block";
                    return false;
                }
                return true;
            }
            let addExpenseFlag=okButtonFlag();
            if(!addExpenseFlag)
                return;
            addExpense(newFrameDocument.getElementById('name').value,newFrameDocument.getElementById('amount').value,newFrameDocument.getElementById('description').value);
            revertBody();
            document.body.removeChild(newFrame);
        })
        cancelButton.addEventListener('click', function(){
            revertBody();
            document.body.removeChild(newFrame);
        })
        okCancelButton.addEventListener('click', function(){
            document.body.removeChild(newFrame);
            revertBody();
        })

        newFrameDocument.getElementById('amount').value = amountExpense;
        newFrameDocument.getElementById('name').value = nameId;
        newFrameDocument.getElementById('description').value = description;


        if(flag===true){
            newFrameDocument.getElementById('amount').style.fontWeight='bold';
            newFrameDocument.getElementById('amount').style.color='blue';
            newFrameDocument.getElementById('amount').style.fontSize='x-large';
            newFrameDocument.getElementById('name').style.color='blue';
            newFrameDocument.getElementById('name').style.fontWeight='bold';
            newFrameDocument.getElementById('name').style.fontSize='x-large';
            newFrameDocument.getElementById('description').style.color='blue';
            newFrameDocument.getElementById('description').style.fontWeight='bold';
            newFrameDocument.getElementById('description').style.fontSize='medium';
            newFrameDocument.getElementById('ok').style.display='none';
            newFrameDocument.getElementById('cancel').style.display='none';
            newFrameDocument.getElementById('okCancel').style.display='block';
            /*let popuplabels=newFrameDocument.getElementsByClassName('popUplabel');
            for(let i=0;i<popuplabels.length;i++){
                popuplabels[i].style.color='dimgrey';
            }*/
            newFrameDocument.body.style.pointerEvents="none";
            newFrameDocument.body.style.background='linear-gradient(45deg, #00BFFF, lightgreen)';
            okCancelButton.style.pointerEvents="auto";

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