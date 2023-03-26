let charactersInfo = [];

// Interaction with the DOM
function insertCharactersCard(charactersCards) {
  const charactersContainer = document.querySelector(".characters-container");

  charactersCards.forEach((character) => {
    charactersContainer.appendChild(character.body.firstChild);
  });
}

function createCharactersCards(charactersData) {
  const charactersCards = charactersData.map(
    ({ image, status, name, species, gender, origin }) => {
      const stringElement = `
        <article class="character-card">
            <img class="character-card__image" src="${image}"
            alt="character img">
        <span class="${`character-card__status character-card__status--${status}`}">${status}</span>
        <div class="character-info">
            <span class="character-info__label">Name</span>
            <h3 class="character-info__name">${name}</h3>
            <div class="character-info-labels">
            <span class="character-info__label">Specie</span>
            <span class="character-info__label">Gender</span>
            <span class="character-info__label">Origin</span>
            </div>
            <div class="character-info-labels">
            <span class="character-info__specie">${species}</span>
            <span class="character-info__gender">${gender}</span>
            <span class="character-info__origin">${origin.name}</span>
            </div>
        </div>
        </article>
    `;

      return new DOMParser().parseFromString(stringElement, "text/html");
    }
  );

  insertCharactersCard(charactersCards);
}

function insertFilteredCharacters(characters) {
  const charactersContainer = document.querySelector(".characters-container");
  charactersContainer.innerHTML = "";

  createCharactersCards(characters);
}
// End interaction with the DOM

// Call to API
function getCharacters() {
  const charactersIds = Array.from({ length: 150 }, (_, index) => index + 1);

  fetch(`https://rickandmortyapi.com/api/character/${charactersIds}`)
    .then((response) => response.json())
    .then((data) => {
      charactersInfo = data;

      createCharactersCards(data);
    })
    .catch((error) => console.error(error))
    .finally(() => {
      const loader = document.querySelector(".loader-container");
      const contentWrapper = document.querySelector(".content-wrapper");

      loader.style.display = "none";
      contentWrapper.style.display = "block";
    });
}
getCharacters();

// Filter functions
function filterByStatus() {
  const status = document.getElementById("status").value;
  const characters = charactersInfo.filter(
    (character) => character.status === status
  );

  insertFilteredCharacters(characters);
}

function filterBySpecie() {
  const specie = document.getElementById("specie").value;
  const characters = charactersInfo.filter(
    (character) => character.species === specie
  );

  insertFilteredCharacters(characters);
}

function filterByGender() {
  const gender = document.getElementById("gender").value;
  const characters = charactersInfo.filter(
    (character) => character.gender === gender
  );

  insertFilteredCharacters(characters);
}

function resetFilters() {
  insertFilteredCharacters(charactersInfo);
}
