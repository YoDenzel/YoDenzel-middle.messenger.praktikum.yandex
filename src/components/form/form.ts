import { Block, BaseProps } from "../../framework/block";

interface Props extends BaseProps {
  children: Block;
}

export class Form extends Block<Props> {
  constructor(props: Props) {
    super("form", {
      ...props,
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          console.log({ e });
          const formElement = this.element as HTMLFormElement;
          const formData = new FormData(formElement);
          const formDataObject = Object.fromEntries(formData);
          console.log({ formDataObject });
        },
        ...props.events,
      },
    });
  }

  // private _handleSubmit(event: Event): void {
  //   event.preventDefault();

  //   const formData = this._collectFormData();

  //   // Perform validation if validation function is provided
  //   if (this.props.onValidate && !this.props.noValidate) {
  //     const validationResult = this.props.onValidate(formData);

  //     if (validationResult === false) {
  //       console.warn("Form validation failed");
  //       return;
  //     }

  //     if (Array.isArray(validationResult) && validationResult.length > 0) {
  //       console.warn("Form validation errors:", validationResult);
  //       return;
  //     }
  //   }

  //   // Call the onSubmit handler if provided
  //   if (this.props.onSubmit) {
  //     this.props.onSubmit(formData, event);
  //   } else {
  //     console.log("Form submitted with data:", formData);
  //   }
  // }

  // private _collectFormData(): Record<string, any> {
  //   const formElement = this.element as HTMLFormElement;
  //   if (!formElement) {
  //     return {};
  //   }

  //   const formData = new FormData(formElement);
  //   const data: Record<string, any> = {};

  //   // Convert FormData to plain object
  //   for (const [key, value] of formData.entries()) {
  //     // Handle multiple values for the same name (like checkboxes)
  //     if (data[key]) {
  //       if (Array.isArray(data[key])) {
  //         data[key].push(value);
  //       } else {
  //         data[key] = [data[key], value];
  //       }
  //     } else {
  //       data[key] = value;
  //     }
  //   }

  //   return data;
  // }

  // private _getFormFields(): FormField[] {
  //   const formElement = this.element as HTMLFormElement;
  //   if (!formElement) {
  //     return [];
  //   }

  //   const fields: FormField[] = [];
  //   const elements = formElement.elements;

  //   Array.from(elements).forEach((element) => {
  //     const htmlElement = element as HTMLElement;
  //     const name = htmlElement.getAttribute("name");

  //     if (name && htmlElement.tagName !== "BUTTON") {
  //       fields.push({
  //         name,
  //         value: (htmlElement as any).value,
  //         element: htmlElement,
  //       });
  //     }
  //   });

  //   return fields;
  // }

  // Public method to get form data without submitting
  // getFormData(): Record<string, any> {
  //   return this._collectFormData();
  // }

  // Public method to validate form without submitting
  // validateForm(): boolean | string[] {
  //   if (this.props.onValidate && !this.props.noValidate) {
  //     const formData = this._collectFormData();
  //     return this.props.onValidate(formData);
  //   }
  //   return true;
  // }

  // Public method to reset form
  // resetForm(): void {
  //   const formElement = this.element as HTMLFormElement;
  //   if (formElement) {
  //     formElement.reset();
  //   }
  // }

  // Public method to get all form fields
  // getFormFields(): FormField[] {
  //   return this._getFormFields();
  // }

  render() {
    const template = `
      {{{children}}}
    `;
    return this.compile(template, this.props);
  }
}
