import "./pages/index.css"; // импорт главного файла стилей

import {
  enableValidation,
  clearValidation,
  validationConfig,
} from "./scripts/validation.js";

import {
  createCard,
  onImageClick,
  deleteCard,
  onLike,
} from "./scripts/card.js";

import {
  openPopup,
  closePopup,
  closePopupByOverlayAndButton,
} from "./scripts/modal.js";

import { handleSubmit, renderLoading } from "./scripts/utils.js";

import {
  getProfile,
  getInitialCards,
  changeProfileApi,
  changeAvatarApi,
  postCardApi,
} from "./scripts/api.js";

const cardContainer = document.querySelector(".places__list");

const addButton = document.querySelector(".profile__add-button");
const addPopup = document.querySelector(".popup_type_new-card");
const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");

const popupList = document.querySelectorAll(".popup");
const editForm = document.forms["edit-profile"];
const nameInput = editForm.elements["name"];
const jobInput = editForm.elements["description"];
const editFormButton = editForm.querySelector(".popup__button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const newPlaceForm = document.forms["new-place"];
const cardTitleInput = newPlaceForm.elements["place-name"];
const cardLinkInput = newPlaceForm.elements["link"];
const newPlaceFormButton = newPlaceForm.querySelector(".popup__button");

const avatar = document.querySelector(".profile__image");
const avatarPopup = document.querySelector(".popup_type_avatar");
const avatarForm = document.forms["avatar-form"];
const avatarInput = avatarForm.elements["avatar"];
const avatarFormButton = avatarForm.querySelector(".popup__button");

function addCard(cardElement) {
  cardContainer.append(cardElement);
}

//редактирование данных профиля
function handleEditFormSubmit(evt) {
  function makeRequest() {
    return changeProfileApi(nameInput.value, jobInput.value).then((result) => {
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
    });
  }
  handleSubmit({
    request: makeRequest,
    evt: evt,
    popup: editPopup,
    errorText: "Ошибка при изменении данных профиля",
  });
}

//изменение аватара
function handleAvatarFormSubmit(evt) {
  function makeRequest() {
    return changeAvatarApi(avatarInput.value).then((result) => {
      avatar.style.backgroundImage = `url(${result.avatar})`;
    });
  }
  handleSubmit({
    request: makeRequest,
    evt: evt,
    popup: avatarPopup,
    errorText: "Ошибка при изменении фото профиля",
  });
}

//добавление карточки на страницу
function handleAddFormSubmit(evt) {
  function makeRequest() {
    return postCardApi(cardTitleInput.value, cardLinkInput.value).then(
      (newCard) => {
        const profileId = newCard.owner._id;
        const card = createCard({
          card: newCard,
          deleteCard: deleteCard,
          onLike: onLike,
          onImageClick: onImageClick,
          profileId: profileId,
        });
        cardContainer.prepend(card);
      }
    );
  }

  handleSubmit({
    request: makeRequest,
    evt: evt,
    popup: addPopup,
    errorText: "Ошибка при добавлении публикации",
  });
}

//текущее значение полей формы редактирования
function initProfileFormValues() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

// открыть попап редактирования профиля
editButton.addEventListener("click", () => {
  clearValidation(editForm, validationConfig);
  initProfileFormValues();
  openPopup(editPopup);
});

//открыть попап аватара
avatar.addEventListener("click", () => {
  clearValidation(avatarForm, validationConfig);
  openPopup(avatarPopup);
});

// открыть попап добавления карточки

addButton.addEventListener("click", () => {
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
enableValidation(validationConfig);

//отобразить на странице карточки и данные профиля
Promise.all([getProfile(), getInitialCards()])
  .then(([profileData, cards]) => {
    const profileId = profileData._id;

    profileTitle.textContent = profileData.name;
    profileDescription.textContent = profileData.about;
    avatar.style.backgroundImage = `url(${profileData.avatar})`;

    cards.forEach((card) => {
      const initialCards = createCard({
        card: card,
        deleteCard: deleteCard,
        onLike: onLike,
        onImageClick: onImageClick,
        profileId: profileId,
      });

      addCard(initialCards);
      console.log(card);
    });
  })
  .catch((err) => {
    console.error(`Ошибка при загрузке данных: ${err}`);
  });
