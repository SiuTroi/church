import { Link } from "react-router-dom";
import "./Footer.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Footer() {
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
            <iframe
              width="100%"
              height="300"
              style={{border: "none", borderRadius: "8px"}}
              src="https://maps.google.com/maps?q=H%E1%BB%99i%20Th%C3%A1nh%20Tin%20L%C3%A0nh%20Vi%E1%BB%87t%20Nam%2C%20155%20%C4%90.%20Tr%E1%BA%A7n%20H%C6%B0ng%20%C4%90%E1%BA%A1o%2C%20Ph%C6%B0%E1%BB%9Dng%20C%C3%B4%20Giang%2C%20Qu%E1%BA%ADn%201%2C%20Th%C3%A0nh%20ph%E1%BB%91%20H%E1%BB%93%20Ch%C3%AD%20Minh%2C%20Vi%E1%BB%87t%20Nam&amp;t=m&amp;z=10&amp;output=embed&amp;iwloc=near"
              title="Hội Thánh Tin Lành Việt Nam, 155 Đ. Trần Hưng Đạo, Phường Cô Giang, Quận 1, Thành phố Hồ Chí Minh, Việt Nam"
              aria-label="Hội Thánh Tin Lành Việt Nam, 155 Đ. Trần Hưng Đạo, Phường Cô Giang, Quận 1, Thành phố Hồ Chí Minh, Việt Nam"
            ></iframe>
          </div>
        </div>
        <div className="footer-copyright">
          <p>
            © 2023. Bản quyền thuộc về <a href="">Hội Thánh Tin Lành Sài Gòn</a>
          </p>
          <div className="wrap-social-icon">
            <a href="" className="icon-link">
              <i className="fa-brands fa-facebook-f"></i>
              <span>Facebook</span>
            </a>
            <a href="" className="icon-link">
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
