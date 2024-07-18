let amount=document.getElementById('amount');
amount.addEventListener('input',function(){
    let text=amount.value;
    let x=/^\d+(\.\d+)?$/.test(text);
    let error=document.getElementById('error')
    if(!x && text!==""){
        error.style.display="block";
    }
    else
        error.style.display="none";
});
document.getElementById('name').addEventListener('input',function(){
    if(document.getElementById('name').value===""){
        document.getElementById('error1').style.display="block";
    }
    else{
        document.getElementById('error1').style.display="none";
    }
})

let calcExpPopup=document.getElementById('calcExpPopup');
let okButton = document.getElementById('ok');
let cancelButton = document.getElementById('cancel');
let okCancelButton = document.getElementById('okCancel');
let deleteButton = document.getElementById('delete');
let calcExpPopupLabels=document.getElementsByClassName('popUplabel');
let calcExpPopupInputs=document.getElementsByClassName('popupInputs');

function openPopup(expenseId, nameId, amountExpense, groupName, description,flag) {
    blurBody();
    calcExpPopup.style.display="block";

    resizeOpenPopup();

    window.addEventListener('resize', function () {
        resizeOpenPopup();
    })

    let alertDate = document.getElementById('alertDate');
    alertDate.textContent = alertDateFormat;

    okButton.addEventListener('click', function () {
        event.stopImmediatePropagation();
        function okButtonFlag() {
            if ((document.getElementById('name').value === "") || (document.getElementById('amount').value === "") || (document.getElementById('error').style.display === "block")) {
                if (document.getElementById('name').value === "")
                    document.getElementById('error1').style.display = "block";
                if ((document.getElementById('amount').value === "") || (document.getElementById('error').style.display === "block"))
                    document.getElementById('error').style.display = "block";
                //document.getElementById('cancel').style.outline="1px solid red";
                return false;
            }
            return true;
        }

        let addExpenseFlag = okButtonFlag();
        if (!addExpenseFlag)
            return;
        let id = getTimeStamp();
        addExpense(id, userSelectDate,document.getElementById('name').value, document.getElementById('amount').value, document.getElementById('category').value, document.getElementById('description').value);
        storeExpense(id, userSelectDate,document.getElementById('name').value, document.getElementById('amount').value, document.getElementById('category').value, document.getElementById('description').value);

        revertBody();
        calcExpPopup.style.display = 'none';
    })
    cancelButton.addEventListener('click', function () {
        revertBody();
        calcExpPopup.style.display = 'none';
    })
    okCancelButton.addEventListener('click', function () {
        calcExpPopup.style.display = 'none';
        clickedExpense.id = clickedExpenseOriginalId;
        revertBody();
    })
    deleteButton.addEventListener('click', function () {
        //deleteExpense();
        calcExpPopup.style.display = 'none';
        let word = document.getElementById('name').value;
        let extractedWord = word.substring(0, 7);
        let fillerStr = "";
        if (word.length > extractedWord.length) {
            fillerStr = "...";
        }
        askToDelete(extractedWord + fillerStr);
    })

    document.getElementById('amount').value = amountExpense;
    document.getElementById('name').value = nameId;
    document.getElementById('category').value = groupName;
    document.getElementById('description').value = description;

    if (flag === true) {
        //alertDate.textContent = alertDateFormat;
        updateAlertDate(clickedExpenseOriginalId)

        document.getElementById('name').style.color = 'black';
        document.getElementById('name').style.fontWeight = 'normal';
        document.getElementById('name').style.fontSize = '20x';
        document.getElementById('name').style.fontFamily = 'Arial';
        document.getElementById('amount').style.fontWeight = 'bold';
        document.getElementById('amount').style.color = '#A91B0D';
        document.getElementById('amount').style.fontSize = 'x-large';
        document.getElementById('amount').style.fontFamily = 'Century Schoolbook';
        document.getElementById('category').style.fontWeight = 'bold';
        document.getElementById('category').style.fontSize = '17px';
        document.querySelector('label').style.fontSize = '15px';
        document.getElementById('category').style.fontFamily = 'Arial';
        document.getElementById('category').style.fontWeight = 'normal';
        document.getElementById('description').style.color = 'black';
        document.getElementById('description').style.fontSize = '16px';
        document.getElementById('description').style.fontFamily = 'Arial';
        document.getElementById('ok').style.display = 'none';
        document.getElementById('cancel').style.display = 'none';
        document.getElementById('okCancel').style.display = 'block';
        document.getElementById('delete').style.display = 'block';

        for (let i = 0; i < calcExpPopupLabels.length; i++) {
            calcExpPopupLabels[i].style.color = '#333333';
            calcExpPopupLabels[i].style.fontSize = '19px';
            calcExpPopupLabels[i].style.fontFamily = 'Calibri';
        }

        calcExpPopup.style.background = 'linear-gradient(45deg, rgb(0, 255, 255,0.78), rgb(255, 105, 180,0.75))';
        if(window.matchMedia("(max-width: 690px)").matches){
            calcExpPopup.style.background = 'linear-gradient(45deg, rgb(0, 255, 255,0.85), rgb(255, 105, 180,0.85))';
            calcExpPopup.style.width = '77%';
            okButton.style.fontSize = '16px';
            cancelButton.style.fontSize = '16px';
            okCancelButton.style.fontSize = '16px';
            deleteButton.style.fontSize = '16px';
            for(let i=0;i<calcExpPopupLabels.length;i++) {
                calcExpPopupLabels[i].style.fontSize = '14px';
                calcExpPopupLabels[i].style.height = '38px';
                calcExpPopupLabels[i].style.marginTop = '15px';
            }
            for(let i=0;i<calcExpPopupInputs.length;i++) {
                calcExpPopupInputs[i].style.fontSize = '17px';
            }
            document.getElementById('name').style.fontSize = '19px';
            document.getElementById('amount').style.fontSize = '19px';
            document.getElementById('category').style.fontSize = '16px';
            document.getElementById('description').style.fontSize = '15px';
        }
        document.getElementById('description').style.pointerEvents = "auto";
        document.getElementById('description').style.cursor = "default";
        document.getElementById('description').readOnly = "true";
        document.getElementById('name').readOnly = "true";
        document.getElementById('amount').readOnly = "true";
        document.getElementById('category').readOnly = "true";
    }

    function resizeOpenPopup() {
        const mediaQuery = window.matchMedia("(max-width: 690px)")
        if (mediaQuery.matches) {
            let leftPos = ((container2.offsetWidth - Math.round(document.body.offsetWidth * (90 / 100))) / 2) - 5;
            calcExpPopup.style.left = leftPos.toString() + 'px';
            calcExpPopup.width = "78%";
            let topPos = 80;
            calcExpPopup.style.top = topPos.toString() + 'px';
            for(let i=0;i<calcExpPopupLabels.length;i++) {
                calcExpPopupLabels[i].style.fontSize = '14px';
                calcExpPopupLabels[i].style.height = '38px';
                calcExpPopupLabels[i].style.marginTop = '15px';
            }
            calcExpPopup.style.background = 'linear-gradient(45deg, rgb(0, 191, 255,0.85), rgb(211, 211, 211, 0.9))';
        }
        else {
            let leftPos = (container1.offsetWidth) + ((container2.offsetWidth - Math.round(document.body.offsetWidth * (50 / 100))) / 2);
            calcExpPopup.style.left = leftPos.toString() + 'px';
            calcExpPopup.width = '45%';
            calcExpPopup.style.position = 'fixed';
            for(let i=0;i<calcExpPopupLabels.length;i++) {
                calcExpPopupLabels[i].style.fontSize = 'large';
                calcExpPopupLabels[i].style.height = '50px';
                calcExpPopupLabels[i].style.marginTop = '20px';
            }
            calcExpPopup.style.background = 'linear-gradient(45deg, rgb(0, 191, 255,0.8), rgb(211, 211, 211, 0.8))';
        }
    }
}