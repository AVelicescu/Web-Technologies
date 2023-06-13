let home = document.getElementById("containerHome");
let about = document.getElementById("containerAbout");
let tickets = document.getElementById("containerTickets");
let services = document.getElementById("containerServices");
let contact = document.getElementById("containerContact");
let news = document.getElementById("containerNews");
let homeContainers = [home, services, tickets, news, contact, about];

let menuContainer = document.getElementById("Menu_Container");
let settingsContainer = document.getElementById("Settings_Container");

document.getElementById("profile").addEventListener("click", function () {
    window.location.href = "profile.html";
});

function changeTheme() {
    let theme = document.getElementById("theme");
    let containerStyle = window.getComputedStyle(home);
    let logo = document.getElementById("logo");
    if (theme.value === "Light") {
        theme.value = "Dark";
        theme.labels[0].innerHTML = "Dark";
        setTimeout(() => {
            theme.labels[0].innerHTML = "Theme";
        }, 2000);
        let root = document.documentElement;
        root.style.setProperty("--background-color", "black");
        root.style.setProperty("--border", "white");
        root.style.setProperty("--menu", "rgba(0, 0, 0, 0.6)");
        root.style.setProperty("--menu-desktop", "rgba(0, 0, 0, 0)");
        logo.src = "../Images/Logo/lrv_w.png";
        if (window.innerWidth >= 1024) {
            document.querySelector('body').style.backgroundColor = "black";
            if (containerStyle.display !== "none") {
                document.querySelector('body').style.backgroundImage = "url('../Images/Wallpaper/Tiger2.png')";
            } else {
                document.querySelector('body').style.backgroundImage = "url('../Images/Wallpaper/DarkTiger.jpg')";
            }
        }
    } else {
        theme.value = "Light";
        theme.labels[0].innerHTML = "Light";
        setTimeout(() => {
            theme.labels[0].innerHTML = "Theme";
        }, 2000);
        let root = document.documentElement;
        root.style.setProperty("--background-color", "white");
        root.style.setProperty("--border", "black");
        root.style.setProperty("--menu", "rgba(255, 255, 255, 0.6)");
        root.style.setProperty("--menu-desktop", "rgba(255, 255, 255, 0)");
        logo.src = "../Images/Logo/lrv_b.png";
        if (window.innerWidth >= 1024) {
            document.querySelector('body').style.backgroundColor = "white";
            if (containerStyle.display !== "none") {
                document.querySelector('body').style.backgroundImage = "url('../Images/Wallpaper/Tiger2.png')";
            } else {
                document.querySelector('body').style.backgroundImage = "url('../Images/Wallpaper/LightTiger.jpg')";
            }
        }
    }
}

function openHomeContainer(container) {
    let theme = document.getElementById("theme");
    for (let i = 0; i < 7; i++) {
        if (window.innerWidth >= 1024) {
            if (container === 0) {
                document.querySelector('body').style.backgroundImage = "url('../Images/Wallpaper/Tiger2.png')";
            } else {
                if (theme.value === "Light")
                    document.querySelector('body').style.backgroundImage = "url('../Images/Wallpaper/LightTiger.jpg')";
                else
                    document.querySelector('body').style.backgroundImage = "url('../Images/Wallpaper/DarkTiger.jpg')";
            }
        }
        if (container === 6)
            window.location.href = "animals.html"
        else {
            homeContainers[i].style.display = "none";
            homeContainers[container].style.display = "block";
        }
    }
}


function menu() {
    if (settingsContainer.style.visibility === "visible")
        settings();
    if (menuContainer.style.visibility === "hidden") {
        menuContainer.style.animationName = "OpenMenu";
        menuContainer.style.visibility = "visible";
    } else if (menuContainer.style.visibility === "visible") {
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

console.log(sessionStorage);

function logout() {
    sessionStorage.clear();
    window.location.href = 'index.html';
}

window.onload = function () {
    if (window.location.hash === "#containerHome")
        openHomeContainer(0);
    if (window.location.hash === "#containerServices")
        openHomeContainer(1);
    if (window.location.hash === "#containerTickets")
        openHomeContainer(2);
    if (window.location.hash === "#containerNews")
        openHomeContainer(3);
    if (window.location.hash === "#containerContact")
        openHomeContainer(4);
    if (window.location.hash === "#containerAbout")
        openHomeContainer(5);
};