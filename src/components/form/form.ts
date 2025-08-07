import { Block, BaseProps } from "../../framework/block";
import { validators } from "./lib/validators";

interface Props extends BaseProps {
  children: Block;
}

export class Form extends Block<Props> {
  constructor(props: Props) {
    super(
      {
        ...props,
        events: {
          submit: (e: Event) => {
            e.preventDefault();
            this._validate(e);
            this._log();
          },
          focusout: (e: Event) => {
            this._validate(e);
          },
          ...props.events,
        },
      },
      "form"
    );
  }

  private _validate(e: Event) {
    const target = e.target as HTMLInputElement;
    if (!target) return;

    const validator = validators[target.name as keyof typeof validators];
    if (validator) {
      validator(target.value, target);
    }
  }

  private _log() {
    const formElement = this.element as HTMLFormElement;
    const formData = new FormData(formElement);
    const formDataObject = Object.fromEntries(formData);
    console.log({ formDataObject });
  }

  render() {
    const template = `
      {{{children}}}
    `;
    return this.compile(template, this.props);
  }
}
