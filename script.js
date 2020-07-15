const url = 'https://api.thecatapi.com/v1/images/search?size=small';
const apiKey = '6231d92a-e173-459d-b8ab-9bd899e43b58';

//Get images from API
const getImage =  () => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            const image = document.querySelector("img");
            image.src = xhr.response[0].url;
            image.setAttribute("id",`${xhr.response[0].id}`);
            getVotes()
        }
    }
    xhr.open('GET', url);
    xhr.send()
}
getImage();


function voteUp() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log(xhr.response)
            console.log(data)
            renderUpVotes();
        }
    }
    xhr.open('POST', 'https://api.thecatapi.com/v1/votes', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-api-key', apiKey);
    const image = document.querySelector("img");
    let data = JSON.stringify({"image_id": image.id, "value": 1})
    xhr.send(data);
}

function voteDown() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            renderDownVotes();
        }
    }
    xhr.open('POST', 'https://api.thecatapi.com/v1/votes', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-api-key', apiKey);
    const image = document.querySelector("img");
    let data = JSON.stringify({"image_id": image.id, "value": 0})
    xhr.send(data);
}

function getVotes() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            const image = document.querySelector("img");
            xhr.response[0].image_id = image.id;
            console.log(xhr.response[0])
            }
        }
    xhr.open('GET', 'https://api.thecatapi.com/v1/votes');
    xhr.setRequestHeader('x-api-key', apiKey);
    xhr.send();
}

//Display the images voted
const renderUpVotes = () => {
    const image = document.querySelector("img");
    const upContainer = document.querySelector(".upvoted-container")
    const upImages = document.querySelector(".upvoted-images");
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("voted");
    const voted = document.createElement("img");
    voted.src = image.src;
    imgContainer.appendChild(voted);
    upImages.appendChild(imgContainer);
    upContainer.appendChild(upImages)
}

const renderDownVotes = () => {
    const downContainer = document.querySelector(".downvoted-container")
    const downImages = document.querySelector(".downvoted-images");
    const image = document.querySelector("img");
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("voted");
    const voted = document.createElement("img");
    voted.src = image.src;
    imgContainer.appendChild(voted);
    downImages.appendChild(imgContainer);
    downContainer.appendChild(downImages)
}

//Event listeners
const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener("click", getImage)
})
const upBtn = document.querySelector("#green-btn");
upBtn.addEventListener("click", voteUp)
const downBtn = document.querySelector("#red-btn");
downBtn.addEventListener("click", voteDown)
