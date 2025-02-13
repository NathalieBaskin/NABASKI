import "./Testimonials.css";

function Testimonials() {
  const testimonials = [
    {
      text: "Så himla nöjd med Nathalie som fotograf! Vi hade henne på vår vigsel på stadshuset och jag hade en vision som hon förstod och det blev bättre än förväntat! Kommer definitivt anlita henne igen i framtiden.",
      author: "Luisa",
      image: "/images/testimon-lusisa.jpg",
    },
    {
      text: "Kan varmt rekommendera denna tjej! Hon tar grymma bilder och har ett öga för detaljer",
      author: "Madelene",
      image: "/images/testimon-madde.jpg",
    },
    {
      text: "Du är en sån trygg och lyhörd fotograf! Rekommenderar starkt!!",
      author: "Cassandra",
      image: "/images/testimon-cassie.jpg",
    },
  ];

  return (
    <section className="testimonials">
      {testimonials.map((item, index) => (
        <div
          key={index}
          className={`testimonial ${index % 2 === 0 ? "left" : "right"}`}
        >
          <img src={item.image} alt="Kundbild" className="testimonial-image" />
          <div className="testimonial-text">
            <p>{item.text}</p>
            <h4>- {item.author}</h4>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Testimonials;
