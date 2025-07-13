// app.js
class PasswordGenerator {
  constructor() {
    this.elements = {
      characterAmountRange: document.getElementById("characterAmountRange"),
      characterAmountNumber: document.getElementById("characterAmountNumber"),
      includeUppercase: document.getElementById("includeUppercase"),
      includeNumbers: document.getElementById("includeNumbers"),
      includeSymbols: document.getElementById("includeSymbols"),
      form: document.getElementById("passwordGeneratorForm"),
      passwordDisplay: document.getElementById("passwordDisplay"),
      copyButton: document.getElementById("copyButton"),
      svgButton: document.getElementById("svg-button"),
      lengthValue: document.getElementById("lengthValue"),
    };

    this.CHAR_CODES = {
      UPPERCASE: this.arrayFromLowToHigh(65, 90),
      LOWERCASE: this.arrayFromLowToHigh(97, 122),
      NUMBER: this.arrayFromLowToHigh(48, 57),
      SYMBOL: [
        ...this.arrayFromLowToHigh(33, 47),
        ...this.arrayFromLowToHigh(58, 64),
        ...this.arrayFromLowToHigh(91, 96),
        ...this.arrayFromLowToHigh(123, 126),
      ],
    };

    this.bindEvents();
    window.addEventListener("load", () => this.updatePassword());
  }

  bindEvents() {
    const { characterAmountRange, form, copyButton, svgButton } = this.elements;

    characterAmountRange.addEventListener("input", this.syncCharacterAmount);
    form.addEventListener("submit", this.handleFormSubmit);
    copyButton.addEventListener("click", this.handleCopyButtonClick);
    svgButton.addEventListener("click", this.handleSvgButtonClick);
  }

  updatePassword = () => {
    const {
      characterAmountRange,
      includeUppercase,
      includeNumbers,
      includeSymbols,
      passwordDisplay,
    } = this.elements;
    const characterAmount = characterAmountRange.value;
    const password = this.generatePassword(
      characterAmount,
      includeUppercase.checked,
      includeNumbers.checked,
      includeSymbols.checked
    );
    passwordDisplay.innerText = password;
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.updatePassword();
  };

  generatePassword = (
    characterAmount,
    includeUppercase,
    includeNumbers,
    includeSymbols
  ) => {
    const charCodes = [
      ...this.CHAR_CODES.LOWERCASE,
      ...(includeUppercase ? this.CHAR_CODES.UPPERCASE : []),
      ...(includeSymbols ? this.CHAR_CODES.SYMBOL : []),
      ...(includeNumbers ? this.CHAR_CODES.NUMBER : []),
    ];

    return Array.from({ length: characterAmount }, () => {
      const characterCode =
        charCodes[Math.floor(Math.random() * charCodes.length)];
      return String.fromCharCode(characterCode);
    }).join("");
  };

  arrayFromLowToHigh = (low, high) =>
    Array.from({ length: high - low + 1 }, (_, i) => low + i);

  syncCharacterAmount = (e) => {
    const { value } = e.target;
    this.elements.lengthValue.textContent = value;
    this.updatePassword();
  };

  handleCopyButtonClick = () => {
    const { passwordDisplay, copyButton } = this.elements;
    this.copyToClipboard(passwordDisplay.innerText);

    const originalText = copyButton.innerHTML;
    copyButton.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/></svg> Copied!';

    setTimeout(() => {
      copyButton.innerHTML = originalText;
    }, 2000);
  };

  handleSvgButtonClick = () => {
    this.updatePassword();
  };

  copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {},
      (err) => console.error("Could not copy text: ", err)
    );
  };
}

const passwordGenerator = new PasswordGenerator();
