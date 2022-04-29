import 'regenerator-runtime/runtime';
import { livenHeader } from './header.js';

livenHeader();



const URL = 'https://jsonplaceholder.typicode.com/users';

async function getUsersName() {
  const response = await fetch(URL);
  return response.json();
};

getUsersName().then(users => {
  for (let key of users) {
    const addTodoCardOptions = document.createElement('option');
    addTodoCardOptions.textContent = `${key.name}`;
    addTodoCardSelect.append(addTodoCardOptions);
  }
});

const addTodoCardSelect = document.querySelector(".addTodoCard-form__container-person");
const addTodoButton = document.querySelector('.todoBlock__button');
const addTodoCard = document.querySelector('.addTodoCard');
const todoBlockContainer = document.querySelector('.todoBlock__container');
const cardTitle = document.querySelector('.addTodoCard__input-title');
const cardDescription = document.querySelector(".addTodoCard-form__description");
// const cardSelection = document.querySelector('.addTodoCard-form__container-person');
const cardOptionSelected = document.querySelector('.opt');
const todoCardsCounter = document.querySelector('.todoBlock__header-counter');
todoCardsCounter.innerText = '0';
const inprogressContainer = document.querySelector('.inprogressBlock__container');
const inprogressCardsCounter = document.querySelector('.inprogressBlock__header-counter');
inprogressCardsCounter.innerText = '0';

let todoCards = [];
let inProgressCards = [];
let doneCards = [];



addTodoButton.addEventListener('click', () => {
  addTodoCard.style.display = 'block';
});

function createCard({id, text, title, selectUser}) {
  const card = document.createElement('div');
  card.classList = 'card';
  card.setAttribute('id', `card-${id}`);
  const cardContainer1 = document.createElement('div');
  cardContainer1.classList = 'card__container';
  const cardContainerTitle = document.createElement('div');
  cardContainerTitle.classList = 'card__container__title left';
  cardContainerTitle.innerText = title;
  const cardContainerDescription = document.createElement('div');
  cardContainerDescription.classList = 'card__container__description left';
  cardContainerDescription.innerText = text;
  const cardContainerUser = document.createElement('div');
  cardContainerUser.classList = 'card__container__user left';
  cardContainerUser.innerText = selectUser;

  cardContainer1.append(cardContainerTitle, cardContainerDescription, cardContainerUser);

  const cardContainer2 = document.createElement('div');
  cardContainer2.classList = 'card__container';

  const cardContainerButtons = document.createElement('div');
  cardContainerButtons.classList = 'card__container-buttons right';
  const cardButton1= document.createElement('button');
  cardButton1.classList = 'functionButton';
  cardButton1.setAttribute('id', 'todo');
  cardButton1.innerText = 'Edit';
  const cardButton2 = document.createElement('button');
  cardButton2.classList = 'functionButton';
  cardButton2.setAttribute('id', 'inprogress');
  cardButton2.innerText = 'Delete';

  cardContainerButtons.append(cardButton1, cardButton2);

  const cardContainerTransitionButton = document.createElement('div');
  cardContainerTransitionButton.classList = 'card__container-transitionButton right';
  const cardButton3 = document.createElement('button');
  cardButton3.classList = 'functionButton';
  cardButton3.setAttribute('id', 'hiddenBtn');
  cardButton3.innerText = ' > ';

  cardContainerTransitionButton.append(cardButton3);

  const cardContainerTime = document.createElement('div');
  cardContainerTime.classList = 'card__container-time right';
  const spanTime = document.createElement('span');
  spanTime.setAttribute('id', 'newDate');
  spanTime.innerText = (new Date()).toLocaleString();

  cardContainerTime.append(spanTime);

  cardContainer2.append(cardContainerButtons, cardContainerTransitionButton, cardContainerTime);

  card.append(cardContainer1, cardContainer2);
  

  //--------------------------------move ---------------------------------

  cardButton3.addEventListener('click', (event) => {
    card.classList = 'card cardInProgress';
    cardButton1.innerText = 'Back';
    cardButton2.innerText = 'Complete';
    cardContainerTransitionButton.style.display = 'none';
    inProgressCards.push(card);
    todoCards = todoCards.filter(item => !(item.id == `card-${id}`));
    card.remove();
    console.log(todoCards);
    console.log(inProgressCards);
    inprogressContainer.append(card);
    todoCardsCounter.innerText = todoCards.length;
    inprogressCardsCounter.innerText = inProgressCards.length;
    

    // --------------------------------back ---------------------------------

    cardButton1.addEventListener('click', () => {
      console.log('dvdjnsj');
      card.classList = 'card';
      cardButton1.innerText = 'Edit';
      cardButton2.innerText = 'Delete';
      cardContainerTransitionButton.style.display = 'block';
      todoCards = todoCards.filter(item => !(item.id == `card-${id}`));
      todoCards.push(card);
      inProgressCards = inProgressCards.filter(item => !(item.id == `card-${id}`));
      card.remove();
      todoBlockContainer.append(card);
      todoCardsCounter.innerText = todoCards.length;
      inprogressCardsCounter.innerText = inProgressCards.length;
      console.log(todoCards);
    });
  });

  // -------------------------------- edit ---------------------------------

  cardButton1.addEventListener('click', () => {
    const editCard = document.querySelector('#add2');
    editCard.style.display = 'block';
    const todoBtnConfirm = document.querySelector('#confirm2');
    todoBtnConfirm.addEventListener('click', () => console.log('acasc'));
    
  });

  return card;
}

const todoBtnConfirm = document.querySelector('#confirm');

todoBtnConfirm.addEventListener('click', () => {
  const textTitle = cardTitle.value;
  const text = cardDescription.value;
  const user = addTodoCardSelect.value;
  const obj = {
    id : Math.floor(Math.random() * 1000) + 1,
    text : text,
    title : textTitle,
    selectUser : user,
  };
  todoBlockContainer.append(createCard(obj));
  addTodoCardSelect.value = cardOptionSelected.value;
  cardDescription.value = '';
  cardTitle.value = '';
  addTodoCard.style.display = 'none';
  todoCards.push(createCard(obj));
  todoCardsCounter.innerText = todoCards.length;
  console.log(todoCards);
});


