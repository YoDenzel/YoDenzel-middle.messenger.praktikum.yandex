import { Button } from "../../../../components/button/button";
import { InputWithLabel } from "../../../../components/input-with-label/input-with-label";
import { BaseProps, Block } from "../../../../framework/block";

class MessengerInputField extends Block {
  constructor(props: BaseProps) {
    super(undefined, {
      ...props,
      messageInput: new InputWithLabel({
        type: "text",
        id: "message",
        name: "message",
        className: "messenger__input",
        placeholder: "Сообщение",
        label: "",
      }),
    });
  }

  render() {
    const template = `{{{messageInput}}}`;
    return this.compile(template, this.props);
  }
}

class MessengerSendButton extends Block {
  constructor(props: BaseProps) {
    super(undefined, {
      ...props,
      sendButton: new Button({
        className: "messenger__send",
        type: "submit",
        label: "→",
      }),
    });
  }

  render() {
    const template = `{{{sendButton}}}`;
    return this.compile(template, this.props);
  }
}

export class MessengerInputForm extends Block {
  constructor(props: BaseProps) {
    super(undefined, {
      ...props,
      containerClassName: "messenger__input-container",
      inputField: new MessengerInputField({}),
      sendButton: new MessengerSendButton({}),
    });
  }

  render() {
    const template = `
      {{{inputField}}}
      {{{sendButton}}}
    `;
    return this.compile(template, this.props);
  }
}
