"use strict";

window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");
  loadJson("https://swapi.dev/api/films/1/", displayFilm);
}

function loadJson(url, callback) {
  fetch(url).then(resp => resp.json()).then(json => callback(json));
}


function displayFilm(filmData) {
  const clone = document.querySelector("#movie_template").content.cloneNode(true);

  console.log(`Displaying episode ${filmData.episode_id} ${filmData.title}`)

  clone.querySelector("[data-field=title]").textContent = filmData.title;
  clone.querySelector("[data-field=episode_id]").textContent = filmData.episode_id;

  const characters = filmData.characters;
  // loop through all characters
  characters.forEach(characterurl => {
    // First create character placeholder - and append that to the movie-clone
    const placeholder = document.createElement("li");
    placeholder.textContent = "-placeholder-";
    clone.querySelector("#characters").appendChild(placeholder);

    // load the character-url
    loadJson(characterurl, displayCharacter);

    function displayCharacter(characterData) {
      console.log(`Display character ${characterData.name}`);
      // create a clone for each one
      const characterclone = document.querySelector("#character_template").content.cloneNode(true);
      // Put the real characterdata into the template
      characterclone.querySelector("[data-field=name]").textContent = characterData.name;
      
      // and replace the placeholder with the characterclone
      placeholder.replaceWith(characterclone);

      // in stead of trying to add it to the original - no longer existing - clone

      // clone.querySelector("#characters").appendChild(characterclone);
      // ERROR: this fails because the clone no longer exists ... !!!
    }
  });

  document.querySelector("#movies").appendChild(clone);
}