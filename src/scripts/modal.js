//функция открытия попапов
export function openPopup(popup) {
  popup.classList.add("popup_is-opened");

  //закрытие по Esc
  document.addEventListener("keydown", closeByEsc);
}

// общая функция закрытия попапов
export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");

  //снять обработчик Esc
  document.removeEventListener("keydown", closeByEsc);
}

//функция закрытия по Esc
function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const opened = document.querySelector(".popup_is-opened");
    if (opened) {
      closePopup(opened);
    }
  }
}

//закрытие попапов по оверлей и кнопке закрытия
export function closePopupByOverlayAndButton(evt) {
  const opened = document.querySelector(".popup_is-opened");
  if (
    !evt.target.closest(".popup__content") ||
    evt.target.classList.contains("popup__close")
  ) {
    closePopup(opened);
  }
}

export function saveBtnLoading(btn, isLoading) {
  if (isLoading) {
    btn.textContent = "Сохранение...";
  } else {
    btn.textContent = "Сохранить";
  }
}

export function deleteBtnLoading(btn, isLoading) {
  if (isLoading) {
    btn.textContent = "Удаление...";
  } else {
    btn.textContent = "Да";
  }
}
