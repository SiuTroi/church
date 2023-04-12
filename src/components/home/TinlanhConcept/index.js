import { Link } from "react-router-dom";
import "./TinlanhConcept.scss";
import { useState } from "react";

function TinlanhConcept() {
  const [isOnPlayVideo, setIsOnPlayVideo] = useState(false);
  return (
    <section className="tinlanh-concept">
      <div className="container tinlanh-concept-container">
        <div className="ytb-iframe">
          {isOnPlayVideo ? (
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/kG8yPcWL8MA?autoplay=1&mute=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ borderRadius: "12px" }}
              className="tinlanh-concept-video"
            ></iframe>
          ) : (
            <div
              className="custom-playvideo-btn"
              onClick={() => setIsOnPlayVideo(true)}
            >
              <i className="fa-regular fa-circle-play"></i>
            </div>
          )}
        </div>
        <div className="tinlanh-concept-text">
          <h6>Tin lành cho mọi người</h6>
          <h1>Tin Lành là gì?</h1>
          <p>
            Tâm điểm trong tín lý của đạo Tin Lành là niềm tin vào Chúa Giê-xu
            là Con của Đức Chúa Trời và là Đấng Cứu Thế của toàn nhân loại. Vậy
            nhưng nhân loại cần được cứu khỏi điều gì?
          </p>
          <Link to="/tin-lanh-la-gi" className="btn">
            TÌM HIỂU THÊM <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default TinlanhConcept;
