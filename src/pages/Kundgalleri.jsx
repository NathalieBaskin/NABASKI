import { useState, useEffect } from "react";
import "./Kundgalleri.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart, faComments, faArrowLeft, faArrowRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

function KundGalleri() {
  const [galleries, setGalleries] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [commentInput, setCommentInput] = useState("");
  const [nameInput, setNameInput] = useState("");

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/galleries");
      const data = await res.json();
      setGalleries(data.galleries || []);
    } catch (err) {
      console.error("Fel vid hämtning av gallerier:", err);
    }
  };

  const fetchComments = async (image) => {
    try {
      const res = await fetch(`http://localhost:5000/api/comments/${image}`);
      const data = await res.json();
      setLikes((prev) => ({ ...prev, [image]: data.likes }));
      setComments((prev) => ({ ...prev, [image]: data.comments }));
    } catch (err) {
      console.error("Fel vid hämtning av kommentarer:", err);
    }
  };

  const handleGalleryClick = (gallery) => {
    setSelectedGallery(gallery);
    setPasswordInput("");
    setShowGallery(false);
  };

  const handlePasswordSubmit = () => {
    if (!selectedGallery) {
      console.error("Inget galleri valt");
      return;
    }

    if (passwordInput.trim() === selectedGallery.password) {
      setShowGallery(true);
    } else {
      console.error("Fel lösenord!");
    }
  };

  const openSlideshow = (index) => {
    setSelectedImageIndex(index);
    fetchComments(selectedGallery.images[index]);
  };

  const closeSlideshow = () => {
    setSelectedImageIndex(null);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex + 1 < selectedGallery.images.length ? prevIndex + 1 : 0
    );
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : selectedGallery.images.length - 1
    );
  };

  const handleLike = async (image) => {
    try {
      const res = await fetch(`http://localhost:5000/api/like/${image}`, { method: "POST" });
      const data = await res.json();
      setLikes((prev) => ({ ...prev, [image]: data.likes }));
    } catch (err) {
      console.error("Fel vid gillning:", err);
    }
  };

  const handleCommentSubmit = async (image) => {
    if (!commentInput || !nameInput) return;
    try {
      const res = await fetch(`http://localhost:5000/api/comment/${image}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nameInput, text: commentInput }),
      });

      const data = await res.json();
      setComments((prev) => ({ ...prev, [image]: data.comments }));
      setCommentInput("");
    } catch (err) {
      console.error("Fel vid kommentering:", err);
    }
  };

  return (
    <div className="kundgalleri-page">
      {!showGallery && <h1>Kundgalleri</h1>}

      {!showGallery ? (
        <div className="galleri-grid">
          {galleries.map((gallery) => (
            <div key={gallery.id} className="galleri-item" onClick={() => handleGalleryClick(gallery)}>
              <h2>{gallery.name}</h2>
              <img src={`http://localhost:5000${gallery.representativeImage}`} />
            </div>
          ))}
        </div>
      ) : (
        <div className="image-gallery">
          {selectedGallery.images.map((image, index) => (
            <div key={image} className="image-card">
              <img src={`http://localhost:5000${image}`} onClick={() => openSlideshow(index)} />
              <div className="image-icons">
                <span onClick={() => handleLike(image)}>
                  <FontAwesomeIcon icon={likes[image] > 0 ? solidHeart : regularHeart} />
                  <span> {likes[image] || 0}</span>
                </span>
                <span>
                  <FontAwesomeIcon icon={faComments} />
                  <span> {comments[image] ? comments[image].length : 0}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedGallery && !showGallery && (
        <div className="password-modal">
          <div className="modal-content">
            <h2>{selectedGallery.name}</h2>
            <p>Detta galleri är lösenordsskyddat</p>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Ange lösenord"
            />
            <button onClick={handlePasswordSubmit}>Se galleri</button>
            <button onClick={() => setSelectedGallery(null)}>Avbryt</button>
          </div>
        </div>
      )}

      {selectedImageIndex !== null && (
        <div className="slideshow">
        
          <button className="close-btn" onClick={closeSlideshow}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <button className="prev-btn" onClick={handlePrevImage}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <img src={`http://localhost:5000${selectedGallery.images[selectedImageIndex]}`} />
          <button className="next-btn" onClick={handleNextImage}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>

          <div className="slideshow-icons">
            <span onClick={() => handleLike(selectedGallery.images[selectedImageIndex])}>
              <FontAwesomeIcon icon={likes[selectedGallery.images[selectedImageIndex]] > 0 ? solidHeart : regularHeart} />
              <span> {likes[selectedGallery.images[selectedImageIndex]] || 0}</span>
            </span>
          </div>

          <div className="comment-section">
            <input value={nameInput} onChange={(e) => setNameInput(e.target.value)} placeholder="Ditt namn..." />
            <input value={commentInput} onChange={(e) => setCommentInput(e.target.value)} placeholder="Skriv en kommentar..." />
            <button onClick={() => handleCommentSubmit(selectedGallery.images[selectedImageIndex])}>Kommentera</button>
            <div className="comments">
              {comments[selectedGallery.images[selectedImageIndex]] &&
                comments[selectedGallery.images[selectedImageIndex]].map((comment, index) => (
                  <p key={index}><strong>{comment.name}:</strong> {comment.text}</p>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default KundGalleri;
