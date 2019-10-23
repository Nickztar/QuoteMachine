button = document.getElementById("topBtn");
login = document.getElementsByClassName("loginPart");
error = document.getElementById("wrong");
window.onscroll = ()=>{
    scroll();
};

function scroll(){
    if(button){
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300){
            button.classList.add("shown");
        }
        else{
            button.classList.remove("shown");
        }
    } 
}

function topFunction() {
    button.classList.remove("shown");
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
if(window.location.pathname == '/login' || window.location.pathname == '/register'){
    let query = location.search;
    if (query){
        login[0].classList.add("failed");
        error.style.display= "flex";
    }
    else{
        login[0].classList.remove("failed");
        error.style.display= "none";        
    }
}
