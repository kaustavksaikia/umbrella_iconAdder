const button1 = document.getElementById("blue");
const button2 = document.getElementById("pink");
const button3 = document.getElementById("yellow");
const uploader = document.getElementById("uploader")
const img = document.getElementById("image");


const blueLoader = document.getElementById("blueLoader");
const pinkLoader = document.getElementById("pinkLoader");
const yellowLoader = document.getElementById("yellowLoader");
const whiteLoader = document.getElementById("whiteLoader");

const container = document.querySelector(".img-container");

const fileInput = document.getElementById("file-input");
const overlay = document.getElementById("overlayContainer");


const uploadIcon = document.getElementById("uploadIcon");
const uploadSign = document.getElementById("uploadSign");
const cancelButton = document.getElementById("cancelButton");

//stores all three buttons to traverse and reuse code
let buttons = [
    button1,
    button2,
    button3
];

//stores loader colour that is applicable according to theme
var loader;


//To trigger the blue theme as default
document.addEventListener("DOMContentLoaded", () => {
    button1.click();
});


//Alternator function to switch between umbrella colours by traversing through the buttons
buttons.forEach(button => {
    button.addEventListener("click", () => {
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        if (button === button1) {
            document.body.style.backgroundColor = "#e7f7fd";
            uploader.style.backgroundColor = "#00b4d8";
            loader = blueLoader;
            switchImage("BlueU.png");
        }
        else if (button === button2) {
            document.body.style.backgroundColor = "#fde9f1";
            uploader.style.backgroundColor = "#db3c91";
            loader = pinkLoader;
            switchImage("pinkU.png");
        }
        else if (button === button3) {
            document.body.style.backgroundColor = "#fffcf5";
            uploader.style.backgroundColor = "#fdd041";
            loader = yellowLoader;
            switchImage("yellowU.png");
        }
    });
});

//image element to store the brand logo
const newImg = document.createElement("img");
newImg.id = "overlay";

//input handler for the file input
fileInput.addEventListener("change", inputHandler);

async function inputHandler(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    //handles longer file names
    if (e.target.files && e.target.files.length > 0) {

        let originalText = this.files[0].name;
        uploadSign.textContent = originalText.substring(0, 10) + '...';
        cancelButton.style.display = "inline";
    }

    reader.onload = function (e) {
        newImg.src = e.target.result;
    };

    //resizes useer uploaded image and handles loading animation
    newImg.onload = function () {
        const originalWidth = newImg.naturalWidth;
        const originalHeight = newImg.naturalHeight;
        const aspectRatio = originalHeight / originalWidth;

        const newWidth = 70;
        const newHeight = Math.round(newWidth * aspectRatio);

        img.style.opacity = "0";
        newImg.style.opacity = "0";
        uploadIcon.style.opacity = "0";

        setTimeout(() => {
            whiteLoader.style.display = "inline-block";
            loader.style.display = "block";
        }, 500);


        newImg.style.width = `${newWidth}px`;
        newImg.style.height = `${newHeight}px`;
        overlay.appendChild(newImg);

        setTimeout(() => {
            whiteLoader.style.display = "none";
            loader.style.display = "none";
            img.style.opacity = "1";
            newImg.style.opacity = "1";
            uploadIcon.style.opacity = "1";
            img.src = newSrc;
        }, 2000);

    }

    reader.readAsDataURL(file);
}

//umbrella image switcher function and handles loader animation
function switchImage(newSrc) {
    img.style.opacity = "0";
    newImg.style.opacity = "0";
    setTimeout(() => {
        loader.style.display = "block";
    }, 500);

    setTimeout(() => {
        loader.style.display = "none";
        img.style.opacity = "1";
        newImg.style.opacity = "1";
        img.src = newSrc;
    }, 1000);
}

//cancellation event handler
cancelButton.addEventListener("click", function (e) {
    e.stopPropagation();
    fileInput.value = "";
    uploadSign.textContent = "Upload Logo";
    cancelButton.style.display = "none";
    newImg.style.opacity = "0";
});

