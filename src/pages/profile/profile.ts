import { render } from "../../framework/render-dom";
import "./profile.css";

import { Block, BaseProps } from "../../framework/block";
import template from "./template.hbs?raw";
import { Button } from "../../components/button/button";
import { Img } from "../../components/img/img";
import { InputWithLabel } from "../../components/input-with-label/input-with-label";
import { NavigationLinks } from "../../components/navigation-links/navigation-links";
import { AvatarUploadModal } from "./components/avatar-upload-modal/avatar-upload-modal";
import { PasswordChangeModal } from "./components/password-change-modal/password-change-modal";
import { Form } from "../../components/form/form";
import { ProfileForm } from "./components/profile-form/profile-form";

const IS_EDITING = false;

interface Props extends BaseProps {
  isEditing?: boolean;
}

class Profile extends Block<Props> {
  render() {
    return this.compile(template, this.props);
  }

  public openAvatarModal(): void {
    if (this.children.avatarUploadModal) {
      (this.children.avatarUploadModal as AvatarUploadModal).openModal();
    }
  }

  public openPasswordModal(): void {
    if (this.children.passwordChangeModal) {
      (this.children.passwordChangeModal as PasswordChangeModal).openModal();
    }
  }
}

export const profile = new Profile({
  isEditing: IS_EDITING,
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
        profile.openAvatarModal();
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
    disabled: !IS_EDITING,
  }),
  form: new Form({
    containerClassName: "profile__form",
    children: new ProfileForm({
      isEditing: IS_EDITING,
      onOpenPasswordModal: () => {
        profile.openPasswordModal();
      },
    }),
  }),
  navigationLinks: new NavigationLinks({}),
  avatarUploadModal: new AvatarUploadModal({}),
  passwordChangeModal: new PasswordChangeModal({}),
});

render("#app", profile);
