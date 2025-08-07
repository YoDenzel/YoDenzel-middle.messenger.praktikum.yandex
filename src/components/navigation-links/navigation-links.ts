import { Block, BaseProps } from "../../framework/block";
import { Link } from "../link/link";
import template from "./template.hbs?raw";
import "./navigation-links.css";

export class NavigationLinks extends Block<BaseProps> {
  constructor(props: BaseProps) {
    super({
      ...props,
      authLink: new Link({ href: "/auth", label: "Авторизация" }),
      registrationLink: new Link({ href: "/registration", label: "Регистрация" }),
      profileLink: new Link({ href: "/profile", label: "Профиль" }),
      messengerLink: new Link({ href: "/messenger", label: "Мессенджер" }),
      clientErrorLink: new Link({ href: "/client-error", label: "Ошибка 404" }),
      serverErrorLink: new Link({ href: "/server-error", label: "Ошибка 500" }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
