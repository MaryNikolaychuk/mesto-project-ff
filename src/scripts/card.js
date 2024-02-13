import { deleteCardApi, putLike, deleteLike } from "./api.js";
import { openPopup, closePopup } from "./modal.js";
import { showMessagePopup, handleSubmit } from "./utils.js";
// import { clearValidation, validationConfig } from "./validation.js";

export const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".places__item, .card");

export const deletePopup = document.querySelector(".popup_type_delete");
export const deleteForm = document.forms["delete-form"];
// const confirmDeletion = deletePopup.querySelector(".popup__button");
// const deleteTitle = deletePopup.querySelector(".popup__title");

const cardPopup = document.querySelector(".popup_type_image");
const cardPopupImage = cardPopup.querySelector(".popup__image");
const cardPopupCaption = cardPopup.querySelector(".popup__caption");

export function createCard({
  card,
  deleteCard,
  onLike,
  onImageClick,
  profileId,
}) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikes = cardElement.querySelector(".card__likes");

  cardElement.querySelector(".card__title").textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardLikes.textContent = card.likes.length;
  if (card.likes.length === 0) {
    cardLikes.textContent = "like";
  }

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement, card._id, card.name);
  });

  if (profileId !== card.owner._id) {
    deleteButton.style.display = "none";
  }

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () =>
    onLike(card._id, likeButton, cardLikes)
  );
  if (card.likes.some((like) => like._id === profileId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  cardImage.addEventListener("click", () => onImageClick(cardImage));

  return cardElement;
}

//попап картинки карточки
export function onImageClick(card) {
  cardPopupImage.src = card.src;
  cardPopupImage.alt = card.alt;
  cardPopupCaption.textContent = card.alt;

  openPopup(cardPopup);
}

export function deleteCard(deletingCard, cardId, cardName) {
  deleteCardApi(cardId)
    .then(() => {
      deletingCard.remove();
      closePopup(deletePopup);
      const message = `Публикация "${cardName}" успешно удалена.`;
      showMessagePopup(message);
    })
    .catch((err) => {
      console.error(`Ошибка при удалении публикации "${cardName}": ${err}`);
    });
}

export function onLike(cardId, likeButton, cardLikes) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  if (!isLiked) {
    putLike(cardId)
      .then((card) => {
        likeButton.classList.add("card__like-button_is-active");
        cardLikes.textContent = card.likes.length;
      })
      .catch((err) => {
        console.error(`Ошибка при добавлении лайка на публикацию: ${err}`);
      });
  } else {
    deleteLike(cardId)
      .then((card) => {
        likeButton.classList.remove("card__like-button_is-active");
        cardLikes.textContent = card.likes.length;
        if (card.likes.length === 0) {
          cardLikes.textContent = "like";
        }
      })
      .catch((err) => {
        console.error(`Ошибка при удалении лайка с публикации: ${err}`);
      });
  }
}
