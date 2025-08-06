import "./auth.css";
import { BaseProps, Block } from "../../framework/block";
import { render } from "../../framework/render-dom";
import template from "./template.hbs?raw";
import { NavigationLinks } from "../../components/navigation-links/navigation-links";
import { Form } from "../../components/form/form";
import { AuthForm } from "./components/auth-form/auth-form";

class Auth extends Block {
  constructor(props: BaseProps) {
    super(undefined, props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const auth = new Auth({
  form: new Form({
    containerClassName: "auth__form",
    children: new AuthForm({}),
  }),
  navigationLinks: new NavigationLinks({}),
});

render("#app", auth);
