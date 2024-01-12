import { cardTemplate, onImageClick } from "../index.js";

export function createCard(card, deleteCard, onLike, onImageClick) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__title").textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCard(cardElement));

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => onLike(likeButton));

  cardImage.addEventListener("click", () => onImageClick(cardImage));

  return cardElement;
}

export function deleteCard(deletingCard) {
  deletingCard.remove();
}

// лайк
export function onLike(likedCard) {
  likedCard.classList.toggle("card__like-button_is-active");
}
