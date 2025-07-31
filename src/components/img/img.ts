import { Block, BaseProps } from "../../framework/block";
import template from "./template.hbs?raw";

interface Props extends BaseProps {
  id?: string;
  src: string;
  alt: string;
  className?: string;
  width?: string;
  height?: string;
  events?: Record<string, () => void>;
  style?: string;
}

export class Img extends Block<Props> {
  constructor(props: Props) {
    super(undefined, props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
