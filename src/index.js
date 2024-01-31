import "./pages/index.css"; // импорт главного файла стилей

import {
  enableValidation,
  clearValidation,
  validationConfig,
} from "./scripts/validation.js";

import { createCard, deleteCard, onLike } from "./scripts/card.js";

import {
  openPopup,
  closePopup,
  closePopupByOverlayAndButton,
  saveBtnLoading,
} from "./scripts/modal.js";

import {
  getProfile,
  getInitialCards,
  changeProfileApi,
  changeAvatarApi,
  postCardApi,
} from "./scripts/api.js";

export const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".places__item, .card");
export const cardContainer = document.querySelector(".places__list");

const addButton = document.querySelector(".profile__add-button");
export const addPopup = document.querySelector(".popup_type_new-card");
const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_image");
const cardPopupImage = cardPopup.querySelector(".popup__image");
const popupList = document.querySelectorAll(".popup");
export const editForm = document.querySelector('[name="edit-profile"]');
export const editFormButton = editForm.querySelector(".popup__button");
export const nameInput = editForm.querySelector('[name="name"]');
export const jobInput = editForm.querySelector('[name="description"]');
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
const newPlaceForm = document.querySelector('[name="new-place"]');
export const newPlaceFormButton = newPlaceForm.querySelector(".popup__button");
export const cardTitleInput = newPlaceForm.querySelector('[name="place-name"]');
export const cardLinkInput = newPlaceForm.querySelector('[name="link"]');

export const deletePopup = document.querySelector(".popup_type_delete");
// const deleteForm = document.querySelector('[name="delete-form"]')
export const confirmDeletion = deletePopup.querySelector(".popup__button");
export const deleteTitle = deletePopup.querySelector(".popup__title");

const avatar = document.querySelector(".profile__image");
const avatarPopup = document.querySelector(".popup_type_avatar");
const avatarForm = document.querySelector('[name="avatar-form"]');
export const avatarInput = avatarForm.querySelector('[name="avatar"]');
export const avatarFormButton = avatarForm.querySelector(".popup__button");

export const messagePopup = document.querySelector(".popup_type_message");
export const messagePopupTitle = messagePopup.querySelector(".popup__title");

function addCard(cardElement) {
  cardContainer.append(cardElement);
}

//попап картинки карточки
export function onImageClick(card) {
  cardPopupImage.src = card.src;
  cardPopupImage.alt = card.alt;
  cardPopup.querySelector(".popup__caption").textContent = card.alt;

  openPopup(cardPopup);
}

//информационное сообщение
export function showMessagePopup(message) {
  openPopup(messagePopup);
  messagePopupTitle.textContent = message;

  setTimeout(() => closePopup(messagePopup), 3000);
}

//редактирование данных профиля
function changeProfile() {
  saveBtnLoading(editFormButton, true);
  changeProfileApi()
    .then((result) => {
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
    })
    .catch((err) => {
      console.log(`Не удалось изменить данные профиля. ${err}`);
    })
    .finally(() => {
      saveBtnLoading(editFormButton, false);
    });
}

//изменение аватара
function changeAvatar() {
  saveBtnLoading(avatarFormButton, true);
  changeAvatarApi()
    .then((result) => {
      avatar.style.backgroundImage = `url(${result.avatar})`;
    })
    .catch((err) => {
      console.log(`Не удалось изменить фото профиля. ${err}`);
    })
    .finally(() => {
      saveBtnLoading(avatarFormButton, false);
    });
}

//добавление карточки на страницу
function postCard() {
  saveBtnLoading(newPlaceFormButton, true);
  postCardApi()
    .then((newCard) => {
      const profileId = newCard.owner._id;
      const ownerId = newCard.owner._id;
      const cardId = newCard._id;
      const card = createCard(
        newCard,
        deleteCard,
        onLike,
        onImageClick,
        ownerId,
        profileId,
        cardId
      );
      cardContainer.prepend(card);
    })
    .catch((err) => {
      console.log(`Не удалось добавить публикацию. ${err}`);
    })
    .finally(() => {
      saveBtnLoading(newPlaceFormButton, false);
    });
}

// форма редактирования профиля
export function handleEditFormSubmit(evt) {
  evt.preventDefault();

  changeProfile();

  closePopup(editPopup);
}
//текущее значение полей
function initProfileFormValues() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

//форма изменения аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  changeAvatar();

  closePopup(avatarPopup);
}

// форма добаления карточки
export function handleAddFormSubmit(evt) {
  evt.preventDefault();

  postCard();

  newPlaceForm.reset();

  closePopup(addPopup);
}

// открыть попап редактирования профиля
editButton.addEventListener("click", () => {
  initProfileFormValues();
  clearValidation(editForm, validationConfig);
  openPopup(editPopup);
});

//открыть попап аватара
avatar.addEventListener("click", () => {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  openPopup(avatarPopup);
});

// открыть попап добавления карточки
addButton.addEventListener("click", () => {
  newPlaceForm.reset();
  clearValidation(newPlaceForm, validationConfig);
  openPopup(addPopup);
});

// форма редактирования профиля
editForm.addEventListener("submit", handleEditFormSubmit);

//форма изменения аватара
avatarForm.addEventListener("submit", handleAvatarFormSubmit);

// форма добаления карточки
newPlaceForm.addEventListener("submit", handleAddFormSubmit);

//закрытие попапов по оверлей и кнопке закрытия
popupList.forEach((popup) =>
  popup.addEventListener("mousedown", closePopupByOverlayAndButton)
);

//валидация форм
enableValidation();

//отобразить на странице карточки и данные профиля
Promise.all([getProfile(), getInitialCards()])
  .then(([profileData, cards]) => {
    const profileId = profileData._id;

    profileTitle.textContent = profileData.name;
    profileDescription.textContent = profileData.about;
    avatar.style.backgroundImage = `url(${profileData.avatar})`;

    cards.forEach((card) => {
      const ownerId = card.owner._id;
      const cardId = card._id;
      const initialCards = createCard(
        card,
        deleteCard,
        onLike,
        onImageClick,
        ownerId,
        profileId,
        cardId
      );

      addCard(initialCards);
      console.log(card);
    });
  })
  .catch((err) => {
    console.log(`Не удалось загрузить данные. ${err}`);
  });
