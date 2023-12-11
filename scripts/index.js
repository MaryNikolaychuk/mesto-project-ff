// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки 

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item, card');
const cardList = document.querySelector('.places__list');


const addCard = (card, deleteCard) => {
        
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
            
    cardElement.querySelector('.card__title').textContent = card.name;    
    cardImage.src = card.link;
    cardImage.alt = card.name; 

    const deleteButton = cardElement.querySelector('.card__delete-button');         
    deleteButton.addEventListener('click', () => deleteCard(cardElement));

    return cardElement

}

const deleteCard = (deletingCard) => { 
    deletingCard.remove(); 
}

// const deleteCard = (event) => {
//     const deletingCard = event.target.closest('.card'); 
//     deletingCard.remove();
// }


const showCard = (cardElement) => {
    cardList.append(cardElement);
}

  
initialCards.forEach((card) => {
    const initialCard = addCard(card, deleteCard);
    showCard(initialCard);
});