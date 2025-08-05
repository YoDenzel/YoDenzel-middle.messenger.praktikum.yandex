import { Button } from "../button/button";
import { InputWithLabel } from "../input-with-label/input-with-label";
import { BaseProps, Block } from "../../framework/block";

class PasswordChangeFormHeader extends Block {
  constructor(props: BaseProps) {
    super(undefined, props);
  }

  render() {
    const template = `
      <h2 class="modal__title">Изменить пароль</h2>
    `;
    return this.compile(template, this.props);
  }
}

class PasswordChangeFormOldPasswordGroup extends Block {
  constructor(props: BaseProps) {
    super(undefined, {
      ...props,
      oldPasswordInput: new InputWithLabel({
        type: "password",
        id: "old_password",
        name: "old_password",
        className: "modal__input",
        labelClassName: "modal__label",
        label: "Старый пароль",
        placeholder: " ",
      }),
    });
  }

  render() {
    const template = `
      <div class="modal__field">
        {{{oldPasswordInput}}}
      </div>
    `;
    return this.compile(template, this.props);
  }
}

class PasswordChangeFormNewPasswordGroup extends Block {
  constructor(props: BaseProps) {
    super(undefined, {
      ...props,
      newPasswordInput: new InputWithLabel({
        type: "password",
        id: "new_password",
        name: "new_password",
        className: "modal__input",
        labelClassName: "modal__label",
        label: "Новый пароль",
        placeholder: " ",
      }),
    });
  }

  render() {
    const template = `
      <div class="modal__field">
        {{{newPasswordInput}}}
      </div>
    `;
    return this.compile(template, this.props);
  }
}

class PasswordChangeFormConfirmPasswordGroup extends Block {
  constructor(props: BaseProps) {
    super(undefined, {
      ...props,
      confirmPasswordInput: new InputWithLabel({
        type: "password",
        id: "new_password_confirm",
        name: "new_password_confirm",
        className: "modal__input",
        labelClassName: "modal__label",
        label: "Повторите новый пароль",
        placeholder: " ",
      }),
    });
  }

  render() {
    const template = `
      <div class="modal__field">
        {{{confirmPasswordInput}}}
        <span id="password-error" class="modal__error"></span>
      </div>
    `;
    return this.compile(template, this.props);
  }
}

class PasswordChangeFormActions extends Block {
  constructor(props: BaseProps) {
    super(undefined, {
      ...props,
      saveButton: new Button({
        label: "Изменить",
        className: "modal__button modal__button--primary",
        type: "submit",
        id: "password-change-btn",
      }),
      cancelButton: new Button({
        label: "Отмена",
        className: "modal__button modal__button--secondary",
        events: {
          click: () => {
            (window as any).closePasswordModal();
          },
        },
      }),
    });
  }

  render() {
    const template = `
      <div class="modal__actions">
        {{{saveButton}}}
        {{{cancelButton}}}
      </div>
    `;
    return this.compile(template, this.props);
  }
}

export class PasswordChangeForm extends Block {
  constructor(props: BaseProps) {
    super(undefined, {
      ...props,
      header: new PasswordChangeFormHeader({}),
      oldPasswordGroup: new PasswordChangeFormOldPasswordGroup({}),
      newPasswordGroup: new PasswordChangeFormNewPasswordGroup({}),
      confirmPasswordGroup: new PasswordChangeFormConfirmPasswordGroup({}),
      actions: new PasswordChangeFormActions({}),
    });
  }

  render() {
    const template = `
      {{{header}}}
      {{{oldPasswordGroup}}}
      {{{newPasswordGroup}}}
      {{{confirmPasswordGroup}}}
      {{{actions}}}
    `;
    return this.compile(template, this.props);
  }
}
