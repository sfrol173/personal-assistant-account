export function viewMore(target) {
  target.parentElement.insertAdjacentHTML(
    "beforeend",
    `<div class="visit-buttons"><button class="more-information big">Зменшити</button>
                <button class="more-information" id="refactorVisit">Редагувати</button>
                <button class="more-information status">Виконано</button>
                <button class="more-information deleteVisit" id="">Видалити</button></div>`
  );
  target.parentElement.style.width = "100%";
  target.parentElement.querySelectorAll(".more").forEach((item) => {
    item.removeAttribute("hidden");
  });
  target.remove();
}

export function viewLess(target) {
  target.parentElement.parentElement.insertAdjacentHTML(
    "beforeend",
    '<button class="more-information small">Показати більше</button>'
  );
  target.parentElement.parentElement.removeAttribute("style");
  target.parentElement.parentElement
    .querySelectorAll(".more")
    .forEach((item) => {
      item.setAttribute("hidden", "");
    });
  target.parentElement.remove();
}
