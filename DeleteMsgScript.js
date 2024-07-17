function askToDelete(a) {
    const deleteMsg = document.getElementById('deleteBlock');
    let text = "Do you want to delete " + "'" + a + "'";

    let leftPos = ((container1.offsetWidth) + ((container2.offsetWidth - 360)) / 2);
    deleteMsg.style.left = leftPos.toString() + 'px';
    window.addEventListener('resize', function () {
        let leftPos = ((container1.offsetWidth) + ((container2.offsetWidth - 360)) / 2);
        deleteMsg.style.left = leftPos.toString() + 'px';
        resizeDeleteMsg();
    })
    document.getElementById('warningMsg').textContent = text;

    document.getElementById('x').addEventListener('click', function () {
        deleteMsg.style.display = "none";
        revertBody();
    });
    document.getElementById('no').addEventListener('click', function () {
        deleteMsg.style.display = "none";
        revertBody();
    });
    document.getElementById('yes').addEventListener('click', function () {
        deleteExpense();
        deleteStoredExpense(clickedExpenseOriginalId);
        deleteMsg.style.display = "none";
        revertBody();
    })
    blurBody();
    deleteMsg.style.display = "block";
    resizeDeleteMsg();

    function resizeDeleteMsg() {
        const mediaQuery = window.matchMedia("(max-width: 690px)")
        if (mediaQuery.matches) {
            leftPos = ((container2.offsetWidth) / 2) - 180;
            deleteMsg.style.left = leftPos.toString() + 'px';
            deleteMsg.style.position = "fixed";
        } else {
            leftPos = ((container1.offsetWidth) + ((container2.offsetWidth - 360)) / 2);
            deleteMsg.style.left = leftPos.toString() + 'px';
        }
    }
}