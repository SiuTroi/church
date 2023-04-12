import { useState } from "react";
import { Link } from "react-router-dom";
import { removeVietnameseAccents } from "../../../utils";

function VideoPlay({ videoPlay }) {
    const [isOnPlay, setIsOnPlay] = useState(false);
  return (
    <div className="home-newvideo-play">
      <iframe
        width="100%"
        height="512"
        style={{ borderRadius: "12px" }}
        src={isOnPlay ? videoPlay.videoSrc + '?autoplay=1&mute=1' : videoPlay.videoSrc}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="home-newvideo-iframe"
      ></iframe>
      {!isOnPlay && 
        <>
            <button className="btn-home-play-video-mask" onClick={() => setIsOnPlay(true)}>
            <i className="fa-solid fa-play"></i>
        </button>
        <div
            className="home-newvideo-mask"
            style={{
            backgroundImage: `url(${videoPlay.img})`,
            }}
            onClick={() => setIsOnPlay(true)}
        >
            <div className="tags">
                {videoPlay.tags.map((tag, index) => (
                    <Link to={`/${removeVietnameseAccents(tag)}`} className="tag" key={index}>{tag}</Link>
                ))}
            <h2>{videoPlay.title}</h2>
            <p>
                {videoPlay.auther}
                <span>
                {videoPlay.time} <i className="fa-regular fa-comment"></i> 0
                </span>
            </p>
            </div>
        </div>
        </>
      }
    </div>
  );
}

export default VideoPlay;
