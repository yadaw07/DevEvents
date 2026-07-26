import Image from 'next/image';
import { RefObject } from 'react';

type Props = {
  imagePreview: string | null;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
};

const ImageUploadField = ({
  imagePreview,
  fileInputRef,
  onChange,
  onRemove,
}: Props) => (
  <div className='image-upload'>
    <label>Event Image</label>

    {imagePreview ? (
      <div className='preview-wrapper'>
        <Image src={imagePreview} alt='Preview' fill className='preview' />
        <button type='button' className='remove-image' onClick={onRemove}>
          ✕
        </button>
      </div>
    ) : (
      <label className='dropzone'>
        <span>Click to upload an image</span>
        <span className='text-xs opacity-60'>PNG, JPG up to 10MB</span>
        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          className='hidden'
          onChange={onChange}
        />
      </label>
    )}
  </div>
);

export default ImageUploadField;
