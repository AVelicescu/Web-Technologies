let home = document.getElementById("containerHome");
let about = document.getElementById("containerAbout");
let login = document.getElementById("containerLogin");
let create = document.getElementById("containerCreate");
let forgot = document.getElementById("containerForgot");
let indexContainers = [home, about, login, create, forgot];

function openIndexContainer(container) {
    for (let i = 0; i < 5; i++)
        indexContainers[i].style.display = "none";
    indexContainers[container].style.display = "block";
}

function parseJwt(token) {
    if (!token){
        return;
    }
    const base64 = token.split('.')[1]; // extracting payload
    return JSON.parse(window.atob(base64));
}


// ------------------------------------------- Login ---------------------------------------------------------------------------------------

const loginForm = document.querySelector("form.login");
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const loginData = {
        "email": formData.get('Username-Email'),
        "password": formData.get('Password'),
        "requestType" : "login"
    };
    try {
        console.log(loginData);
        const response = await fetch('http://localhost:8081/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': window.location.origin,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: JSON.stringify(loginData)
        });
        if (!response.ok) {
            console.log('An error occurred:', response.statusText);
            return;
        }
        const data = await response.json();
        const token = data.token;
        sessionStorage.setItem('token', token);
        if(token != null){
            window.location.href = 'home.html';
        }
        else{
            const err = document.querySelector('form.login .error');
            err.style.display = 'block';
        }
    } catch (error) {
        console.error('An error occurred:', error.message);
    }

});

// -------------------------------------Sign up --------------------------------------------------------------------------
const signUpForm = document.querySelector("form.signup");
signUpForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    // Validate form fields
    const email = signUpForm.elements.Email.value.trim();
    const firstName = signUpForm.elements.FirstName.value.trim();
    const lastName = signUpForm.elements.LastName.value.trim();
    const username = signUpForm.elements.Username.value.trim();
    const password1 = signUpForm.elements.Password1.value.trim();
    const password2 = signUpForm.elements.Password2.value.trim();
    const birth= signUpForm.elements.Birth.value.trim();

    if (!email || !firstName || !lastName || !username || !birth || !password1 || !password2) {
        console.log("please complete all the fields.");
        let err = document.querySelector('form.signup .error');
        err.textContent = '!! Please fill in all required fields. !!';
        err.style.display = 'block';
        return;
    }

    if (password1 !== password2) {
        let err = document.querySelector('form.signup .error');
        console.log("'Passwords do not match!'");
        err.textContent = '!! Passwords do not match !!';
        err.style.display = 'block';
        return;
    }

    const signUpData = {
        "email": email,
        "firstName": firstName,
        "lastName": lastName,
        "username": username,
        "birth": birth,
        "password": password1,
        "requestType" : "signup"
    };

    try {
        console.log(signUpData);
        const response = await fetch( "http://localhost:8081/auth", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': window.location.origin,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: JSON.stringify(signUpData)
        });

        if (!response.ok) {
            console.log('An error occurred:', response.statusText);
            return;
        }

        const info = await response.json();
        const token = info.token;
        sessionStorage.setItem('token', token);
        if (token != null) {
            window.location.href = 'home.html';
        } else {
            let err = document.querySelector('form.signup .error');
            err.textContent = 'Email already in use!';
            err.classList.add('show');
        }
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
});

