import "./Header.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { removeVietnameseAccents } from "../../utils";
import { getCategories } from "../../api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useHomeSeo } from "../../hooks/useHomeSeo";
import { uriImage } from "../../constants";

function Header() {
  const { homeSeo, homeSite } = useHomeSeo();
  const [showSearchWraper, setShowSearchWraper] = useState(false);
  const [showCateMobile, setShowCateMobile] = useState(false);
  const [showMoreCate, setShowMoreCate] = useState(false);
  const [cateListArray, setCateListArray] = useState({
    show: [],
    hide: []
  });
  

  useEffect(() => {
    const getCategoriesAsync = async () => {
      const respone = await getCategories();
      const data = await respone.data;
      setCateListArray(prevState => ({
        ...prevState,
        show: data.slice(0, 5),
        hide: data.slice(5, data.length)
      }));
    };  
    getCategoriesAsync();
  }, [])


  const hideCateMobileAndScrollToTop = () => {
    setShowCateMobile(!showCateMobile);
    window.scrollTo(0, 0);
  }

  const showCateListArray = window.innerWidth > 1023 ? cateListArray.show : cateListArray.show.concat(cateListArray.hide);
  return (
    <header className="header">
      <nav className="header-nav container">
        <Link to={'/'} className="">
          <LazyLoadImage
            effect="blur"
            src={`${uriImage}${homeSite.logo}`}
            alt={`$${homeSeo.title}`}
            className="logo-img header-logo"
          />
        </Link>

        <div
          className="cate"
          style={{ display: showCateMobile && "flex" }}
        >
          <ul className="list-cate">
            {showCateListArray.map((cateItem, index) => (
              <li className="item-cate" key={index}>
                <Link to={removeVietnameseAccents(cateItem.category)} onClick={hideCateMobileAndScrollToTop}>{cateItem.category}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="header-action">
          {cateListArray.hide.length > 0 && 
            <button onClick={() => setShowMoreCate(!showMoreCate)} className="btn btn-ellipsis">
              <i className="fa-solid fa-ellipsis-vertical"></i>

              {showMoreCate && <ul className="sub-cate">
                {cateListArray.hide.map((subCateItem, subCateindex) => (
                  <li key={subCateindex}>
                    <Link
                      to={removeVietnameseAccents(subCateItem.category)}
                      className="sub-cate-link"
                      onClick={hideCateMobileAndScrollToTop}
                    >
                      {subCateItem.category}
                    </Link>
                  </li>
                ))}
              </ul>}
            </button>
          }
          <button
            className="btn-search"
            onClick={() => setShowSearchWraper(!showSearchWraper)}
          >
            {showSearchWraper ? (
              <i className="fa-solid fa-xmark"></i>
            ) : (
              <i className="fa-solid fa-magnifying-glass"></i>
            )}
          </button>
        </div>
        <div className="mobile-menu">
          <button
            className="btn-search"
            onClick={() => setShowSearchWraper(!showSearchWraper)}
          >
            {showSearchWraper ? (
              <i className="fa-solid fa-xmark"></i>
            ) : (
              <i className="fa-solid fa-magnifying-glass"></i>
            )}
          </button>
          <button
            className="mobile-menu-btn"
            onClick={() => setShowCateMobile(!showCateMobile)}
          >
            {showCateMobile ? (
              <i className="fa-solid fa-xmark"></i>
            ) : (
              <i className="fa-solid fa-bars"></i>
            )}
          </button>
        </div>
      </nav>
      {showSearchWraper && (
        <div className="search-input-wrap">
          <div className="search-ui container">
            <form action="/search" className="form-search">
              <input
                type="text"
                className="search-input"
                placeholder="Tìm kiếm..."
                name="title"
                id=""
              />
              <button className="search-form-btn">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
