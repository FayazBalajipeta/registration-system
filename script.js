const disposableDomains = ["tempmail.com", "mailinator.com", "10minutemail.com"];

const countryData = {
  India: {
    Telangana: ["Hyderabad", "Warangal"],
    Karnataka: ["Bangalore", "Mysore"]
  },
  USA: {
    California: ["Los Angeles", "San Francisco"],
    Texas: ["Dallas", "Austin"]
  }
};

const form = document.getElementById("regForm");
const submitBtn = document.getElementById("submitBtn");
const successMsg = document.getElementById("successMsg");
const formError = document.getElementById("formError");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const country = document.getElementById("country");
const state = document.getElementById("state");
const city = document.getElementById("city");
const terms = document.getElementById("terms");
const strength = document.getElementById("strength");

/* INIT COUNTRIES */
Object.keys(countryData).forEach(c => {
  country.innerHTML += `<option value="${c}">${c}</option>`;
});

/* COUNTRY → STATE */
country.addEventListener("change", () => {
  state.innerHTML = `<option value="">Select State *</option>`;
  city.innerHTML = `<option value="">Select City *</option>`;
  state.disabled = !country.value;
  city.disabled = true;

  if (!country.value) return;

  Object.keys(countryData[country.value]).forEach(s => {
    state.innerHTML += `<option value="${s}">${s}</option>`;
  });
});

/* STATE → CITY */
state.addEventListener("change", () => {
  city.innerHTML = `<option value="">Select City *</option>`;
  city.disabled = !state.value;

  if (!state.value) return;

  countryData[country.value][state.value].forEach(ct => {
    city.innerHTML += `<option value="${ct}">${ct}</option>`;
  });
});

/* PASSWORD STRENGTH */
password.addEventListener("input", () => {
  const val = password.value;
  if (val.length < 6) {
    strength.textContent = "Weak";
    strength.style.color = "red";
  } else if (/[A-Z]/.test(val) && /\d/.test(val)) {
    strength.textContent = "Strong";
    strength.style.color = "green";
  } else {
    strength.textContent = "Medium";
    strength.style.color = "orange";
  }
});

/* VALIDATION */
form.addEventListener("input", validateForm);

function validateForm() {
  let valid = true;
  formError.style.display = "none";

  if (!firstName.value.trim()) valid = false;
  if (!lastName.value.trim()) valid = false;
  if (!email.value.trim()) valid = false;
  if (disposableDomains.some(d => email.value.includes(d))) valid = false;
  if (!phone.value.trim()) valid = false;
  if (!document.querySelector('input[name="gender"]:checked')) valid = false;
  if (!country.value || !state.value || !city.value) valid = false;
  if (!password.value || password.value !== confirmPassword.value) valid = false;
  if (!terms.checked) valid = false;

  submitBtn.disabled = !valid;
}

/* SUBMIT */
form.addEventListener("submit", e => {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  setTimeout(() => {
    successMsg.textContent = "🎉 Registration Successful!";
    successMsg.className = "success";
    form.reset();
    submitBtn.textContent = "Register";
  }, 800);
});
