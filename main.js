import { viewMore, viewLess } from "./js/function/viewMoreLess.js";
import Authorization from "./js/modules/authorization.js";
import Modal from "./js/modules/modal.js";
import Visit from "./js/modules/visit.js";


window.addEventListener("click", (event) => {
  const target = event.target;

  if (!target.closest("button")) {
    return;
  } else if (target.id === "button-sign-in") {
    const authorization = new Authorization();
    authorization.renderModal();

    authorization.enterUser();
    authorization.deleteModal();
  } else if (target.classList.contains("modal__sign-in__close")) {
    event.preventDefault();
  } else if (target.id === "enterUser") {
    event.preventDefault();
  } else if (target.id === "button__new-card") {
    const modal = new Modal();
    modal.render();
    modal.closeModal();
    modal.addVisitListener();
  } else if (target.id === "create-new-card") {
    event.preventDefault();
  } else if (target.classList.contains("small")) {
    viewMore(target);
  } else if (target.classList.contains("big")) {
    viewLess(target);
  } else if (target.classList.contains("deleteVisit")) {
    const visit = new Visit();
    visit.deleteVisit(target);
  }
});
