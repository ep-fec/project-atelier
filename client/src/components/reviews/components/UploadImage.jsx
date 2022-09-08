import React from 'react';

const UploadImage = ( {previewSources, setPreviewSources} ) => {

  const handlePreview = (e) => {
    const img = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onloadend = () => {
      setPreviewSources([...previewSources, reader.result]);
    };
  };

  // const handleRemove = (i) => {
  //   let images = previewSources.slice().splice(i, 1);
  //   setPreviewSources(images);
  // };

  return (
    <div className="new-review-upload-images">

      {previewSources.length ?
        previewSources.map((image, i) => (
          <img
            className="review-thumbnail"
            src={image}
            alt="Uploaded Image"
            key={i}
          />
        ))
        : null}

      <br /><br />

      <input
        type="file"
        multiple
        disabled={(previewSources.length >= 5)}
        onChange={(e) => handlePreview(e)}
      />

      {previewSources.length === 5 ?
      <div className="max-uploads-reached"> Max uploads reached. </div> : null}

    </div>
  );
};

export default UploadImage;