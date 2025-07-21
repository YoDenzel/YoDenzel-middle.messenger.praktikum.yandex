import Block from "../../framework/block";

import Handlebars from "handlebars";
import { template } from "./template";

// You may want to define the shape of props more specifically
interface ButtonProps {
  [key: string]: any;
}

export default class Button extends Block {
  constructor(props: ButtonProps) {
    super("button", props);
  }

  render() {
    return Handlebars.compile(template)(this.props);
  }
}
