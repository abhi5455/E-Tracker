function askToDelete(a){
    const deleteMsg=document.createElement("iframe");
    deleteMsg.src='DeleteMsg.html';
    deleteMsg.width = '360px';
    deleteMsg.height = '200';
    deleteMsg.style.position = 'absolute';
    deleteMsg.style.top='220px';
    deleteMsg.style.borderRadius='25px';
    deleteMsg.style.border='none';
    let text="Do you want to delete "+"'"+a+"'";


    let leftPos=((container1.offsetWidth)+((container2.offsetWidth-360))/2);
    deleteMsg.style.left=leftPos.toString()+'px';
    window.addEventListener('resize',function(){
        let leftPos=((container1.offsetWidth)+((container2.offsetWidth-360))/2);
        deleteMsg.style.left=leftPos.toString()+'px';
    })
    deleteMsg.onload = function() {
        deleteMsg.contentDocument.getElementById('warningMsg').textContent=text;
        deleteMsg.contentDocument.getElementById('x').addEventListener('click', function(){
            document.body.removeChild(deleteMsg);
            revertBody();
        });
        deleteMsg.contentDocument.getElementById('no').addEventListener('click', function(){
            document.body.removeChild(deleteMsg);
            revertBody();
        });
        deleteMsg.contentDocument.getElementById('yes').addEventListener('click', function(){
            deleteExpense();
            document.body.removeChild(deleteMsg);
            revertBody();
        })

    }

    blurBody();
    document.body.appendChild(deleteMsg);
}