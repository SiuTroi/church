import { Link } from "react-router-dom";
import "./Witness.scss";
import { useEffect, useState } from "react";
import { getPostAsCategoryDirected } from "../../../api";
import { dateConvert, removeVietnameseAccents } from "../../../utils";
import { uriImage } from "../../../constants";
import Loading from "../../Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Witness({ category }) {
  const [witnessListArray, setWitnessListArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const catePath = removeVietnameseAccents(category);

  useEffect(() => {
    const getGwwPost = async () => {
      const respone = await getPostAsCategoryDirected(category, 0, 4);
      const data = await respone.data;
      setWitnessListArray(data.reverse());
    }
    getGwwPost()
  }, [])
  
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <section className="container witness">
      <div className="witness-title section-title">
        <h1>Người làm chứng</h1>
        <div></div>
        <Link to={`/${catePath}`}>
          Xem tất cả{" "}
          <span>
            <i className="fa-solid fa-arrow-right"></i>
          </span>
        </Link>
      </div>
      <div className="witness-list">
        {witnessListArray.map((witnessItem, index) => (
          <div className="witness-item" key={index}>
            <Link to={`/${catePath}/${encodeURIComponent(witnessItem.title)}`} className="witness-item-link">
                <LazyLoadImage
                effect="blur" src={`${uriImage}${witnessItem.image}`}
                alt={witnessItem.title} 
                />
            </Link>
            <div>
                <h4>
                <Link to={`/${catePath}/${encodeURIComponent(witnessItem.title)}`} className="witness-item-link">
                    {witnessItem.title}
                </Link>
                </h4>
                <p className="three-dot less-content" dangerouslySetInnerHTML={{__html: witnessItem.content }}></p>
                <span>{dateConvert(witnessItem.createdAt)}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Witness;
