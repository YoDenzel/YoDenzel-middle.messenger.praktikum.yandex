import { Block, BaseProps } from "../../framework/block";
import template from "./template.hbs?raw";
import { initPasswordChangeModal } from "./lib/init-password-change-modal";
import "./password-change-modal.css";
import { Button } from "../button/button";
import { InputWithLabel } from "../input-with-label/input-with-label";

export class PasswordChangeModal extends Block {
  constructor(props: BaseProps) {
    super(undefined, {
      modalCloseButton: new Button({
        label: "×",
        className: "modal__close-button",
        events: {
          click: () => {
            (window as any).closePasswordModal();
          },
        },
      }),
      modalSaveButton: new Button({
        label: "Изменить",
        className: "modal__button modal__button--primary",
        type: "submit",
        id: "password-change-btn",
      }),
      modalCancelButton: new Button({
        label: "Отмена",
        className: "modal__button modal__button--secondary",
        events: {
          click: () => {
            (window as any).closePasswordModal();
          },
        },
      }),
      oldPasswordInput: new InputWithLabel({
        type: "password",
        id: "old_password",
        name: "old_password",
        className: "modal__input",
        labelClassName: "modal__label",
        label: "Старый пароль",
        placeholder: " ",
      }),
      newPasswordInput: new InputWithLabel({
        type: "password",
        id: "new_password",
        name: "new_password",
        className: "modal__input",
        labelClassName: "modal__label",
        label: "Новый пароль",
        placeholder: " ",
      }),
      confirmPasswordInput: new InputWithLabel({
        type: "password",
        id: "new_password_confirm",
        name: "new_password_confirm",
        className: "modal__input",
        labelClassName: "modal__label",
        label: "Повторите новый пароль",
        placeholder: " ",
      }),
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }

  componentDidMount() {
    initPasswordChangeModal();
  }
}
