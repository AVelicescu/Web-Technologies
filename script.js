let home = document.getElementById("containerHome");
let about = document.getElementById("containerAbout");
let login = document.getElementById("containerLogin");
let create = document.getElementById("containerCreate");
let forgot = document.getElementById("containerForgot");
let tickets = document.getElementById("containerTickets");
let services = document.getElementById("containerServices");
let contact = document.getElementById("containerContact");
let news = document.getElementById("containerNews");
let animals = document.getElementById("containerAnimals");
let edit = document.getElementById("EditProfile_Container");
let profile = document.getElementById("Profile_Container");
let indexContainers = [home, about, login, create, forgot];
let homeContainers = [home, services, tickets, news, contact, about, animals];
let profileContainers = [profile, edit];

let menuContainer = document.getElementById("Menu_Container");
let settingsContainer = document.getElementById("Settings_Container");


function openIndexContainer(container)
{
    for(let i = 0; i < 5; i++)
        if(i !== container)
            indexContainers[i].style.display = "none";
    indexContainers[container].style.display = "block";
}

function openHomeContainer(container)
{
    for(let i = 0; i < 5; i++)
        if(i !== container)
            homeContainers[i].style.display = "none";
    homeContainers[container].style.display = "block";
}

function openProfileContainer(container) {
    for (let i = 0; i < 2; i++)
        if (i !== container)
            profileContainers[i].style.display = "none";
    profileContainers[container].style.display = "block";
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
