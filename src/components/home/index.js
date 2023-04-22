import { useEffect, useState, lazy, Suspense } from "react";
import { Helmet } from 'react-helmet';
import { getCategories, getHomeSeo, getHomeSite } from "../../api";
import { removeVietnameseAccents } from "../../utils";
import Loading from "../Loading";
import { uriImage } from "../../constants";

const GodWordWork = lazy(() => import('./GodWordWork'));
const NewVideo = lazy(() => import('./NewVideo'));
const NotifyAndNews = lazy(() => import('./NotifyAndNews'));
const Sac = lazy(() => import('./Sac'));
const TinlanhConcept = lazy(() => import('./TinlanhConcept'));
const Witness = lazy(() => import('./Witness'));
const Banner = lazy(() => import('./Banner'));


function Home() {
  const [homeSeo, setHomeSeo] = useState({});
  const [homeSite, setHomeSite] = useState({});
  const [categories, setCategories] = useState({
    all: [],
    godWordWork: "",
    witNess: "",
    notifyAndNews: "",
  });
  useEffect(() => {
    const getHomeSeoAsync = async () => {
      const respone = await getHomeSeo();
      const data = await respone.data;
      setHomeSeo(data[0]);
    };
    getHomeSeoAsync();
    const getHomeSiteAsync = async () => {
      const respone = await getHomeSite();
      const data = await respone.data;
      setHomeSite(data[0]);
    }
    getHomeSiteAsync();
    const getAllCategory = async () => {
      const respone = await getCategories();
      const data = await respone.data;
      setCategories(prevState => ({
        ...prevState,
        all: data
      }))
      data.map((dataItem) => {
        switch (removeVietnameseAccents(dataItem.category)) {
          case "loi-chua-noi-lam-viec":
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
          case "ban-tin":
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

  console.log(homeSeo)
  return (
    <>
    <Helmet>
      <title>{homeSeo.title}</title>
      <link rel="icon" sizes="32x32" href={`${uriImage}${homeSite.logo}`} />
      <link rel="apple-touch-icon" sizes="32x32" href={`${uriImage}${homeSite.logo}`} />
      <link rel="canonical" href="https://church-tan.vercel.app/" />
      {homeSeo.description && <meta name="description" content={homeSeo.description.trim()}  />}
      <meta name="keywords" content={homeSeo.keyword} />
      <meta name="author" content="Hội thánh tin lành" />
      <meta property="og:locale" content="vi_VN" />
      <meta property="og:url" content="https://church-tan.vercel.app/" />
      <meta property="og:auther" content="Hội thánh tin lành" />
      <meta property="og:keywords" content={homeSeo.keyword} />
      {homeSeo.description && <meta property="og:description" content={homeSeo.description.trim()} />}
      <meta property="og:image" content={homeSite.logo} />
      <meta property="og:type" content="article" />
    </Helmet>
    {categories.godWordWork || categories.witNess || categories.witNess ? <>
    <Suspense fallback={<Loading />}>
      <Banner />
      <TinlanhConcept />
      <GodWordWork category={categories.godWordWork} />
      <Witness category={categories.witNess} />
      <NewVideo />
      <Sac categories={categories.all} />
      <NotifyAndNews category={categories.notifyAndNews} />
    </Suspense>
    </> : <></>}
    </>
  );
}

export default Home;
