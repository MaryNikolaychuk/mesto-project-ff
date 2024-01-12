// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import "./pages/index.css"; // импорт главного файла стилей

import { createCard, deleteCard, onLike } from "./scripts/card.js";
import { initialCards } from "./scripts/cards.js";
import { openPopup, closePopup, closePopupByOverlay } from "./scripts/modal.js";

export const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".places__item, .card");
export const cardContainer = document.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");
export const addPopup = document.querySelector(".popup_type_new-card");
const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const imagePopup = document.querySelector(".popup_type_image");
export const editForm = document.querySelector('[name="edit-profile"]');
export const nameInput = editForm.querySelector('[name="name"]');
export const jobInput = editForm.querySelector('[name="description"]');
export const title = document.querySelector(".profile__title");
export const description = document.querySelector(".profile__description");
const newPlaceForm = document.querySelector('[name="new-place"]');
export const cardTitleInput = newPlaceForm.querySelector('[name="place-name"]');
export const cardLinkInput = newPlaceForm.querySelector('[name="link"]');

function addCard(cardElement) {
  cardContainer.append(cardElement);
}

initialCards.forEach((card) => {
  const initialCard = createCard(card, deleteCard, onLike, onImageClick);
  addCard(initialCard);
});

// попап карточки
export function onImageClick(card) {
  const img = imagePopup.querySelector(".popup__image");

  img.src = card.src;
  img.alt = card.alt;
  imagePopup.querySelector(".popup__caption").textContent = card.alt;

  openPopup(imagePopup);
}

// форма редактирования
//текущее значение полей
function initProfileFormValues() {
  nameInput.value = title.textContent;
  jobInput.value = description.textContent;
}

// форма редактирования
export function handleEditFormSubmit(evt) {
  evt.preventDefault();

  // новые значения полей
  title.textContent = nameInput.value;
  description.textContent = jobInput.value;

  closePopup(editPopup);
}

// форма добаления карточки
export function handleAddFormSubmit(evt) {
  evt.preventDefault();

  const newCard = { name: cardTitleInput.value, link: cardLinkInput.value };

  const card = createCard(newCard, deleteCard, onLike, onImageClick);

  cardContainer.prepend(card);

  newPlaceForm.reset();

  closePopup(addPopup);
}

// открыть попап добавления карточки
addButton.addEventListener("click", () => openPopup(addPopup));
// открыть попап редактирования профиля
editButton.addEventListener(
  "click",
  () => openPopup(editPopup),
  initProfileFormValues()
);

const anyPopup = document.querySelectorAll(".popup");

const closeButton = document.querySelectorAll(".popup__close");

closeButton.forEach((btn) => {
  btn.addEventListener("click", () => closePopup());
});

anyPopup.forEach((popup) =>
  popup.addEventListener("click", closePopupByOverlay)
);

// форма редактирования
editForm.addEventListener("submit", handleEditFormSubmit);

// форма добаления карточки
newPlaceForm.addEventListener("submit", handleAddFormSubmit);