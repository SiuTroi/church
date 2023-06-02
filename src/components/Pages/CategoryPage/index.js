import React, { useEffect, useState } from 'react';
import './CategoryPage.css';
import { getCountPostByCategory, getHomeSeo, getHomeSite, getPostAsCategoryDirected, getPostAsDirected, getPostByCategory } from '../../../api';
import { Link, useLocation } from 'react-router-dom';
import { dateConvert, removeVietnameseAccents } from '../../../utils';
import { uriDomain, uriImage } from '../../../constants';
import Loading from "../../Loading";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Helmet } from 'react-helmet';
import { useHomeSeo } from "../../../hooks/useHomeSeo"
import Introduce from '../Introduce';
import Pastoral from '../Pastoral';

const CategoryPage = React.memo(({ category, categoryItem }) => {
  const { pathname } = useLocation();
  const { homeSite } = useHomeSeo();
  const [allPostByCate, setAllPostByCate] = useState([]);
  const [postAsDirected, setPostAsDirected] = useState([]);
  const [countPostByCategory, setcountPostByCategory] = useState(0);
  const [startPost, setStartPost] = useState(0);
  const [curretPagination, setCurretPagination] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const catePath = removeVietnameseAccents(category);
  const limit = 10;

  useEffect(() => {
    setIsLoading(true);
    const getAllPostByCateAsync = async () => {
      const respone = await getPostAsCategoryDirected(category, startPost, limit);
      const data = await respone.data;
      setAllPostByCate(data);
      setIsLoading(false);
    }
    const getPostAsDirectedAsync = async () => {
      const respone = await getPostAsDirected(0, 4);
      const data = await respone.data;
      setPostAsDirected(data);
      setIsLoading(false);
    }
    const getCountPostByCategoryAsync = async () => {
      const respone = await getCountPostByCategory(category);
      const data = await respone.data;
      setcountPostByCategory(data);
      setIsLoading(false);
    }
    getAllPostByCateAsync();
    getPostAsDirectedAsync();
    getCountPostByCategoryAsync();
  }, [category, startPost]);


  const pagination = Array.from(
    { length: Math.ceil(countPostByCategory / limit) },
    (_, i) => i + 1
  );

  const handleClickCurrentPagination = (number, index) => {
    setStartPost(number);
    setCurretPagination(index)
  };

  console.log(category)
  const renderCategoryView = () => {
    switch (pathname) {
      case '/gioi-thieu':
        return <Introduce />
        break;
      default:
        return <section className="cate-page">
            <div className="path">
              <div className="path-container" style={{backgroundColor: '#fff'}}>
                <h1>{category}</h1>
              </div>
            </div>

            <div className="container cate-page-wrap" style={{ display: pathname === '/muc-vu' && 'block'}}>
              <div className='cate-page-content'  style={{ width: pathname === '/muc-vu' && '100%'}}>
                <div className="cate-page-content-list">
                  {allPostByCate.map((postItem, index) => (
                    <div className="content-item" key={index}>
                      <Link to={`/${catePath}/${encodeURIComponent(postItem.title)}`} className="cate-link-img">
                        <LazyLoadImage
                          effect="blur" 
                          src={`${uriImage}${postItem.image}`}
                          alt="" 
                           style={{height: pathname === '/muc-vu' && 'unset'}}
                          />
                      </Link>
                      <div className="content-desc">
                        {pathname !== '/muc-vu' && <div className="tags">
                          <Link to={`/${catePath}`} className="tag-item">{postItem.category}</Link>
                        </div>}
                        <h1 className='two-dot'><Link to={`/${catePath}/${encodeURIComponent(postItem.title)}`}>{postItem.title}</Link></h1>
                        {pathname === '/muc-vu' ? <div className='three-dot'> {postItem.description.trim().length > 0 
                            && postItem.description}</div>  : <div className='three-dot'>
                          {postItem.description.trim().length > 0 
                            ? postItem.description 
                            : <div dangerouslySetInnerHTML={{ __html: postItem.content}}>
                              </div>}
                        </div>}
                        {pathname !== '/muc-vu' && <><p><time className='time'>{dateConvert(postItem.createdAt)}</time></p>
                        <Link to={`/${catePath}/${encodeURIComponent(postItem.title)}`} className='readmore-btn'>Read more</Link></>}
                      </div>
                    </div>
                  ))}
                </div>
                <div className='pagination'>
                  {pagination.map((item, index) => (
                    <button
                    key={index}
                    onClick={() => handleClickCurrentPagination((item * limit) - limit, index)} 
                    style={{backgroundColor: index === curretPagination && '#121418', color: index === curretPagination && 'white'}}
                    className='btn'>{item}</button>
                  ))}
                </div>
              </div>

              {pathname !== '/muc-vu' && <aside className="aside">
                <h3>bài viết mới nhất</h3>
                <ul className="new-post-list">
                  {postAsDirected.map((postAsDirectedItem, index) => (
                    <li className="new-post-item" key={index}>
                      <Link to={`/${removeVietnameseAccents(postAsDirectedItem.category)}/${encodeURIComponent(postAsDirectedItem.title)}`} className="new-post-img">
                        <LazyLoadImage
                          effect="blur"
                          src={`${uriImage}${postAsDirectedItem.image}`}
                          alt={postAsDirectedItem.title} 
                           
                        />
                      </Link>
                      <div className="new-post-desc">
                        <div className="tags">
                          <Link to={`/${removeVietnameseAccents(postAsDirectedItem.category)}`} className="tag-item">
                            {(postAsDirectedItem.category)}
                          </Link>
                        </div>
                        <h4><Link to={`/${removeVietnameseAccents(postAsDirectedItem.category)}/${encodeURIComponent(postAsDirectedItem.title)}`}>
                          {postAsDirectedItem.title}</Link>
                        </h4>
                        <p><time>{dateConvert(postAsDirectedItem.createdAt)}</time></p>
                      </div>
                    </li>
                  ))}
                </ul>
              </aside>}
            </div>
        </section>
        break;
    }
  }

    return (
        <>
        <Helmet>
          <title>{categoryItem.category}</title>
          <link rel="icon" sizes="32x32" href={`${uriImage}${homeSite.logo}`} />
          <link rel="apple-touch-icon" sizes="32x32" href={`${uriImage}${homeSite.logo}`} />
          <link rel="canonical" href={`${uriDomain}${removeVietnameseAccents(categoryItem.category)}`} />
          <meta name="description" content={categoryItem.seo.description}  />
          <meta name="category" content={categoryItem.category}  />
          <meta name="keywords" content={categoryItem.seo.keyword} />
          <meta name="author" content="Hội thánh tin lành" />
          <meta property="og:locale" content="vi_VN" />
          <meta property="og:url" content={`${uriDomain}${removeVietnameseAccents(categoryItem.category)}`} />
          <meta property="og:auther" content="Hội thánh tin lành" />
          <meta property="og:keywords" content={categoryItem.seo.keyword} />
          <meta property="og:description" content={categoryItem.seo.description} />
          <meta property="og:category" content={categoryItem.category} />
          <meta property="og:image" content={categoryItem.seo.image} />
          <meta property="og:type" content="article" />
        </Helmet>

          {isLoading && <Loading />}
          {renderCategoryView()}
        </>
    )
})

export default CategoryPage;