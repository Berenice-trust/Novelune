import { useState } from "react";

// Универсальная обложка/аватар с возможностью загрузки
export default function ImageUpload({ 
  currentImageUrl, 
  defaultImageUrl, 
  uploadUrl, 
  altText = "Изображение",
  isAvatar = false,
  onUploadSuccess 
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(currentImageUrl);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    setIsUploading(true);
    try {
      const res = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });
      
      const data = await res.json();
      if (data.success) {
        setCurrentUrl(data.imageUrl);
        onUploadSuccess?.(data.imageUrl);
      } else {
        alert(data.message || 'Ошибка загрузки');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Ошибка сети');
    } finally {
      setIsUploading(false);
    }
  };

  const containerClass = isAvatar ? "avatar-rect" : "book-cover-rect";
  const imageClass = isAvatar ? "avatar-img" : "book-cover-img";
  const formClass = isAvatar ? "cover-upload-form-vertical" : "cover-upload-form cover-upload-form-vertical";

  return (
    <div>
      <div className={containerClass}>
        <img
          src={currentUrl || defaultImageUrl}
          alt={altText}
          className={imageClass}
          onError={(e) => { e.target.src = defaultImageUrl; }}
        />
      </div>
      
      <form onSubmit={handleUpload} className={formClass}>
        <input 
          type="file" 
          name={isAvatar ? "avatar" : "cover_image"} 
          accept="image/*" 
          required
          disabled={isUploading}
        />
        <button type="submit" className="button" disabled={isUploading}>
          {isUploading ? 'Загрузка...' : (isAvatar ? 'Загрузить аватар' : 'Заменить обложку')}
        </button>
      </form>
    </div>
  );
}
