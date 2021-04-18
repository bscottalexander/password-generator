const generatePasswordButton = document.getElementById(
  "generate-password-button"
);
const dialog = new mdc.dialog.MDCDialog(document.querySelector(".mdc-dialog"));
const slider = new mdc.slider.MDCSlider(document.querySelector(".mdc-slider"));
const uppercaseSwitch = new mdc.switchControl.MDCSwitch(
  document.getElementById("uppercase-switch")
);
const lowercaseSwitch = new mdc.switchControl.MDCSwitch(
  document.getElementById("lowercase-switch")
);
const digitsSwitch = new mdc.switchControl.MDCSwitch(
  document.getElementById("digits-switch")
);
const symbolsSwitch = new mdc.switchControl.MDCSwitch(
  document.getElementById("symbols-switch")
);
const passwordLengthLabel = document.getElementById("password-length-label");
const passwordResult = document.getElementById("password-result");
const okButton = document.getElementById("ok-button");
let numSwitchesEnabled = 0;

function generatePassword(length, hasUpper, hasLower, hasDigits, hasSymbols) {
  const options = {
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lower: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase(),
    numeric: "0123456789",
    symbols: " !\"#$%&()*+,-./:;<>=?@[]^_`{|}~'\\",
  };
  const password = [];
  const charset = [];

  if (hasUpper) {
    password.push(
      options.upper.charAt(Math.floor(Math.random() * options.upper.length))
    );
    Array.prototype.push.apply(charset, options.upper.split(""));
  }
  if (hasLower) {
    password.push(
      options.lower.charAt(Math.floor(Math.random() * options.lower.length))
    );
    Array.prototype.push.apply(charset, options.lower.split(""));
  }
  if (hasDigits) {
    password.push(
      options.numeric.charAt(Math.floor(Math.random() * options.numeric.length))
    );
    Array.prototype.push.apply(charset, options.numeric.split(""));
  }
  if (hasSymbols) {
    password.push(
      options.symbols.charAt(Math.floor(Math.random() * options.symbols.length))
    );
    Array.prototype.push.apply(charset, options.symbols.split(""));
  }

  const passwordLength = length - password.length;
  for (let index = 0; index < passwordLength; index++) {
    password.push(charset[Math.floor(Math.random() * charset.length)]);
  }
  return password.join("");
}

function onDialogClosing(event) {
  if (event.detail.action === "accept") {
    const newPassword = generatePassword(
      slider.getValue(),
      uppercaseSwitch.checked,
      lowercaseSwitch.checked,
      digitsSwitch.checked,
      symbolsSwitch.checked
    );
    passwordResult.innerHTML = "";
    passwordResult.appendChild(document.createTextNode(newPassword));
  }
  slider.setValue(8);
  passwordLengthLabel.innerHTML = 8;
  uppercaseSwitch.checked = false;
  lowercaseSwitch.checked = false;
  digitsSwitch.checked = false;
  symbolsSwitch.checked = false;
  okButton.disabled = true;
}

function onPasswordLengthChange(event) {
  passwordLengthLabel.innerHTML = event.detail.value;
  slider.layout();
}

function onDialogOpened() {
  slider.layout();
}

function onGeneratePasswordClick() {
  dialog.open();
}

function onSwitchUpdate(event) {
    if (event.target.checked) {
        numSwitchesEnabled++;
    } else {
        numSwitchesEnabled--;
    }
    if (numSwitchesEnabled > 0) {
        okButton.disabled = false;
    } else {
        okButton.disabled = true;
    }
}

function initGeneratePasswordButton() {
  mdc.ripple.MDCRipple.attachTo(generatePasswordButton);
  generatePasswordButton.addEventListener("click", onGeneratePasswordClick);
}

function initDialog() {
  dialog.listen("MDCDialog:opened", onDialogOpened);
  dialog.listen("MDCDialog:closing", onDialogClosing);
  slider.listen("MDCSlider:change", onPasswordLengthChange);
  uppercaseSwitch.listen("change", onSwitchUpdate);
  lowercaseSwitch.listen("change", onSwitchUpdate);
  digitsSwitch.listen("change", onSwitchUpdate);
  symbolsSwitch.listen("change", onSwitchUpdate);
}

function initMDC() {
  initGeneratePasswordButton();
  initDialog();
}

function main() {
  initMDC();
}
