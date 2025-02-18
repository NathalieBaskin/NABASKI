import { useState, useEffect } from 'react';

function Admin() {
  const [galleries, setGalleries] = useState([]);  // För att hålla alla gallerier
  const [selectedGallery, setSelectedGallery] = useState("");  // För att hålla det valda galleriet
  const [newGalleryName, setNewGalleryName] = useState("");  // För att hålla det nya galleri-namnet
  const [newGalleryPassword, setNewGalleryPassword] = useState("");  // För att hålla lösenordet
  const [newImages, setNewImages] = useState([]);  // För att hålla bilder för det nya galleriet

  // Hantera galleri-val (inklusive skapa nytt)
  const handleGallerySelect = (event) => {
    const value = event.target.value;
    setSelectedGallery(value);
    if (value === "new") {
      // Om användaren väljer "Skapa nytt", visa formuläret
      setNewGalleryName("");
      setNewGalleryPassword("");
      setNewImages([]);
    }
  };

  // Hämta alla gallerier från backend när komponenten laddas
  useEffect(() => {
    fetch("http://localhost:5000/api/galleries")
      .then((response) => response.json())
      .then((data) => setGalleries(data.galleries))
      .catch((error) => console.error("Error fetching galleries:", error));
  }, []);

  // Hantera inlämning av nytt galleri
  const handleAddGallery = (e) => {
    e.preventDefault();

    // Kontrollera att vi har ett namn och lösenord
    if (!newGalleryName || !newGalleryPassword || newImages.length === 0) {
      alert("Vänligen fyll i alla fält och lägg till bilder.");
      return;
    }

    // Konvertera FileList till en array
    const imagesArray = Array.from(newImages);  // Konverterar FileList till en riktig array

    // Skapa FormData för att skicka bilder och information
    const formData = new FormData();
    formData.append("name", newGalleryName);
    formData.append("password", newGalleryPassword);
    imagesArray.forEach((file) => {
      formData.append("images", file);  // Lägg till varje bild
    });

    // Skicka POST-begäran till backend
    fetch("http://localhost:5000/api/addGallery", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setGalleries([...galleries, data.gallery]);  // Lägg till det nya galleriet i vår lista
        setSelectedGallery(data.gallery.name);  // Välj det nya galleriet
        alert("Galleri skapades!");
      })
      .catch((error) => {
        console.error("Error adding gallery:", error);
        alert("Kunde inte skapa galleri.");
      });
  };

  return (
    <div>
      <h1>Admin - Hantera Gallerier</h1>
      
      {/* Dropdown för att välja ett galleri eller skapa ett nytt */}
      <select value={selectedGallery} onChange={handleGallerySelect}>
        <option value="">Välj ett galleri</option>
        {galleries.map((gallery, index) => (
          <option key={index} value={gallery.name}>
            {gallery.name}
          </option>
        ))}
        <option value="new">Skapa nytt</option>  {/* Alternativ för att skapa nytt galleri */}
      </select>

      {selectedGallery === "new" && (
        <form onSubmit={handleAddGallery}>
          <h2>Skapa nytt galleri</h2>
          <label>Galleri namn:</label>
          <input
            type="text"
            value={newGalleryName}
            onChange={(e) => setNewGalleryName(e.target.value)}
            required
          />
          <label>Lösenord:</label>
          <input
            type="password"
            value={newGalleryPassword}
            onChange={(e) => setNewGalleryPassword(e.target.value)}
            required
            autoComplete="current-password"  // Lägger till autocomplete-attributet
          />
          <label>Välj bilder:</label>
          <input
            type="file"
            multiple
            onChange={(e) => setNewImages(e.target.files)}  // Lägger till valda bilder i state
            required
          />
          <button type="submit">Skapa galleri</button>
        </form>
      )}

      {selectedGallery !== "new" && selectedGallery && (
        <p>Du har valt: {selectedGallery}</p>
      )}
    </div>
  );
}

export default Admin;
