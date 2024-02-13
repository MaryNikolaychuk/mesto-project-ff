import { request } from "./utils.js";

export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-6",
  headers: {
    authorization: "44cd4f55-69b1-4c3a-b4cb-625fc5e79aca",
    "Content-Type": "application/json",
  },
};

export function getInitialCards() {
  return request("/cards", "GET");
}

export function getProfile() {
  return request("/users/me", "GET");
}

export function postCardApi(nameInputValue, linkInputValue) {
  return request("/cards", "POST", {
    name: nameInputValue,
    link: linkInputValue,
  });
}

export function changeProfileApi(nameInputValue, aboutInputValue) {
  return request("/users/me", "PATCH", {
    name: nameInputValue,
    about: aboutInputValue,
  });
}

export function deleteCardApi(cardId) {
  return request(`/cards/${cardId}`, "DELETE");
}

export function putLike(cardId) {
  return request(`/cards/likes/${cardId}`, "PUT");
}

export function deleteLike(cardId) {
  return request(`/cards/likes/${cardId}`, "DELETE");
}

export function changeAvatarApi(avatarInputValue) {
  return request("/users/me/avatar", "PATCH", {
    avatar: avatarInputValue,
  });
}
