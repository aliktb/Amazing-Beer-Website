let nameField = document.querySelector('#newName');
let tagField = document.querySelector('#newTagline');
let descField = document.querySelector('#newDesc');
let brewedField = document.querySelector('#newBrewed');
let imageField = document.querySelector('#newImage');
let updateBeer = document.querySelector('#updateBeer');
let findBeer = document.querySelector('#idBtn');
let beerIdField = document.querySelector('#idBtn');
let updateMenu = document.querySelector('#updateMenu')

let currentId;

const getById = (id) => {
    console.log(id);
    fetch(`url/${id}`).then((response) => {
        if (response != 200) {
            console.log(response);
        } else {
            response.json().then((data) => {
                nameField.value = data.name;
                tagField.value = data.tagline;
                descField.value = data.description;
                brewedField.value = data.brewed_date;
                imageField.value = data.image_url;
            })
        }
    })
}

findBeer.addEventListener('click', () => {
    updateMenu.style = "display:block";
    currentId = beerIdField.value
    getById(currentId);
})

const putBeer = (data) => {
    console.log(data);
    fetch(`Put Request${currentId}`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    }).then((response) => {
        console.log(response);
    })
};

updateBeer.addEventListener('click', function () {
    let beer = {
        name: nameField.value,
        tagline: tagField.value,
        description: descField.value,
        brewed_date: brewedField.value,
        image_url: imageField.value
    };

    console.log(beer);
    putBeer(beer);
})