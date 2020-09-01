const info = () => {
  const inputName = document.getElementById("name");
  const goodName = document.querySelector(".name-icon-good");
  const badName = document.querySelector(".name-icon-bad");
  inputName.addEventListener("input", () => {
    graficValidation(inputName, goodName, badName);
  });

  const inputAge = document.getElementById("age");
  const goodAge = document.querySelector(".age-icon-good");
  const badAge = document.querySelector(".age-icon-bad");
  inputAge.addEventListener("input", () => {
    graficValidation(inputAge, goodAge, badAge);
  });

  const form = document.getElementById("info");
  form.onsubmit = () => {
    if (!validate(inputName) || !validate(inputAge)) {
      alert("invalid input!!!");
    } else {
      showModal(getInfo());
    }
    return false;
  };

  const closeBtn = document.getElementById("close");
  closeBtn.addEventListener("click", () => {
    hideModal();
  });

  const resetBtn = document.getElementById("btn-reset");
  resetBtn.addEventListener("click", () => {
    resetIcons();
  });
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

  const infoArr = [...document.querySelectorAll(".info-item")];
  infoArr[0].innerHTML = `Name: ${arr[0]}`;
  infoArr[1].innerHTML = `Age: ${arr[1]}`;
  infoArr[2].innerHTML = `Birthday: ${arr[2]}`;
  infoArr[3].innerHTML = `Education: ${arr[3]}`;
  infoArr[4].innerHTML = `Gender: ${arr[4]}`;
};

const hideModal = () => {
  document.querySelector(".cover").remove();
  document.body.style.overflowY = "auto";

  document.getElementById("modal").style.display = "none";
};

const getInfo = () => {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const birthday = document
    .getElementById("birthday")
    .value.split("-")
    .reverse()
    .join(".");
  let education;
  switch (document.getElementById("education").value) {
    case "1":
      education = "higher";
      break;
    case "2":
      education = "secondary";
      break;
    case "3":
      education = "without education";
      break;
  }
  const gender = document.getElementById("male").checked ? "male" : "female";

  return [name, age, birthday, education, gender];
};

const resetIcons = () => {
  document.querySelector(".age-icon-good").style.display = "none";
  document.querySelector(".age-icon-bad").style.display = "none";
  document.querySelector(".name-icon-good").style.display = "none";
  document.querySelector(".name-icon-bad").style.display = "none";
  const inputName = document.getElementById("name");
  inputName.classList.remove("good");
  inputName.classList.remove("wrong");
  const inputAge = document.getElementById("age");
  inputAge.classList.remove("good");
  inputAge.classList.remove("wrong");
};

info();
