
var modal = {
    open: function (){
        var modal = document.getElementById('myModal');
        modal.style.display = "block";
    },
    close: function (){
        var modal = document.getElementById('myModal');
        modal.style.display = "none";
    }
};


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {

    if (event.target.className == 'modal') {
        modal.close();
    }
}