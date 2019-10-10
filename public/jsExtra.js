button = document.getElementById("topBtn");

window.onscroll = ()=>{
    scroll();
};

function scroll(){
    if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30){
        button.classList.add("shown");
    }
    else{
        button.classList.remove("shown");
    }
}

function topFunction() {
    button.classList.remove("shown");
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}