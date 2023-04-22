import { Link } from "react-router-dom";
import "./Footer.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useEffect, useState } from "react";
import { getHomeSite } from "../../api";

function Footer() {
  const [homeSite, setHomeSite] = useState({});

  useEffect(() => {
    const getHomeSiteAsync = async () => {
      const respone = await getHomeSite();
      const data = await respone.data;
      setHomeSite(data[0]);
    }
    getHomeSiteAsync()
  }, [])
  return (
    <footer className="footer">
      <div className="container">
        <div className=" footer-container">
          <div className="footer-description">
            <Link to={'/'} className="footer-logo-link">
              <LazyLoadImage
                effect="blur"
                src="https://httlsaigon.org/wp-content/uploads/2021/12/option2-e1638295660831.png"
                alt="WATV"
                className="footer-logo"
                 
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
