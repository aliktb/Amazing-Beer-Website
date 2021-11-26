'use strict'

let nameField = document.querySelector('#newName');
let tagField = document.querySelector('#newTagline');
let descField = document.querySelector('#newDesc');
let brewedField = document.querySelector('#newBrewed');
let imageField = document.querySelector('#newImage');
let updateBeer = document.querySelector('#updateBeer');
let findBeer = document.querySelector('#idBtn');
let idInput = document.querySelector('#idInput');
let updateBtn = document.querySelector('#submitBeer');
let updateMenu = document.querySelector('#updateMenu')

const getById = (id) => {
    console.log(id);
    fetch(`http://localhost:5015/beerRoutes/getById/${id}`).then((response) => {
        if (response != 200) {
            console.log(response);
        }
        response.json().then((data) => {
            console.log(data);
            // for (let beer of data) {
            //     console.log(beer);
            //     nameField.value = beer.name;
            //     tagField.value = beer.tagline;
            //     descField.value = beer.description;
            //     brewedField.value = beer.brewed_date;
            //     imageField.value = beer.image_url;
            // }
            nameField.value = data.name;
            tagField.value = data.tagline;
            descField.value = data.description;
            brewedField.value = data.brewed_date;
            imageField.value = data.image_url;
        })

    })
}

let currentId;
console.log(localStorage.getItem('idToUpdate'))
if (localStorage.getItem('idToUpdate')) {
    currentId = localStorage.getItem('idToUpdate');
    updateMenu.style = "display:block";
    getById(currentId);
    localStorage.clear();
}



findBeer.addEventListener('click', () => {
    updateMenu.style = "display:block";
    currentId = idInput.value
    getById(currentId);
})

const putBeer = (data) => {
    console.log(data);
    fetch(`http://localhost:5015/beerRoutes/updateById/${id}`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    }).then((response) => {

        console.log(response);
    })
};

updateBtn.addEventListener('click', function () {
    let beer = {
        id: currentId,
        name: nameField.value,
        tagline: tagField.value,
        description: descField.value,
        brewed_date: brewedField.value,
        image_url: imageField.value
    };

    console.log(beer);
    putBeer(beer);
})