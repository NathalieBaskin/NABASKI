import { useState, useEffect } from "react";

function Admin() {
  const [galleries, setGalleries] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState("");
  const [galleryData, setGalleryData] = useState({
    name: "",
    password: "",
    images: [],
  });
  const [newImages, setNewImages] = useState([]);

  // Hämta alla gallerier vid sidladdning
  useEffect(() => {
    fetch("/api/galleries")
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => { throw new Error(text) });  // Läser svar som text
        }
        return res.json(); // Om svaret är OK, parsas det som JSON
      })
      .then((data) => setGalleries(data.galleries))
      .catch((err) => console.error("Fel vid hämtning av gallerier:", err));
  }, []);
  

  // Hantera val av galleri
  const handleGallerySelect = async (e) => {
    const selected = e.target.value;
    setSelectedGallery(selected);

    if (selected === "new") {
      setGalleryData({ name: "", password: "", images: [] });
      return;
    }

    try {
      const res = await fetch("/api/getGallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: selected, password: "admin" }),
      });
      const data = await res.json();
      if (data.gallery) {
        setGalleryData(data.gallery);
      }
    } catch (error) {
      console.error("Fel vid hämtning av galleri:", error);
    }
  };

  // Hantera bilduppladdning
  const handleImageUpload = (e) => {
    setNewImages([...newImages, ...e.target.files]);
  };

  // Spara eller uppdatera galleri
  const handleSaveGallery = async () => {
    if (!galleryData.name || !galleryData.password) {
      alert("Fyll i alla fält!");
      return;
    }

    let url = selectedGallery === "new" ? "/api/addGallery" : "/api/updateGallery";
    let method = selectedGallery === "new" ? "POST" : "PUT";

    await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: galleryData.id,
        name: galleryData.name,
        password: galleryData.password,
        images: galleryData.images,
      }),
    });

    window.location.reload();
  };

  // Ta bort ett galleri
  const handleDeleteGallery = async () => {
    if (!window.confirm("Är du säker? Detta kan inte ångras!")) return;

    await fetch(`/api/deleteGallery/${galleryData.id}`, { method: "DELETE" });
    window.location.reload();
  };

  return (
    <div className="admin-page">
      <h1>ADMIN</h1>

      <select onChange={handleGallerySelect} value={selectedGallery}>
        <option value="">Välj kundgalleri</option>
        {galleries.map((gallery) => (
          <option key={gallery.id} value={gallery.name}>
            {gallery.name}
          </option>
        ))}
        <option value="new">Skapa nytt</option>
      </select>

      {selectedGallery && (
        <div className="gallery-editor">
          <input
            type="text"
            placeholder="Galleri namn"
            value={galleryData.name}
            onChange={(e) => setGalleryData({ ...galleryData, name: e.target.value })}
          />
          <input
            type="password"
            placeholder="Lösenord"
            value={galleryData.password}
            onChange={(e) => setGalleryData({ ...galleryData, password: e.target.value })}
          />

          <input type="file" multiple onChange={handleImageUpload} />

          <div className="image-preview">
            {galleryData.images.map((img, index) => (
              <img key={index} src={img} alt="Galleri bild" width="100" />
            ))}
            {newImages.map((img, index) => (
              <p key={index}>{img.name}</p>
            ))}
          </div>

          <button onClick={handleSaveGallery}>Spara galleri</button>
          {selectedGallery !== "new" && <button onClick={handleDeleteGallery}>Radera galleri</button>}
        </div>
      )}
    </div>
  );
}

export default Admin;
