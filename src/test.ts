import Button from "./components/button/button";
import { profile } from "./user-profile";
import { render } from "./framework/render-dom";

// const button = new Button({
//   text: "Click me",
//   events: {
//     click: () => {
//       console.log("click");
//     },
//   },
// });

render("#app", profile);

// setTimeout(() => {
//   button.setProps({
//     className: "otherClass",
//     text: "Click me, please",
//   });
// }, 1000);
