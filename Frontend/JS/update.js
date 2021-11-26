let nameField = document.querySelector('#newName');
let tagField = document.querySelector('#newTagline');
let descField = document.querySelector('#newDesc');
let brewedField = document.querySelector('#newBrewed');
let imageField = document.querySelector('#newImage');
let updateBeer = document.querySelector('#updateBeer');
let findBeer = document.querySelector('#idBtn');
let beerIdField = document.querySelector('#idBtn');

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
    getById(beerIdField.value);
})

const postBeer = (data) => {
    console.log(data);
    fetch(`Post Request`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
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
    postBeer(beer);
})