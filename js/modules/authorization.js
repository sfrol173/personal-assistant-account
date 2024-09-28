import {
  sendRequestAutorisation,
  sendRequest,
} from "../function/sendRequest.js";
import { API } from "../config/api.js";
import Visit from "./visit.js";
import VisitCardiologist from "./visitCardiologist.js";
import VisitDentist from "./visitDentist.js";
import VisitTherapist from "./visitTherapist.js";

export default class Authorization {
  renderModal() {
    document.body.insertAdjacentHTML(
      "beforebegin",
      `<div class="sign-in__modal">
    <form class="sign-in__form">
        <label for="login">Логін</label>
        <input type="email" placeholder="Логін (email)" id="login">
        <label for="password">Пароль</label>
        <input type="password" placeholder="Пароль" id="password">
        <button class="sign-in" id="enterUser">Вхід</button>
        <button class="close modal__sign-in__close">x</button>
    </form>
</div>`
    );

    document.querySelector("#button-sign-in").setAttribute("disabled", "");
  }

  signIn() {
    if (this.verificationLogin() && this.verificationPassword()) {
      const login = document.querySelector("#login").value;
      const password = document.querySelector("#password").value;

      sendRequestAutorisation(
        `${API}/login`,
        "POST",

        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: `${login}`, password: `${password}` }),
        }
      ).then((token) => {
        if (!token) {
          alert("Такого юзера не існує");
        } else {
          sessionStorage.setItem("token", token);

          document.querySelector(".sign-in__modal").remove();
          document.querySelector("#button-sign-in").remove();
          document
            .querySelector("header")
            .insertAdjacentHTML(
              "beforeend",
              '<button class="sign-in" id="button__new-card">Створити візит</button>'
            );
          this.getVisits(token);
        }
      });
    } else {
      return alert("Невірний формат логіна або пароля");
    }
  }

  verificationLogin() {
    const login = document.querySelector("#login").value;
    const regexp = /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/;

    if (regexp.exec(login)) {
      return true;
    } else {
      alert("Ви ввели невірний логін");
      return false;
    }
  }

  verificationPassword() {
    const password = document.querySelector("#password").value;
    const regexp = /[A-Za-z0-9-]+/;

    if (regexp.exec(password)) {
      return true;
    } else {
      alert("Ви ввели невірний пароль");
      return false;
    }
  }

  enterUser() {
    document.querySelector("#enterUser").addEventListener("click", (event) => {
      this.signIn();
      event.preventDefault();
    });
  }

  deleteModal() {
    document
      .querySelector(".modal__sign-in__close")
      .addEventListener("click", (event) => {
        document.querySelector(".sign-in__modal").remove();
        event.preventDefault();
      });
  }

  getVisits(token) {
    sendRequest(API, "GET", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((visits) => {
      let arrOfVisits = [...visits];

      if (arrOfVisits.length > 0) {
        document.querySelector(".no-cards").setAttribute("hidden", "");
      }
      console.log(arrOfVisits);
      const form = document.forms[0];
      const visitsContainer = document.querySelector(".visits-container");

      const textArea = document.querySelector("#search");

      textArea.addEventListener("keyup", () => {
        const filter = textArea.value.toUpperCase();
        const visitorCard = document.querySelectorAll(".visit-card");
        for (let i = 0; i < visitorCard.length; i++) {
          const visitorName = document.getElementsByClassName("patient-name");
          const textValue = visitorName[i].textContent;
          if (textValue.toUpperCase().indexOf(filter) > -1) {
            visitorCard[i].style.display = "";
          } else {
            visitorCard[i].style.display = "none";
          }
        }
      });

      form.addEventListener("change", (e) => {
        e.preventDefault();

        const status = document.querySelector("#by-status").value;
        const urgency = document.querySelector("#by-urgency").value;
        arrOfVisits.splice(0);

        console.log(arrOfVisits);

        visits.forEach((visit) => {
          if (status == visit.status && urgency == visit.urgency) {
            arrOfVisits.push(visit);
          }
          if (status == "all" && urgency == visit.urgency) {
            arrOfVisits.push(visit);
          }
          if (status == visit.status && urgency == "all") {
            arrOfVisits.push(visit);
          }
          if (status == "all" && urgency == "all") {
            arrOfVisits.push(visit);
          }
        });
        visitsContainer.innerHTML = "";
        addVisits(arrOfVisits);
      });

      function addVisits(arr) {
        arr.forEach(async (visit) => {
          if (visit.doctor === "cardiologist") {
            const {
              id: cardId,
              patientName,
              doctor,
              purpose,
              description,
              urgency,
              status,
              pressure,
              massIndex,
              disease,
              age,
            } = visit;

            const newVisit = new VisitCardiologist(
              pressure,
              massIndex,
              disease,
              age,
              patientName,
              doctor,
              purpose,
              description,
              urgency,
              cardId,
              status
            );
            newVisit.renderCard();
            newVisit.addOptionals();
          } else if (visit.doctor === "dentist") {
            const {
              id: cardId,
              patientName,
              doctor,
              purpose,
              description,
              urgency,
              status,
              lastVisit,
            } = visit;

            const newVisit = new VisitDentist(
              lastVisit,
              patientName,
              doctor,
              purpose,
              description,
              urgency,
              cardId,
              status
            );
            newVisit.renderCard();
            newVisit.addOptionals();
          } else if (visit.doctor === "therapist") {
            const {
              id: cardId,
              patientName,
              doctor,
              purpose,
              description,
              urgency,
              status,
              age,
            } = visit;

            const newVisit = new VisitTherapist(
              age,
              patientName,
              doctor,
              purpose,
              description,
              urgency,
              cardId,
              status
            );
            newVisit.renderCard();
            newVisit.addOptionals();
          }
        });
      }
      addVisits(arrOfVisits);
    });
  }
}
