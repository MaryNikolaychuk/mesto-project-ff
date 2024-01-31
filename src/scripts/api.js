import {
  nameInput,
  jobInput,
  avatarInput,
  cardTitleInput,
  cardLinkInput,
} from "../index.js";

export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-4",
  headers: {
    authorization: "88565f6a-81be-437f-90be-3cba9ceeb640",
    "Content-Type": "application/json",
  },
};

export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",

    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function getProfile() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function postCardApi() {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    body: JSON.stringify({
      name: cardTitleInput.value,
      link: cardLinkInput.value,
    }),

    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function changeProfileApi() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value,
    }),
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function deleteCardApi(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",

    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function putLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function changeAvatarApi() {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    body: JSON.stringify({
      avatar: avatarInput.value,
    }),
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}
