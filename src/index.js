import './style.css';

const form = document.querySelector('.form');
const name = document.querySelector('.name_input');
const score = document.querySelector('.score_input');
const List = document.querySelector('.scores-list');
const refreshButton = document.querySelector('.refresh-button');

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/epd1eVyK5Nyiug7lZWsg/scores/';

const addScore = () => {
  const nameV = name.value;
  const scoreV = score.value;
  fetch(url, {
    method: 'POST',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({
      user: nameV,
      score: scoreV,
    }),
  });
};

const buildHTML = (itemdescription) => {
  itemdescription.forEach((element, index) => {
    const item = document.createElement('li');
    item.textContent = `${index + 1}:-${element.user}:${element.score}`;
    List.appendChild(item);
  });
};

const getScore = () => {
  fetch(url).then(async (res) => {
    const data = await res.json();
    const arrayOfResults = data.result;
    return arrayOfResults;
  })
    .then((arrayOfResults) => {
      buildHTML(arrayOfResults);
      // another way of creating elements
      // for (let i = 0; i < arrayOfResults.length; i += 1) {
      //   const newscore = document.createElement('li');
      //   newscore.textContent = arrayOfResults[i].user + ":" + arrayOfResults[i].score;
      //   List.appendChild(newscore);
      // }
    });
};

getScore();

refreshButton.addEventListener('click', () => {
  List.innerHTML = '';
  getScore();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addScore();
  form.reset();
});
