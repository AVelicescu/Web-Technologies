let profile = document.getElementById("containerProfile");
let edit = document.getElementById("containerProfileEdit");
let editPassword= document.getElementById("containerPasswordEdit")
const backButton = document.querySelector('.Button_Nav#back');
let profileContainers = [profile, edit, editPassword];

function openProfileContainer(container) {
    for (let i = 0; i < 3; i++)
        profileContainers[i].style.display = "none";
    profileContainers[container].style.display = "block";
    if(container === 0)
    {
        loadProfile();
        backButton.style.visibility = 'hidden';
    }
    else
        backButton.style.visibility = 'visible';
}

console.log(sessionStorage);
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

console.log(token);
decodedToken= decodeToken(token);
const email = decodedToken.email;
console.log(email);



async function loadProfile() {
    const token = localStorage.getItem('token');
    const Email = getEmailFromJWT(token);
    const response = await fetch("http://16.16.174.129:8080/api/userByEmail/", {
        method: "POST",
        headers:{
            'Content-Type': 'text/plain',
            'Authorization': `Bearer ${token}`
        },
        body: Email
    });
    const data = await response.json();
    fullName.innerHTML = "";
    userName.innerHTML = "";
    email.innerHTML = "";
    address.innerHTML = "";

    fullName.innerHTML = data.name;
    userName.innerHTML = data.username;
    email.innerHTML = data.email;
    address.innerHTML = data.location;
}


//needs endpoint
async function sendEditProfile() {
    const token = localStorage.getItem('token');
    const Email = getEmailFromJWT(token);
    let data = new FormData(document.getElementById("editForm"));
    const editProfileData = {
        "email": Email,
        "name": data.get('FirstName')+' ' + data.get('LastName'),
        "username": data.get('Username'),
        "location": data.get('Address')
    };
    console.log(editProfileData)
    const message = await fetch("http://16.16.174.129:8080/api/user/", {
        method: "PUT",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editProfileData)
    });
    if (!message.ok) {
        let errorMessage = '';
        if (message.status === 401) {
            errorMessage = 'Username already in use.';
        } else {
            errorMessage = `An error occurred: ${message.statusText}`;
        }
        console.log(errorMessage);
    }
}



//needs endpoint
async function sendEditPassword() {
    const token = localStorage.getItem('token');
    const Email = getEmailFromJWT(token);
    let psw = new FormData(document.getElementById("editPassword"));
    if (psw.get('NewPassword') !== psw.get('ConfirmPassword')) {
        console.log("Passwords do not match.");
    }
    const editPasswordData = {
        "email": Email,
        "oldPass": psw.get('OldPassword'),
        "newPass": psw.get('NewPassword')
    };
    const response = await fetch("http://16.16.174.129:8080/api/userPass/", {
        method: "PUT",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editPasswordData)
    });
    if (!response.ok) {
        let errorMessage = '';
        if (response.status === 401) {
            errorMessage = 'Old password is incorrect.';
        } else {
            errorMessage = `An error occurred: ${response.statusText}`;
        }
        console.log(errorMessage);
    }
}


//needs endpoint
async function deleteProfile() {
    const token = localStorage.getItem('token');
    const Email = getEmailFromJWT(token);
    await fetch("http://16.16.174.129:8080/api/user/", {
        method: "DELETE",
        headers:{
            'Content-Type': 'text/plain',
            'Authorization': `Bearer ${token}`
        },
        body: Email
    });
    window.location.href = 'index.html';

}
