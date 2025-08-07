import "./registration.css";
import { render } from "../../framework/render-dom";
import { NavigationLinks } from "../../components/navigation-links/navigation-links";
import { Block } from "../../framework/block";
import { RegistrationForm } from "./components/registration-form/registration-form";
import { Form } from "../../components/form/form";

import template from "./template.hbs?raw";

class Registration extends Block {
  render() {
    return this.compile(template, this.props);
  }
}

export const registration = new Registration({
  form: new Form({
    containerClassName: "registration__form-container",
    children: new RegistrationForm({}),
  }),
  navigationLinks: new NavigationLinks({}),
});

render("#app", registration);
