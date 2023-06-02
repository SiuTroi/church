import { useEffect, useState, lazy, Suspense } from "react";
import { Helmet } from 'react-helmet';
import { getCategories } from "../../api";
import { removeVietnameseAccents } from "../../utils";
import Loading from "../Loading";
import { uriDomain, uriImage } from "../../constants";
import { useHomeSeo } from "../../hooks/useHomeSeo";

const GodWordWork = lazy(() => import('./GodWordWork'));
const NewVideo = lazy(() => import('./NewVideo'));
const NotifyAndNews = lazy(() => import('./NotifyAndNews'));
const Sac = lazy(() => import('./Sac'));
const TinlanhConcept = lazy(() => import('./TinlanhConcept'));
const Witness = lazy(() => import('./Witness'));
const Banner = lazy(() => import('./Banner'));


function Home() {
  const {homeSeo, homeSite} = useHomeSeo();
  const [categories, setCategories] = useState({
    all: [],
    godWordWork: "",
    witNess: "",
    notifyAndNews: "",
  });
  useEffect(() => {
    const getAllCategory = async () => {
      const respone = await getCategories();
      const data = await respone.data;
      setCategories(prevState => ({
        ...prevState,
        all: data
      }))
      data.map((dataItem) => {
        switch (removeVietnameseAccents(dataItem.category)) {
          case "duong-linh":
            /* Dùng tạm thời cho danh mục "Dưỡng linh" */
              setCategories(prevState => ({
                  ...prevState,
                  godWordWork: dataItem.category
                }))
              break;
          case "nguoi-lam-chung":
              setCategories(prevState => ({
                  ...prevState,
                  witNess: dataItem.category
                }))
              break;
          case "thong-bao":
              setCategories(prevState => ({
                  ...prevState,
                  notifyAndNews: dataItem.category
                }))
              break;
          default:
              break;
        }
      })
    };
    getAllCategory();
  }, []);

  return (
    <>
    <Helmet>
      <title>{homeSeo.title}</title>
      <link rel="icon" sizes="32x32" href={`${uriImage}${homeSite.logo}`} />
      <link rel="apple-touch-icon" sizes="32x32" href={`${uriImage}${homeSite.logo}`} />
      <link rel="canonical" href={uriDomain} />
      {homeSeo.description && <meta name="description" content={homeSeo.description.trim()}  />}
      <meta name="keywords" content={homeSeo.keyword} />
      <meta name="author" content="Hội thánh tin lành" />
      <meta property="og:locale" content="vi_VN" />
      <meta property="og:url" content={uriDomain} />
      <meta property="og:auther" content="Hội thánh tin lành" />
      <meta property="og:keywords" content={homeSeo.keyword} />
      {homeSeo.description && <meta property="og:description" content={homeSeo.description.trim()} />}
      <meta property="og:image" content={homeSite.logo} />
      <meta property="og:type" content="article" />
    </Helmet>
    {
      <Suspense fallback={<Loading />}>
        <Banner />
        {categories.notifyAndNews ? <NotifyAndNews category={categories.notifyAndNews} /> : <></>}
        <TinlanhConcept />
        {/* Dùng tạm thời cho danh mục "Dưỡng linh" */}
        {categories.godWordWork ? <GodWordWork category={categories.godWordWork} /> : <></>} 
        {categories.witNess ? <Witness category={categories.witNess} /> : <></>}
        {/* <NewVideo /> */}
        {/* {categories.all.length > 0 ? <Sac categories={categories.all} /> : <></> } */}
      </Suspense>
    }
    </>
  );
}

export default Home;
