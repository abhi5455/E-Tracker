let x=1;

function clearContainer2(){
    let children=container2.children;
    let n=children.length;
    for(let i=0;i<n;i++){
        if((children[i].id!=="expenseMsg")&&(children[i].id!=="addNew")&&(children[i].id!=="noExpenseText")){
            container2.removeChild(children[i]);
            i--; //To avoid skipping during removeChild()
        }
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