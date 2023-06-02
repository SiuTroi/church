import { Link } from "react-router-dom";
import "./NotifyAndNews.css";
import { useEffect, useState } from "react";
import { dateConvert, removeVietnameseAccents } from "../../../utils";
import { getPostAsCategoryDirected } from "../../../api";
import { uriImage } from "../../../constants";
import { LazyLoadImage } from "react-lazy-load-image-component";

function NotifyAndNews({ category }) {
  const [notifyAndNewsListArray, setNotifyAndNewsListArray] = useState([]);
  const catePath = removeVietnameseAccents(category);

  useEffect(() => {
    const getGwwPost = async () => {
      const respone = await getPostAsCategoryDirected(category, 0, 4);
      const data = await respone.data;
      setNotifyAndNewsListArray(data.reverse());
    };
    getGwwPost();
  }, []);

  return (
    <section className="container noticeAndnew">
      <div className="noticeAndnew-title section-title">
        <h1>Thông báo</h1>
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
              <LazyLoadImage
                effect="blur"
                src={`${uriImage}${notifyAndNewsItem.image}`}
                alt={notifyAndNewsItem.title}
              />
            </Link>
            <div>
              <Link to={`/${catePath}`}>{notifyAndNewsItem.category}</Link>
              <h4>
                <Link to={`/${catePath}/${encodeURIComponent(notifyAndNewsItem.title)}`}>
                  {notifyAndNewsItem.title}
                </Link>
              </h4>
              <p
                className="three-dot less-content"
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
