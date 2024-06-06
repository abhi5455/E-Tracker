function askToDelete(a){
    var deleteMsg=document.createElement("iframe");
    deleteMsg.src='DeleteMsg.html';
    deleteMsg.width = '400px';
    deleteMsg.height = '210';
    deleteMsg.style.position = 'absolute';
    deleteMsg.style.top='220px';
    deleteMsg.style.borderRadius='20px';
    deleteMsg.style.border='none';
    deleteMsg.style.outline='1px solid black';


    let leftPos=((container1.offsetWidth)+((container2.offsetWidth-400))/2);
    deleteMsg.style.left=leftPos.toString()+'px';
    window.addEventListener('resize',function(){
        let leftPos=((container1.offsetWidth)+((container2.offsetWidth-400))/2);
        deleteMsg.style.left=leftPos.toString()+'px';
    })
    deleteMsg.onload = function() {
        deleteMsg.contentDocument.getElementById('warningMsg').textContent="Do you want to delete "+"'"+a+"'";
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