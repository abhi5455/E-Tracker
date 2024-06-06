function askToDelete(){
    var deleteMsg=document.createElement("iframe");
    deleteMsg.src='DeleteMsg.html';
    document.body.appendChild(deleteMsg);
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
}
askToDelete();