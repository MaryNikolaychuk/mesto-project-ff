import {
  cardTemplate,
  deletePopup,
  deleteTitle,
  confirmDeletion,
  showMessagePopup,
} from "../index.js";
import { deleteCardApi, putLike, deleteLike } from "./api.js";
import { openPopup, closePopup, deleteBtnLoading } from "./modal.js";

export function createCard(
  card,
  deleteCard,
  onLike,
  onImageClick,
  ownerId,
  profileId,
  cardId
) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikes = cardElement.querySelector(".card__likes");

  cardId = card._id;

  cardElement.querySelector(".card__title").textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardLikes.textContent = card.likes.length;
  if (card.likes.length === 0) {
    cardLikes.textContent = "like";
  }

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () =>
    deleteCard(cardElement, card.name, cardId)
  );

  if (profileId !== ownerId) {
    deleteButton.style.display = "none";
  }

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () =>
    onLike(cardId, likeButton, cardLikes)
  );
  if (card.likes.some((like) => like._id === profileId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  cardImage.addEventListener("click", () => onImageClick(cardImage));

  return cardElement;
}

export function deleteCard(deletingCard, cardName, cardId) {
  openPopup(deletePopup);
  deleteTitle.textContent = `Вы уверены что хотите удалить публикацию "${cardName}"?`;
  confirmDeletion.addEventListener("click", () => {
    deleteBtnLoading(confirmDeletion, true);
    deletingCard.remove();
    deleteCardApi(cardId)
      .catch((err) => {
        console.log(`Не удалось удалить публикацию "${cardName}". ${err}`);
      })
      .finally(() => {
        deleteBtnLoading(confirmDeletion, false);
        closePopup(deletePopup);
        const message = `Публикация "${cardName}" успешно удалена.`;
        showMessagePopup(message);
      });
  });
}

export function onLike(cardId, likeButton, cardLikes) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  if (!isLiked) {
    likeButton.classList.add("card__like-button_is-active");
    putLike(cardId)
      .then((card) => {
        cardLikes.textContent = card.likes.length;
      })
      .catch((err) => {
        console.log(`Не удалось поставить лайк на публикацию. ${err}`);
      });
  } else {
    likeButton.classList.remove("card__like-button_is-active");
    deleteLike(cardId)
      .then((card) => {
        cardLikes.textContent = card.likes.length;
        if (card.likes.length === 0) {
          cardLikes.textContent = "like";
        }
      })
      .catch((err) => {
        console.log(`Не удалось убрать лайк с публикации. ${err}`);
      });
  }
}
