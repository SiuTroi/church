import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getCountNewsSearching, getNewsSearching } from "../../../api";
import Loading from "../../Loading";
import "./Search.css";
import { dateConvert, removeVietnameseAccents } from "../../../utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { uriImage } from "../../../constants";
import { useHomeSeo } from "../../../hooks/useHomeSeo";
import { Helmet } from "react-helmet";

function Search() {
  const [newsSearch, setNewsSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [startPost, setStartPost] = useState(0);
  const [curretPagination, setCurretPagination] = useState(0);
  const [countSearching, setCountSearching] = useState(0);
  const { search } = useLocation();
  const { homeSeo, homeSite } = useHomeSeo();
  const searchParams = new URLSearchParams(search);
  const title = searchParams.get("title"); // lấy giá trị của tham số "title"
  const limit = 10;

  useEffect(() => {
    setIsLoading(true);
    const getNewsSearchingAsync = async () => {
      const respone = await getNewsSearching(title, startPost, limit);
      const data = await respone.data;
      setNewsSearch(data);
      setIsLoading(false);

      const searchingCountRes = await getCountNewsSearching(title);
      const searchingCountData = await searchingCountRes.data;
      setCountSearching(searchingCountData);
      setIsLoading(false);
    };
    getNewsSearchingAsync();
  }, [title, startPost]);

  const pagination = Array.from(
    { length: Math.ceil(countSearching / limit) },
    (_, i) => i + 1
  );

  const handleClickCurrentPagination = (number, index) => {
    setStartPost(number);
    setCurretPagination(index)
  };

  return (
    <>
      <Helmet>
        <title>{homeSeo.title}</title>
        <link rel="icon" sizes="32x32" href={`${uriImage}${homeSite.logo}`} />
        <link rel="apple-touch-icon" sizes="32x32" href={`${uriImage}${homeSite.logo}`} />
      </Helmet>
      {isLoading && <Loading />}
      <section className="searching-page">
        <div className="path">
          <div className="path-container">
            <h1>Tìm kiếm</h1>
          </div>
        </div>

        <div className="container searching-wraper">
          {newsSearch.length > 0 ?
            newsSearch.map((newsSearchitem, index) => (
              <div className="content-item" key={index}>
                <Link
                  to={`/${removeVietnameseAccents(
                    newsSearchitem.category
                  )}/${encodeURIComponent(newsSearchitem.title)}`}
                  className="cate-link-img"
                >
                  <LazyLoadImage
                    effect="blur"
                    src={`${uriImage}${newsSearchitem.image}`}
                    alt=""
                  />
                </Link>
                <div className="content-desc">
                  <div className="tags">
                    <Link
                      to={`/${removeVietnameseAccents(
                        newsSearchitem.category
                      )}`}
                      className="tag-item"
                    >
                      {newsSearchitem.category}
                    </Link>
                  </div>
                  <h1>
                    <Link
                      to={`/${removeVietnameseAccents(
                        newsSearchitem.category
                      )}/${encodeURIComponent(newsSearchitem.title)}`}
                      className="two-dot"
                    >
                      {newsSearchitem.title}
                    </Link>
                  </h1>
                  <div className='three-dot'>
                        {newsSearchitem.description.trim().length > 0 
                        ? newsSearchitem.description 
                        : <div dangerouslySetInnerHTML={{ __html: newsSearchitem.content}}>
                            </div>}
                    </div>
                  <p>
                    <time className="time">
                      {dateConvert(newsSearchitem.createdAt)}
                    </time>
                  </p>
                </div>
              </div>
            )) : <h5>Không có bài viết phù hợp cho từ khóa khóa tìm kiếm</h5>}
        </div>
        <div className='pagination container'>
          {pagination.map((item, index) => (
            <button
            key={index}
            onClick={() => handleClickCurrentPagination((item * limit) - limit, index)} 
            style={{backgroundColor: index === curretPagination && '#121418', color: index === curretPagination && 'white'}}
            className='btn'>{item}</button>
          ))}
        </div>
      </section>
    </>
  );
}

export default Search;
