import { Link } from "react-router-dom";
import "./NotifyAndNews.scss";
import { useEffect, useState } from "react";
import { dateConvert, removeVietnameseAccents } from "../../../utils";
import { getPostAsCategoryDirected } from "../../../api";
import { uriImage } from "../../../constants";
import Loading from "../../Loading";

function NotifyAndNews({ category }) {
  const [notifyAndNewsListArray, setNotifyAndNewsListArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const catePath = removeVietnameseAccents(category);

  useEffect(() => {
    const getGwwPost = async () => {
      const respone = await getPostAsCategoryDirected(category, 0, 4);
      const data = await respone.data;
      setNotifyAndNewsListArray(data.reverse());
    };
    getGwwPost();
  }, []);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <section className="container noticeAndnew">
      <div className="noticeAndnew-title section-title">
        <h1>Thông báo và Tin tức</h1>
        <div></div>
        <Link to={`/${catePath}`}>
          Xem tất cả{" "}
          <span>
            <i className="fa-solid fa-arrow-right"></i>
          </span>
        </Link>
      </div>
      <div className="noticeAndnew-list">
        {notifyAndNewsListArray.map((notifyAndNewsItem, index) => (
          <div className="noticeAndnew-item" key={index}>
            <Link to={`/${catePath}/${encodeURIComponent(notifyAndNewsItem.title)}`}>
              {isLoading && <Loading position="relative" bg="unset" />}
              <img
                src={`${uriImage}${notifyAndNewsItem.image}`}
                onLoad={handleImageLoad}
                alt=""
                style={{ display: isLoading ? "none" : "block" }}
              />
            </Link>
            <div>
              <Link to={`/${catePath}`}>{notifyAndNewsItem.category}</Link>
              <h4>
                <Link to={`/${catePath}/${encodeURIComponent(notifyAndNewsItem.title)}`}>
                  Cảm tạ Chúa – Dâng lời ước nguyện!
                </Link>
              </h4>
              <p
                className="three-dot"
                dangerouslySetInnerHTML={{ __html: notifyAndNewsItem.content }}
              ></p>
              <span>{dateConvert(notifyAndNewsItem.createdAt)}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NotifyAndNews;
