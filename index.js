const info = () => {
  const inputName = document.getElementById("name");
  const goodName = document.querySelector(".name-icon-good");
  const badName = document.querySelector(".name-icon-bad");
  const inputAge = document.getElementById("age");
  const goodAge = document.querySelector(".age-icon-good");
  const badAge = document.querySelector(".age-icon-bad");
  const closeBtn = document.getElementById("close");
  const resetBtn = document.getElementById("btn-reset");
  const form = document.getElementById("info");

  inputName.addEventListener("input", () => {
    graficValidation(inputName, goodName, badName);
  });

  inputAge.addEventListener("input", () => {
    graficValidation(inputAge, goodAge, badAge);
  });

  form.onsubmit = () => {
    if (!validate(inputName) || !validate(inputAge)) {
      graficValidation(inputName, goodName, badName);
      graficValidation(inputAge, goodAge, badAge);
      shakeInvalidInput(inputName);
      shakeInvalidInput(inputAge);
    } else {
      showModal(getInfo());
    }
    return false;
  };

  closeBtn.addEventListener("click", () => hideModal());

  resetBtn.addEventListener("click", () => resetIcons());
};

const graficValidation = (input, success, error) => {
  if (validate(input)) {
    error.style.display = "none";
    success.style.display = "block";
    input.classList.add("good");
  } else {
    success.style.display = "none";
    error.style.display = "block";
    input.classList.remove("good");
    input.classList.add("wrong");
  }
};

const validate = (input) => {
  const temp = input.value === null ? "" : input.value.trim();
  if (input.id === "age") {
    return isFinite(temp) && !!temp && temp > 0;
  }
  return !!temp && !/[^a-z\s]/gi.test(temp);
};

const showModal = (arr) => {
  const div = document.createElement("DIV");
  div.className = "cover";
  document.body.append(div);
  document.body.style.overflowY = "hidden";

  document.getElementById("modal").style.display = "block";

  const infoList = document.querySelector(".info-list");
  arr.forEach((obj) => {
    infoList.innerHTML += `<li class="info-item">${obj.title}: ${obj.value}</li>`;
  });
};

const hideModal = () => {
  document.querySelector(".cover").remove();
  document.body.style.overflowY = "auto";

  document.getElementById("modal").style.display = "none";

  const infoItem = [...document.querySelectorAll(".info-item")];
  infoItem.map((el) => el.remove());
};

const getInfo = () => {
  const inputList = [
    ...document.querySelectorAll(".inp-item, input[name=gender]:checked"),
  ];
  let res = [];

  inputList.forEach((el) => {
    switch (el.type) {
      case "radio":
        res.push({ title: el.name, value: el.id });
        break;
      case "date":
        res.push({
          title: el.id,
          value: el.value.split("-").reverse().join("."),
        });
        break;
      default:
        res.push({ title: el.id, value: el.value });
    }
  });

  return res;
};

const shakeInvalidInput = (input) => {
  if (!validate(input)) {
    input.classList.add("shake-horizontal", "shake-constant");
    setTimeout(() => {
      input.classList.remove("shake-horizontal", "shake-constant");
    }, 150);
  }
};

const resetIcons = () => {
  const inputName = document.getElementById("name");
  const inputAge = document.getElementById("age");

  inputName.classList.remove("good");
  inputName.classList.remove("wrong");
  inputAge.classList.remove("good");
  inputAge.classList.remove("wrong");

  document.querySelector(".age-icon-good").style.display = "none";
  document.querySelector(".age-icon-bad").style.display = "none";
  document.querySelector(".name-icon-good").style.display = "none";
  document.querySelector(".name-icon-bad").style.display = "none";
};

info();
