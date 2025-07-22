import Block from "./framework/block";
// import Handlebars from "handlebars";
import Button from "./components/button/button";

const profileTemplate = `
    <div>
    {{ userName }}
        {{{ button }}}
    </div>
`;

const button = new Button({ text: "Change name" });

class UserProfile extends Block {
  render() {
    return this.compile(profileTemplate, {
      userName: this.props.userName,
      button: this.children.button,
    });
  }
}

export const profile = new UserProfile(undefined, {
  userName: "John Doe",
  button,
});

setTimeout(() => {
  // Обновляем кнопку

  button.setProps({ text: "Updated text on button" });
}, 3000);
