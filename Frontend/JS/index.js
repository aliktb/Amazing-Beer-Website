'use strict';

let beerDiv = document.querySelector('#beerList');
let getAll = document.querySelector('#getAllBtn');
let getById = document.querySelector('#getIdBtn');
let beerId = document.querySelector('#beerId');

console.log(getAll.innerHTML);

const getBeers = () => {
    fetch(`http://localhost:5015/beerRoutes/getAll`).then((response) => {
        if (response.status !== 200) {
            console.error(response.status);
            return;
        }
        response.json().then((data) => {
            clearDiv();
            for (let object of data) {
                createData(object);
            };
        });
    });
};

const getBeerId = (id) => {
    fetch(`http://localhost:5015/beerRoutes/getById/${id}`).then((response) => {
        if (response.status !== 200) {
            console.error(response.status);
            return;
        }
        response.json().then((data) => {
            clearDiv();
            console.log(data[0]);
            createData(data[0]);
        });
    });

}

const deleteBeer = (id) => {
    console.log(id);
    fetch(`http://localhost:5015/beerRoutes/deleteById/${id}`, {
        method: "DELETE",
        headers: {
            "contentType": "application/JSON"
        }
    }).then((response) => {
        if (response.status !== 204) {
            console.error(response.status);
            return;
        };
        console.log(response);
    })
}

const updateBeer = (id) => {
    localStorage.setItem('idToUpdate', id)
    console.log(id);
    window.open('/Frontend/HTML/update.html');
}

const clearDiv = () => {
    beerDiv.innerHTML = "<h3> List of Beers </h3>"
}

const createData = (data) => {



    let cardDiv = document.createElement('div');
    let name = document.createElement('h2');
    let description = document.createElement('p');
    let divContainer = document.createElement('div');
    let image = document.createElement('img');
    let deleteBtn = document.createElement('button');
    let updateBtn = document.createElement('button');

    name.innerText = data.name;

    description.innerText = data.description;
    image.src = data.image_url;
    image.style.width = "100px";
    deleteBtn.classList = "btn btn-danger mb-3"
    deleteBtn.innerText = "Delete Beer"
    updateBtn.classList = "btn btn-outline-primary mb-3"
    updateBtn.innerText = "Update Beer"

    deleteBtn.addEventListener('click', function () {
        deleteBeer(data.id);
    })

    updateBtn.addEventListener('click', function () {
        updateBeer(data.id);
    })

    cardDiv.classList = "card w-50 mb-5";

    divContainer.classList = "container";
    divContainer.appendChild(name);
    if (data.tagline != undefined) {
        let tagline = document.createElement('h3');
        tagline.innerText = data.tagline;
        divContainer.appendChild(tagline);
    }
    divContainer.appendChild(description);
    divContainer.appendChild(image);
    divContainer.appendChild(deleteBtn);
    divContainer.appendChild(updateBtn);

    cardDiv.appendChild(divContainer);

    beerDiv.appendChild(cardDiv);
}

getAll.addEventListener('click', getBeers);
getById.addEventListener('click', function () {
    let id = beerId.value;
    console.log(id);
    getBeerId(id);
})
