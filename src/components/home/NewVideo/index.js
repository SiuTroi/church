import { Link } from "react-router-dom";
import "./NewVideo.scss";
import VideoPlay from "./VideoPlay";
import { useState } from "react";
import { removeVietnameseAccents } from "../../../utils";

import chiTheTrongThan from "../../../images/chi-the-trong-than.jpg";
import leCamta from "../../../images/le-cam-ta.jpg";
import ngayPhuNuTinLanh from "../../../images/ngay-phu-nu-tin-lanh.jpg";
import truyenGiangThieuNhi from "../../../images/truyen-giang-thieu-nhi.jpg";
import truyenGiangGiangSingThieuNhi from "../../../images/truyen-giang-giang-sinh-thieu-nhi.jpg";
import triAnGiaoVienTruongChuaNhat from "../../../images/tri-an-giao-vien-truong-chua-nhat.jpg";

const newVideoList = [
  {
    title: "Giới thiệu Ban Âm nhạc",
    tags: [
      "Bản tin",
      "Tin tức",
      "video",
    ],
    img: chiTheTrongThan,
    videoSrc: "https://www.youtube.com/embed/aN5HuMEEOvA",
    auther: "TRẦN NGỌC LAN",
    time: "17/03/2023",
  },
  {
    title: "LỄ CẢM TẠ CHÚA - KỶ NIỆM 20 NĂM THÀNH LẬP BAN TRÁNG NIÊN.",
    tags: [
      "Bản tin",
      "Tin tức",
      "video",
    ],
    img: leCamta,
    videoSrc: "https://www.youtube.com/embed/Ra52CpsVRqU",
    auther: "TRẦN NGỌC LAN",
    time: "17/03/2023",
  },
  {
    title: "Ngày Phụ nữ Tin Lành – năm 2023",
    tags: [
      "Bản tin",
      "Tin tức",
      "video",
    ],
    img: ngayPhuNuTinLanh,
    videoSrc: "https://www.youtube.com/embed/fBoLYNxVDUY",
    auther: "TRẦN NGỌC LAN",
    time: "17/03/2023",
  },
  {
    title: "CHƯƠNG TRÌNH TRUYỀN GIẢNG GIÁNG SINH DÀNH CHO THIẾU NHI KIÊN GIANG",
    tags: [
      "Mục vụ thiếu nhi",
      "video",
    ],
    img: truyenGiangThieuNhi,
    videoSrc: "https://www.youtube.com/embed/pqAIlAUJvls",
    auther: "TRẦN NGỌC LAN",
    time: "17/03/2023",
  },
  {
    title: "CHƯƠNG TRÌNH TRUYỀN GIẢNG GIÁNG SINH DÀNH CHO THIẾU NHI",
    tags: [
      "Mục vụ thiếu nhi",
      "video",
    ],
    img: truyenGiangGiangSingThieuNhi,
    videoSrc: "https://www.youtube.com/embed/TyDSvHnFr4Q",
    auther: "TRẦN NGỌC LAN",
    time: "17/03/2023",
  },
  {
    title: "Tri ân giáo viên Trường Chúa Nhật",
    tags: [
      "Chi thể trong thân",
      "video",
    ],
    img: triAnGiaoVienTruongChuaNhat,
    videoSrc: "https://www.youtube.com/embed/sx0ozyWnDx0",
    auther: "Huỳnh Thiên Ý",
    time: "17/03/2023",
  },
];

function NewVideo() {
  const [videoPlay, setVideoPlay] = useState(newVideoList[0]);
  
  return (
    <section className="home-newvideo">
      <div className="container home-newvideo-title section-title">
        <h1>Video mới nhất</h1>
        <div></div>
        <Link to={'/video'}>
          Xem tất cả{" "}
          <span>
            <i className="fa-solid fa-arrow-right"></i>
          </span>
        </Link>
      </div>
      <div className="container home-newvideo-container">

        <VideoPlay videoPlay={videoPlay} />

        <div className="home-newvideo-list">
          {newVideoList.map((newVideoItem, index) => (
            <div
              className="home-newvideo-item"
              data-src="https://www.youtube.com/embed/Ra52CpsVRqU"
              image-url="https://i.ytimg.com/vi/aN5HuMEEOvA/maxresdefault.jpg"
              key={index}
              onClick={() => setVideoPlay(newVideoItem)}
            >
              <img src={newVideoItem.img} alt="" />
              <div>
                {newVideoItem.tags.map((tag, tagIndex) => (
                  <Link to={`/${removeVietnameseAccents(tag)}`} key={tagIndex}>{tag}</Link>
                ))}
                <h6 className="three-dot">{newVideoItem.title}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewVideo;
