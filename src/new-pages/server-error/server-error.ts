import "./server-error.css";

import { Block, BaseProps } from "../../framework/block";
import template from "./template.hbs?raw";
import { Button } from "../../components/button/button";
import { Img } from "../../components/img/img";

interface Props extends BaseProps {
  errorMessage: string;
}

class ServerError extends Block<Props> {
  constructor(props: Props) {
    super(undefined, props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const serverError = new ServerError({
  errorMessage: "Что-то произошло, но мы уже фиксим",
  errorCodeHeading: new Button({
    className: "error__code",
    type: "button",
    label: "500",
  }),
  catImg: new Img({
    src: "cat_1.png",
    alt: "Error cat",
    className: "error__cat",
  }),
  backButton: new Button({
    className: "error__link",
    type: "button",
    label: "Назад к чатам",
    events: {
      click: () => {
        console.log("Navigate back to messenger");
      },
    },
  }),
});
