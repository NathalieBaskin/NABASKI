import "./Video.css";

const videos = [
  "/videos/video1.mp4",
  "/videos/video2.mp4",
  "/videos/video3.mp4",
  "/videos/video4.mp4",
  "/videos/video5.mp4",
  "/videos/video6.mp4",
  "/videos/video7.mp4",
  "/videos/video8.mp4",
  "/videos/video9.mp4",
  "/videos/video10.mp4",
  "/videos/video11.mp4",
  "/videos/video12.mp4",
  "/videos/video13.mp4",
];

function Video() {
  return (
    <div className="video-container">
      <div className="video-carousel">
        {[...videos, ...videos].map((video, index) => (
          <video key={index} src={video} autoPlay loop muted className="background-video"></video>
        ))}
      </div>
    </div>
  );
}

export default Video;
