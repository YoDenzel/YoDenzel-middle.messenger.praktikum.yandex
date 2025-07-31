import { Block, BaseProps } from "../../framework/block";
import template from "./template.hbs?raw";

export class NavigationLinks extends Block<BaseProps> {
  constructor(props: BaseProps) {
    super(undefined, props);
  }

  render() {
    return this.compile(template, {});
  }
}
