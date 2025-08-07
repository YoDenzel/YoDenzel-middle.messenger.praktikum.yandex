import { Block, BaseProps } from "../../../../framework/block";
import template from "./template.hbs?raw";
import "./avatar-upload-modal.css";
import { Button } from "../../../../components/button/button";
import { InputWithLabel } from "../../../../components/input-with-label/input-with-label";
import { Img } from "../../../../components/img/img";

export class AvatarUploadModal extends Block {
  private modal: HTMLElement | null = null;
  private dropArea: HTMLElement | null = null;
  private fileInput: HTMLInputElement | null = null;
  private preview: HTMLImageElement | null = null;
  private uploadBtn: HTMLElement | null = null;

  constructor(props: BaseProps) {
    super({
      modalCloseButton: new Button({
        label: "×",
        className: "modal__close-button",
        events: {
          click: () => {
            this.closeModal();
          },
        },
      }),
      modalUploadButton: new Button({
        label: "Поменять",
        className: "modal__button modal__button--primary",
        id: "upload-avatar-btn",
        events: {
          click: () => {
            this.handleUpload();
          },
        },
      }),
      modalCancelButton: new Button({
        label: "Отмена",
        className: "modal__button modal__button--secondary",
        events: {
          click: () => {
            this.closeModal();
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
        events: {
          change: () => {
            this.handleFileChange();
          },
        },
      }),
      modalPreviewImage: new Img({
        id: "avatar-preview",
        src: "",
        alt: "Preview",
        className: "modal__preview-image",
        style: "display: none;",
      }),
      events: {
        click: (e: Event) => {
          const target = e.target as HTMLElement;
          if (target.id === "avatar-upload-modal") {
            this.closeModal();
          }
        },
        dragenter: (e: Event) => {
          const target = e.target as HTMLElement;
          if (target.id === "drop-area") {
            this.preventDefaults(e);
            target.classList.add("drag-over");
          }
        },
        dragover: (e: Event) => {
          const target = e.target as HTMLElement;
          if (target.id === "drop-area") {
            this.preventDefaults(e);
            target.classList.add("drag-over");
          }
        },
        dragleave: (e: Event) => {
          const target = e.target as HTMLElement;
          if (target.id === "drop-area") {
            this.preventDefaults(e);
            target.classList.remove("drag-over");
          }
        },
        drop: (e: Event) => {
          const target = e.target as HTMLElement;
          if (target.id === "drop-area") {
            this.preventDefaults(e);
            target.classList.remove("drag-over");

            const dragEvent = e as DragEvent;
            if (dragEvent.dataTransfer?.files) {
              this.handleFiles(dragEvent.dataTransfer.files);
            }
          }
        },
      },
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }

  componentDidMount() {
    this.initializeElements();
  }

  private initializeElements(): void {
    this.modal = document.getElementById("avatar-upload-modal");
    this.dropArea = document.getElementById("drop-area");
    this.fileInput = document.getElementById("avatar-file") as HTMLInputElement;
    this.preview = document.getElementById("avatar-preview") as HTMLImageElement;
    this.uploadBtn = document.getElementById("upload-avatar-btn");

    if (!this.modal || !this.dropArea || !this.fileInput || !this.preview || !this.uploadBtn) {
      console.error("Modal elements not found");
      return;
    }
  }

  private preventDefaults(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
  }

  private handleFileChange(): void {
    this.handleFiles(this.fileInput?.files || null);
  }

  private handleFiles(files: FileList | null): void {
    if (!files || files.length === 0 || !this.preview) return;

    const file = files[0];

    if (!file.type.match("image.*")) {
      alert("Пожалуйста, выберите изображение");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target && typeof e.target.result === "string" && this.preview) {
        this.preview.src = e.target.result;
        this.preview.style.display = "block";
      }
    };

    reader.readAsDataURL(file);
  }

  private handleUpload(): void {
    if (this.fileInput?.files && this.fileInput.files.length > 0 && this.preview) {
      alert("Аватар успешно загружен!");
      this.closeModal();

      const avatarImages = document.querySelectorAll(".profile__avatar-img, .change-password__avatar-img") as NodeListOf<HTMLImageElement>;
      avatarImages.forEach((img) => {
        img.src = this.preview?.src || "";
      });
    } else {
      alert("Пожалуйста, выберите файл");
    }
  }

  public openModal(): void {
    if (this.modal) {
      this.modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  public closeModal(): void {
    if (this.modal && this.fileInput && this.preview) {
      this.modal.classList.remove("active");
      document.body.style.overflow = "";

      this.fileInput.value = "";
      this.preview.style.display = "none";
      this.preview.src = "";
    }
  }
}
