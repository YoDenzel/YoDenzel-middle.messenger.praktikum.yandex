import "./messenger.css";

import { Block, BaseProps } from "../../framework/block";
import template from "./template.hbs?raw";
import { Button } from "../../components/button/button";
import { Img } from "../../components/img/img";
import { InputWithLabel } from "../../components/input-with-label/input-with-label";

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  isSelected?: boolean;
}

interface Props extends BaseProps {
  chats: Chat[];
  selectedChat?: Chat;
}

class Messenger extends Block<Props> {
  constructor(props: Props) {
    super(undefined, props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const chats: Chat[] = [
  {
    id: "1",
    name: "Alice Johnson",
    avatar: "cat_1.png",
    lastMessage: "Привет! Как дела?",
    time: "14:30",
    unreadCount: 2,
    isSelected: true,
  },
  {
    id: "2",
    name: "Bob Smith",
    avatar: "cat_2.png",
    lastMessage: "Встретимся завтра?",
    time: "12:15",
  },
  {
    id: "3",
    name: "Carol Davis",
    avatar: "avatar.png",
    lastMessage: "Спасибо за помощь!",
    time: "10:45",
    unreadCount: 1,
  },
];

export const messenger = new Messenger({
  chats,
  selectedChat: chats[0],
  profileLink: new Button({
    className: "messenger__profile-link",
    type: "button",
    label: "Аккаунт",
    events: {
      click: () => {
        console.log("Navigate to profile");
      },
    },
  }),
  searchInput: new InputWithLabel({
    type: "text",
    id: "search",
    name: "search",
    className: "messenger__search-input",
    placeholder: "Поиск",
    label: "",
  }),
  searchIcon: new Img({
    src: "search.svg",
    alt: "Search",
    className: "messenger__search-icon",
  }),
  chatMenuButton: new Button({
    className: "messenger__chat-menu",
    type: "button",
    label: "⋮",
    events: {
      click: () => {
        console.log("Open chat menu");
      },
    },
  }),
  messageInput: new InputWithLabel({
    type: "text",
    id: "message",
    name: "message",
    className: "messenger__input",
    placeholder: "Сообщение",
    label: "",
  }),
  sendButton: new Button({
    className: "messenger__send",
    type: "submit",
    label: "→",
    events: {
      click: (e) => {
        e.preventDefault();
        console.log("Send message");
      },
    },
  }),
});
