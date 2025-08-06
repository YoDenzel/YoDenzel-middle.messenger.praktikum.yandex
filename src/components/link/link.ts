import { BaseProps, Block } from "../../framework/block";
import template from "./template.hbs?raw";

interface Props extends BaseProps {
  href: string;
  className?: string;
  label: string;
}

export class Link extends Block<Props> {
  constructor(props: Props) {
    super(undefined, props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
