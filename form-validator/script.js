const mainForm = document.querySelector("#main-form");
const userName = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("repeatPassword");
function showError(input, message) {
  const formItem = input.parentElement;
  formItem.className = "form-item error";
  const small = formItem.querySelector("small");
  small.innerText = message;
}
function showSuccess(input) {
  const formItem = input.parentElement;
  formItem.className = "form-item success";
}
function checkRequired(dataInput) {
  dataInput.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} charecters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} charecters`
    );
  } else {
    showSuccess(input);
  }
}
function checkEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // return re.test(String(email).toLowerCase());
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "passwords do not match");
  } else {
    showSuccess(input2);
  }
}

mainForm.addEventListener("submit", (e) => {
  e.preventDefault();
  checkRequired([userName], [email], [password], [password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});
