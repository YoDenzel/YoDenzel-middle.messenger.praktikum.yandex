import { Block, BaseProps } from "../../../../framework/block";
import template from "./template.hbs?raw";
import "./password-change-modal.css";
import { Button } from "../../../../components/button/button";
import { PasswordChangeForm } from "./password-change-form";
import { Form } from "../../../../components/form/form";

export class PasswordChangeModal extends Block {
  constructor(props: BaseProps) {
    super(undefined, {
      modalCloseButton: new Button({
        label: "×",
        className: "modal__close-button",
        events: {
          click: () => {
            this.closeModal();
          },
        },
      }),
      form: new Form({
        containerClassName: "modal__form",
        containerId: "password-change-form",
        children: new PasswordChangeForm({
          onCancel: () => {
            this.closeModal();
          },
        }),
      }),
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }

  componentDidMount() {
    this.initModal();
  }

  private initModal(): void {
    const modal = this.element?.querySelector("#password-change-modal") as HTMLElement;
    const form = this.element?.querySelector("#password-change-form") as HTMLFormElement;
    const oldPasswordInput = this.element?.querySelector("#old_password") as HTMLInputElement;
    const newPasswordInput = this.element?.querySelector("#new_password") as HTMLInputElement;
    const confirmPasswordInput = this.element?.querySelector("#new_password_confirm") as HTMLInputElement;
    const passwordError = this.element?.querySelector("#password-error") as HTMLElement;

    if (!modal || !form || !oldPasswordInput || !newPasswordInput || !confirmPasswordInput || !passwordError) {
      console.error("Password modal elements not found");
      return;
    }

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        this.closeModal();
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleFormSubmit(newPasswordInput, confirmPasswordInput, passwordError);
    });
  }

  private handleFormSubmit(newPasswordInput: HTMLInputElement, confirmPasswordInput: HTMLInputElement, passwordError: HTMLElement): void {
    passwordError.textContent = "";

    if (newPasswordInput.value !== confirmPasswordInput.value) {
      passwordError.textContent = "Пароли не совпадают";
      return;
    }

    if (newPasswordInput.value.length < 8) {
      passwordError.textContent = "Новый пароль должен быть не менее 8 символов";
      return;
    }

    alert("Пароль успешно изменен!");

    this.closeModal();
  }

  public openModal(): void {
    if (!this.element) return;

    const modal = this.element.querySelector("#password-change-modal") as HTMLElement;
    const form = this.element.querySelector("#password-change-form") as HTMLFormElement;
    const passwordError = this.element.querySelector("#password-error") as HTMLElement;

    if (modal && form && passwordError) {
      form.reset();
      passwordError.textContent = "";
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  public closeModal(): void {
    if (!this.element) return;

    const modal = this.element.querySelector("#password-change-modal") as HTMLElement;
    const form = this.element.querySelector("#password-change-form") as HTMLFormElement;
    const passwordError = this.element.querySelector("#password-error") as HTMLElement;

    if (modal && form && passwordError) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
      form.reset();
      passwordError.textContent = "";
    }
  }
}
