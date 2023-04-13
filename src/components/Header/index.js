import "./Header.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { removeVietnameseAccents } from "../../utils";
import { getCategories } from "../../api"
import logo from "../../images/logo.svg"

const cateListArray = [
  {
    name: "Giới thiệu",
    subCate: [
      {
        nameSubCate: "Về chúng tôi",
      },
      {
        nameSubCate: "Lời chào",
      },
      {
        nameSubCate: "Lịch sử Hội Thánh",
      },
      {
        nameSubCate: "Truyền giáo",
      },
      {
        nameSubCate: "Hội Thánh đại diện",
      },
      {
        nameSubCate: " Giải thưởng chủ yếu",
      },
      {
        
        nameSubCate: "Ngôn luận",
      },
      {
        
        nameSubCate: "Ủng hộ",
      },
      {
        
        nameSubCate: "Tôi tò mò",
      },
    ],
  },
  {
    name: "Lời Kinh Thánh",
    subCate: [
      {
        nameSubCate: "Lời Chúa nơi làm viêc",
      },
      {
        nameSubCate: "Người làm chứng",
      },
    ],
  },
  {
    name: "Tín ngưỡng và sinh hoạt",
    subCate: [],
  },
  {
    name: "Tin Lành thế giới",
    subCate: [],
  },
  {
    name: "Hoạt động",
    subCate: [],
  },
  {
    name: "Thời sự",
    subCate: [],
  },
];

const secondNavArray = [
  {
    secondNavName: "Bài Ca Mới",
  },
  {
    secondNavName: "Video",
  },
  {
    secondNavName: "Tiếng Việt",
  },
];
function Header() {
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

  const toggleSubCateList = (index) => {
    var subCate = document.querySelectorAll('.sub-cate')[index];
    var iconShowdown = document.querySelectorAll('.icon-showdown')[index];

    const rotationAngle = '180deg';

    if (subCate.style.display === 'none') {
      subCate.style.display = 'block';
      iconShowdown.style.transform = `rotate(${rotationAngle})`;
    } else {
      subCate.style.display = 'none';
      iconShowdown.style.transform = `rotate(0)`
    }
  }

  const hideCateMobileAndScrollToTop = () => {
    setShowCateMobile(!showCateMobile);
    window.scrollTo(0, 0);
  }

  const showCateListArray = window.innerWidth > 1023 ? cateListArray.show : cateListArray.show.concat(cateListArray.hide);
  return (
    <header className="header">
      <nav className="header-nav container">
        <Link to={'/'} className="">
          <img
            src={logo}
            alt="WATV"
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
                {/* {cateItem.subCate.length > 0 && (
                  <span
                    className="icon-showdown"
                    onClick={() => toggleSubCateList(index)}
                  >
                    <i className="fa-solid fa-chevron-down"></i>
                  </span>
                )} */}
                {/* Sub category */}
                {/* {cateItem.subCate.length > 0 ? (
                  <ul className="sub-cate">
                    {cateItem.subCate.map((subCateItem, subCateindex) => (
                      <li key={subCateindex}>
                        <Link
                          to={removeVietnameseAccents(subCateItem.nameSubCate)}
                          className="sub-cate-link"
                          onClick={hideCateMobileAndScrollToTop}
                        >
                          {subCateItem.nameSubCate}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <></>
                )} */}
                
              </li>
            ))}
          </ul>

          {/* <ul className="secondary-nav">
            {secondNavArray.map((secondNavItem, index) => (
              <li className="secondary-nav-item" key={index}>
                <Link
                  to={removeVietnameseAccents(secondNavItem.secondNavName)}
                >
                  {secondNavItem.secondNavName}
                </Link>
              </li>
            ))}
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
          </ul> */}
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
            <form action="" className="form-search">
              <input
                type="text"
                className="search-input"
                placeholder="Tìm kiếm..."
                name=""
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
