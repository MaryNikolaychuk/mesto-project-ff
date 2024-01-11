// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import {
  initialCards,
  addCard,
  deleteCard,
  showCard,
  like,
} from "./scripts/cards.js";
import {
  openPopup,
  handleAddFormSubmit,
  handleEditFormSubmit,
} from "./scripts/modal.js";

export const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".places__item, .card");
export const cardList = document.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");
export const addPopup = document.querySelector(".popup_type_new-card");
const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
export const cardContainer = document.querySelector(".places__list");
export const editForm = document.querySelector('[name="edit-profile"]');
export const nameInput = editForm.querySelector('[name="name"]');
export const jobInput = editForm.querySelector('[name="description"]');
export const title = document.querySelector(".profile__title");
export const description = document.querySelector(".profile__description");
const newPlaceForm = document.querySelector('[name="new-place"]');
export const cardTitleInput = newPlaceForm.querySelector('[name="place-name"]');
export const cardLinkInput = newPlaceForm.querySelector('[name="link"]');

initialCards.forEach((card) => {
  const initialCard = addCard(card, deleteCard, like);
  showCard(initialCard);
});

// открыть попап добавления карточки
addButton.addEventListener("click", () => openPopup(addPopup));
// открыть попап редактирования профиля
editButton.addEventListener("click", () => openPopup(editPopup));

// попап карточки
export function imagePopupOpen(card) {
  const imagePopup = document.querySelector(".popup_type_image");

  imagePopup.querySelector(".popup__image").src = card.src;
  imagePopup.querySelector(".popup__image").alt = card.alt;
  imagePopup.querySelector(".popup__caption").textContent = card.alt;

  openPopup(imagePopup);
}

// форма редактирования
editForm.addEventListener("submit", handleEditFormSubmit);

// форма добаления карточки
newPlaceForm.addEventListener("submit", handleAddFormSubmit);

import "./pages/index.css"; // добавьте импорт главного файла стилей
