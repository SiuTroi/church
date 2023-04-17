import Loading from "../../Loading";
import { uriImage } from "../../../constants";
import { Link } from "react-router-dom";
import { removeVietnameseAccents } from "../../../utils";
import { LazyLoadImage } from "react-lazy-load-image-component";

function SacItem({ sacItem }) {
    return <div className="sac-item">
    {sacItem.length > 0 && <>
      <h1>{sacItem[0].category}</h1>
      <LazyLoadImage
        effect="blur" src={`${uriImage}${sacItem[0].image}`} 
        alt={sacItem[0].title}
         
      />
      <h3>{sacItem[0].title}</h3>

      {sacItem.slice(1, sacItem.length).map((item, index) => (
        <div key={index}>
          <div className="boundary-line"></div>
          <div className="sac-item-content">
            <LazyLoadImage
            effect="blur" src={`${uriImage}${item.image}`} alt={item.title}
              
             />
            <h4>
              <Link to={`/${removeVietnameseAccents(item.category)}/${encodeURIComponent(item.title)}`}>{item.title}</Link>
            </h4>
          </div>
        </div>
      ))}
      <div className="boundary-line"></div>
      <Link to={`/${removeVietnameseAccents(sacItem[0].category)}`} className="see-more">
        Xem thêm <i className="fa-solid fa-arrow-right"></i>
      </Link>
    </>}
  </div>
}

export default SacItem;