import { Button } from "../../components/button/button";
import { InputWithLabel } from "../../components/input-with-label/input-with-label";
import { Link } from "../../components/link/link";
import { BaseProps, Block } from "../../framework/block";
import "./registration.css";

import template from "./template.hbs?raw";

class Registration extends Block {
  constructor(props: BaseProps) {
    super(undefined, props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const registration = new Registration({
  loginInput: new InputWithLabel({
    type: "text",
    id: "login",
    name: "login",
    className: "registration__input",
    labelClassName: "registration__label",
    label: "Логин",
  }),
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
  registrationButton: new Button({
    label: "Зарегистрироваться",
    className: "registration__button",
    type: "submit",
  }),
  enterLink: new Link({
    href: "/pages/auth/auth.html",
    className: "registration__link",
    label: "Войти",
  }),
});
