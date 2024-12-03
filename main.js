const fileInput = document.getElementById('fileInput');
const previewContainer = document.getElementById('previewContainer');

fileInput.addEventListener('change', (event) => {
  const files = event.target.files;
  previewContainer.innerHTML = ''; // Eski previewlarni tozalash

  Array.from(files).forEach((file, index) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Canvas yaratish va rasmni 200x200 px ga o'zgartirish
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 200;
        canvas.height = 200;
        ctx.drawImage(img, 0, 0, 200, 200);

        // Preview div yaratish
        const previewWrapper = document.createElement('div');
        previewWrapper.className = 'flex flex-col items-center';

        const preview = document.createElement('div');
        preview.className = 'w-48 h-48 border-2 border-dashed border-gray-300 rounded-md bg-gray-50';
        preview.style.backgroundImage = `url(${canvas.toDataURL('image/png')})`;
        preview.style.backgroundSize = 'cover';
        preview.style.backgroundPosition = 'center';

        // Yuklab olish tugmasi yaratish
        const downloadButton = document.createElement('a');
        downloadButton.href = canvas.toDataURL('image/png');
        downloadButton.download = `resized-image-${index + 1}.png`;
        downloadButton.className = 'mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm';
        downloadButton.textContent = 'Yuklab olish';

        // Previewni konteynerga qo'shish
        previewWrapper.appendChild(preview);
        previewWrapper.appendChild(downloadButton);
        previewContainer.appendChild(previewWrapper);
      };

      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  });
});
