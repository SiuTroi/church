import './Banner.css';
import banner from "../../../images/ban-ner.png"

function Banner() {
    return ( 
        <div className="banner">
            <img src={banner} alt=""    />
        </div>
     );
}

export default Banner;