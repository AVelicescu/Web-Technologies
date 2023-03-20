let home = document.getElementById("containerHome");
let about = document.getElementById("containerAbout");
let login = document.getElementById("containerLogin");
let create = document.getElementById("containerCreate");
let forgot = document.getElementById("containerForgot");
let containers = [home, about, login, create, forgot];


let menuNav = document.getElementById("Menu_Nav");
let settingsNav = document.getElementById("Settings_Nav");

function openContainer(container)
{
    for(let i = 0; i < 5; i++)
        if(i !== container)
            containers[i].style.display = "none";
    containers[container].style.display = "block";
}

function menu()
{
    if(settingsNav.style.visibility === "visible")
        settings();
    if(menuNav.style.visibility === "hidden"){
        menuNav.style.animationName = "OpenMenu";
        menuNav.style.visibility = "visible";
    }
    else if(menuNav.style.visibility === "visible"){
        menuNav.style.animationName = "CloseMenu";
        menuNav.style.visibility = "hidden";
    }

}

function settings()
{
    if(menuNav.style.visibility === "visible")
        menu();
    if(settingsNav.style.visibility === "hidden"){
        settingsNav.style.animationName = "OpenMenu";
        settingsNav.style.visibility = "visible";
    }
    else if(settingsNav.style.visibility === "visible"){
        settingsNav.style.animationName = "CloseMenu";
        settingsNav.style.visibility = "hidden";
    }

}