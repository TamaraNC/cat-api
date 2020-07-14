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
        }
    }
    xhr.open('GET', url);
    xhr.send()
}
getImage();

const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener("click", getImage)
})

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
    getVotes();
}

const upBtn = document.querySelector("#green-btn");
upBtn.addEventListener("click", voteUp)

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
    console.log(data)
    xhr.send(data);
    getVotes();
}

const downBtn = document.querySelector("#red-btn");
downBtn.addEventListener("click", voteDown)

function getVotes() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log(xhr.response)
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

