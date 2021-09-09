const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const submit = document.getElementById("submit");
const message = document.getElementById("message");

submit?.addEventListener("click", async (e) => {
  e.preventDefault();

  if (!password.value || !confirmPassword.value) {
    message.innerText = "Please fill information!";
    return;
  }

  if (password.value !== confirmPassword.value) {
    message.innerText = "Password and confirm password do not match!";
    return;
  }

  fetch("http://localhost:9000/api/change-password", {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      password,
      confirmPassword,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});
