import { Button } from "../../../../components/button/button";
import { InputWithLabel } from "../../../../components/input-with-label/input-with-label";
import { Link } from "../../../../components/link/link";
import { BaseProps, Block } from "../../../../framework/block";

class AuthFormHeader extends Block {
  render() {
    const template = `  
      <h1 class="auth__title">Вход</h1>
    `;
    return this.compile(template, this.props);
  }
}

class AuthFormLoginGroup extends Block {
  constructor(props: BaseProps) {
    super({
      ...props,
      loginInput: new InputWithLabel({
        type: "text",
        id: "login",
        name: "login",
        className: "form__input",
        labelClassName: "form__label",
        label: "Логин",
      }),
    });
  }

  render() {
    const template = `
      <div class="form__group">
        {{{loginInput}}}
      </div>
    `;
    return this.compile(template, this.props);
  }
}

class AuthFormPasswordGroup extends Block {
  constructor(props: BaseProps) {
    super({
      ...props,
      passwordInput: new InputWithLabel({
        type: "password",
        id: "password",
        name: "password",
        className: "form__input",
        labelClassName: "form__label",
        label: "Пароль",
      }),
      forgotPasswordLink: new Link({
        href: "#",
        className: "auth__forgot-password",
        label: "Забыли пароль?",
      }),
    });
  }

  render() {
    const template = `
      <div class="form__group">
        {{{passwordInput}}}
        {{{forgotPasswordLink}}}
      </div>
    `;
    return this.compile(template, this.props);
  }
}

class AuthFormFooter extends Block {
  constructor(props: BaseProps) {
    super({
      ...props,
      button: new Button({
        type: "submit",
        label: "Войти",
        className: "button button--primary",
      }),
      noAccountLink: new Link({
        href: "/registration",
        className: "auth__register-link",
        label: "Нет аккаунта?",
      }),
    });
  }

  render() {
    const template = `
      <div class="auth__footer">
        <div class="form__actions">
          {{{button}}}
        </div>
        {{{noAccountLink}}}
      </div>
    `;
    return this.compile(template, this.props);
  }
}

export class AuthForm extends Block {
  constructor(props: BaseProps) {
    super({
      ...props,
      header: new AuthFormHeader({}),
      loginInput: new AuthFormLoginGroup({}),
      passwordInput: new AuthFormPasswordGroup({}),
      footer: new AuthFormFooter({}),
    });
  }

  render() {
    const template = `
      {{{header}}}
      {{{loginInput}}}
      {{{passwordInput}}}
      {{{footer}}}
    `;
    return this.compile(template, this.props);
  }
}
