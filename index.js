const info = () => {
  const inputName = document.getElementById("name");
  const goodName = document.querySelector(".name-icon-good");
  const badName = document.querySelector(".name-icon-bad");
  inputName.addEventListener("input", () => {
    if (validate(inputName.value)) {
      badName.style.display = "none";
      goodName.style.display = "block";
      inputName.classList.add("good");
    } else {
      goodName.style.display = "none";
      badName.style.display = "block";
      inputName.classList.remove("good");
      inputName.classList.add("wrong");
    }
  });

  const inputAge = document.getElementById("age");
  const goodAge = document.querySelector(".age-icon-good");
  const badAge = document.querySelector(".age-icon-bad");
  inputAge.addEventListener("input", () => {
    if (validate(inputAge.value, true)) {
      badAge.style.display = "none";
      goodAge.style.display = "block";
      inputAge.classList.add("good");
    } else {
      goodAge.style.display = "none";
      badAge.style.display = "block";
      inputAge.classList.remove("good");
      inputAge.classList.add("wrong");
    }
  });

  const form = document.getElementById("info");
  form.onsubmit = () => {
    return false;
  };

  const submitBtn = document.getElementById("btn-submit");
  submitBtn.addEventListener("click", () => {
    showModal();
  });

  const closeBtn = document.getElementById("close");
  closeBtn.addEventListener("click", () => {
    hideModal();
  });
};

const validate = (data, flag) => {
  const temp = data === null ? "" : data.trim();
  if (flag) {
    return isFinite(temp) && !!temp && temp > 0;
  }
  return !!temp && !/[^a-z\s]/gi.test(temp);
};

const showModal = () => {
  const div = document.createElement("DIV");
  div.className = "cover";
  document.body.append(div);
  document.body.style.overflowY = "hidden";

  document.getElementById("modal").style.display = "block";
};

const hideModal = () => {
  document.querySelector(".cover").remove();
  document.body.style.overflowY = "auto";

  document.getElementById("modal").style.display = "none";
};

info();

// 1. Сделать функцию для показа модалки +
// 2. Добавить событие на сабмит
// 3. событие на ресет
