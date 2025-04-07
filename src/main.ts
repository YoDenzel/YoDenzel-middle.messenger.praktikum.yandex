import './styles/import.css'

import Handlebars from 'handlebars';

import * as Pages from './pages';
import * as Partials from './partials';

Handlebars.registerPartial('navigation-buttons', Partials.NavigationButtons);
Handlebars.registerPartial('avatar-upload-modal', Partials.AvatarUploadModal);
Handlebars.registerPartial('password-change-modal', Partials.PasswordChangeModal);

const pageData = [
  { view: 'auth', name: 'Login' },
  { view: 'registration', name: 'Registration' },
  { view: 'profile', name: 'Profile' },
  { view: 'messenger', name: 'Messenger' },
  { view: 'serverError', name: 'Server Error' },
  { view: 'clientError', name: 'Client Error' },
];

const templates = {
  auth: Handlebars.compile(Pages.Auth),
  registration: Handlebars.compile(Pages.Registration),
  profile: Handlebars.compile(Pages.Profile),
  messenger: Handlebars.compile(Pages.Messenger),
  serverError: Handlebars.compile(Pages.ServerError),
  clientError: Handlebars.compile(Pages.ClientError),
};

function switchView(view: keyof typeof templates) {
  const app = document.getElementById('app');
  if (app)  app.innerHTML = templates[view]({ pages: pageData, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', login: 'johndoe', phone: '+1234567890', password: 'password' });

  // Initialize modal functionality after view switch
  if (view === 'profile') {
    Partials.initAvatarUploadModal();
    Partials.initPasswordChangeModal();
  }
}

// Load initial view
switchView('auth');

(window as any).switchView = switchView;
