import React, { useState } from "react";

const ImageUploader = ({ image, setImage }) => {
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setImage(reader.result);
        setLoading(true);

        const formData = new FormData();
        formData.append("files", file);

        try {
          const response = await fetch(
            "https://app.cloudjobmanager.com/cdn/upload",
            {
              method: "POST",
              body: formData,
            }
          );

          if (response.ok) {
            const data = await response.json();
            setImage(
              `https://app.cloudjobmanager.com/cdn/upload/${data.files[0].filename}`
            );
          } else {
            console.error("Upload failed:", response.statusText);
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        } finally {
          setLoading(false);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div>
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleImageChange}
      />
      <div
        onClick={handleClick}
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          overflow: "hidden",
          cursor: "pointer",
          border: "2px solid #ccc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f1f1f1",
        }}
      >
        {loading ? (
          <span>Loading...</span>
        ) : image ? (
          <img
            src={image}
            alt="Preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/020/911/731/small/profile-icon-avatar-icon-user-icon-person-icon-free-png.png"
            alt="Default"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
