let home = document.getElementById("containerHome");
let about = document.getElementById("containerAbout");
let login = document.getElementById("containerLogin");
let create = document.getElementById("containerCreate");
let forgot = document.getElementById("containerForgot");
let containers = [home, about, login, create, forgot];


let menuNav = document.getElementById("Menu_Nav");
let settingsNav = document.getElementById("Settings_Nav");
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

function menuMobile()
{
    if(settingsContainer.style.visibility === "visible")
        settingsMobile();
    if(menuContainer.style.visibility === "hidden"){
        menuContainer.style.animationName = "OpenMenu";
        menuContainer.style.visibility = "visible";
    }
    else if(menuContainer.style.visibility === "visible"){
        menuContainer.style.animationName = "CloseMenu";
        menuContainer.style.visibility = "hidden";
    }

}

function settingsMobile() {
    if (menuContainer.style.visibility === "visible")
        menuMobile();
    if (settingsContainer.style.visibility === "hidden") {
        settingsContainer.style.animationName = "OpenMenu";
        settingsContainer.style.visibility = "visible";
    } else if (settingsContainer.style.visibility === "visible") {
        settingsContainer.style.animationName = "CloseMenu";
        settingsContainer.style.visibility = "hidden";
    }
}
