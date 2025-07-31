import { Block, BaseProps } from "../../framework/block";
import template from "./template.hbs?raw";
import { initAvatarUploadModal } from "./lib/init-avatar-upload-modal";
import "./avatar-upload-modal.css";
import { Button } from "../button/button";
import { InputWithLabel } from "../input-with-label/input-with-label";
import { Img } from "../img/img";

export class AvatarUploadModal extends Block {
  constructor(props: BaseProps) {
    super(undefined, {
      modalCloseButton: new Button({
        label: "×",
        className: "modal__close-button",
        events: {
          click: () => {
            (window as any).closeAvatarModal();
          },
        },
      }),
      modalUploadButton: new Button({
        label: "Поменять",
        className: "modal__button modal__button--primary",
        id: "upload-avatar-btn",
      }),
      modalCancelButton: new Button({
        label: "Отмена",
        className: "modal__button modal__button--secondary",
        events: {
          click: () => {
            (window as any).closeAvatarModal();
          },
        },
      }),
      modalFileInput: new InputWithLabel({
        type: "file",
        id: "avatar-file",
        className: "modal__file-input",
        labelClassName: "modal__file-label",
        name: "avatar",
        accept: "image/*",
        label: "Выберите файл",
      }),
      modalPreviewImage: new Img({
        id: "avatar-preview",
        src: "",
        alt: "Preview",
        className: "modal__preview-image",
        style: "display: none;",
      }),
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }

  componentDidMount() {
    initAvatarUploadModal();
  }
}
