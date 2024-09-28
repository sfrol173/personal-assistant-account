import VisitCardiologist from "./visitCardiologist.js";
import VisitDentist from "./visitDentist.js";

export default class Modal {
  render() {
    document.body.insertAdjacentHTML(
      "beforeend",
      `<div class="card-modal" id="add-new-card">
    <form action="" class="new-card-form">
        <label for="choose-doctor">Оберіть лікаря : <select name="choose-doctor" id="choose-doctor">
            <option value="choose">зробіть вибір</option>
            <option value="cardiologist">Кардіолог</option>
            <option value="dentist">Стоматолог</option>
            <option value="therapist">Терапевт</option>
        </select></label>

        <label for="purpose-modal">Мета візиту :</label>
        <input type="text" placeholder="Введіть текст" id="purpose-modal">

        <label for="short-description-modal">Короткий опис візиту :</label>
        <input type="text" id="short-description-modal" placeholder="Введіть текст">

        <label for="urgency-modal">Терміновість : <select name="urgency" id="urgency-modal">
            <option value="choose">зробіть вибір</option>
            <option value="high">Невідкладний</option>
            <option value="normal">Плановий</option>
            <option value="low">Консультація</option>
        </select></label>

        <label for="patient-name-modal">ПІБ :</label>
        <input type="text" id="patient-name-modal" placeholder="Введіть текст">

        <button class="sign-in" id="create-new-card">Створити візит</button>

        <button class="close-modal" id="close-modal__new-card">x</button>


    </form>
</div>`
    );

    this.addNewLinesByDoctor();
  }

  addNewLinesByDoctor() {
    document.querySelector("#choose-doctor").addEventListener("change", () => {
      let doctor = document.querySelector("#choose-doctor").value;

      if (doctor === "cardiologist") {
        this.deleteOptional();
        document.querySelector("#create-new-card").insertAdjacentHTML(
          "beforebegin",
          `<label for="pressure-modal" class="optional">Звичайний тиск :</label>
        <input type="text" id="pressure-modal" placeholder="Введіть текст" class="optional">

        <label for="mass-index-modal" class="optional">Індекс маси тіла :</label>
        <input type="text" id="mass-index-modal" placeholder="Введіть текст" class="optional">

        <label for="disease-modal" class="optional">Перенесені захворювання серцево-судинної системи :</label>
        <input type="text" id="disease-modal" placeholder="Введіть текст" class="optional">

        <label for="age-modal" class="optional">Вік :</label>
        <input type="text" id="age-modal" placeholder="Введіть текст" class="optional">`
        );
      } else if (doctor === "dentist") {
        this.deleteOptional();
        document.querySelector("#create-new-card").insertAdjacentHTML(
          "beforebegin",
          `<label for="last-date-modal" class="optional">Дата останнього відвідування :</label>
        <input type="text" id="last-visit-modal" placeholder="Введіть текст" class="optional">`
        );
      } else if (doctor === "therapist") {
        this.deleteOptional();
        document.querySelector("#create-new-card").insertAdjacentHTML(
          "beforebegin",
          `<label for="age-modal" class="optional">Вік :</label>
        <input type="text" id="age-modal" placeholder="Введіть текст" class="optional">`
        );
      } else {
        this.deleteOptional();
      }
    });
  }

  deleteOptional() {
    document.querySelectorAll(".optional").forEach((element) => {
      element.remove();
    });
  }

  closeModal() {
    document
      .querySelector("#close-modal__new-card")
      .addEventListener("click", (event) => {
        document.querySelector("#add-new-card").remove();
        event.preventDefault();
      });
  }

  addVisit() {
    const numOfVisits = document.querySelectorAll(".visit-card").length;
    const patientName = document.querySelector("#patient-name-modal").value;
    const doctor = document.querySelector("#choose-doctor").value;
    const purpose = document.querySelector("#purpose-modal").value;
    const description = document.querySelector(
      "#short-description-modal"
    ).value;
    const urgency = document.querySelector("#urgency-modal").value;
    const cardId = numOfVisits + 1;
    const status = "open";

    if (doctor === "cardiologist") {
      const pressure = document.querySelector("#pressure-modal").value;
      const massIndex = document.querySelector("#mass-index-modal").value;
      const disease = document.querySelector("#disease-modal").value;
      const age = document.querySelector("#age-modal").value;

      const isFilledFields = this.isFilledFields(
        patientName,
        purpose,
        description,
        pressure,
        massIndex,
        disease,
        age
      );
      const isSelect = this.isSelect(doctor, urgency);

      if (isFilledFields && isSelect) {
        const visit = new VisitCardiologist(
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
        visit.renderCard();
        visit.addOptionals();
        visit.sendData();
        document.querySelector("#add-new-card").remove();
      } else if (!isFilledFields) {
        alert(`Всі поля обов'язкові до заповнення`);
      } else if (!isSelect) {
        alert("Ви не обрали лікаря або терміновість");
      }
    } else if (doctor === "dentist") {
      const lastVisit = document.querySelector("#last-visit-modal").value;

      const isFilledFields = this.isFilledFields(
        patientName,
        purpose,
        description,
        lastVisit
      );
      const isSelect = this.isSelect(doctor, urgency);

      if (isFilledFields && isSelect) {
        const visit = new VisitDentist(
          lastVisit,
          patientName,
          doctor,
          purpose,
          description,
          urgency,
          cardId,
          status
        );
        visit.renderCard();
        visit.addOptionals();
        visit.sendData();
        document.querySelector("#add-new-card").remove();
      } else if (!isFilledFields) {
        alert(`Всі поля обов'язкові до заповнення`);
      } else if (!isSelect) {
        alert("Ви не обрали лікаря або терміновість");
      }
    } else if (doctor === "therapist") {
      const age = document.querySelector("#age-modal").value;

      const isFilledFields = this.isFilledFields(
        patientName,
        purpose,
        description,
        age
      );
      const isSelect = this.isSelect(doctor, urgency);

      if (isFilledFields && isSelect) {
        const visit = new VisitDentist(
          age,
          patientName,
          doctor,
          purpose,
          description,
          urgency,
          cardId,
          status
        );
        visit.renderCard();
        visit.addOptionals();
        visit.sendData();
        document.querySelector("#add-new-card").remove();
      } else if (!isFilledFields) {
        alert(`Всі поля обов'язкові до заповнення`);
      } else if (!isSelect) {
        alert("Ви не обрали лікаря або терміновість");
      }
    } else {
      alert("Оберіть до якого доктора планується візит");
    }
  }

  addVisitListener() {
    document
      .querySelector("#create-new-card")
      .addEventListener("click", (event) => {
        this.addVisit();
        event.preventDefault();
      });
  }

  isFilledFields(patientName, purpose, description, pressure, ...args) {
    let check = false;
    [...arguments].forEach((i) => {
      if (i.length === 0) {
        check = false;
        return;
      } else {
        check = true;
      }
    });
    return check;
  }

  isSelect(doctor, urgency) {
    if (doctor === "choose" || urgency === "choose") {
      return false;
    } else {
      return true;
    }
  }
}
