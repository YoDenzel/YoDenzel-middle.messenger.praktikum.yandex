const clearInputError = (target: HTMLElement) => {
  target.classList.remove("error");
  const existingError = target.parentElement?.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }
};

const createErrorMessage = (message: string): HTMLDivElement => {
  const errorMessage = document.createElement("div");
  errorMessage.className = "error-message";
  errorMessage.style.color = "red";
  errorMessage.style.fontSize = "12px";
  errorMessage.style.marginTop = "4px";
  errorMessage.textContent = message;
  return errorMessage;
};

const addErrorMessage = (target: HTMLInputElement, message: string) => {
  clearInputError(target);
  target.classList.add("error");
  const errorMessage = createErrorMessage(message);
  target.parentElement?.insertBefore(errorMessage, target.nextSibling);
};

const validateLogin = (value: string, target: HTMLInputElement): void => {
  const loginRegex = /^[a-zA-Z][a-zA-Z0-9_-]*[a-zA-Z0-9]$|^[a-zA-Z0-9][a-zA-Z0-9_-]*[a-zA-Z]$/;
  const isValidLength = value.length >= 3 && value.length <= 20;
  const containsOnlyNumbers = /^\d+$/.test(value);
  const hasValidCharacters = loginRegex.test(value);
  const isValid = isValidLength && !containsOnlyNumbers && hasValidCharacters;

  if (!isValid) {
    let message = "";
    if (!isValidLength) {
      message = "Логин должен содержать от 3 до 20 символов";
    } else if (containsOnlyNumbers) {
      message = "Логин не может состоять только из цифр";
    } else if (!hasValidCharacters) {
      message = "Логин может содержать только латинские буквы, цифры, дефис и нижнее подчёркивание";
    }
    addErrorMessage(target, message);
  } else {
    clearInputError(target);
  }
};

const validatePassword = (value: string, target: HTMLInputElement): void => {
  const isValidLength = value.length >= 8 && value.length <= 40;
  const hasUppercase = /[A-Z]/.test(value);
  const hasDigit = /\d/.test(value);
  const isValid = isValidLength && hasUppercase && hasDigit;

  if (!isValid) {
    let message = "";
    if (!isValidLength) {
      message = "Пароль должен содержать от 8 до 40 символов";
    } else if (!hasUppercase) {
      message = "Пароль должен содержать хотя бы одну заглавную букву";
    } else if (!hasDigit) {
      message = "Пароль должен содержать хотя бы одну цифру";
    }
    addErrorMessage(target, message);
  } else {
    clearInputError(target);
  }
};

const validateEmail = (value: string, target: HTMLInputElement): void => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const hasAtSymbol = value.includes("@");
  const hasDotAfterAt = /@[^@]*\.[^@]*$/.test(value);
  const hasLettersBeforeDot = /@[a-zA-Z]+\.[a-zA-Z]+/.test(value);
  const hasValidCharacters = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(value);
  const isValid = emailRegex.test(value) && hasAtSymbol && hasDotAfterAt && hasLettersBeforeDot && hasValidCharacters;

  if (!isValid) {
    let message = "";
    if (!hasAtSymbol) {
      message = "Email должен содержать символ @";
    } else if (!hasDotAfterAt) {
      message = "Email должен содержать точку после символа @";
    } else if (!hasLettersBeforeDot) {
      message = "Email должен содержать буквы перед точкой";
    } else if (!hasValidCharacters) {
      message = "Email может содержать только латинские буквы, цифры, дефис и подчёркивание";
    } else {
      message = "Неверный формат email";
    }
    addErrorMessage(target, message);
  } else {
    clearInputError(target);
  }
};

const validateName = (value: string, target: HTMLInputElement): void => {
  const nameRegex = /^[А-ЯЁа-яёA-Za-z][А-ЯЁа-яёA-Za-z-]*$/;
  const hasValidCharacters = nameRegex.test(value);
  const hasUppercaseFirst = /^[А-ЯЁA-Z]/.test(value);
  const hasNoSpaces = !/\s/.test(value);
  const hasNoDigits = !/\d/.test(value);
  const hasNoSpecialChars = /^[А-ЯЁа-яёA-Za-z-]+$/.test(value);
  const isValid = hasValidCharacters && hasUppercaseFirst && hasNoSpaces && hasNoDigits && hasNoSpecialChars;

  if (!isValid) {
    let message = "";
    if (!hasUppercaseFirst) {
      message = "Имя должно начинаться с заглавной буквы";
    } else if (!hasNoSpaces) {
      message = "Имя не должно содержать пробелы";
    } else if (!hasNoDigits) {
      message = "Имя не должно содержать цифры";
    } else if (!hasNoSpecialChars) {
      message = "Имя может содержать только буквы и дефис";
    } else if (!hasValidCharacters) {
      message = "Имя может содержать только латинские или кириллические буквы";
    }
    addErrorMessage(target, message);
  } else {
    clearInputError(target);
  }
};

const validatePhone = (value: string, target: HTMLInputElement): void => {
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  const isValidLength = value.length >= 10 && value.length <= 15;
  const hasValidFormat = phoneRegex.test(value);
  const hasOnlyDigits = /^\+?[0-9]+$/.test(value);
  const isValid = isValidLength && hasValidFormat && hasOnlyDigits;

  if (!isValid) {
    let message = "";
    if (!isValidLength) {
      message = "Номер телефона должен содержать от 10 до 15 символов";
    } else if (!hasOnlyDigits) {
      message = "Номер телефона должен состоять только из цифр (может начинаться с +)";
    } else if (!hasValidFormat) {
      message = "Неверный формат номера телефона";
    }
    addErrorMessage(target, message);
  } else {
    clearInputError(target);
  }
};

const validateMessage = (value: string, target: HTMLInputElement): void => {
  const isValid = value.trim().length > 0;

  if (!isValid) {
    addErrorMessage(target, "Сообщение не может быть пустым");
  } else {
    clearInputError(target);
  }
};

export const validators = {
  email: validateEmail,
  login: validateLogin,
  password: validatePassword,
  first_name: validateName,
  second_name: validateName,
  phone: validatePhone,
  message: validateMessage,
};
