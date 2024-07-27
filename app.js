class PasswordGenerator {
  constructor() {
    // Initialize elements from the DOM and assign them to this.elements
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
    };

    // Define character code ranges for different character types
    this.CHAR_CODES = {
      UPPERCASE: this.arrayFromLowToHigh(65, 90), // A-Z
      LOWERCASE: this.arrayFromLowToHigh(97, 122), // a-z
      NUMBER: this.arrayFromLowToHigh(48, 57), // 0-9
      SYMBOL: [
        ...this.arrayFromLowToHigh(33, 47), // Symbols ! to /
        ...this.arrayFromLowToHigh(58, 64), // Symbols : to @
        ...this.arrayFromLowToHigh(91, 96), // Symbols [ to `
        ...this.arrayFromLowToHigh(123, 126), // Symbols { to ~
      ],
    };

    // Bind event listeners to DOM elements
    this.bindEvents();
    // Update password display on initial load
    window.addEventListener("load", () => this.updatePassword());
  }

  // Bind various event listeners to their respective handlers
  bindEvents() {
    const {
      characterAmountNumber,
      characterAmountRange,
      form,
      copyButton,
      svgButton,
    } = this.elements;

    characterAmountNumber.addEventListener("input", this.syncCharacterAmount);
    characterAmountRange.addEventListener("input", this.syncCharacterAmount);
    form.addEventListener("submit", this.handleFormSubmit);
    copyButton.addEventListener("click", this.handleCopyButtonClick);
    svgButton.addEventListener("click", this.handleSvgButtonClick);
  }

  // Update displayed password whenever the form input changes
  updatePassword = () => {
    const {
      characterAmountNumber,
      includeUppercase,
      includeNumbers,
      includeSymbols,
      passwordDisplay,
    } = this.elements;
    const characterAmount = characterAmountNumber.value;
    const password = this.generatePassword(
      characterAmount,
      includeUppercase.checked,
      includeNumbers.checked,
      includeSymbols.checked
    );
    passwordDisplay.innerText = password;
  };

  // Handle form submission, prevent default form behavior, and update password
  handleFormSubmit = (e) => {
    e.preventDefault();
    this.updatePassword();
    this.handleResetButton();
  };

  // Generate a password based on selected options
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

  // Utility function to create an array of numbers within a specified range
  arrayFromLowToHigh = (low, high) =>
    Array.from({ length: high - low + 1 }, (_, i) => low + i);

  // Sync input range and number fields to have the same value
  syncCharacterAmount = (e) => {
    const { value } = e.target;
    this.elements.characterAmountNumber.value = value;
    this.elements.characterAmountRange.value = value;
  };

  // Handle copy button click event, copy password to clipboard, and display message
  handleCopyButtonClick = () => {
    const { passwordDisplay, copyButton } = this.elements;
    this.copyToClipboard(passwordDisplay.innerText);
    copyButton.innerText = "Password copied to clipboard";
    copyButton.classList.add("text-copied-btn");

    // Reset copy button text and class after 5 seconds
    setTimeout(this.handleResetButton, 5000);
  };

  // Reset copy button text and class
  handleResetButton = () => {
    const { copyButton } = this.elements;
    copyButton.innerText = "Copy to Clipboard";
    copyButton.classList.remove("text-copied-btn");
  };

  // Handle SVG button click event to reload the page
  handleSvgButtonClick = () => {
    window.location.reload();
  };

  // Copy text to clipboard using the Clipboard API
  copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {},
      (err) => console.error("Could not copy text: ", err)
    );
  };
}

// Instantiate the PasswordGenerator class when the page loads
const passwordGenerator = new PasswordGenerator();
