const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
    localStorage.removeItem("token");
    window.location.href = "index.html";
});
const table = document.getElementById('animalTable');
const tbody = document.getElementById('userList');
const token = sessionStorage.getItem('token');
let contor = 0;
if (token == null) {
    window.location.href = "index.html";
}

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

decodedToken = decodeToken(token);
const Email = decodedToken.email;

table.appendChild(tbody);

async function loadAnimals() {
    const token = localStorage.getItem('token');
    console.log(Email);
    const response = await fetch("http://localhost:8081/admin/animals/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: Email
    });
    const data = await response.json();
    console.log(data);
    data.forEach(animal => {
        const tr = document.createElement('tr');
        tbody.appendChild(tr);
        tr.setAttribute('data-id', contor);
        contor++;

        //id
        const idTd = document.createElement('td');
        idTd.textContent = animal.id;
        tr.appendChild(idTd);

        //name
        const nameTd = document.createElement('td');
        nameTd.textContent = animal.name;
        tr.appendChild(nameTd);

        //celula poza
        const photoTd = document.createElement('td');
        photoTd.textContent = animal.photo;
        tr.appendChild(photoTd);

        const descriptionTd = document.createElement('td');
        const truncatedDescription = animal.description.substring(0, 200); // Limitam la 200 caractere
        descriptionTd.textContent = truncatedDescription + (animal.description.length > 200 ? '...' : '');
        tr.appendChild(descriptionTd);

        //celula  categorie
        const categoryTd = document.createElement('td');
        categoryTd.textContent = animal.category;
        tr.appendChild(categoryTd);

        //celula butoane edit si delete
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('buttonContainer');

        //buton de edit
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        buttonContainer.appendChild(editBtn);

        //delete btn
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        buttonContainer.appendChild(deleteBtn);


        const td = document.createElement('td');
        td.appendChild(buttonContainer);
        tr.appendChild(td);

        deleteBtn.addEventListener('click', event => {
            console.log("am apasat pe delete");

            event.preventDefault();
            event.stopPropagation();
            const id = idTd.textContent.trim();
            const confirmed = confirm('Are you sure you want to delete this animal?');
            if (confirmed) {
                const row2 = deleteBtn.parentNode.parentNode.parentNode;
                /*const userId2 = row2.getAttribute('data-id');*/
                fetch('http://localhost:8081/admin/deleteAnimal/', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        "id": id
                    })
                })
                    .then(response => {
                        if (response.ok) {
                            row2.remove();
                        } else {
                            const errorMsg = document.createElement('span');
                            errorMsg.textContent = 'Error deleting user.';
                            errorMsg.classList.add('error');
                            buttonContainer.appendChild(errorMsg);
                        }

                    }).catch(error => {
                    const errorMsg = document.createElement('span');
                    errorMsg.textContent = 'Error deleting user.';
                    errorMsg.classList.add('error');
                    buttonContainer.appendChild(errorMsg);
                });
            }
        });
        editBtn.addEventListener('click', event => {
            console.log("am apasat pe edit");
            event.preventDefault();
            event.stopPropagation();
            const row = editBtn.parentNode.parentNode.parentNode;
            const cells = row.querySelectorAll('td');

            if (editBtn.textContent === 'Edit') {
                editBtn.textContent = 'Save';
                editBtn.classList.add('saveBtn');
                const idIndex=0;
                cells.forEach((cell,index) => {
                    if (index!==idIndex &&!cell.contains(editBtn) && !cell.contains(deleteBtn)) {
                        cell.setAttribute('contenteditable', 'true');
                        cell.classList.add('editable');
                    }
                });
            } else {
                editBtn.textContent = 'Edit';
                editBtn.classList.remove('saveBtn');

                cells.forEach(cell => {
                    cell.removeEventListener('click', () => { });
                    cell.removeAttribute('contenteditable');
                    cell.classList.remove('editable');
                });
                const id = idTd.textContent.trim();
                const name = nameTd.textContent.trim();
                const photo = photoTd.textContent.trim();
                const description = descriptionTd.textContent.trim();
                const category = categoryTd.textContent.trim();

                const editAnimal =
                {
                    "id" : id,
                    "name": name,
                    "photo": photo,
                    "description": description,
                    "category": category
                }
                console.log(editAnimal)
                fetch('http://localhost:8081/admin/editAnimal/', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(editAnimal)
                })
                    .then(response => {
                        if (response.ok) {
                            const successMsg = document.createElement('span');
                            successMsg.textContent = 'Changes saved!';
                            successMsg.classList.add('success');
                            buttonContainer.appendChild(successMsg);

                            // remove success message after 3 seconds
                            setTimeout(() => {
                                successMsg.remove();
                            }, 3000);
                        } else {
                            // display error message
                            const errorMsg = document.createElement('span');
                            errorMsg.textContent = 'Error saving changes.';
                            errorMsg.classList.add('error');
                            buttonContainer.appendChild(errorMsg);
                        }
                        response.json()
                    })
                    .then(data=>console.log(data))
                    .catch(error => {
                        const errorMsg = document.createElement('span');
                        errorMsg.textContent = 'Error saving changes.';
                        errorMsg.classList.add('error');
                        buttonContainer.appendChild(errorMsg);
                        console.error(error);
                    });
            }

        });
    });
}

    loadAnimals()
