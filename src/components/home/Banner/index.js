import './Banner.css';
import { useHomeSeo } from "../../../hooks/useHomeSeo"
import { uriImage } from '../../../constants';

function Banner() {
    const { homeSite } = useHomeSeo()
    return ( 
        <div className="banner">
            <img src={`${uriImage}${homeSite.banner}`} alt=""/>
        </div>
     );
}

export default Banner;