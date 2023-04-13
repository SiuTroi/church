import React, { useEffect, useState } from 'react';
import './CategoryPage.scss';
import { getCountPostByCategory, getPostAsCategoryDirected, getPostAsDirected, getPostByCategory } from '../../../api';
import { Link } from 'react-router-dom';
import { dateConvert, removeVietnameseAccents } from '../../../utils';
import { uriImage } from '../../../constants';
import Loading from "../../Loading";


const CategoryPage = React.memo(({ category }) => {
  const [allPostByCate, setAllPostByCate] = useState([]);
  const [postAsDirected, setPostAsDirected] = useState([]);
  const [countPostByCategory, setcountPostByCategory] = useState(0);
  const [startPost, setStartPost] = useState(0);
  const [curretPagination, setCurretPagination] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingImg, setIsLoadingImg] = useState(true);

  const catePath = removeVietnameseAccents(category);
  const limit = 10;
  window.document.title = category;

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

  const handleImageLoad = () => {
    setIsLoadingImg(false);
  };

  const pagination = Array.from(
    { length: Math.ceil(countPostByCategory / limit) },
    (_, i) => i + 1
  );

  const handleClickCurrentPagination = (number, index) => {
    setStartPost(number);
    setCurretPagination(index)
  };
    return (
        <>
          {isLoading && <Loading />}
          <section className="cate-page">
            <div className="container cate-page-wrap">
              <div className='cate-page-content'>
                <div className="cate-page-content-list">
                  {allPostByCate.map((postItem, index) => (
                    <div className="content-item" key={index}>
                      <Link to={`/${catePath}/${encodeURIComponent(postItem.title)}`} className="cate-link-img">
                        {isLoadingImg && <Loading position="relative" bg="unset" />}
                        <img 
                          src={`${uriImage}${postItem.image}`}
                          onLoad={handleImageLoad}
                          alt="" 
                          style={{ display: isLoadingImg ? 'none' : 'block' }}
                          />
                      </Link>
                      <div className="content-desc">
                        <div className="tags">
                          <Link to={`/${catePath}`} className="tag-item">{postItem.category}</Link>
                        </div>
                        <h1><Link to={`/${catePath}/${encodeURIComponent(postItem.title)}`}>{postItem.title}</Link></h1>
                        <p className='three-dot'>
                          {postItem.description.trim().length > 0 
                            ? postItem.description 
                            : <div dangerouslySetInnerHTML={{ __html: postItem.content}} 
                                style={{
                                  height: '77px',
                                  overflow: 'hidden'
                                }}>
                              </div>}
                        </p>
                        <p><time>{dateConvert(postItem.createdAt)}</time></p>
                        <Link to={`/${catePath}/${encodeURIComponent(postItem.title)}`} className='readmore-btn'>Read more</Link>
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

              <aside className="aside">
                <h3>bài viết mới nhất</h3>
                <ul className="new-post-list">
                  {postAsDirected.map((postAsDirectedItem, index) => (
                    <li className="new-post-item" key={index}>
                      <Link to={`/${removeVietnameseAccents(postAsDirectedItem.category)}/${encodeURIComponent(postAsDirectedItem.title)}`} className="new-post-img">
                        {isLoadingImg && <Loading position="relative" bg="unset" />}
                        <img
                          src={`${uriImage}${postAsDirectedItem.image}`}
                          onLoad={handleImageLoad}
                          alt={postAsDirectedItem.title} 
                          style={{ display: isLoadingImg ? 'none' : 'block' }}
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
              </aside>
            </div>
          </section>
        </>
    )
})

export default CategoryPage;