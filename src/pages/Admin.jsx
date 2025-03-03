import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import imageCompression from "browser-image-compression";

function Admin() {
  // Kundgalleri-relaterade state
  const [galleries, setGalleries] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState("");
  const [galleryName, setGalleryName] = useState("");
  const [password, setPassword] = useState("");
  const [representativeImage, setRepresentativeImage] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [error, setError] = useState("");

  // Portfolio-relaterade state
  const [portfolioCategories] = useState([
    "Bröllop",
    "Förlovning",
    "Familj",
    "Barn",
    "Modell",
    "Event",
  ]);
  const [selectedPortfolioCategory, setSelectedPortfolioCategory] =
    useState("");
  const [portfolioImages, setPortfolioImages] = useState([]);
  const [imageCategory, setImageCategory] = useState(""); // Här deklareras och används setImageCategory

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

  // Kundgalleri-bilduppladdning
  const handleImageUpload = async (e) => {
    const uploadedImages = Array.from(e.target.files);
    const compressedImages = [];

    for (let image of uploadedImages) {
      try {
        const compressedFile = await compressImage(image);
        compressedImages.push(compressedFile);
      } catch (err) {
        console.error("Kunde inte komprimera bild:", err);
        setError("Kunde inte komprimera en eller flera bilder.");
        return;
      }
    }

    setNewImages([...newImages, ...compressedImages]);
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

    try {
      const response = await fetch(url, {
        method: selectedGallery === "new" ? "POST" : "PUT",
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

    const confirmDelete = window.confirm(
      "Är du säker på att du vill radera detta galleri?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/deleteGallery/${selectedGallery}`,
        {
          method: "DELETE",
        }
      );

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

  // Komprimeringsfunktion
  const compressImage = async (imageFile) => {
    console.log("Komprimerar", imageFile.name);
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      console.log(
        "Komprimerad fil storlek",
        compressedFile.size / 1024 / 1024,
        "MB"
      );
      return compressedFile;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // --- Portfolio-funktionalitet ---
  const handlePortfolioImageUpload = async (e) => {
    const uploadedImages = Array.from(e.target.files);
    const compressedImages = [];

    for (let image of uploadedImages) {
      try {
        const compressedFile = await compressImage(image);
        compressedImages.push(compressedFile);
      } catch (err) {
        console.error("Kunde inte komprimera bild:", err);
        setError("Kunde inte komprimera en eller flera bilder.");
        return;
      }
    }

    setPortfolioImages([...portfolioImages, ...compressedImages]);
  };

  const removePortfolioImage = (index) => {
    setPortfolioImages(portfolioImages.filter((_, i) => i !== index));
  };

  const normalizeCategory = (category) => {
    return category
      .toLowerCase()
      .replace(/å/g, "a")
      .replace(/ä/g, "a")
      .replace(/ö/g, "o");
  };

  const handleSavePortfolioImages = async () => {
    if (!selectedPortfolioCategory || portfolioImages.length === 0) {
      setError("Kategori och bilder måste väljas!");
      return;
    }

    const formData = new FormData();

    // Skicka kategorin i normaliserad form
    formData.append("category", normalizeCategory(selectedPortfolioCategory)); // t.ex. "brollop" för "Bröllop"

    // Skicka namnet på kategorin i exakt format
    formData.append("name", selectedPortfolioCategory); // t.ex. "Bröllop"

    // Lägg till alla bilder
    portfolioImages.forEach((image) => {
      formData.append("images", image);
    });

    try {
      console.log("🚀 Skickar API-anrop till /api/addPortfolioImages...");
      const response = await fetch(
        "http://localhost:8000/api/addPortfolioImages",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Bilder uppladdade till portfolio!");
        setPortfolioImages([]); // Töm fältet efter uppladdning
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Något gick fel vid uppladdning.");
      }
    } catch (err) {
      console.error("❌ Fel vid uppladdning:", err);
      setError("Kunde inte ladda upp bilder.");
    }
  };

  const getImageSource = (img) => {
    if (img instanceof File || img instanceof Blob) {
      return URL.createObjectURL(img);
    }

    // Om img inte är en File eller Blob, anta att det är en sökväg eller URL (redan en sträng)
    if (typeof img === "string") {
      // Kontrollera om img är en fullständig URL
      if (img.startsWith("http://") || img.startsWith("https://")) {
        return img; // Använd fullständig URL
      } else {
        return `http://localhost:5000/${img}`; // Lägg till bas-URL om det bara är en sökväg
      }
    }

    console.error("Ogiltig bildtyp:", img);
    return ""; // Returnera en tom sträng eller en platshållarbild
  };

  return (
    <div className="admin-page">
      <h1>Admin</h1>
      <div>
        <h3>Kundgalleri</h3>
      </div>
      {/* Kundgalleri-sektionen */}
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

          <label>Välj cover bild</label>
          <input
            type="file"
            onChange={(e) => setRepresentativeImage(e.target.files[0])}
          />
          {representativeImage && (
            <img
              src={
                representativeImage instanceof File
                  ? URL.createObjectURL(representativeImage)
                  : `http://localhost:5000${representativeImage}`
              }
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
                  src={getImageSource(img)}
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

      {/* Portfolio-sektionen */}
      <h3>Portfolio</h3>
      <select
        onChange={(e) => setSelectedPortfolioCategory(e.target.value)}
        value={selectedPortfolioCategory}
      >
        <option value="">Välj kategori</option>
        {portfolioCategories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => setImageCategory(e.target.value)} // Används för att sätta kategori för uppladdning i backend
        value={imageCategory}
      >
        <option value="">Välj Namn</option>
        {portfolioCategories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      {selectedPortfolioCategory && (
        <div className="portfolio-editor">
          <input type="file" multiple onChange={handlePortfolioImageUpload} />

          <div className="image-preview">
            {portfolioImages.map((img, index) => (
              <div
                key={index}
                className="draggable-image"
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragOver={(e) => e.preventDefault()}
              >
                <img src={getImageSource(img)} width="100" alt="Preview" />
                <button onClick={() => removePortfolioImage(index)}>X</button>
              </div>
            ))}
          </div>

          <div className="button-group">
            <button onClick={handleSavePortfolioImages}>
              Spara
            </button>
          </div>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Admin;
