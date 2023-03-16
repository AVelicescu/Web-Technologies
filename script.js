let home = document.getElementById("containerHome");
let about = document.getElementById("containerAbout");
let login = document.getElementById("containerLogin");
let create = document.getElementById("containerCreate");
let forgot = document.getElementById("containerForgot");
let containers = [home, about, login, create, forgot];

function openContainer(container)
{
    for(let i = 0; i < 5; i++)
        if(i !== container)
            containers[i].style.display = "none";
    containers[container].style.display = "block";
}