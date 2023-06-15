let menuContainer = document.getElementById("Menu_Container");
let settingsContainer = document.getElementById("Settings_Container");
document.getElementById("profile").addEventListener("click", function () {
    window.location.href = "profile.html";
});

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

function openHomeContainer(container) {
    if(container===0)
        window.location.href = "home.html#containerHome";
   if(container===1)
       window.location.href = "home.html#containerServices";
    if(container===2)
        window.location.href = "home.html#containerTickets";
    if(container===3)
        window.location.href = "home.html#containerNews";
    if(container===4)
        window.location.href = "home.html#containerContact";
    if(container===5)
        window.location.href = "home.html#containerAbout";
    if(container===6)
        window.location.href = "animals.html"
}

function changeTheme() {
    let theme = document.getElementById("theme");
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
        document.querySelector('body').style.backgroundImage = "url('../Images/Wallpaper/animals_black.jpg')";
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
        document.querySelector('body').style.backgroundImage = "url('../Images/Wallpaper/animals_white.jpg')";
    }
}

function logout() {
    sessionStorage.clear();
    window.location.href = 'index.html';
}

const filterButton = document.querySelector('.filter-button');
const filterBubble = document.querySelector('.filter-bubble');
const applyButton = document.getElementById('apply-button');

filterButton.addEventListener('click', () => {
    filterBubble.style.display = 'block';
});
applyButton.addEventListener('click', (event) => {
    event.stopPropagation();
    filterBubble.style.display = 'none';
});

const whiteBtn = document.getElementById("whiteBtn");
whiteBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    filterBubble.style.display = 'none';
});

async function loadAnimals(){
    const token = localStorage.getItem('token');
    console.log(Email);
    const response = await fetch("http://localhost:8081/animals/", {
        method: "GET",
        headers:{
            'Content-Type': 'text/plain',
            'Authorization': `Bearer ${token}`
        },
        body: Email
    });
    const data = await response.json();
    console.log(data);
}

loadAnimals();

