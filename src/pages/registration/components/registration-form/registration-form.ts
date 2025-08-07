import { Button } from "../../../../components/button/button";
import { InputWithLabel } from "../../../../components/input-with-label/input-with-label";
import { Link } from "../../../../components/link/link";
import { BaseProps, Block } from "../../../../framework/block";

class RegistrationFormHeader extends Block {
  render() {
    const template = `  
      <h1 class="registration__title">Регистрация</h1>
    `;
    return this.compile(template, this.props);
  }
}

class RegistrationFormLoginGroup extends Block {
  constructor(props: BaseProps) {
    super({
      ...props,
      loginInput: new InputWithLabel({
        type: "text",
        id: "login",
        name: "login",
        className: "registration__input",
        labelClassName: "registration__label",
        label: "Логин",
      }),
    });
  }

  render() {
    const template = `
      <div class="registration__field registration__field--full">
        {{{loginInput}}}
      </div>
    `;
    return this.compile(template, this.props);
  }
}

class RegistrationFormContactGroup extends Block {
  constructor(props: BaseProps) {
    super({
      ...props,
      emailInput: new InputWithLabel({
        type: "email",
        id: "email",
        name: "email",
        className: "registration__input",
        labelClassName: "registration__label",
        label: "Почта",
      }),
      phoneInput: new InputWithLabel({
        type: "tel",
        id: "phone",
        name: "phone",
        className: "registration__input",
        labelClassName: "registration__label",
        label: "Телефон",
      }),
    });
  }

  render() {
    const template = `
      <div class="registration__row">
        <div class="registration__field">
          {{{emailInput}}}
        </div>
        <div class="registration__field">
          {{{phoneInput}}}
        </div>
      </div>
    `;
    return this.compile(template, this.props);
  }
}

class RegistrationFormNameGroup extends Block {
  constructor(props: BaseProps) {
    super({
      ...props,
      firstNameInput: new InputWithLabel({
        type: "text",
        id: "first_name",
        name: "first_name",
        className: "registration__input",
        labelClassName: "registration__label",
        label: "Имя",
      }),
      secondNameInput: new InputWithLabel({
        type: "text",
        id: "second_name",
        name: "second_name",
        className: "registration__input",
        labelClassName: "registration__label",
        label: "Фамилия",
      }),
    });
  }

  render() {
    const template = `
      <div class="registration__row">
        <div class="registration__field">
          {{{firstNameInput}}}
        </div>
        <div class="registration__field">
          {{{secondNameInput}}}
        </div>
      </div>
    `;
    return this.compile(template, this.props);
  }
}

class RegistrationFormPasswordGroup extends Block {
  constructor(props: BaseProps) {
    super({
      ...props,
      passwordInput: new InputWithLabel({
        type: "password",
        id: "password",
        name: "password",
        className: "registration__input",
        labelClassName: "registration__label",
        label: "Пароль",
      }),
      passwordConfirmInput: new InputWithLabel({
        type: "password",
        id: "password_confirm",
        name: "password_confirm",
        className: "registration__input",
        labelClassName: "registration__label",
        label: "Повторите пароль",
      }),
    });
  }

  render() {
    const template = `
      <div class="registration__row">
        <div class="registration__field">
          {{{passwordInput}}}
        </div>
        <div class="registration__field">
          {{{passwordConfirmInput}}}
          <span id="password-error" class="registration__error"></span>
        </div>
      </div>
    `;
    return this.compile(template, this.props);
  }
}

class RegistrationFormFooter extends Block {
  constructor(props: BaseProps) {
    super({
      ...props,
      registrationButton: new Button({
        label: "Зарегистрироваться",
        className: "registration__button",
        type: "submit",
      }),
      enterLink: new Link({
        href: "/auth",
        className: "registration__link",
        label: "Войти",
      }),
    });
  }

  render() {
    const template = `
      <div class="registration__actions">
        {{{registrationButton}}}
        <div class="registration__footer">
          {{{enterLink}}}
        </div>
      </div>
    `;
    return this.compile(template, this.props);
  }
}

export class RegistrationForm extends Block {
  constructor(props: BaseProps) {
    super({
      ...props,
      header: new RegistrationFormHeader({}),
      loginGroup: new RegistrationFormLoginGroup({}),
      contactGroup: new RegistrationFormContactGroup({}),
      nameGroup: new RegistrationFormNameGroup({}),
      passwordGroup: new RegistrationFormPasswordGroup({}),
      footer: new RegistrationFormFooter({}),
    });
  }

  render() {
    const template = `
      {{{header}}}
      {{{loginGroup}}}
      {{{contactGroup}}}
      {{{nameGroup}}}
      {{{passwordGroup}}}
      {{{footer}}}
    `;
    return this.compile(template, this.props);
  }
}
