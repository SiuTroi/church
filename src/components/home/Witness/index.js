import { Link } from "react-router-dom";
import "./Witness.scss";
import { useEffect, useState } from "react";
import { getPostAsCategoryDirected } from "../../../api";
import { dateConvert, removeVietnameseAccents } from "../../../utils";
import { uriImage } from "../../../constants";
import Loading from "../../Loading";

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
                <Link to={`/${catePath}/${witnessItem.title}`} className="witness-item-link">
                  {isLoading && <Loading position="relative" bg="unset" />}
                    <img src={`${uriImage}${witnessItem.image}`}
                    onLoad={handleImageLoad} alt={witnessItem.title} 
                    style={{ display: isLoading ? 'none' : 'block' }}
                    />
                </Link>
                <div>
                    <h4>
                    <Link to={`/${catePath}/${witnessItem.title}`} className="witness-item-link">
                        {witnessItem.title}
                    </Link>
                    </h4>
                    <p className="three-dot" dangerouslySetInnerHTML={{__html: witnessItem.content }}></p>
                    <span>{dateConvert(witnessItem.createdAt)}</span>
                </div>
            </div>
        ))}
      </div>
    </section>
  );
}

export default Witness;
