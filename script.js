let compute=document.getElementById('compute');
let from=document.getElementById('from');
let to=document.getElementById('to');
let days=document.getElementById('days');
let expenses=document.getElementById('expense');

let showEstimate=document.getElementById('showEstimate');
compute.addEventListener('click',function(){
    from.textContent="From: "+userSelectDate;
    to.textContent="To: "+userSelectDate;
    days.textContent="Days: 1 day";
    showEstimate.style.display="block";
    console.log(userSelectDate);
})

let threelines=document.getElementById('threelines');
threelines.addEventListener('click', function(){
    let container2=document.getElementById('container2');
    container2.innerHTML="";
})