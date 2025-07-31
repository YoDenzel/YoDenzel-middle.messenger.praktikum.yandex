import "./auth.css";
import { BaseProps, Block } from "../../framework/block";
import { render } from "../../framework/render-dom";
import template from "./template.hbs?raw";
import { Button } from "../../components/button/button";
import { InputWithLabel } from "../../components/input-with-label/input-with-label";
import { Link } from "../../components/link/link";
import { NavigationLinks } from "../../components/navigation-links/navigation-links";

class Auth extends Block {
  constructor(props: BaseProps) {
    super(undefined, props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const auth = new Auth({
  button: new Button({
    label: "Войти",
    className: "button button--primary",
    type: "button",
    events: {
      click: () => {
        window.location.href = "/registration";
      },
    },
  }),
  loginInput: new InputWithLabel({
    type: "text",
    id: "login",
    name: "login",
    className: "form__input",
    labelClassName: "form__label",
    label: "Логин",
  }),
  passwordInput: new InputWithLabel({
    type: "password",
    id: "password",
    name: "password",
    className: "form__input",
    labelClassName: "form__label",
    label: "Пароль",
  }),
  noAccountLink: new Link({
    href: "/registration",
    className: "auth__register-link",
    label: "Нет аккаунта?",
  }),
  forgotPasswordLink: new Link({
    href: "#",
    className: "auth__forgot-password",
    label: "Забыли пароль?",
  }),
  navigationLinks: new NavigationLinks({}),
});

render("#app", auth);
