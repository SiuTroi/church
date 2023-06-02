import { Link, useLocation } from "react-router-dom";
import "./Footer.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useHomeSeo } from "../../hooks/useHomeSeo";
import { uriImage } from "../../constants";
import footerLogo from "../../images/footer_logo.png"
function Footer() {
  const { pathname } = useLocation();
  const { homeSite } = useHomeSeo();

  return (
    <footer className="footer" style={{ display: pathname === '/gioi-thieu' && 'none'}}>
      <div className="container">
        <div className="footer-container">
          <div className="footer-description">
            <Link to={'/'} className="footer-logo-link">
              <LazyLoadImage
                effect="blur"
                src={footerLogo}
                alt="Footer Logo"
                className="footer-logo logo-img"
                 
              />
            </Link>
            <h2> 
              Aspire Vietnamese Baptist Church
            </h2>
            <p>Địa chỉ: <b>{homeSite.address}</b></p>
            <a href={`tel:${homeSite.phone}`}>Điện thoại: <b>{homeSite.phone}</b></a> <br />
            <p>Website: <b>{homeSite.website}</b></p>
            <a href={`mailto:${homeSite.email}`}>Email: <b>{homeSite.email}</b></a>
            <p>Fanpage: <b>{homeSite.fanpage}</b></p>
          </div>
          <div className="footer-map">
            <div dangerouslySetInnerHTML={{ __html: homeSite.map}}></div>
          </div>
        </div>
        <div className="footer-copyright">
          <p>
            © 2023. Bản quyền thuộc về <a href='/'>{homeSite.copyright}</a>
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
