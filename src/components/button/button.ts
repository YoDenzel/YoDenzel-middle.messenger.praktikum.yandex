import { Block, BaseProps } from "../../framework/block";
import template from "./template.hbs?raw";

interface Props extends BaseProps {
  id?: string;
  label?: string;
  className?: string;
  type?: string;
  events?: Record<string, (e: Event) => void>;
  children?: Block;
}

export class Button extends Block<Props> {
  constructor(props: Props) {
    super(undefined, props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
