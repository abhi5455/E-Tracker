let computePopup=document.getElementById('computePopup');
let popupCancelButton=document.getElementById('popupCancelButton');
let startDate=document.getElementById('start-date');
let endDate=document.getElementById('end-date');

function computePopupSetPos() {
    computePopup.style.position = "absolute";
    computePopup.style.left = ((container1.offsetWidth) + ((container2.offsetWidth - 350) / 2) - 2).toString() + "px";
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
    console.log(startDate.value,endDate.value.clear)
});
window.onresize=computePopupSetPos;
