const baseUrl = "https://rickandmortyapi.com/api/character?page=";
const numPages = 5;

// ====== added ===========

const inputText = document.querySelector("#site-search");
const searchButton = document.querySelector(".btn-search");

// ===== end code ==========

const urls = Array(numPages)
  .fill() // [undefined, undefined, ...]
  .map((_, index) => baseUrl + (index + 1));
//_________Funktion Seitenanzahl____
const promises = urls.map((url) => fetch(url).then((res) => res.json()));

Promise.all(promises).then((pages) => {
  const characters = pages.flatMap((page) => page.results);
  //rufe Render-Funktion für alle gefetchten Chars auf
  renderCharacter(characters);
});

const upperList = document.querySelector(".cards");
const clearButton = document.getElementById("clear-btn");
const statusDropDown = document.getElementById("status-list");

searchButton.addEventListener("click", filterCharacter);
clearButton.addEventListener("click", clearFilter);

function filterCharacter() {
  const input = document.getElementById("site-search").value;
  const characterList = document.querySelectorAll("li");
  const selectedOption = statusDropDown.value;
  //console.log(input)
  //console.log(charList)
  characterList.forEach((character) => {
    //wenn ausgewählter Status mit CSS-Klasse übereinstimmt & Input im Namen vorkommt
    if (
      selectedOption === character.getAttribute("data-status") &&
      character.textContent.toUpperCase().includes(input.toUpperCase())
    ) {
      character.style.display = "block";
      //wenn ausgewählter Status all status ist & Input im Namen vorkommt
    } else if (
      selectedOption === "all-status" &&
      character.textContent.toUpperCase().includes(input.toUpperCase())
    ) {
      character.style.display = "block";
      //ansonsten hide alle anderen
    } else {
      character.style.display = "none";
    }
  });
}

//Setze alles zurück
function clearFilter() {
  const input = document.getElementById("site-search");
  const characterList = document.querySelectorAll("li");
  characterList.forEach((character) => {
    character.style.display = "block";
  });
  input.value = "";
  statusDropDown.value = "all-status";
}

function renderCharacter(characters) {
  //führe Code in Schleife für alle gefetchten Chars aus
  characters.forEach((character) => {
    const cardContent = document.createElement("li");
    const names = document.createElement("p");
    const picture = document.createElement("img");
    names.textContent = character.name;
    picture.src = character.image;

    //CSS-Klassen entsprechend des Status geben
    cardContent.classList.add(character.status.toLowerCase());
    cardContent.setAttribute("data-status", character.status.toLowerCase());
    names.classList.add(character.status.toLowerCase());

    cardContent.append(names);
    cardContent.append(picture);
    upperList.append(cardContent);
  });
}
