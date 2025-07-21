import Button from "./components/button/button";
import { render } from "./framework/render-dom";

const button = new Button({
  className: "my-class",
  child: "Click me",
});

render("#app", button);

setTimeout(() => {
  button.setProps({
    className: "otherClass",
    child: "Click me, please",
  });
}, 1000);
