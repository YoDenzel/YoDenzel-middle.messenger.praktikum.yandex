import Block from "../../framework/block";
import { template } from "./template";

interface Props {
  [key: string]: any;
  text: string;
}

export default class Button extends Block {
  constructor(props: Props) {
    super("button", props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
