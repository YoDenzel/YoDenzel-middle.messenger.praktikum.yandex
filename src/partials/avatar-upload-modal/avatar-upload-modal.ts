export function initAvatarUploadModal() {
  const modal = document.getElementById('avatar-upload-modal');
  const dropArea = document.getElementById('drop-area');
  const fileInput = document.getElementById('avatar-file') as HTMLInputElement;
  const preview = document.getElementById('avatar-preview') as HTMLImageElement;
  const uploadBtn = document.getElementById('upload-avatar-btn');

  if (!modal || !dropArea || !fileInput || !preview || !uploadBtn) {
    console.error('Modal elements not found');
    return;
  }

  (window as any).openAvatarModal = function() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  (window as any).closeAvatarModal = function() {
    modal.classList.remove('active');
    document.body.style.overflow = '';

    fileInput.value = '';
    preview.style.display = 'none';
    preview.src = '';
  };

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      (window as any).closeAvatarModal();
    }
  });

  fileInput.addEventListener('change', () => {
    handleFiles(fileInput.files);
  });

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e: Event) {
    e.preventDefault();
    e.stopPropagation();
  }

  ['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, () => {
      dropArea.classList.add('drag-over');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, () => {
      dropArea.classList.remove('drag-over');
    }, false);
  });

  dropArea.addEventListener('drop', (e: DragEvent) => {
    if (e.dataTransfer?.files) {
      handleFiles(e.dataTransfer.files);
    }
  }, false);

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;

    const file = files[0];

    if (!file.type.match('image.*')) {
      alert('Пожалуйста, выберите изображение');
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target && typeof e.target.result === 'string') {
        preview.src = e.target.result;
        preview.style.display = 'block';
      }
    };

    reader.readAsDataURL(file);
  }

  uploadBtn.addEventListener('click', () => {
    if (fileInput.files && fileInput.files.length > 0) {
      alert('Аватар успешно загружен!');
      (window as any).closeAvatarModal();

      const avatarImages = document.querySelectorAll('.profile__avatar-img, .change-password__avatar-img') as NodeListOf<HTMLImageElement>;
      avatarImages.forEach(img => {
        img.src = preview.src;
      });
    } else {
      alert('Пожалуйста, выберите файл');
    }
  });
}
