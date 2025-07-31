import { render } from "../../framework/render-dom";
import "./profile.css";

import { Block, BaseProps } from "../../framework/block";
import template from "./template.hbs?raw";
import { Button } from "../../components/button/button";
import { Img } from "../../components/img/img";
import { InputWithLabel } from "../../components/input-with-label/input-with-label";
import { NavigationLinks } from "../../components/navigation-links/navigation-links";

interface Props extends BaseProps {
  isEditing?: boolean;
}

class Profile extends Block<Props> {
  constructor(props: Props) {
    super(undefined, props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const profile = new Profile({
  isEditing: false,
  goBackButton: new Button({
    className: "profile__back-button",
    type: "button",
    children: new Img({
      src: "go-back-arrow.svg",
      alt: "Go back",
      className: "profile__back-icon",
    }),
  }),
  avatarImg: new Img({
    src: "avatar.png",
    alt: "Avatar",
    className: "profile__avatar-img",
  }),
  avatarEditButton: new Button({
    className: "profile__avatar-edit",
    type: "button",
    label: "Изменить аватар",
    events: {
      click: () => {
        if (typeof (window as any).openAvatarModal === "function") {
          (window as any).openAvatarModal();
        }
      },
    },
  }),
  displayNameInput: new InputWithLabel({
    type: "text",
    id: "display_name",
    name: "display_name",
    className: "profile__name-input",
    placeholder: "",
    label: "",
    value: "John Doe",
    disabled: true,
  }),
  emailInput: new InputWithLabel({
    type: "text",
    id: "email",
    name: "email",
    className: "profile__input",
    placeholder: " ",
    labelClassName: "profile__label",
    label: "Почта",
    value: "john.doe@example.com",
    disabled: false,
  }),
  loginInput: new InputWithLabel({
    type: "text",
    id: "login",
    name: "login",
    className: "profile__input",
    placeholder: " ",
    labelClassName: "profile__label",
    label: "Логин",
    value: "johndoe",
    disabled: true,
  }),
  firstNameInput: new InputWithLabel({
    type: "text",
    id: "first_name",
    name: "first_name",
    className: "profile__input",
    placeholder: " ",
    labelClassName: "profile__label",
    label: "Имя",
    value: "John",
    disabled: true,
  }),
  lastNameInput: new InputWithLabel({
    type: "text",
    id: "second_name",
    name: "second_name",
    className: "profile__input",
    placeholder: " ",
    labelClassName: "profile__label",
    label: "Фамилия",
    value: "Doe",
    disabled: true,
  }),
  phoneInput: new InputWithLabel({
    type: "tel",
    id: "phone",
    name: "phone",
    className: "profile__input",
    placeholder: " ",
    labelClassName: "profile__label",
    label: "Телефон",
    value: "+1234567890",
    disabled: true,
  }),
  passwordInput: new InputWithLabel({
    type: "password",
    id: "password",
    name: "password",
    className: "profile__input",
    placeholder: " ",
    labelClassName: "profile__label",
    label: "Пароль",
    value: "password",
    disabled: true,
  }),
  saveButton: new Button({
    type: "submit",
    className: "profile__button",
    label: "Сохранить изменения",
  }),
  changePasswordButton: new Button({
    type: "button",
    className: "profile__link",
    label: "Изменить пароль",
    events: {
      click: () => {
        if (typeof (window as any).openPasswordModal === "function") {
          (window as any).openPasswordModal();
        }
      },
    },
  }),
  logoutButton: new Button({
    type: "button",
    className: "profile__link profile__link--danger",
    label: "Выйти",
  }),
  navigationLinks: new NavigationLinks({}),
});

render("#app", profile);
