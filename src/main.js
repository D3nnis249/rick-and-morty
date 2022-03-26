const baseUrl = "https://rickandmortyapi.com/api/character?page=";
const numPages = 5;

// ====== added ===========

const inputText = document.querySelector('#site-search');
const searchButton = document.querySelector('.btn-search')

// ===== end code ==========

const urls = Array(numPages)
  .fill() // [undefined, undefined, ...]
  .map((_, index) => baseUrl + (index + 1));
//_________Funktion Seitenanzahl____
const promises = urls.map((url) => fetch(url).then((res) => res.json()));

Promise.all(promises).then((pages) => {
  const characters = pages.flatMap((page) => page.results);
  characters.forEach(renderCharacter)

// ========== added Code ================

searchButton.addEventListener('click', () => {
  const cardList = document.querySelector('.cards');
  cardList.innerHTML = '';

  if (inputText.value.toLowerCase().includes("rick")){    // berücksichtigt eintippen von groß und Kleinbuchstaben (z.B. RicK)
    const rickCharacters = characters.filter(character => {
      return character.name.includes("Rick")
    })
    rickCharacters.forEach(renderCharacter);
  } else if (inputText.value.toLowerCase().includes("morty")){    // berücksichtigt eintippen von groß und Kleinbuchstaben (z.B. RicK)
    const mortyCharacters = characters.filter(character => {
      return character.name.includes("Morty")
    })
    mortyCharacters.forEach(renderCharacter);
  } else if (inputText.value.toLowerCase().includes("summer")){    // berücksichtigt eintippen von groß und Kleinbuchstaben (z.B. RicK)
    const summerCharacters = characters.filter(character => {
      return character.name.includes("Summer")
    })
    summerCharacters.forEach(renderCharacter);
  } else if (inputText.value.toLowerCase().includes("beth")){    // berücksichtigt eintippen von groß und Kleinbuchstaben (z.B. RicK)
    const bethCharacters = characters.filter(character => {
      return character.name.includes("Beth")
    })
    bethCharacters.forEach(renderCharacter);
  } else if (inputText.value.toLowerCase().includes("jerry")){    // berücksichtigt eintippen von groß und Kleinbuchstaben (z.B. RicK)
    const jerry = characters.filter(character => {
      return character.name.includes("Jerry")
    })
    jerry.forEach(renderCharacter);
  } else if (inputText.value.toLowerCase().includes("abadango") || inputText.value.toLowerCase().includes("cluster") || inputText.value.toLowerCase().includes("princess") ){    // berücksichtigt eintippen von groß und Kleinbuchstaben (z.B. RicK)
    const abadangoClusterPrincess = characters.filter(character => {
      return character.name.includes("Abadango Cluster Princess");
    })
    abadangoClusterPrincess.forEach(renderCharacter);
  } else if (inputText.value.toLowerCase().includes("abradolf") || inputText.value.toLowerCase().includes("lincler")){    // berücksichtigt eintippen von groß und Kleinbuchstaben (z.B. RicK)
    const abradolfLinder = characters.filter(character => {
      return character.name.includes("Abradolf Lincler");
    })
    abradolfLinder.forEach(renderCharacter);
  }
})

// ============ end Code =================

});


const upperList = document.querySelector(".cards");

function renderCharacter(character) {
  const cardContent = document.createElement("li");
  const names = document.createElement("p");
  cardContent.append(names);
  names.textContent = character.name;
  const picture = document.createElement("img");
  cardContent.append(picture);
  picture.src = character.image;
  upperList.append(cardContent);

  if (character.status === "Alive") {
    cardContent.classList.add("alive");
    names.classList.add("alive");
  } else if (character.status === "Dead") {
    cardContent.classList.add("dead");
    names.classList.add("dead");
  } else if (character.status === "unknown") {
    cardContent.classList.add("unknown");
    names.classList.add("unknown");
  }
}