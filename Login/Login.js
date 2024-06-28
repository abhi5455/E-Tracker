let signIn=document.getElementById("signIn");
let signInFlag=true;
let emailLogInFlag=true;
let submitButton=document.getElementById("submitButton");
let userInteract=document.getElementById("user-interact");
let name=document.getElementById("name");
let email=document.getElementById("email");
let password=document.getElementById("password");
let phoneNumber=document.getElementById("phoneNumber");
let phoneNumberBlock=document.getElementById("phoneNumberBlock");
let signInAlternate=document.getElementById("signInAlternate");
let vp1=document.getElementById("vp1");

signIn.addEventListener("click", function(){
    if(signInFlag){
        signInFlag=false;
        signIn.textContent="SIGN UP";
        submitButton.textContent="SIGN IN";
        name.style.display="none";
        phoneNumberBlock.style.display="none";
        email.style.top="5px";
        password.style.top="25px";
        signInAlternate.style.display="block";
        submitButton.style.top="175px";
        console.log(phoneNumberBlock.style.order);
    }
    else{
        signInFlag=true;
        signIn.textContent="SIGN IN";
        submitButton.textContent="SIGN UP";
        name.style.display="block";
        email.style.display="block";
        phoneNumberBlock.style.display="flex";
        signInAlternate.style.display="none";
        submitButton.style.top="280px";
        name.style.top="0";
        email.style.top="20px";
        password.style.top="40px";
        phoneNumberBlock.style.top="60px";
    }
})

signInAlternate.addEventListener("click", function(){
    if(emailLogInFlag){
        signInAlternate.textContent="Sign In using Email";
        email.style.display="none";
        phoneNumberBlock.style.display="flex";
        phoneNumberBlock.style.top="-50px";
        password.style.top="70px";
        signInAlternate.style.top="18px";
        emailLogInFlag=false;
    }
    else{
        signInAlternate.textContent="Sign In using Phone Number";
        email.style.display="block";
        phoneNumberBlock.style.display="none";
        email.style.top="5px";
        password.style.top="25px";
        signInAlternate.style.top="25px"
        emailLogInFlag=true;
    }
})

