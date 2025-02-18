import {Checkmark16Filled, ImageAdd20Filled} from '@fluentui/react-icons';
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from '@nextui-org/react';
import {useRef, useState} from 'react';
import ReactCrop, {centerCrop, makeAspectCrop} from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';

const ASPECT_RATIO = 5;
const MIN_DIMENSION = 150;

export default function NewBackgroundPhotoModal({isOpen, onOpenChange, handleUpdateCoverPhoto}) {
  const imgRef = useRef(null);
  const inputRef = useRef(null);
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState(null);
  const [error, setError] = useState('');

  const onSelectFile = e => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || '';
      imageElement.src = imageUrl;

      imageElement.addEventListener('load', e => {
        if (error) setError('');
        const {naturalWidth, naturalHeight} = e.currentTarget;
        if (naturalWidth < MIN_DIMENSION * ASPECT_RATIO || naturalHeight < MIN_DIMENSION) {
          setError(
            `Zdjęcie musi mnieć przynajmniej ${
              MIN_DIMENSION * ASPECT_RATIO
            } x ${MIN_DIMENSION} pixeli.`
          );
          return setImgSrc('');
        }
      });
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = e => {
    const {width, height} = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: '%',
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const handleSaveCroppedImage = () => {
    const canvas = document.createElement('canvas');
    const image = imgRef.current;
    const {width, height} = image;
    const {width: cropWidth, height: cropHeight} = crop;

    const targetImageSize = 200;
    canvas.width = targetImageSize * ASPECT_RATIO;
    canvas.height = targetImageSize;

    const ctx = canvas.getContext('2d');

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    ctx.drawImage(
      image,
      image.naturalWidth * (crop.x / 100),
      image.naturalHeight * (crop.y / 100),
      image.naturalWidth * (cropWidth / 100),
      image.naturalHeight * (cropHeight / 100),
      0,
      0,
      targetImageSize * ASPECT_RATIO,
      targetImageSize
    );

    const croppedImage = canvas.toDataURL('image/jpeg');
    handleUpdateCoverPhoto(croppedImage);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setImgSrc('');
    setError('');
    setCrop(null);
    onOpenChange(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      size="2xl"
      onClose={handleCloseModal}
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">Nowe zdjęcie w tle</ModalHeader>
            <ModalBody>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  ref={inputRef}
                  onChange={onSelectFile}
                  style={{display: 'none'}}
                />
                <Button
                  endContent={<ImageAdd20Filled />}
                  fullWidth
                  color="secondary"
                  onClick={() => inputRef.current.click()}
                >
                  Wybierz zdjęcie
                </Button>
              </div>
              {/* <label for="newAvatarInput">
                <Button variant="light">Wybierz zdjęcie</Button>
                <Input id="newAvatarInput" type="file" accept="image/*" onChange={onSelectFile} />
              </label> */}
              {error && <p className="text-red-400 text-xs">{error}</p>}
              {imgSrc && (
                <div className="flex flex-col items-center">
                  <ReactCrop
                    crop={crop}
                    onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                    keepSelection
                    aspect={ASPECT_RATIO}
                    minWidth={MIN_DIMENSION}
                  >
                    <img
                      ref={imgRef}
                      src={imgSrc}
                      alt="Upload"
                      style={{maxHeight: '70vh'}}
                      onLoad={onImageLoad}
                    />
                  </ReactCrop>
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Anuluj
              </Button>
              <Button
                color="primary"
                onPress={handleSaveCroppedImage}
                endContent={<Checkmark16Filled />}
              >
                Zapisz
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
