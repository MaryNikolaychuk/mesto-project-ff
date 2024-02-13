import { config } from "./api.js";
import { openPopup, closePopup } from "./modal.js";

export const messagePopup = document.querySelector(".popup_type_message");
export const messagePopupTitle = messagePopup.querySelector(".popup__title");

export function renderLoading(
  isLoading,
  button,
  buttonText = "Сохранить",
  loadingText = "Сохранение..."
) {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
}

export function handleSubmit({
  request,
  evt,
  popup,
  loadingText = "Сохранение...",
  errorText = "Ошибка",
}) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  renderLoading(true, submitButton, initialText, loadingText);
  request()
    .then(() => {
      evt.target.reset();
      closePopup(popup);
    })
    .catch((err) => {
      console.error(`${errorText}: ${err}`);
    })
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

export function request(endpoint, method, body) {
  return fetch(`${config.baseUrl}${endpoint}`, {
    method: method,
    body: JSON.stringify(body),
    headers: config.headers,
  }).then(checkResponse);
}

//информационное сообщение
export function showMessagePopup(message) {
  openPopup(messagePopup);
  messagePopupTitle.textContent = message;

  setTimeout(() => closePopup(messagePopup), 3000);
}
