import { Block, BaseProps } from "../../framework/block";
import template from "./template.hbs?raw";
import { initPasswordChangeModal } from "./lib/init-password-change-modal";
import "./password-change-modal.css";
import { Button } from "../button/button";
import { PasswordChangeForm } from "./password-change-form";
import { Form } from "../form/form";

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
      form: new Form({
        containerClassName: "modal__form",
        containerId: "password-change-form",
        children: new PasswordChangeForm({}),
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
