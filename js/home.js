function getCharacters() {
  const charactersIds = Array.from({ length: 20 }, (_, index) => index + 1);

  fetch(`https://rickandmortyapi.com/api/character/${charactersIds}`)
    .then((response) => response.json())
    .then((data) =>
      data.forEach(({ image, status, name, species, gender, origin }) => {
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

        const characterCard = new DOMParser().parseFromString(
          stringElement,
          "text/html"
        );

        const charactersContainer = document.querySelector(
          ".characters-container"
        );

        charactersContainer.appendChild(characterCard.body.firstChild);
      })
    )
    .catch((error) => console.error(error));
}

getCharacters();
