Users=JSON.parse(localStorage.getItem("Users"));
//console.log(Users);

function initialSetUsers() {
    if (Users === null) {
        //initializing Users
        Users = [
            {
                name: "",
                email: "",
                password: "",
                phoneNumber: "",
                expenseData: []
            }
        ]
    }
}
initialSetUsers();

let currentEmail;
function updateCurrentEmail(email){
    localStorage.setItem("currentEmail",JSON.stringify(email));
}

document.getElementById('user-interact').addEventListener("submit", function(e){
    e.preventDefault();
    if(submitButton.textContent==="SIGN UP"){

        //checking whether email exist or not
        let mailId=document.getElementById("email").value;
        let flag=false;
        for(let i=0;i<Users.length;i++){
            if((Users[i].email === mailId)){
                flag=true;
            }
        }
        if(flag){
            window.alert("User already Exist!");
            return;
        }

        //signup
        let email={
            name: document.getElementById('name').value,
            email: document.getElementById("email").value,
            password: document.getElementById("passwordField").value,
            phoneNumber: document.getElementById("phoneNumber").value,
            expenseData:[]
        }
        updateCurrentEmail(document.getElementById("email").value);
        Users.push(email);
        window.location.href="../index.html";
        localStorage.setItem("Users",JSON.stringify(Users));

    }
    else{
        let mailId=document.getElementById("email").value;
        let phoneNumber=document.getElementById("phoneNumber").value;
        let pass=document.getElementById("passwordField").value;
        let flag=false;
        for(let i=0;i<Users.length;i++){
            if(((Users[i].email === mailId)||(Users[i].phoneNumber===phoneNumber))&&(Users[i].password===pass)){
                updateCurrentEmail(document.getElementById("email").value);
                window.location.href="../index.html";
                flag=true;
            }
        }
        if(!flag){
            window.alert("User not found!");
        }
    }
    for(let i=0;i<Users.length;i++) {
        console.log(Users[i])
    }
})
