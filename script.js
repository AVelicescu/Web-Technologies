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
let profile = document.getElementById("containerProfile");
let edit = document.getElementById("containerProfileEdit");
let list = document.getElementById("containerAnimalList");
let details = document.getElementById("containerAnimalDetails");
let indexContainers = [home, about, login, create, forgot];
let homeContainers = [home, services, tickets, news, contact, about, animals];
let profileContainers = [profile, edit];

let menuContainer = document.getElementById("Menu_Container");
let settingsContainer = document.getElementById("Settings_Container");

document.getElementById("profile").addEventListener("click", function () {
    window.location.href = "profile.html";
});

function changeTheme(){
    let theme = document.getElementById("theme");
    let containerStyle = window.getComputedStyle(home);
    let logo = document.getElementById("logo");
    if(theme.value === "Light"){
        theme.value = "Dark";
        theme.labels[0].innerHTML = "Dark";
        setTimeout(() => {theme.labels[0].innerHTML = "Theme";}, 2000);
        let root = document.documentElement;
        root.style.setProperty(  "--background-color", "black");
        root.style.setProperty(  "--border", "white");
        root.style.setProperty(  "--menu", "rgba(0, 0, 0, 0.6)");
        root.style.setProperty(  "--menu-desktop",  "rgba(0, 0, 0, 0)");
        logo.src = "Images/Logo/lrv_w.png";
        if (window.innerWidth >= 1024) {
            document.querySelector('body').style.backgroundColor = "black";
            if (containerStyle.display !== "none") {
                document.querySelector('body').style.backgroundImage = "url('Images/Wallpaper/Tiger2.png')";
            } else {
                document.querySelector('body').style.backgroundImage = "url('Images/Wallpaper/DarkTiger.jpg')";
            }
        }
    }
    else{
        theme.value = "Light";
        theme.labels[0].innerHTML = "Light";
        setTimeout(() => {theme.labels[0].innerHTML = "Theme";}, 2000);
        let root = document.documentElement;
        root.style.setProperty(  "--background-color", "white");
        root.style.setProperty(  "--border", "black");
        root.style.setProperty(  "--menu", "rgba(255, 255, 255, 0.6)");
        root.style.setProperty(  "--menu-desktop",  "rgba(255, 255, 255, 0)");
        logo.src = "Images/Logo/lrv_b.png";
        if (window.innerWidth >= 1024) {
            document.querySelector('body').style.backgroundColor = "white";
            if (containerStyle.display !== "none") {
                document.querySelector('body').style.backgroundImage = "url('Images/Wallpaper/Tiger2.png')";
            } else {
                document.querySelector('body').style.backgroundImage = "url('Images/Wallpaper/LightTiger.jpg')";
            }
        }
    }
}

function openIndexContainer(container) {
    for (let i = 0; i < 5; i++)
        indexContainers[i].style.display = "none";
    indexContainers[container].style.display = "block";
}

function openHomeContainer(container) {
    let theme = document.getElementById("theme");
    for (let i = 0; i < 7; i++) {
        if (window.innerWidth >= 1024) {
            if (container === 0) {
                document.querySelector('body').style.backgroundImage = "url('Images/Wallpaper/Tiger2.png')";
            } else {
                if (theme.value === "Light")
                    document.querySelector('body').style.backgroundImage = "url('Images/Wallpaper/LightTiger.jpg')";
                else
                    document.querySelector('body').style.backgroundImage = "url('Images/Wallpaper/DarkTiger.jpg')";
            }
        }
        homeContainers[i].style.display = "none";
        homeContainers[container].style.display = "block";
    }
}

function openProfileContainer(container) {
    for (let i = 0; i < 2; i++)
        profileContainers[i].style.display = "none";
    profileContainers[container].style.display = "block";
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

function openAnimalContainer() {
    animals.style.display = "flex";
    let animalData = getAnimalData();

    list.innerHTML = "";
    for (let animal of animalData) {
        let containerAnimal = document.createElement("div");
        let animalPhoto = document.createElement("img");
        let animalName = document.createElement("h2");
        let animalDetailsButton = document.createElement("button");

        containerAnimal.classList.add("containerAnimal");
        animalPhoto.src = animal.photo;
        animalName.textContent = animal.popularName;
        animalDetailsButton.textContent = "Details";
        animalDetailsButton.addEventListener("click", () => openAnimalDescription(animal));

        containerAnimal.appendChild(animalPhoto);
        containerAnimal.appendChild(animalName);
        containerAnimal.appendChild(animalDetailsButton);
        list.appendChild(containerAnimal);
    }
}

function openAnimalDescription(animal) {
    details.style.display = "flex";

    let photo = document.getElementById("photo");
    let popularName = document.getElementById("popularName");
    let scientificName = document.getElementById("scientificName");
    let type = document.getElementById("type");
    let originLocation = document.getElementById("origin");
    let diet = document.getElementById("diet");
    let description = document.getElementById("description");
    let status = document.getElementById("status");
    let relatedSpecies = document.getElementById("relatedSpecies");
    let naturalEnemies = document.getElementById("naturalEnemies");
    let characteristic = document.getElementById("characteristic");

    photo.src = animal.photo;
    popularName.textContent = `Popular name: ${animal.popularName}`;
    scientificName.textContent = `Scientific name: ${animal.scientificName}`;
    type.textContent = `Type: ${animal.type}`;
    originLocation.textContent = `Origin location: ${animal.originLocation}`;
    diet.textContent = `Diet: ${animal.diet}`;
    description.textContent = `Description: ${animal.description}`;
    status.textContent = `Status: ${animal.status}`;
    relatedSpecies.textContent = `Related species: ${animal.relatedSpecies.join(", ")}`;
    naturalEnemies.textContent = `Natural enemies: ${animal.naturalEnemies.join(", ")}`;
    characteristic.textContent = `Characteristic: ${animal.characteristic.join(", ")}`;
}

function closeAnimalDescription() {
    details.style.display = "none";
}


function getAnimalData() {
    return [
        {
            "popularName": "African elephant",
            "scientificName": "Loxodonta africana",
            "photo": "Images/Animals/africanElephant.jpg",
            "type": "Mammal",
            "originLocation": "Africa",
            "diet": "Herbivore",
            "description": "The African elephant is the largest land animal and is known for its distinctive trunk and tusks. They are highly social animals and can live for up to 70 years.",
            "status": "Vulnerable",
            "relatedSpecies": ["Asian elephant"],
            "naturalEnemies": ["Humans"],
            "characteristic": "Large ears"
        },
        {
            "popularName": "American alligator",
            "scientificName": "Alligator mississippiensis",
            "photo": "Images/Animals/americanAlligator.jpg",
            "type": "Reptile",
            "originLocation": "North America",
            "diet": "Carnivore",
            "description": "The American alligator is a large reptile and is one of two alligator species. They are apex predators and can live for up to 50 years.",
            "status": "Least Concern",
            "relatedSpecies": ["Chinese alligator"],
            "naturalEnemies": ["Humans"],
            "characteristic": "Powerful jaws"
        },
        {
            "popularName": "Bengal tiger",
            "scientificName": "Panthera tigris tigris",
            "photo": "Images/Animals/bengalTiger.jpg",
            "type": "Mammal",
            "originLocation": "India",
            "diet": "Carnivore",
            "description": "The Bengal tiger is the most numerous tiger subspecies and is known for its distinctive orange coat with black stripes. They are apex predators and can live for up to 20 years.",
            "status": "Endangered",
            "relatedSpecies": ["Siberian tiger"],
            "naturalEnemies": ["Humans"],
            "characteristic": "Powerful muscles"
        },
        {
            "popularName": "Chimpanzee",
            "scientificName": "Pan troglodytes",
            "photo": "Images/Animals/chimpanzee.jpg",
            "type": "Mammal",
            "originLocation": "Africa",
            "diet": "Omnivore",
            "description": "The chimpanzee is one of the closest living relatives to humans and is known for its high intelligence and social behavior. They can live for up to 50 years.",
            "status": "Endangered",
            "relatedSpecies": ["Bonobo"],
            "naturalEnemies": ["Leopards, pythons"],
            "characteristic": "Opposable thumbs"
        },
        {
            "popularName": "Common hippo",
            "scientificName": "Hippopotamus amphibius",
            "photo": "Images/Animals/commonHippopotamus.jpg",
            "type": "Mammal",
            "originLocation": "Africa",
            "diet": "Herbivore",
            "description": "The common hippopotamus is a large, semi-aquatic animal that spends most of its day in water. They are highly aggressive and can live for up to 50 years.",
            "status": "Vulnerable",
            "relatedSpecies": ["Pygmy hippopotamus"],
            "naturalEnemies": ["Humans, lions, crocodiles"],
            "characteristic": "Large teeth"
        },
        {
            "popularName": "Bald eagle",
            "scientificName": "Haliaeetus leucocephalus",
            "photo": "Images/Animals/baldEagle.jpg",
            "type": "Bird",
            "originLocation": "North America",
            "diet": "Carnivore",
            "description": "The bald eagle is a bird of prey found in North America. It is the national bird and symbol of the United States of America.",
            "status": "Least concern",
            "relatedSpecies": ["Golden eagle", "Steller's sea eagle"],
            "naturalEnemies": ["Great horned owl", "Raccoon"],
            "characteristic": "Bald eagles have a white head and tail, and a brown body."
        },
        {
            "popularName": "Snow leopard",
            "scientificName": "Panthera uncia",
            "photo": "Images/Animals/snowLeopard.jpg",
            "type": "Mammal",
            "originLocation": "Central Asia",
            "diet": "Carnivore",
            "description": "The snow leopard is a large cat native to the mountain ranges of Central Asia.",
            "status": "Endangered",
            "relatedSpecies": ["Lion", "Tiger"],
            "naturalEnemies": ["Wolves", "Leopards"],
            "characteristic": "Snow leopards have a thick fur coat to protect them from the cold climate in their natural habitat."
        },
        {
            "popularName": "Orangutan",
            "scientificName": "Pongo pygmaeus",
            "photo": "Images/Animals/orangutan.png",
            "type": "Primate",
            "originLocation": "Southeast Asia",
            "diet": "Omnivore",
            "description": "The orangutan is a large arboreal ape native to Indonesia and Malaysia.",
            "status": "Critically endangered",
            "relatedSpecies": ["Gorilla", "Chimpanzee"],
            "naturalEnemies": ["Human activity", "Crocodiles"],
            "characteristic": "Orangutans are known for their distinctive reddish-brown hair and long arms."
        },
        {
            "popularName": "Red panda",
            "scientificName": "Ailurus fulgens",
            "photo": "Images/Animals/redPanda.jpg",
            "type": "Mammal",
            "originLocation": "Himalayas",
            "diet": "Omnivore",
            "description": "The red panda is a small arboreal mammal native to the eastern Himalayas and southwestern China.",
            "status": "Endangered",
            "relatedSpecies": ["Giant panda", "Raccoon"],
            "naturalEnemies": ["Snow leopard", "Martens"],
            "characteristic": "Red pandas have a reddish-brown coat and a long, bushy tail."
        },
        {
            "popularName": "Tasmanian devil",
            "scientificName": "Sarcophilus harrisii",
            "photo": "Images/Animals/tasmanianDevil.jpg",
            "type": "Mammal",
            "originLocation": "Australia",
            "diet": "Carnivore",
            "description": "The Tasmanian devil is a carnivorous marsupial found only in the wild on the island state of Tasmania, Australia.",
            "status": "Endangered",
            "relatedSpecies": ["Quokka", "Koala"],
            "naturalEnemies": ["Dingo", "Humans"],
            "characteristic": "Tasmanian devils are known for their loud, aggressive screeches and their strong jaws."
        },
        {
            "popularName": "Giraffe",
            "scientificName": "Giraffa camelopardalis",
            "photo": "Images/Animals/giraffe.jpg",
            "type": "Mammal",
            "originLocation": "Africa",
            "diet": "Herbivore",
            "description": "The giraffe is the tallest mammal in the world, with a long neck and legs. They are usually found in savannas and grasslands.",
            "status": "Vulnerable",
            "relatedSpecies": ["Okapi"],
            "naturalEnemies": ["Lions"],
            "characteristic": "Giraffes have long necks that can reach up to 6 feet in length."
        },
        {
            "popularName": "Kangaroo",
            "scientificName": "Macropus",
            "photo": "Images/Animals/kangaroo.jpg",
            "type": "Mammal",
            "originLocation": "Australia",
            "diet": "Herbivore",
            "description": "Kangaroos are marsupials that are known for their powerful hind legs and pouches for carrying their young.",
            "status": "Least Concern",
            "relatedSpecies": ["Wallaby"],
            "naturalEnemies": ["Dingoes"],
            "characteristic": "Kangaroos can jump up to 30 feet in a single bound."
        },
        {
            "popularName": "Koala",
            "scientificName": "Phascolarctos cinereus",
            "photo": "Images/Animals/koala.jpg",
            "type": "Mammal",
            "originLocation": "Australia",
            "diet": "Herbivore",
            "description": "Koalas are marsupials that are known for their cute, fuzzy ears and their love of eucalyptus leaves.",
            "status": "Vulnerable",
            "relatedSpecies": ["Wombat"],
            "naturalEnemies": ["Dingoes"],
            "characteristic": "Koalas sleep for up to 20 hours a day."
        },
        {
            "popularName": "Lion",
            "scientificName": "Panthera leo",
            "photo": "Images/Animals/lion.jpg",
            "type": "Mammal",
            "originLocation": "Africa",
            "diet": "Carnivore",
            "description": "Lions are one of the largest cats in the world and are known for their majestic manes and powerful roars.",
            "status": "Vulnerable",
            "relatedSpecies": ["Tiger", "Leopard", "Jaguar"],
            "naturalEnemies": ["Hyenas"],
            "characteristic": "Lions are the only cats that live in social groups called prides."
        },
        {
            "popularName": "Moose",
            "scientificName": "Alces alces",
            "photo": "Images/Animals/moose.jpg",
            "type": "Mammal",
            "originLocation": "North America",
            "diet": "Herbivore",
            "description": "Moose are large, solitary animals that are known for their impressive antlers.",
            "status": "Least Concern",
            "relatedSpecies": ["Elk"],
            "naturalEnemies": ["Wolves"],
            "characteristic": "Moose are strong swimmers and can dive up to 20 feet deep."
        },
        {
            "popularName": "Giant otter",
            "scientificName": "Pteronura brasiliensis",
            "photo": "Images/Animals/giantOtter.jpg",
            "type": "Mammal",
            "originLocation": "South America",
            "diet": "Carnivore",
            "description": "The giant otter is the largest species of otter and can weigh up to 70 pounds. They are highly social and live in family groups.",
            "status": "Endangered",
            "relatedSpecies": [],
            "naturalEnemies": ["Anacondas", "Caimans"],
            "characteristic": "They have webbed feet and a streamlined body, which makes them excellent swimmers."
        },
        {
            "popularName": "Komodo dragon",
            "scientificName": "Varanus komodoensis",
            "photo": "Images/Animals/komodoDragon.jpg",
            "type": "Reptile",
            "originLocation": "Indonesia",
            "diet": "Carnivore",
            "description": "The Komodo dragon is the largest lizard in the world and can weigh up to 300 pounds. They have powerful jaws and a venomous bite.",
            "status": "Vulnerable",
            "relatedSpecies": [],
            "naturalEnemies": ["Humans"],
            "characteristic": "They have a keen sense of smell and can detect prey from up to 5 miles away."
        },
        {
            "popularName": "Siberian tiger",
            "scientificName": "Panthera tigris altaica",
            "photo": "Images/Animals/siberianTiger.jpg",
            "type": "Mammal",
            "originLocation": "Russia",
            "diet": "Carnivore",
            "description": "The Siberian tiger is the largest subspecies of tiger and can weigh up to 700 pounds. They are solitary animals and excellent swimmers.",
            "status": "Endangered",
            "relatedSpecies": ["Bengal tiger"],
            "naturalEnemies": ["Humans"],
            "characteristic": "They have thick fur and a layer of fat to protect them from the cold Siberian climate."
        },
        {
            "popularName": "Reticulated Python",
            "scientificName": "Malayopython reticulatus",
            "photo": "Images/Animals/reticulatedPython.jpg",
            "type": "Reptile",
            "originLocation": "Southeast Asia",
            "diet": "Carnivore",
            "description": "One of the largest snake species in the world, the Reticulated Python can grow up to 30 feet in length. They are known for their striking pattern of diamonds and lines that cover their scales.",
            "status": "Least Concern",
            "relatedSpecies": ["Burmese Python", "African Rock Python", "Indian Python"],
            "naturalEnemies": ["Humans", "Birds of Prey", "Mammalian Carnivores"],
            "characteristic": "The Reticulated Python is a non-venomous snake, but it can still be a deadly predator thanks to its strength and size."
        },
        {
            "popularName": "Red fox",
            "scientificName": "Vulpes vulpes",
            "photo": "Images/Animals/redFox.jpg",
            "type": "Mammal",
            "originLocation": "Global (except Antarctica)",
            "diet": "Omnivore",
            "description": "The red fox is the largest species of fox, with distinctive reddish-orange fur and a bushy tail.",
            "status": "Least Concern",
            "relatedSpecies": "Arctic fox, Gray fox, Fennec fox",
            "naturalEnemies": "Gray wolf (Canis lupus), Golden eagle (Aquila chrysaetos)",
            "characteristic": "Distinctive reddish-orange fur and bushy tail"
        },
        {
            "popularName": "Green anaconda",
            "scientificName": "Eunectes murinus",
            "photo": "Images/Animals/greenAnaconda.jpg",
            "type": "Reptile",
            "originLocation": "South America",
            "diet": "Carnivore",
            "description": "The green anaconda is one of the largest snakes in the world, reaching lengths of up to 30 feet and weights of up to 550 pounds.",
            "status": "Least Concern",
            "relatedSpecies": "Yellow anaconda, Bolivian anaconda, Dark-spotted anaconda",
            "naturalEnemies": "Jaguar (Panthera onca), Black caiman (Melanosuchus niger)",
            "characteristic": "One of the largest snakes in the world"
        },
        {
            "popularName": "Emperor Penguin",
            "scientificName": "Aptenodytes forsteri",
            "photo": "Images/Animals/emperorPenguin.jpg",
            "type": "Bird",
            "originLocation": "Antarctica",
            "diet": "Carnivore",
            "description": "Emperor penguins are the largest of all penguin species and can reach up to 4 feet in height. They are known for their distinctive black and white coloring, and their ability to survive in the harsh Antarctic climate. They are also well known for their unique breeding habits, as the male emperor penguin is responsible for incubating the eggs and caring for the chicks.",
            "status": "Near Threatened",
            "relatedSpecies": ["King Penguin", "Adelie Penguin", "Chinstrap Penguin"],
            "naturalEnemies": ["Leopard Seal", "Southern Giant Petrel", "Killer Whale"],
            "characteristic": "Emperor penguins have a unique huddling behavior in which they group together to conserve heat and protect themselves from the harsh Antarctic winds."
        },
        {
            "popularName": "Seal",
            "scientificName": "Pinnipedia",
            "photo": "Images/Animals/seal.jpg",
            "type": "Mammal",
            "originLocation": "Arctic and Antarctic regions",
            "diet": "Carnivore",
            "description": "Seals are aquatic mammals known for their streamlined bodies, flippers, and blubber. They are excellent swimmers and can hold their breath for up to two hours.",
            "status": "Least Concern",
            "relatedSpecies": ["Harbor seal", "Gray seal", "Weddell seal"],
            "naturalEnemies": ["Killer whales", "Leopard seals", "Polar bears"],
            "characteristic": "They are well adapted to cold environments, with thick fur and blubber to keep them warm in icy waters."
        },
        {
            "popularName": "Zebra",
            "scientificName": "Equus quagga",
            "photo": "Images/Animals/zebra.jpg",
            "type": "Mammal",
            "originLocation": "Africa",
            "diet": "Herbivore",
            "description": "Zebras are known for their distinctive black and white stripes, which are unique to each individual. They are social animals that live in groups called herds and can run up to 40 miles per hour.",
            "status": "Least Concern",
            "relatedSpecies": ["Grevy's zebra", "Mountain zebra", "Plains zebra"],
            "naturalEnemies": ["Lions", "Leopards", "Hyenas"],
            "characteristic": "Their stripes may serve as a form of camouflage, as they blend in with the grasses of the African savanna."
        },
        {
            "popularName": "Hawk",
            "scientificName": "Accipitridae",
            "photo": "Images/Animals/hawk.jpg",
            "type": "Bird",
            "origin": "North America, Europe, Asia, and Africa",
            "diet": "Carnivore",
            "description": "Hawks are birds of prey known for their sharp talons, hooked beaks, and keen eyesight. They are skilled hunters and can fly at speeds up to 120 miles per hour.",
            "status": "Least Concern",
            "relatedSpecies": ["Red-tailed hawk", "Cooper's hawk", "Sharp-shinned hawk"],
            "naturalEnemies": ["Owls", "Eagles", "Snakes"],
            "characteristic": "Their eyesight is eight times stronger than that of humans, allowing them to spot prey from great heights"
        }
    ];
}
console.log(sessionStorage);
function logout(){
    sessionStorage.clear();
    window.location.href = 'index.html';
}
