let home = document.getElementById("containerHome");
let about = document.getElementById("containerAbout");
let login = document.getElementById("containerLogin");
let create = document.getElementById("containerCreate");
let forgot = document.getElementById("containerForgot");
let containers = [home, about, login, create, forgot];

let menuContainer = document.getElementById("Menu_Container");
let settingsContainer = document.getElementById("Settings_Container");


function openContainer(container)
{
    for(let i = 0; i < 5; i++)
        if(i !== container)
            containers[i].style.display = "none";
    containers[container].style.display = "block";
}


function menu()
{
    if(settingsContainer.style.visibility === "visible")
        settings();
    if(menuContainer.style.visibility === "hidden"){
        menuContainer.style.animationName = "OpenMenu";
        menuContainer.style.visibility = "visible";
    }
    else if(menuContainer.style.visibility === "visible"){
        menuContainer.style.animationName = "CloseMenu";
        menuContainer.style.visibility = "hidden";
    }

}

function settings() {
    if (menuContainer.style.visibility === "visible")
        menu();
    if (settingsContainer.style.visibility === "hidden") {
        settingsContainer.style.animationName = "OpenMenu";
        settingsContainer.style.visibility = "visible";
    } else if (settingsContainer.style.visibility === "visible") {
        settingsContainer.style.animationName = "CloseMenu";
        settingsContainer.style.visibility = "hidden";
    }
}
