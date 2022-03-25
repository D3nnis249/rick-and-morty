const baseUrl = 'https://rickandmortyapi.com/api/character?page=';
const numPages = 5;

const urls = Array(numPages)
              .fill() // [undefined, undefined, ...]
              .map((_, index) => baseUrl + (index + 1));
//_________Funktion Seitenanzahl____
const promises = urls.map(url => fetch(url).then(res => res.json()))

Promise
  .all(promises)
  .then(pages => {
    const characters = pages.flatMap(page => page.results)
    characters.forEach(renderCharacter)
  })

function renderCharacter(character) {
  const el = document.createElement('p')
  document.body.append(el)
  el.textContent = character.name;
  const picture = document.createElement('img')
  document.body.append(picture)
  picture.src = character.image;
}