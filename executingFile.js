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

function updateDetails()
{
    clearContainer2();
    if(x===1) {
        addExpense("FoodExpense", "1000", "Food", "Spent During Dinner with Friends");
        addExpense("Outing", "2500", "Fun", "Alappuzha Beach");
        addExpense("Groceries", "500", "MonthlyExpense", "Home");
        addExpense("Vegetables", "1200", "", "Home");/*
        openPopup("Food","1000","efwygidcsuhcb",true);/**/
        x++;
    }
}