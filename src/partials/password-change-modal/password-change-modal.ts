export function initPasswordChangeModal() {
  const modal = document.getElementById('password-change-modal');
  const form = document.getElementById('password-change-form') as HTMLFormElement;
  const oldPasswordInput = document.getElementById('old_password') as HTMLInputElement;
  const newPasswordInput = document.getElementById('new_password') as HTMLInputElement;
  const confirmPasswordInput = document.getElementById('new_password_confirm') as HTMLInputElement;
  const passwordError = document.getElementById('password-error');
  const closeButton = document.querySelector('.modal__close-button') as HTMLButtonElement;

  if (!modal || !form || !oldPasswordInput || !newPasswordInput || !confirmPasswordInput || !passwordError) {
    console.error('Password modal elements not found');
    return;
  }

  (window as any).openPasswordModal = function() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  (window as any).closePasswordModal = function() {
    modal.classList.remove('active');
    document.body.style.overflow = '';

    form.reset();
    passwordError.textContent = '';
  };

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      (window as any).closePasswordModal();
    }
  });

  if (closeButton) {
    closeButton.addEventListener('click', (e) => {
      e.preventDefault();
      (window as any).closePasswordModal();
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (newPasswordInput.value !== confirmPasswordInput.value) {
      passwordError.textContent = 'Пароли не совпадают';
      return;
    }

    if (newPasswordInput.value.length < 4) {
      passwordError.textContent = 'Новый пароль должен быть не менее 8 символов';
      return;
    }


    alert('Пароль успешно изменен!');
    (window as any).closePasswordModal();
  });
}
