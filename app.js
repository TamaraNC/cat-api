const url = 'https://api.thecatapi.com/v1/images/search?size=med';
const apiKey = '6231d92a-e173-459d-b8ab-9bd899e43b58';


//Get images from API
const getImage = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const image = document.querySelector("#image");
    image.src = data[0].url;
    console.log(data[0].id)
    getVotes()
}
getImage();

const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener("click", getImage)
})


function getVotes() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log(xhr.response);
        }
    }
    xhr.open('POST', 'https://api.thecatapi.com/v1/votes', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-api-key', apiKey);
    let data = JSON.stringify({"image_id": image.id, "value": 1})
    xhr.send(data);
}

function voteUp() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log(xhr.response)
        }
    }
    xhr.open('POST', 'https://api.thecatapi.com/v1/votes', true);
    let data = JSON.stringify({"image_id": id, "value": 1})
    xhr.send(data);
}

function voteDown() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log(xhr.response)
        }
    }
    xhr.open('POST', 'https://api.thecatapi.com/v1/votes', true);
    let data = JSON.stringify({"image_id": id, "value": 0})
    xhr.send(data);
}









