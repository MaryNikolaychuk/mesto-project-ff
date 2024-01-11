import {
  addPopup,
  editForm,
  nameInput,
  jobInput,
  title,
  description,
  cardTitleInput,
  cardLinkInput,
  cardList,
} from "../index.js";
import { 
  initialCards,
   addCard, 
   deleteCard 
  } from "./cards.js";

//функция открытия попапов
export function openPopup(popup) {
  popup.classList.add("popup_is-opened");

  defaultFormsValue(); //для editPopup, текущее значение полей

  // закрытие по крестику
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", () => closePopup(popup));

  // закрытие по клику на оверлей
  popup.addEventListener("click", function (evt) {
    if (!evt.target.classList.contains("popup__content")) {
      evt.target.classList.remove("popup_is-opened");
    }
  });

  // закрытие по кнопке "сохранить"
  closeToSave(popup);

  //закрытие по Esc
  document.addEventListener("keydown", closeToEsc);
}

// общая функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}

//  функция закрытия по кнопке "сохранить"
function closeToSave(popup) {
  const saveButton = editForm.querySelector(".popup__button");
  saveButton.addEventListener("click", () => closePopup(popup));
}

//функция закрытия по Esc
function closeToEsc(evt) {
  if (evt.key === "Escape") {
    const opened = document.querySelector(".popup_is-opened");
    if (opened) {
      opened.classList.remove("popup_is-opened");
    }
    document.removeEventListener("keydown", closeToEsc);
  }
}

// форма редактирования
//текущее значение полей, вызывается в откртии попапов
function defaultFormsValue() {
  nameInput.value = title.textContent;
  jobInput.value = description.textContent;
}

// форма редактирования
export function handleEditFormSubmit(evt) {
  evt.preventDefault();

  // новые значения полей
  title.textContent = nameInput.value;
  description.textContent = jobInput.value;
}

// форма добаления карточки
export function handleAddFormSubmit(evt) {
  evt.preventDefault();

  const newCard = { name: cardTitleInput.value, link: cardLinkInput.value };

  initialCards.splice(0, 0, newCard);

  const showNewCard = addCard(initialCards[0], deleteCard);

  cardList.prepend(showNewCard);

  cardTitleInput.value = "";
  cardLinkInput.value = "";

  closePopup(addPopup);
}
