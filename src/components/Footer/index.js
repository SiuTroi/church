import { Link } from "react-router-dom";
import "./Footer.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useHomeSeo } from "../../hooks/useHomeSeo";
import { uriImage } from "../../constants";

function Footer() {
  const { homeSite } = useHomeSeo();

  return (
    <footer className="footer">
      <div className="container">
        <div className=" footer-container">
          <div className="footer-description">
            <Link to={'/'} className="footer-logo-link">
              <LazyLoadImage
                effect="blur"
                src={`${uriImage}${homeSite.logo}`}
                alt=""
                className="footer-logo logo-img"
                 
              />
            </Link>
            <p>
              Là Hội Thánh Tin Lành đầu tiên tại Sài Gòn, trực thuộc Hội Thánh
              Tin Lành Việt Nam, được thành lập năm 1920 <br />
              <strong>Sứ mệnh Hội Thánh:</strong> <br />
              <em>“TẤT CẢ VÌ NGƯỜI CHƯA ĐƯỢC CỨU”</em>
            </p>
          </div>
          <div className="footer-map">
            <div dangerouslySetInnerHTML={{ __html: homeSite.map}}></div>
          </div>
        </div>
        <div className="footer-copyright">
          <p>
            © 2023. Bản quyền thuộc về <a href='/'>Hội Thánh Tin Lành Sài Gòn</a>
          </p>
          <div className="wrap-social-icon">
            <a target="_blank" href={homeSite.facebook} className="icon-link">
              <i className="fa-brands fa-facebook-f"></i>
              <span>Facebook</span>
            </a>
            <a target="_blank" href={homeSite.youtube} className="icon-link">
              <i className="fa-brands fa-youtube"></i>
              <span>YouTube</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
