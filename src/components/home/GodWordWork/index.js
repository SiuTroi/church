import { Link } from "react-router-dom";
import "./GodWordWord.scss";
import { useEffect, useState } from "react";
import { getPostAsCategoryDirected } from "../../../api";
import { removeVietnameseAccents } from "../../../utils";
import { uriImage } from "../../../constants";
import Loading from "../../Loading";

function GodWordWord({ category }) {
  const [gwwListArray, setGwwListArray] = useState([]);
  const [gwwBloggerFeatured, setGwwBloggerFeatured] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const catePath = removeVietnameseAccents(category);

  useEffect(() => {
    const getGwwPost = async () => {
      const respone = await getPostAsCategoryDirected(category, 0, 4);
      const data = await respone.data;
      setGwwListArray(data.reverse().slice(0, data.length - 1));
      setGwwBloggerFeatured(data.reverse()[0]);
    };
    getGwwPost();
  }, []);

  const handleImageLoad = () => {
    setIsLoading(false);
  };
  
  return (
    <section className="container gww">
      <div className="gww-title section-title">
        <h1>Lời Chúa nơi làm việc</h1>
        <div></div>
        <Link to={`/${catePath}`}>
          Xem tất cả{" "}
          <span>
            <i className="fa-solid fa-arrow-right"></i>
          </span>
        </Link>
      </div>
      <div className="gww-container">
        <div className="gww-blogger-featured">
          <Link to={`${catePath}/${encodeURIComponent(gwwBloggerFeatured.title)}`}>
            {isLoading && <Loading position="relative" bg="unset" />}
            <img
              src={`${uriImage}${gwwBloggerFeatured.image}`}
              onLoad={handleImageLoad}
              alt=""
              style={{ display: isLoading ? 'none' : 'block' }}
            />
          </Link>
          <h4>
            <Link to={`${catePath}/${encodeURIComponent(gwwBloggerFeatured.title)}`}>
              {gwwBloggerFeatured.title}
            </Link>
          </h4>
          <p className="three-dot">{gwwBloggerFeatured.description}</p>
        </div>
        <div className="gww-list">
          {gwwListArray.map((gwwItem, index) => (
            <div className="gww-item" key={index}>
              <Link
                to={`${catePath}/${encodeURIComponent(gwwItem.title)}`}
                className="gww-item-link"
              >
                {isLoading && <Loading position="relative" bg="unset" />}
                <img
                  src={`${uriImage}${gwwItem.image}`}
                  onLoad={handleImageLoad}
                  alt=""
                />
              </Link>
              <div className="gww-item-content">
                <h4>
                  <Link
                    to={`${catePath}/${encodeURIComponent(gwwItem.title)}`}
                    className="gww-item-link"
                  >
                    {gwwItem.title}
                  </Link>
                </h4>
                <p>{gwwItem.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GodWordWord;
