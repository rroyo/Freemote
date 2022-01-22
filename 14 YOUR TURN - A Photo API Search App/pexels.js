const searchBox = document.querySelector('#search');
const searchButton = document.querySelector('#search-action');
const imagesContainer = document.querySelector('.js-images-container');
const url = 'https://api.pexels.com/v1/search?query=';
const attribution = `<a href="https://www.pexels.com">Photos provided by Pexels</a>`;

function search(e) {
  e.preventDefault();
  const xhttp = new XMLHttpRequest();
  const searchQuery = searchBox.value;

  if (searchQuery !== '') {
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const response = JSON.parse(xhttp.responseText);

        imagesContainer.innerHTML = '';

        for (const photo of response.photos) {
          const img = document.createElement('img');
          img.src = photo.src.small;
          img.className = 'js-images-container__img';
          imagesContainer.appendChild(img);
        }
      }
    }

    xhttp.open("GET", `${url}${searchQuery}`, true);
    xhttp.setRequestHeader('Authorization', APIkey);
    xhttp.send();
  }
}

searchButton.addEventListener('click', search);