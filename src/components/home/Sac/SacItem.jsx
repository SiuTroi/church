import { useState } from "react";
import Loading from "../../Loading";
import { uriImage } from "../../../constants";
import { Link } from "react-router-dom";
import { removeVietnameseAccents } from "../../../utils";

function SacItem({ sacItem }) {
    const [isLoading, setIsLoading] = useState(true);
    const handleImageLoad = () => {
        setIsLoading(false);
    };

    return <div className="sac-item">
    {sacItem.length > 0 && <>
      <h1>{sacItem[0].category}</h1>
      {isLoading && <Loading position="relative" bg="unset" />}
      <img src={`${uriImage}${sacItem[0].image}`} 
        onLoad={handleImageLoad} 
        alt={sacItem[0].title}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
      <h3>{sacItem[0].title}</h3>

      {sacItem.slice(1, sacItem.length).map((item, index) => (
        <div key={index}>
          <div className="boundary-line"></div>
          <div className="sac-item-content">
            {isLoading && <Loading position="relative" bg="unset" />}
            <img src={`${uriImage}${item.image}`}
             onLoad={handleImageLoad} alt={item.title}
             style={{ display: isLoading ? 'none' : 'block' }}
             />
            <h4>
              <Link to={`/${removeVietnameseAccents(item.category)}/${encodeURIComponent(item.title)}`}>{item.title}</Link>
            </h4>
          </div>
        </div>
      ))}
      <div className="boundary-line"></div>
      <Link to={`/${removeVietnameseAccents(sacItem[0].category)}`}>
        Xem thêm <i className="fa-solid fa-arrow-right"></i>
      </Link>
    </>}
  </div>
}

export default SacItem;