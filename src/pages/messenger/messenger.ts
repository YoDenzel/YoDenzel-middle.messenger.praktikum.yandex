import "./messenger.css";
import { render } from "../../framework/render-dom";

import { Block, BaseProps } from "../../framework/block";
import template from "./template.hbs?raw";
import { Button } from "../../components/button/button";
import { Img } from "../../components/img/img";
import { InputWithLabel } from "../../components/input-with-label/input-with-label";
import { NavigationLinks } from "../../components/navigation-links/navigation-links";
import { MessengerInputForm } from "./components/messenger-input-form/messenger-input-form";
import { Form } from "../../components/form/form";

interface Message {
  id: string;
  text: string;
  time: string;
  isMine: boolean;
}

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  isSelected?: boolean;
  messages?: Message[];
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
    messages: [
      {
        id: "1",
        text: "Привет! Как дела?",
        time: "14:25",
        isMine: false,
      },
      {
        id: "2",
        text: "Привет! Всё отлично, спасибо. А у тебя как?",
        time: "14:26",
        isMine: true,
      },
      {
        id: "3",
        text: "Тоже хорошо! Планируешь что-то на выходные?",
        time: "14:27",
        isMine: false,
      },
      {
        id: "4",
        text: "Да, собираюсь в поход с друзьями. А ты?",
        time: "14:28",
        isMine: true,
      },
      {
        id: "5",
        text: "Звучит здорово! Я думаю просто отдохнуть дома, почитать книгу",
        time: "14:30",
        isMine: false,
      },
    ],
  },
  {
    id: "2",
    name: "Bob Smith",
    avatar: "cat_2.png",
    lastMessage: "Встретимся завтра?",
    time: "12:15",
    messages: [
      {
        id: "6",
        text: "Привет! Как прошла встреча сегодня?",
        time: "12:10",
        isMine: false,
      },
      {
        id: "7",
        text: "Всё прошло отлично! Проект одобрили",
        time: "12:12",
        isMine: true,
      },
      {
        id: "8",
        text: "Отлично! Встретимся завтра?",
        time: "12:15",
        isMine: false,
      },
    ],
  },
  {
    id: "3",
    name: "Carol Davis",
    avatar: "avatar.png",
    lastMessage: "Спасибо за помощь!",
    time: "10:45",
    unreadCount: 1,
    messages: [
      {
        id: "9",
        text: "Привет! Можешь помочь с задачей?",
        time: "10:30",
        isMine: false,
      },
      {
        id: "10",
        text: "Конечно! В чём проблема?",
        time: "10:32",
        isMine: true,
      },
      {
        id: "11",
        text: "Не могу разобраться с этим кодом. Можешь посмотреть?",
        time: "10:35",
        isMine: false,
      },
      {
        id: "12",
        text: "Да, пришли ссылку, я посмотрю",
        time: "10:37",
        isMine: true,
      },
      {
        id: "13",
        text: "Спасибо за помощь!",
        time: "10:45",
        isMine: false,
      },
    ],
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
        window.location.href = "/profile";
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
  form: new Form({
    containerClassName: "messenger__input-area",
    children: new MessengerInputForm({}),
  }),
  navigationLinks: new NavigationLinks({}),
});

render("#app", messenger);
