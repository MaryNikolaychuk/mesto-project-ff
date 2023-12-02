// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки 

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');


function addCard (card, deleteCard) {
        
    const cardElement = cardTemplate.cloneNode(true);
            
    cardElement.querySelector('.card__description').textContent = card.name;    
    cardElement.querySelector('.card__image').src = card.link;

    const deleteButton = cardElement.querySelector('.card__delete-button');         
    deleteButton.addEventListener('click', deleteCard);

    return cardElement

}

function deleteCard (event) {
    const deletingCard = event.target.closest('.card'); 
    deletingCard.remove();
}


function showCard (cardElement) {
    cardList.append(cardElement);
}

  
initialCards.forEach(function (card) {
    const initialCard = addCard(card, deleteCard);
    showCard(initialCard);
});