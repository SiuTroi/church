import "./Header.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { removeVietnameseAccents } from "../../utils";
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
            {cateListArray.map((cateItem, index) => (
              <li className="item-cate" key={index}>
                <Link to={removeVietnameseAccents(cateItem.name)} onClick={hideCateMobileAndScrollToTop}>{cateItem.name}</Link>
                {cateItem.subCate.length > 0 && (
                  <span
                    className="icon-showdown"
                    onClick={() => toggleSubCateList(index)}
                  >
                    <i className="fa-solid fa-chevron-down"></i>
                  </span>
                )}
                {/* Sub category */}
                {cateItem.subCate.length > 0 ? (
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
                )}
                
              </li>
            ))}
          </ul>

          <ul className="secondary-nav">
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
          </ul>
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
