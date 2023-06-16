let menuContainer = document.getElementById("Menu_Container");
let settingsContainer = document.getElementById("Settings_Container");
let details = document.getElementById("animalDetails");
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
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: Email
    });
    const data = await response.json();
    console.log(data);

    let list = document.getElementById("animalList");
    list.innerHTML = "";
    for (let animal of data) {
        let containerAnimal = document.createElement("div");
        let animalPhoto = document.createElement("img");
        let animalName = document.createElement("h2");
        let animalDetailsButton = document.createElement("button");

        containerAnimal.classList.add("containerAnimal");
        animalPhoto.src = animal.photo;
        animalName.textContent = animal.name;
        animalDetailsButton.textContent = "Details";
        animalDetailsButton.addEventListener("click", () => openAnimalDescription(animal));

        containerAnimal.appendChild(animalPhoto);
        containerAnimal.appendChild(animalName);
        containerAnimal.appendChild(animalDetailsButton);
        list.appendChild(containerAnimal);
    }
}

loadAnimals();
const token = sessionStorage.getItem('token');
function decodeToken(token) {
    const [, payloadBase64] = token.split('.');
    try {
        const payload = JSON.parse(atob(payloadBase64));
        return payload;
    } catch (error) {
        // Handle any errors that occur during decoding
        console.error('Error decoding token:', error);
        return null;
    }
}

decodedToken= decodeToken(token);
const Email = decodedToken.email;

async function loadAnimals(){
    const token = localStorage.getItem('token');
    console.log(Email);
    const response = await fetch("http://localhost:8081/animals/", {
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: Email
    });
    const data = await response.json();
    console.log(data);

    let list = document.getElementById("animalList");
    list.innerHTML = "";
    for (let animal of data) {
        let containerAnimal = document.createElement("div");
        let animalPhoto = document.createElement("img");
        let animalName = document.createElement("h2");
        let animalDetailsButton = document.createElement("button");

        animalPhoto.id = "animalPhoto";
        animalName.id = "animalName";
        animalDetailsButton.id = "animalDetailsButton";

        containerAnimal.classList.add("containerAnimal");
        animalPhoto.src = animal.photo;
        animalName.textContent = animal.name;
        animalDetailsButton.textContent = "Details";
        animalDetailsButton.addEventListener("click", () => openAnimalDescription(animal.id));

        containerAnimal.appendChild(animalPhoto);
        containerAnimal.appendChild(animalName);
        containerAnimal.appendChild(animalDetailsButton);
        list.appendChild(containerAnimal);
    }
}
async function openAnimalDescription(id) {
    window.location.href = "animal.js";
    details.style.display = "flex";
    const token = localStorage.getItem('token');
    console.log(Email);
    const response = await fetch("http://localhost:8081/animal/" + id, {
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: Email
    });
    const animal = await response.json();
    console.log(animal);

    details.innerHTML = "";

    let photo = document.getElementById("photo");
    let description = document.getElementById("description");
    let name = document.getElementById("name");
    let category = document.getElementById("category");
    //let popularName = document.getElementById("popularName");
    //let scientificName = document.getElementById("scientificName");
    //let type = document.getElementById("type");
    //let originLocation = document.getElementById("origin");
    //let diet = document.getElementById("diet");
    //let status = document.getElementById("status");
    //let relatedSpecies = document.getElementById("relatedSpecies");
    //let naturalEnemies = document.getElementById("naturalEnemies");
    //let characteristic = document.getElementById("characteristic");

    photo.src = animal.photo;
    description.textContent = `Description: ${animal.description}`;
    name.textContent = `Name: ${animal.name}`;
    category.textContent = `Name: ${animal.category}`;
    //popularName.textContent = `Popular name: ${animal.popularName}`;
    //scientificName.textContent = `Scientific name: ${animal.scientificName}`;
    //type.textContent = `Type: ${animal.type}`;
    //originLocation.textContent = `Origin location: ${animal.originLocation}`;
    //diet.textContent = `Diet: ${animal.diet}`;
    //status.textContent = `Status: ${animal.status}`;
    //relatedSpecies.textContent = `Related species: ${animal.relatedSpecies.join(", ")}`;
    //naturalEnemies.textContent = `Natural enemies: ${animal.naturalEnemies.join(", ")}`;
    //characteristic.textContent = `Characteristic: ${animal.characteristic.join(", ")}`;
}

function closeAnimalDescription() {
    details.style.display = "none";
}
loadAnimals();

