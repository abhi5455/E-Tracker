let x=1;

function clearContainer2(){
    let children=container2.children;
    let n=children.length;
    let j=0;
    for(let i=0;i<n;i++){
        if((children[j].id!=="expenseMsg")&&(children[j].id!=="addNew")&&(children[j].id!=="noExpenseText")){
            container2.removeChild(children[j]);
            j--; //To avoid skipping during removeChild()
        }
        j++;
    }
}

function updateDetails(userSelectDate)
{
    showEstimate.style.display="none";
    clearContainer2();
    retrieveExpense(userSelectDate);
}