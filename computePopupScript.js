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
    console.log(startDate.value,endDate.value);
}
function blurBody(){
    document.body.style.backgroundColor="black";
    container2.style.opacity=".4";
    container1.style.opacity=".6";
    mainHeader.style.opacity=".6";
    mainHeader.style.outline="none";
    mainHeader.style.pointerEvents="none";
    container1.style.pointerEvents="none";
    container2.style.pointerEvents="none";
}
popupCancelButton.addEventListener('click',function(){
    revertBody();
    computePopup.style.display="none";
    searchBy.style.display="block";
    document.getElementById("searchByLabel").style.display="none";
});
popupComputeButton.addEventListener('click',function(){
    from.textContent=" \u00A0 From: \u00A0\u00A0\u00A0"+startDate.value;
    to.textContent=" \u00A0 To: \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"+endDate.value;
    let date1=new Date(endDate.value);
    let date2=new Date(startDate.value);
    let noOfDays=(date1-date2)/(1000 * 3600 * 24);
    if(noOfDays<0){
        noOfDays*=-1;
        from.textContent=" \u00A0 From: \u00A0\u00A0\u00A0"+endDate.value;
        to.textContent=" \u00A0 To: \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"+startDate.value;
    }
    else if(isNaN(noOfDays)){
        noOfDays=0;
    }
    days.textContent="\u00A0 No of Days: \u00A0\u00A0"+noOfDays;
    showEstimate.style.display="block";
    revertBody();
    computePopup.style.display="none";
    searchBy.style.display="block";
    document.getElementById("searchByLabel").style.display="none";
    console.log(userSelectDate);
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
        computePopup.style.position="absolute";
        let topPos=container1.offsetHeight+105;
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