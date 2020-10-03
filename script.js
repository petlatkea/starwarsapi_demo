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
  console.log(characters);

  document.querySelector("#movies").appendChild(clone);
}