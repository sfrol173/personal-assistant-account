import Visit from "./visit.js";
import { sendRequest } from "../function/sendRequest.js";
import { API } from "../config/api.js";

export default class VisitTherapist extends Visit {
  constructor(age, ...args) {
    super(...args);

    this.age = age;
  }

  addOptionals() {
    document.querySelector(".more-information").insertAdjacentHTML(
      "beforebegin",
      `<p class="card-item more" hidden>Вік: <span class="age">${this.age}</span></p>
            `
    );
  }

  sendData() {
    const token = sessionStorage.getItem("token");

    sendRequest(API, "POST", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: `${this.cardId}`,
        patientName: `${this.patientName}`,
        doctor: `${this.doctor}`,
        purpose: `${this.purpose}`,
        description: `${this.description}`,
        urgency: `${this.urgency}`,
        status: `${this.status}`,
        age: `${this.age}`,
      }),
    }).then((card) => {
      let sss = card.id;
      let visits = document.querySelectorAll(".visit-card");
      let visit = visits[visits.length - 1];
      visit.removeAttribute("id");
      visit.setAttribute("id", `${sss}`);
    });
  }
}
