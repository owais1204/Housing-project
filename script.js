// LOGIN / SIGNUP
function signup() {
  if (!username.value || !password.value) {
    alert("All fields required");
    return;
  }
  localStorage.setItem(username.value, JSON.stringify({
    user: username.value,
    pass: password.value,
    role: role.value
  }));
  alert("Signup successful. Please login.");
}

function login() {
  const data = JSON.parse(localStorage.getItem(username.value));
  if (!data || data.pass !== password.value || data.role !== role.value) {
    alert("Invalid credentials");
    return;
  }
  sessionStorage.setItem("user", data.user);
  sessionStorage.setItem("role", data.role);
  loadApp();
}

function logout() {
  sessionStorage.clear();
  location.reload();
}

// LOAD APP
function loadApp() {
  loginPage.classList.add("hidden");
  app.classList.remove("hidden");

  if (sessionStorage.getItem("role") === "admin") {
    userPanel.classList.add("hidden");
    adminPanel.classList.remove("hidden");
  }
}

if (sessionStorage.getItem("user")) loadApp();

// RECOMMENDATIONS
const ideas = {
  1: ["LED Lighting", "Wall Painting", "Balcony Setup"],
  2: ["Modular Kitchen", "False Ceiling", "Bathroom Upgrade"],
  3: ["Smart Home System", "Solar Panels", "Flooring Upgrade"]
};

propertyForm.addEventListener("submit", e => {
  e.preventDefault();
  results.innerHTML = "";

  let s = +size.value;
  let b = budget.value;
  score.innerText = Math.min(100, Math.floor(s / 10) + b * 10) + " / 100";

  ideas[b].forEach(i => {
    let d = document.createElement("div");
    d.className = "box";
    d.innerHTML = `<h4>${i}</h4>
      <button onclick="saveIdea('${i}')">Save</button>`;
    results.appendChild(d);
  });
});

// SAVE IDEAS
function saveIdea(i) {
  let saved = JSON.parse(localStorage.getItem("saved")) || [];
  saved.push(i);
  localStorage.setItem("saved", JSON.stringify(saved));
  showSaved();
}

function showSaved() {
  savedList.innerHTML = "";
  (JSON.parse(localStorage.getItem("saved")) || [])
    .forEach(i => savedList.innerHTML += `<li>${i}</li>`);
}
showSaved();