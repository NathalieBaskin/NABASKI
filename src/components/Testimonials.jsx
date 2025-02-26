import "./Testimonials.css";

function Testimonials() {
  const testimonials = [
    {
      text: "Så himla nöjd med Nathalie som fotograf! Vi hade henne på vår vigsel på stadshuset och jag hade en vision som hon förstod och det blev bättre än förväntat! Kommer definitivt anlita henne igen i framtiden.",
      author: "Luisa",
      image: "/images/testimon-lusisa.jpg",
    },
    {
      text: "Du är en sån trygg och lyhörd fotograf! Rekommenderar starkt!!",
      author: "Cassandra",
      image: "/images/testimon-cassie.jpg",
    },
    {
      text: "Kan varmt rekommendera denna tjej! Hon tar grymma bilder och har ett öga för detaljer",
      author: "Madelene",
      image: "/images/testimon-madde.jpg",
    },
 
    {
      text: "I have worked with Nathalie on various projects and have never been disappointed. She has an amazing eye for different situations, whether it is portrait, events, fashion or scenery. A talented photographer who is easy to work with, to say the least.",
      author: "Karolina",
      image: "/images/testimon-karolina.jpg",
    }
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
