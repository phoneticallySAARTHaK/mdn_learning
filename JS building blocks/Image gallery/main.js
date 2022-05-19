const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const images = [];
for (let i = 1; i <= 5; i++) {
    images.push(`images/pic${i}.jpg`);
}

/* Looping through images */
images.map(appendImg);

function appendImg(path) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', path);
    thumbBar.appendChild(newImage);
}
function updateImg(e) {
    const src = e.target.getAttribute("src");
    displayedImage.setAttribute("src", src);
}

thumbBar.addEventListener("click", updateImg);

/* Wiring up the Darken/Lighten button */
function shade(){
    let bgColor = overlay.style.backgroundColor;
    if (bgColor !== "rgba(0, 0, 0, 0.5)"  ) {
        bgColor = "rgba(0, 0, 0, 0.5)";
    }
    else {
        bgColor = "rgba(0, 0, 0, 0)";
    }
    overlay.style.backgroundColor = bgColor;
}

btn.addEventListener("click", shade);