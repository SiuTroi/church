import "./Sac.scss";
import { useEffect, useState } from "react";
import { removeVietnameseAccents } from "../../../utils";
import { getPostAsCategoryDirected } from "../../../api";
import SacItem from "./SacItem";

function Sac({ categories }) {
  const [sac, setSac] = useState({
    story: [],
    answers: [],
    consultation: []
  });

  useEffect(() => {
    const getStoryData = async (category, sac) => {
      const respone = await getPostAsCategoryDirected(category, 0, 3);
      const data = await respone.data;
      setSac(prevState => ({
        ...prevState,
        [sac]: data,
      }))
    }    
    categories.map((cateItem) => {
      switch (removeVietnameseAccents(cateItem.category)) {
        case 'cau-chuyen-uc-tin':
          getStoryData(cateItem.category, 'story');
          break;
        case 'giai-ap-thac-mac':
          getStoryData(cateItem.category, 'answers');
          break;
        case 'tam-van-co-oc':
          getStoryData(cateItem.category, 'consultation');
          break;
        default:
          break;
      }
    })
  }, [])

  return (
    <section className="container sac">
      <div className="sac-container">
        <SacItem sacItem={sac.story} />
        <SacItem sacItem={sac.answers} />
        <SacItem sacItem={sac.consultation} />
      </div>
    </section>
  );
}

export default Sac;
