import { BaseProps, Block } from "../../framework/block";
import template from "./template.hbs?raw";

interface Props extends BaseProps {
  type: string;
  id: string;
  name: string;
  className?: string;
  placeholder?: string;
  labelClassName?: string;
  label: string;
  value?: string;
  disabled?: boolean;
  accept?: string;
}

export class InputWithLabel extends Block<Props> {
  render() {
    return this.compile(template, this.props);
  }
}
