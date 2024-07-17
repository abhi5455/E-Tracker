/*let Users=[
    {
        name:"xyz",
        email: "xyz@gmail.com",
        password: "xyz123",
        phoneNumber: "9020504012",
        expenseData: [{
            expenseId:"",
            expenseDate:"",
            expenseName:"",
            expenseAmount:"",
            expenseCategory:"",
            expenseDescription:""
        }]
    }
];*/

let Users=[
    {
        name:"xyz",
        email: "abc@rit.ac.in",
        password: "xyz123",
        phoneNumber: "9020504012",
        expenseData: []
    }
]
initialSetUsers();

function getUserIndex(){
    let userIndex;

    let currentEmail= JSON.parse(localStorage.getItem('currentEmail'));
    Users=JSON.parse(localStorage.getItem("Users"));

    for(let i=0;i<Users.length;i++){
        if(Users[i].email===currentEmail){
            userIndex=i;
            break;
        }
    }
    return userIndex;
}

function storeExpense(id,date,name,amount,category,description){

    let userIndex=getUserIndex();
    Users=JSON.parse(localStorage.getItem("Users"));

    let expenseData= {
        expenseId:id,
        expenseDate:date,
        expenseName: name.toString(),
        expenseAmount: amount.toString(),
        expenseCategory: category.toString(),
        expenseDescription: description.toString()
    }

    Users[userIndex].expenseData.push(expenseData);
    localStorage.setItem("Users",JSON.stringify(Users));

    for (let i = 0; i < Users[userIndex].expenseData.length; i++) {
        console.log(JSON.stringify(Users[userIndex].expenseData[i]));
    }
}

function retrieveExpense(UserSelectDate){
    let userIndex=getUserIndex();
    Users=JSON.parse(localStorage.getItem("Users"));

    for(let i=0;i<Users[userIndex].expenseData.length;i++){
        if(Users[userIndex].expenseData[i].expenseDate===UserSelectDate){
            addExpense(Users[userIndex].expenseData[i].expenseId,Users[userIndex].expenseData[i].expenseDate,Users[userIndex].expenseData[i].expenseName,Users[userIndex].expenseData[i].expenseAmount,Users[userIndex].expenseData[i].expenseCategory,Users[userIndex].expenseData[i].expenseDescription);
        }
    }
}

function deleteStoredExpense(ExpenseId){
    let userIndex=getUserIndex();
    Users=JSON.parse(localStorage.getItem("Users"));

    for(let i=0;i<Users[userIndex].expenseData.length;i++){
        if(Users[userIndex].expenseData[i].expenseId===ExpenseId){
                Users[userIndex].expenseData.splice(i,1);
        }
    }
    console.log(ExpenseId);
    localStorage.setItem("Users",JSON.stringify(Users));

}

function retrieveComputedExpense(startDate,endDate,Category){
    clearContainer2();
    let userIndex=getUserIndex();
    Users=JSON.parse(localStorage.getItem("Users"));
console.log("Category-> ",Category)
    let startDateObj=new Date(startDate);
    let endDateObj=new Date(endDate);
    let totalExpenseAmount=0;
    if(Category==="") {
        for (let i = 0; i < Users[userIndex].expenseData.length; i++) {
            let expenseDateObj = new Date(Users[userIndex].expenseData[i].expenseDate);
            if ((expenseDateObj >= startDateObj) && (expenseDateObj <= endDateObj)) {
                addExpense(Users[userIndex].expenseData[i].expenseId, Users[userIndex].expenseData[i].expenseDate, Users[userIndex].expenseData[i].expenseName, Users[userIndex].expenseData[i].expenseAmount, Users[userIndex].expenseData[i].expenseCategory, Users[userIndex].expenseData[i].expenseDescription);
                totalExpenseAmount+=Number(Users[userIndex].expenseData[i].expenseAmount);
            }
        }
    }
    else{
        for (let i = 0; i < Users[userIndex].expenseData.length; i++) {
            let expenseDateObj = new Date(Users[userIndex].expenseData[i].expenseDate);
            if ((expenseDateObj >= startDateObj) && (expenseDateObj <= endDateObj) && (Users[userIndex].expenseData[i].expenseCategory.toLowerCase()===Category.toLowerCase())) {
                addExpense(Users[userIndex].expenseData[i].expenseId, Users[userIndex].expenseData[i].expenseDate, Users[userIndex].expenseData[i].expenseName, Users[userIndex].expenseData[i].expenseAmount, Users[userIndex].expenseData[i].expenseCategory, Users[userIndex].expenseData[i].expenseDescription);
                totalExpenseAmount+=Number(Users[userIndex].expenseData[i].expenseAmount);
            }
        }
    }
    return totalExpenseAmount;
}