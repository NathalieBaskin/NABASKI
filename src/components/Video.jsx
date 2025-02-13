import "./Video.css";

function Video() {
  return (
    <div className="video-container">
      <video autoPlay loop muted className="background-video">
        <source src="/NABASKI.mp4" type="video/mp4" />
        Din webbläsare stödjer inte videon.
      </video>
    </div>
  );
}

export default Video;
