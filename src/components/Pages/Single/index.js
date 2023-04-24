import { Link, useParams } from "react-router-dom";
import {
  getHomeSite,
  getPostAsCategoryDirected,
  getPostAsDirected,
  getPostDetail,
} from "../../../api";
import "./Singgle.css";
import { useEffect, useState } from "react";
import { uriImage } from "../../../constants";
import { dateConvert, removeVietnameseAccents } from "../../../utils";
import Loading from "../../Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Helmet } from "react-helmet";
import { useHomeSeo } from "../../../hooks/useHomeSeo";

function Single() {
  const { title } = useParams();
  const { homeSite }= useHomeSeo();
  const [postDetail, setPostDetail] = useState({});
  const [relatedPost, setRelatedPost] = useState([]);
  const [assidePost, setAssidePost] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getPostDetailAsync = async () => {
      const respone = await getPostDetail(title);
      const data = await respone.data;
      setPostDetail(data);
      setLoading(false);

      const relatedRespone = await getPostAsCategoryDirected(
        data.category,
        0,
        4
      );
      const relatedData = await relatedRespone.data;
      setRelatedPost(relatedData);
      setLoading(false);

      const assidePostRespone = await getPostAsDirected(0, 6);
      const assidePostData = await assidePostRespone.data;
      setAssidePost(assidePostData);
      setLoading(false);
    };
    getPostDetailAsync();
  }, [title]);
  

  function shareToFacebook() {
    // Construct the URL to share
    const shareUrl = encodeURIComponent(window.location.href);

    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
    // Open the share dialog in a new window
    window.open(facebookUrl, "_blank");
  }

  function shareOnTwitter() {
    const pageUrl = window.location.href;
    const tweetContent = encodeURIComponent("Check out this page!");

    const twitterUrl = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${tweetContent}`;

    window.open(twitterUrl, "_blank");
  }

  function shareOnGoogle() {
    const pageUrl = encodeURIComponent(window.location.href);

    const googleUrl = `https://plus.google.com/share?url=${pageUrl}`;

    window.open(googleUrl, "_blank");
  }

  function shareOnPinterest(image) {
    const pageUrl = encodeURIComponent(window.location.href);
    const imageUrl = encodeURIComponent(image);
    const description = encodeURIComponent("Check out this page!");

    const pinterestUrl = `https://www.pinterest.com/pin/create/button/?url=${pageUrl}&media=${imageUrl}&description=${description}`;

    window.open(pinterestUrl, "_blank");
  }

  function shareOnLinkedIn() {
    const pageUrl = encodeURIComponent(window.location.href);
    const pageTitle = encodeURIComponent(document.title);

    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}&title=${pageTitle}`;

    window.open(linkedInUrl, "_blank");
  }

  const catePath = postDetail.category
    ? removeVietnameseAccents(postDetail.category)
    : "";
  return (
    <>
      <Helmet>
        <title>{postDetail.title}</title>
        <link rel="icon" sizes="32x32" href={`${uriImage}${homeSite.logo}`} />
        <link rel="apple-touch-icon" sizes="32x32" href={`${uriImage}${homeSite.logo}`} />
        {postDetail?.category && <link rel="canonical" href={`https://church-tan.vercel.app/${removeVietnameseAccents(postDetail?.category)}/${postDetail.title}`} />}
        {postDetail.description && <meta name="description" content={postDetail.description.trim()}  />}
        <meta name="category" content={postDetail.category}  />
        <meta name="keywords" content={`${postDetail.title}, ${postDetail.category}`} />
        <meta name="content" content={postDetail.content} />
        <meta name="author" content="Hội thánh tin lành" />
        {postDetail?.category && <meta property="og:url" content={`https://church-tan.vercel.app/${removeVietnameseAccents(postDetail?.category)}/${postDetail.title}`} />}
        <meta property="og:auther" content="Hội thánh tin lành" />
        <meta property="og:keywords" content={`${postDetail.title}, ${postDetail.category}`} />
        {postDetail.description && <meta property="og:description" content={postDetail.description.trim()} />}
        <meta property="og:category" content={postDetail.category} />
        <meta property="og:image" content={`${uriImage}${postDetail.image}`} />
        <meta property="og:type" content="article" />
      </Helmet>

      {loading && <Loading />}
      <div className="path">
        <div className="path-container">
          <h1>{postDetail.title}</h1>
        </div>
      </div>

      <section className="container single-container">
        <article className="single-container-main">
          <div className="single-content">
            <LazyLoadImage
                effect="blur"   src={`${uriImage}${postDetail.image}`} alt="" />
            <p className="single-desc">{postDetail.description}</p>
            <div dangerouslySetInnerHTML={{ __html: postDetail.content }}></div>
          </div>
          <div className="post-meta">
            <div className="entry-meta">
              <span className="category-link">
                Chuyên mục:{" "}
                <Link to={`/${catePath}`}>{postDetail.category}:&nbsp;</Link>
              </span>
              <Link to="#">
                <time>{dateConvert(postDetail.createdAt)}</time>
              </Link>
            </div>
            <div className="entry-tags">
              Thẻ:{" "}
              <Link to={`/${catePath}`} rel="tag">
                {postDetail.category}
              </Link>
            </div>
          </div>
          <div className="single-share-box">
            <div className="share-link-description">Chia sẻ</div>
            <div className="share-buttons">
              <button
                className="facebook"
                title="Facebook"
                onClick={shareToFacebook}
              >
                <i className="fa-brands fa-facebook-f"></i>
              </button>
              <button
                className="twitter"
                title="Twitter"
                onClick={shareOnTwitter}
              >
                <i className="fa-brands fa-twitter"></i>
              </button>
              <button
                className="google"
                title="Google+"
                onClick={shareOnGoogle}
              >
                <i className="fa-brands fa-google-plus-g"></i>
              </button>
              <button
                className="pinterest"
                title="Pinterest"
                onClick={() =>
                  shareOnPinterest(`${uriImage}${postDetail.image}`)
                }
              >
                <i className="fa-brands fa-pinterest"></i>
              </button>
              <button
                className="linkedin"
                title="LinkedIn"
                onClick={shareOnLinkedIn}
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </button>
            </div>
          </div>

          <div className="single-related-posts">
            <h3>Bài viết liên quan</h3>
            <div className="single-related-list">
              {relatedPost.length > 0 ? (
                relatedPost.map((relatedPostItem, index) => (
                  <div className="related-item" key={index}>
                    <div className="mini-post-img">
                      <Link
                        to={`/${removeVietnameseAccents(
                          relatedPostItem.category
                        )}/${encodeURIComponent(relatedPostItem.title)}`}
                        className="alignleft post-rollover this-ready"
                      >
                        <LazyLoadImage
                          effect="blur"
                          src={`${uriImage}${relatedPostItem.image}`}
                          alt={relatedPostItem.title}
                           
                        />
                      </Link>
                    </div>
                    <div className="post-content">
                      <Link
                        to={`/${removeVietnameseAccents(
                          relatedPostItem.category
                        )}/${encodeURIComponent(relatedPostItem.title)}`}
                      >
                        {relatedPostItem.title}
                      </Link>{" "}
                      <br />
                      <time
                        className="text-secondary"
                        dateTime={relatedPostItem.createdAt}
                      >
                        {dateConvert(relatedPostItem.createdAt)}
                      </time>
                    </div>
                  </div>
                ))
              ) : (
                <Loading position="relative" bg="unset" zIndex="unset" />
              )}
            </div>
          </div>
        </article>

        <aside className="aside">
          <div className="single-search">
            <div className="search-title">Tìm kiếm</div>
            <div className="search-wrap">
              <input
                type="text"
                className="search-input"
                placeholder="Nhập từ khóa và nhấn Enter"
              />
              <button>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>
          <div className="presscore-blog-posts">
            <ul className="presscore-blog-posts-list">
              {assidePost.length > 0 ? (
                assidePost.map((assidePostItem, index) => (
                  <li className="presscore-blog-posts-item" key={index}>
                    <Link
                      to={`/${removeVietnameseAccents(
                        assidePostItem.category
                      )}/${encodeURIComponent(assidePostItem.title)}`}
                    >
                      <LazyLoadImage
                        effect="blur"
                        src={`${uriImage}${assidePostItem.image}`}
                        alt={assidePostItem.title}
                         
                      />
                    </Link>
                    <div className="post-content">
                      <Link
                        to={`/${removeVietnameseAccents(
                          assidePostItem.category
                        )}/${encodeURIComponent(assidePostItem.title)}`}
                        className="two-dot"
                      >
                        {assidePostItem.title}
                      </Link>
                      <time>{dateConvert(assidePostItem.createdAt)}</time>
                    </div>
                  </li>
                ))
              ) : (
                <Loading position="relative" bg="unset" zIndex="unset" />
              )}
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}

export default Single;
