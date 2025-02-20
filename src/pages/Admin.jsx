import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

function Admin() {
  const [galleries, setGalleries] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState("");
  const [galleryName, setGalleryName] = useState("");
  const [password, setPassword] = useState("");
  const [representativeImage, setRepresentativeImage] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/galleries");
      const data = await res.json();
      setGalleries(data.galleries || []);
    } catch (err) {
      console.error("Serverfel vid galleri-sparande:", err);
      setError("Något gick fel, försök igen.");
    }
  };

  const handleGallerySelect = (e) => {
    const selected = e.target.value;
    setSelectedGallery(selected);

    if (selected === "new") {
      setGalleryName("");
      setPassword("");
      setNewImages([]);
      setRepresentativeImage(null);
      return;
    }

    const gallery = galleries.find((g) => g.id === parseInt(selected));
    if (gallery) {
      setGalleryName(gallery.name);
      setPassword(gallery.password);
      setRepresentativeImage(gallery.representativeImage);
      setNewImages(gallery.images || []);
    }
  };

  const handleImageUpload = (e) => {
    setNewImages([...newImages, ...Array.from(e.target.files)]);
  };

  const removeImage = (index) => {
    setNewImages(newImages.filter((_, i) => i !== index));
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  const handleDrop = (e, newIndex) => {
    e.preventDefault();
    const oldIndex = parseInt(e.dataTransfer.getData("index"), 10);
    if (oldIndex !== newIndex) {
      const reorderedImages = [...newImages];
      const [movedImage] = reorderedImages.splice(oldIndex, 1);
      reorderedImages.splice(newIndex, 0, movedImage);
      setNewImages(reorderedImages);
    }
  };

  const handleSaveGallery = async () => {
    if (!galleryName || !password) {
      setError("Alla fält måste fyllas i!");
      return;
    }

    const formData = new FormData();
    formData.append("name", galleryName);
    formData.append("password", password);

    if (representativeImage instanceof File) {
      formData.append("representativeImage", representativeImage);
    }

    newImages.forEach((image) => {
      formData.append("images", image);
    });

    let url =
      selectedGallery === "new"
        ? "http://localhost:5000/api/addGallery"
        : `http://localhost:5000/api/updateGallery/${selectedGallery}`;
    let method = selectedGallery === "new" ? "POST" : "PUT";

    try {
      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (response.ok) {
        await fetchGalleries();
        alert("Galleri sparat!");
        navigate("/kundgalleri");
      } else {
        setError("Något gick fel, försök igen.");
      }
    } catch (err) {
      console.error("Serverfel vid galleri-sparande:", err);
      setError("Något gick fel, försök igen.");
    }
  };

  const handleDeleteGallery = async () => {
    if (!selectedGallery || selectedGallery === "new") return;

    const confirmDelete = window.confirm("Är du säker på att du vill radera detta galleri?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/deleteGallery/${selectedGallery}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Galleri raderat!");
        setSelectedGallery("");
        fetchGalleries();
      } else {
        setError("Kunde inte radera galleriet.");
      }
    } catch (err) {
      console.error("Fel vid radering:", err);
      setError("Något gick fel vid radering.");
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin</h1>
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
          <input type="text" value={galleryName} onChange={(e) => setGalleryName(e.target.value)} />

          <label>Lösenord</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <label>Välj representativ bild</label>
          <input type="file" onChange={(e) => setRepresentativeImage(e.target.files[0])} />
          {representativeImage && (
            <img
              src={representativeImage instanceof File ? URL.createObjectURL(representativeImage) : `http://localhost:5000${representativeImage}`}
              width="100"
              alt="Förhandsvisning"
            />
          )}

          <label>Ladda upp nya bilder</label>
          <input type="file" multiple onChange={handleImageUpload} />

          <div className="image-preview">
            {newImages.map((img, index) => (
              <div
                key={index}
                className="draggable-image"
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragOver={(e) => e.preventDefault()}
              >
                <img
                  src={img instanceof File ? URL.createObjectURL(img) : `http://localhost:5000${img}`}
                  width="100"
                  alt="Uppladdad bild"
                />
                <button onClick={() => removeImage(index)}>X</button>
              </div>
            ))}
          </div>

          {error && <p className="error">{error}</p>}

          <div className="button-group">
            <button onClick={handleSaveGallery}>Spara Galleri</button>
            {selectedGallery !== "new" && (
              <button onClick={handleDeleteGallery} className="delete-button">
                🗑 Radera Galleri
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
