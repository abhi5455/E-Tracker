let computePopup=document.getElementById('computePopup');
let popupCancelButton=document.getElementById('popupCancelButton');
let popupComputeButton=document.getElementById('popupComputeButton');
let startDate=document.getElementById('start-date');
let endDate=document.getElementById('end-date');

function computePopupSetPos() {
    computePopup.style.position = "absolute";
    computePopup.style.left = ((container1.offsetWidth) + ((container2.offsetWidth - 350) / 2) - 2).toString() + "px";
    resizeComputePopup();
    //computePopup.style.left = (((container1.offsetWidth+container2.offsetWidth - 350) / 2) - 2).toString() + "px";
}
popupCancelButton.addEventListener('click',function(){
    revertBody();
    computePopup.style.display="none";
    searchBy.style.display="block";
    document.getElementById("groupName").value="";
    document.getElementById("searchByLabel").style.display="none";
});
popupComputeButton.addEventListener('click',function(){
    noExpenseText.textContent="No Computed Expenses !"
    noExpenseText.style.display="flex";
    from.textContent=" \u00A0 From: \u00A0\u00A0\u00A0"+startDate.value;
    to.textContent=" \u00A0 To: \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"+endDate.value;
    let date1=new Date(endDate.value);
    let date2=new Date(startDate.value);
    let noOfDays=(date1-date2)/(1000 * 3600 * 24);
    if(noOfDays<0){
        noOfDays*=-1;
        let temp=startDate.value;
        startDate.value=endDate.value;
        endDate.value=temp;
        from.textContent=" \u00A0 From: \u00A0\u00A0\u00A0"+startDate.value;
        to.textContent=" \u00A0 To: \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"+endDate.value;
    }
    else if(isNaN(noOfDays)){
        noOfDays=-1;
    }
    let totalExpenseAmount;
    totalExpenseAmount = retrieveComputedExpense(startDate.value,endDate.value,document.getElementById('groupName').value.trim());

    noOfDays++;
    document.getElementById('showCategory').textContent="\u00A0 Category: \u00A0\u00A0\" "+document.getElementById('groupName').value.trim().toLowerCase()+" \"";
    if(document.getElementById('groupName').value.trim()===""){
        document.getElementById('showCategory').textContent="\u00A0 Category: \u00A0\u00A0Not Considered";
    }
    document.getElementById('groupName').value="";
    days.textContent="\u00A0 No of Days: \u00A0\u00A0"+noOfDays;
    document.getElementById("expense").textContent="₹"+totalExpenseAmount+" /-";
    showEstimate.style.display="block";
    revertBody();
    computePopup.style.display="none";
    searchBy.style.display="block";
    document.getElementById("searchByLabel").style.display="none";
    if(window.matchMedia("(max-width: 690px)").matches) {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        })
    }
})

window.addEventListener('resize',computePopupSetPos);

//Compute
let showEstimate=document.getElementById('showEstimate');
compute.addEventListener('click',function(){
    computePopupSetPos();
    showEstimate.style.display="none";
    computePopup.style.display='flex';
    blurBody();
})
function resizeComputePopup(){
    const mediaQuery =window.matchMedia("(max-width: 690px)")
    if(mediaQuery.matches) {
        computePopup.style.left = (((container2.offsetWidth - 350) / 2) - 2).toString() + "px";
        computePopup.style.position="fixed";
        let topPos=(window.innerHeight/2)-150;
        computePopup.style.top = topPos.toString() + 'px';
    }
    else{
        computePopup.style.position = "absolute";
        computePopup.style.left = ((container1.offsetWidth) + ((container2.offsetWidth - 350) / 2) - 2).toString() + "px";
        computePopup.style.top='220px';
    }
}

let searchBy=document.getElementById("searchBy");
searchBy.addEventListener("click",function(){
    searchBy.style.display="none";
    document.getElementById("searchByLabel").style.display="block";
})