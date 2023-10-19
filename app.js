class PasswordGenerator {
  constructor() {
    this.characterAmountRange = document.getElementById("characterAmountRange");
    this.characterAmountNumber = document.getElementById(
      "characterAmountNumber"
    );
    this.includeUppercaseElement = document.getElementById("includeUppercase");
    this.includeNumbersElement = document.getElementById("includeNumbers");
    this.includeSymbolsElement = document.getElementById("includeSymbols");
    this.form = document.getElementById("passwordGeneratorForm");
    this.passwordDisplay = document.getElementById("passwordDisplay");
    this.passwordInput = document.getElementById("passwordInput");
    this.copyButton = document.getElementById("copyButton");
    this.svgButton = document.getElementById("svg-button");

    this.UPPERCASE_CHAR_CODES = this.arrayFromLowToHigh(65, 90);
    this.LOWERCASE_CHAR_CODES = this.arrayFromLowToHigh(97, 122);
    this.NUMBER_CHAR_CODES = this.arrayFromLowToHigh(48, 57);
    this.SYMBOL_CHAR_CODES = this.arrayFromLowToHigh(33, 47)
      .concat(this.arrayFromLowToHigh(58, 64))
      .concat(this.arrayFromLowToHigh(91, 96))
      .concat(this.arrayFromLowToHigh(123, 126));

    this.characterAmountNumber.addEventListener(
      "input",
      this.syncCharacterAmount.bind(this)
    );
    this.characterAmountRange.addEventListener(
      "input",
      this.syncCharacterAmount.bind(this)
    );
    this.form.addEventListener("submit", this.handleFormSubmit.bind(this));
    this.copyButton.addEventListener(
      "click",
      this.handleCopyButtonClick.bind(this)
    );
    this.svgButton.addEventListener(
      "click",
      this.handleSvgButtonClick.bind(this)
    );
    window.addEventListener("load", this.updatePassword.bind(this));
  }

  updatePassword() {
    const characterAmount = this.characterAmountNumber.value;
    const includeUppercase = this.includeUppercaseElement.checked;
    const includeNumbers = this.includeNumbersElement.checked;
    const includeSymbols = this.includeSymbolsElement.checked;
    const password = this.generatePassword(
      characterAmount,
      includeUppercase,
      includeNumbers,
      includeSymbols
    );
    this.passwordDisplay.innerText = password;
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.updatePassword();
  }

  generatePassword(
    characterAmount,
    includeUppercase,
    includeNumbers,
    includeSymbols
  ) {
    let charCodes = this.LOWERCASE_CHAR_CODES;
    if (includeUppercase)
      charCodes = charCodes.concat(this.UPPERCASE_CHAR_CODES);
    if (includeSymbols) charCodes = charCodes.concat(this.SYMBOL_CHAR_CODES);
    if (includeNumbers) charCodes = charCodes.concat(this.NUMBER_CHAR_CODES);

    const passwordCharacters = [];
    for (let i = 0; i < characterAmount; i++) {
      const characterCode =
        charCodes[Math.floor(Math.random() * charCodes.length)];
      passwordCharacters.push(String.fromCharCode(characterCode));
    }
    return passwordCharacters.join("");
  }

  arrayFromLowToHigh(low, high) {
    const array = [];
    for (let i = low; i <= high; i++) {
      array.push(i);
    }
    return array;
  }

  syncCharacterAmount(e) {
    const value = e.target.value;
    this.characterAmountNumber.value = value;
    this.characterAmountRange.value = value;
  }

  handleCopyButtonClick() {
    this.copyToClipboard(this.passwordDisplay.innerText);
    this.copyButton.innerText = "Password copied to clipboard";
    this.copyButton.classList.add("text-copied-btn");
  }

  handleSvgButtonClick() {
    window.location.reload();
  }

  copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(
      function () {
        return;
      },
      function (err) {
        console.error("Could not copy text: ", err);
      }
    );
  }
}

const passwordGenerator = new PasswordGenerator();
