import { useState, useEffect } from "react";
import "./Admin.css";

function Admin() {
  const [galleries, setGalleries] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState("");
  const [galleryName, setGalleryName] = useState("");
  const [password, setPassword] = useState("");
  const [representativeImage, setRepresentativeImage] = useState("");
  const [newImages, setNewImages] = useState([]);
  const [error, setError] = useState("");

  // Hämtar alla gallerier från servern när sidan laddas
  useEffect(() => {
    fetch("http://localhost:5000/api/galleries")
      .then((res) => res.json())
      .then((data) => setGalleries(data.galleries))
      .catch((error) => console.error("Error fetching galleries:", error));
  }, []);

  const handleGallerySelect = async (e) => {
    const selected = e.target.value;
    setSelectedGallery(selected);

    if (selected === "new") {
      setGalleryName("");
      setPassword("");
      setNewImages([]);
      setRepresentativeImage("");
      return;
    }

    // Hämta data för det valda galleriet från servern
    try {
      const res = await fetch(`http://localhost:5000/api/getGallery/${selected}`);
      const data = await res.json();

      // Uppdatera fälten med det valda galleriets data
      setGalleryName(data.gallery.name);
      setPassword(data.gallery.password);
      setRepresentativeImage(data.gallery.representativeImage);
      setNewImages(data.gallery.images);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    }
  };

  const handleImageUpload = (e) => {
    setNewImages([...newImages, ...e.target.files]);
  };

  const handleRepresentativeImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRepresentativeImage(URL.createObjectURL(file));  // Skapar en URL för den uppladdade representativa bilden
    }
  };

  const handleImageRemove = (index) => {
    const updatedImages = newImages.filter((_, i) => i !== index);
    setNewImages(updatedImages);
  };

  const handleImageOrderChange = (index, direction) => {
    const updatedImages = [...newImages];
    const [removed] = updatedImages.splice(index, 1);
    updatedImages.splice(index + direction, 0, removed);
    setNewImages(updatedImages);
  };

  const handleSaveGallery = async () => {
    if (!galleryName || !password) {
      setError("Alla fält måste fyllas i!");
      return;
    }

    const formData = new FormData();
    formData.append("name", galleryName);
    formData.append("password", password);
    formData.append("representativeImage", representativeImage);
    newImages.forEach((image) => {
      formData.append("images", image);
    });

    let url = selectedGallery === "new" ? "http://localhost:5000/api/addGallery" : `http://localhost:5000/api/updateGallery/${selectedGallery}`;
    let method = selectedGallery === "new" ? "POST" : "PUT";

    try {
      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setGalleries(data.galleries);
        setError("");
        alert(data.message);
      } else {
        setError("Något gick fel, försök igen.");
      }
    } catch (error) {
      console.error("Error saving gallery:", error);
      setError("Något gick fel, försök igen.");
    }
  };

  const handleDeleteGallery = async () => {
    if (window.confirm("Är du säker på att du vill ta bort detta galleri?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/deleteGallery/${selectedGallery}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setGalleries(galleries.filter((g) => g.id !== selectedGallery));
          setSelectedGallery("");
        } else {
          setError("Fel vid radering av galleri.");
        }
      } catch (error) {
        console.error("Error deleting gallery:", error);
      }
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin Panel</h1>
      <select onChange={handleGallerySelect} value={selectedGallery}>
        <option value="">Välj ett galleri</option>
        {galleries.map((gallery) => (
          <option key={gallery.id} value={gallery.id}>
            {gallery.name}
          </option>
        ))}
        <option value="new">Skapa nytt galleri</option>
      </select>

      {selectedGallery && (
        <div className="gallery-editor">
          <label>Galleri namn</label>
          <input
            type="text"
            value={galleryName}
            onChange={(e) => setGalleryName(e.target.value)}
          />

          <label>Lösenord</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Välj representativ bild</label>
          <input
            type="file"
            onChange={handleRepresentativeImageUpload}
          />
          {representativeImage && (
            <img src={representativeImage} alt="Representativ bild" width="100" />
          )}

          <label>Ladda upp nya bilder</label>
          <input type="file" multiple onChange={handleImageUpload} />

          {newImages.length > 0 && (
            <div className="image-preview">
              {newImages.map((image, index) => (
                <div key={index} className="image-item">
                  <img
                    src={image instanceof File ? URL.createObjectURL(image) : image}
                    alt={`image-${index}`}
                    width="100"
                  />
                  <button onClick={() => handleImageRemove(index)}>Ta bort</button>
                  <button onClick={() => handleImageOrderChange(index, -1)}>↑</button>
                  <button onClick={() => handleImageOrderChange(index, 1)}>↓</button>
                </div>
              ))}
            </div>
          )}

          {error && <p className="error">{error}</p>}

          <button onClick={handleSaveGallery}>
            {selectedGallery === "new" ? "Skapa galleri" : "Uppdatera galleri"}
          </button>

          {selectedGallery !== "new" && (
            <button onClick={handleDeleteGallery}>Radera galleri</button>
          )}
        </div>
      )}
    </div>
  );
}

export default Admin;
