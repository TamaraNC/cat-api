const url = 'https://api.thecatapi.com/v1/images/search';

const getImage = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const image = document.querySelector("#image");
    image.src = data[0].url;
}
getImage();
const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener("click", getImage)
})


