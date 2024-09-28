import { sendRequest } from "../function/sendRequest.js";
import { API } from "../config/api.js";

export default class Visit {
  constructor(
    patientName,
    doctor,
    purpose,
    description,
    urgency,
    cardId,
    status
  ) {
    this.patientName = patientName;
    this.doctor = doctor;
    this.purpose = purpose;
    this.description = description;
    this.urgency = urgency;
    this.cardId = cardId;
    this.status = status;
  }

  renderCard() {
    const container = document.querySelector(".visits-container");

    let inUkrainianUrgency = "";

    container.insertAdjacentHTML(
      "beforeend",
      `<li class="visit-card ${this.status}" id="${this.cardId}" status="${
        this.status
      }">
            <p class="card-item">Паціент: <span class="patient-name">${
              this.patientName
            }</span></p>
            <p class="card-item">Доктор: <span class="doctor" inOption="${
              this.doctor
            }">${this.inUkrainianDoctor()}</span></p>
            <p class="card-item more" hidden>Мета візиту: <span class="purpose">${
              this.purpose
            }</span></p>
            <p class="card-item more" hidden>Короткий опис: <span class="description">${
              this.description
            }</span></p>
            <p class="card-item more" hidden>Терміновість: <span class="urgency" inOption="${
              this.urgency
            }">${this.inUkrainianUrgency()}</span></p>
            <button class="more-information small">Показати більше</button>
        </li>`
    );
  }

  inUkrainianDoctor() {
    if (this.doctor === "cardiologist") {
      return "Кардіолог";
    } else if (this.doctor === "dentist") {
      return "Стоматолог";
    } else if (this.doctor === "therapist") {
      return "Терапевт";
    }
  }

  inUkrainianUrgency() {
    if (this.urgency === "high") {
      return "Невідкладний";
    } else if (this.urgency === "normal") {
      return "Плановий";
    } else if (this.urgency === "low") {
      return "Консультація";
    }
  }

  deleteVisit(target) {
    const visitId = +target.parentElement.parentElement.id;
    const token = sessionStorage.getItem("token");
    confirm("Ви дійсно бажаєте видалити візит?");

    target.parentElement.parentElement.remove();

    sendRequest(`${API}/${visitId}`, "DELETE", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => {
      console.log(data);
    });
  }
}
