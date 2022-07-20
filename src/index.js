import './style.css';

const form = document.querySelector('.form');
const name = document.querySelector('.name_input');
const score = document.querySelector('.score_input');

const setEndPoint = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/epd1eVyK5Nyiug7lZWsg/scores/';

const addScore = () => {
  fetch(setEndPoint, {
    method: 'POST',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({
      user: name.value,
      score: score.value,
    }),
  });
};

const List = document.querySelector('.scores-list');

const getScore = () => {
  fetch(setEndPoint).then(async (res) => {
    const data = await res.json();
    const arrayOfResults = data.result;
    return arrayOfResults;
  })
    .then((arrayOfResults) => {
      for (let i = 0; i < arrayOfResults.length; i += 1) {
        const newscore = document.createElement('li');
        newscore.textContent = `${arrayOfResults[i].user} : ${arrayOfResults[i].score}`;
        List.appendChild(newscore);
      }
    });
};

getScore();

const refreshButton = document.querySelector('.refresh-button');

refreshButton.addEventListener('click', () => {
  List.innerHTML = '';
  getScore();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addScore();
  name.value = '';
  score.value = '';
});
