import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Kundgalleri.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart, faComments, faArrowLeft, faArrowRight, faTimes, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
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

    // Hantering av varukorg
    const [cart, setCart] = useState(() => {
        // Läs in varukorgen från localStorage vid initiering
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });
    const [showAddToCart, setShowAddToCart] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetchGalleries();
    }, []);

    // Uppdatera localStorage när varukorgen ändras
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

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
            const res = await fetch(`http://localhost:5000/api/comments/${encodeURIComponent(image)}`);
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

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
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

    const openSlideshow = (index, image) => {
        setSelectedImageIndex(index);
        setSelectedImage(image);
        fetchComments(selectedGallery.images[index]);
    };

    const closeSlideshow = () => {
        setSelectedImageIndex(null);
        setShowAddToCart(false);
    };

    const handleNextImage = () => {
        if (selectedImageIndex !== null) {
            const newIndex = (selectedImageIndex + 1) % selectedGallery.images.length;
            setSelectedImageIndex(newIndex);
            setSelectedImage(selectedGallery.images[newIndex]);
            fetchComments(selectedGallery.images[newIndex]);
        }
    };

    const handlePrevImage = () => {
        if (selectedImageIndex !== null) {
            const newIndex = (selectedImageIndex - 1 + selectedGallery.images.length) % selectedGallery.images.length;
            setSelectedImageIndex(newIndex);
            setSelectedImage(selectedGallery.images[newIndex]);
            fetchComments(selectedGallery.images[newIndex]);
        }
    };
    const handleAddToCart = () => {
        const product = {
            image: selectedImage,
            quantity,
            size,
            price: 450,
        };
        setCart(prevCart => [...prevCart, product]); // Use functional update
        setShowAddToCart(false);
    
        // Visa pop-up när produkten har lagts till
        setShowCartPopup(true);
        setTimeout(() => {
            setShowCartPopup(false); // Dölj pop-upen efter 2 sekunder
        }, 2000);
    };
    

    const handleLike = async (image) => {
        try {
            const res = await fetch(`http://localhost:5000/api/like/${encodeURIComponent(image)}`, { method: "POST" });
            const data = await res.json();
            setLikes((prev) => ({ ...prev, [image]: data.likes }));
        } catch (err) {
            console.error("Fel vid gillning:", err);
        }
    };

    const handleCommentSubmit = async (image) => {
        if (!commentInput || !nameInput) return;
        try {
            const res = await fetch(`http://localhost:5000/api/comment/${encodeURIComponent(image)}`, {
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

    const goToCart = () => {
        navigate('/cart');
    };

    const openAddToCartModal = (image) => {
        setSelectedImage(image);
        setShowAddToCart(true);
    };
    const [showCartPopup, setShowCartPopup] = useState(false);


    return (
        <div className="kundgalleri-page">
            {/* "Varukorgen" button */}
            <div className="cart-module">
                <button className="cart-button" onClick={goToCart}>
                    Varukorgen ({cart.length})
                </button>
                {showCartPopup && (
    <div className="cart-popup">
        <p>Produkten har lagts till i varukorgen!</p>
    </div>
)}

                {showAddToCart && (
                    <div className="add-to-cart-modal">
                        <div className="modal-content">
                            <div>
                                <label>Antal</label>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    min="1"
                                />
                            </div>
                            <div>
                                <label>Storlek</label>
                                <select value={size} onChange={(e) => setSize(e.target.value)}>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                </select>
                            </div>
                            <div>Summa: 450kr</div>
                            <div>
                                <button onClick={handleAddToCart}>Lägg i varukorg</button>
                                <button onClick={() => setShowAddToCart(false)}>Avbryt</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {!showGallery && <h1>Kundgalleri</h1>}

            {!showGallery ? (
                <div className="galleri-grid">
                    {galleries.map((gallery) => (
                        <div key={gallery.id} className="galleri-item" onClick={() => handleGalleryClick(gallery)}>
                            <h2>{gallery.name}</h2>
                            <img src={`http://localhost:5000${gallery.representativeImage}`} alt={gallery.name} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="image-gallery">
                    {selectedGallery.images.map((image, index) => (
                        <div key={image} className="image-card">
                            <img
                                src={`http://localhost:5000${image}`}
                                alt={`Bild ${index + 1}`}
                                onClick={() => openSlideshow(index, image)}
                            />
                            <div className="image-icons">
                                <span onClick={() => handleLike(image)}>
                                    <FontAwesomeIcon icon={likes[image] > 0 ? solidHeart : regularHeart} />
                                    <span> {likes[image] || 0}</span>
                                </span>
                                <span>
                                    <FontAwesomeIcon icon={faComments} />
                                    <span> {comments[image] ? comments[image].length : 0}</span>
                                </span>
                                <span onClick={() => openAddToCartModal(image)}>
                                    <FontAwesomeIcon icon={faShoppingCart} /> {/* Shopping cart icon */}
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
                        <form onSubmit={handlePasswordSubmit}>
                            <input
                                type="password"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                placeholder="Ange lösenord"
                            />
                            <button type="submit">Se galleri</button>
                            <button type="button" onClick={() => setSelectedGallery(null)}>Avbryt</button>
                        </form>
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
                    <img
                        src={`http://localhost:5000${selectedGallery.images[selectedImageIndex]}`}
                        alt={`Bild ${selectedImageIndex + 1}`}
                    />
                    <button className="next-btn" onClick={handleNextImage}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>

                    <div className="slideshow-icons">
                        <span onClick={() => handleLike(selectedGallery.images[selectedImageIndex])}>
                            <FontAwesomeIcon
                                icon={likes[selectedGallery.images[selectedImageIndex]] > 0 ? solidHeart : regularHeart}
                            />
                            <span> {likes[selectedGallery.images[selectedImageIndex]] || 0}</span>
                        </span>
                    </div>

                    <div className="comment-section">
                        <input
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                            placeholder="Ditt namn..."
                        />
                        <input
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                            placeholder="Skriv en kommentar..."
                        />
                        <button onClick={() => handleCommentSubmit(selectedGallery.images[selectedImageIndex])}>
                            Kommentera
                        </button>
                        <div className="comments">
                            {comments[selectedGallery.images[selectedImageIndex]] &&
                                comments[selectedGallery.images[selectedImageIndex]].map((comment, index) => (
                                    <p key={index}>
                                        <strong>{comment.name}:</strong> {comment.text}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default KundGalleri;
