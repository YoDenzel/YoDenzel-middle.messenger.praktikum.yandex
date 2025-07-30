import "./styles/import.css";

import { render } from "./framework/render-dom";
import { auth } from "./new-pages/auth/auth";
import { registration } from "./new-pages/registration/registration";
import { profile } from "./new-pages/profile/profile";
import { messenger } from "./new-pages/messenger/messenger";
import { serverError } from "./new-pages/server-error/server-error";
import { clientError } from "./new-pages/client-error/client-error";

render("#app", auth);
// render("#app", registration);
// render("#app", profile);
// render("#app", messenger);
// render("#app", serverError);
// render("#app", clientError);
