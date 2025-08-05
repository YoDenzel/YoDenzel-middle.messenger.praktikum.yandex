import { Button } from "../../../components/button/button";
import { InputWithLabel } from "../../../components/input-with-label/input-with-label";
import { BaseProps, Block } from "../../../framework/block";

interface ProfileFormProps extends BaseProps {
  isEditing?: boolean;
}

class ProfileFormPersonalInfo extends Block<ProfileFormProps> {
  constructor(props: ProfileFormProps) {
    super(undefined, {
      ...props,
      firstNameInput: new InputWithLabel({
        type: "text",
        id: "first_name",
        name: "first_name",
        className: "profile__input",
        placeholder: " ",
        labelClassName: "profile__label",
        label: "Имя",
        value: "John",
        disabled: !props.isEditing,
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
        disabled: !props.isEditing,
      }),
    });
  }

  render() {
    const template = `
      <div class="profile__row">
        <div class="profile__field">
          {{{firstNameInput}}}
        </div>
        <div class="profile__field">
          {{{lastNameInput}}}
        </div>
      </div>
    `;
    return this.compile(template, this.props);
  }
}

class ProfileFormContactInfo extends Block<ProfileFormProps> {
  constructor(props: ProfileFormProps) {
    super(undefined, {
      ...props,
      emailInput: new InputWithLabel({
        type: "text",
        id: "email",
        name: "email",
        className: "profile__input",
        placeholder: " ",
        labelClassName: "profile__label",
        label: "Почта",
        value: "john.doe@example.com",
        disabled: !props.isEditing,
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
        disabled: !props.isEditing,
      }),
    });
  }

  render() {
    const template = `
      <div class="profile__row">
        <div class="profile__field">
          {{{emailInput}}}
        </div>
        <div class="profile__field">
          {{{phoneInput}}}
        </div>
      </div>
    `;
    return this.compile(template, this.props);
  }
}

class ProfileFormAccountInfo extends Block<ProfileFormProps> {
  constructor(props: ProfileFormProps) {
    super(undefined, {
      ...props,
      loginInput: new InputWithLabel({
        type: "text",
        id: "login",
        name: "login",
        className: "profile__input",
        placeholder: " ",
        labelClassName: "profile__label",
        label: "Логин",
        value: "johndoe",
        disabled: !props.isEditing,
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
        disabled: !props.isEditing,
      }),
    });
  }

  render() {
    const template = `
      <div class="profile__row">
        <div class="profile__field">
          {{{loginInput}}}
        </div>
        <div class="profile__field">
          {{{passwordInput}}}
        </div>
      </div>
    `;
    return this.compile(template, this.props);
  }
}

class ProfileFormActions extends Block<ProfileFormProps> {
  constructor(props: ProfileFormProps) {
    super(undefined, {
      ...props,
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
    });
  }

  render() {
    const template = `
      <div class="profile__actions">
        {{#if isEditing}}
          {{{saveButton}}}
        {{else}}
          {{{changePasswordButton}}}
          <div class="profile__divider"></div>
          {{{logoutButton}}}
        {{/if}}
      </div>
    `;
    return this.compile(template, this.props);
  }
}

export class ProfileForm extends Block<ProfileFormProps> {
  constructor(props: ProfileFormProps) {
    super(undefined, {
      ...props,
      contactInfo: new ProfileFormContactInfo({ isEditing: props.isEditing }),
      accountInfo: new ProfileFormAccountInfo({ isEditing: props.isEditing }),
      personalInfo: new ProfileFormPersonalInfo({ isEditing: props.isEditing }),
      actions: new ProfileFormActions({ isEditing: props.isEditing }),
    });
  }

  render() {
    const template = `
      {{{contactInfo}}}
      {{{accountInfo}}}
      {{{personalInfo}}}
      {{{actions}}}
    `;
    return this.compile(template, this.props);
  }
}
