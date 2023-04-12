import { useEffect, useState, lazy, Suspense } from "react";
import { getCategories } from "../../api";
import { removeVietnameseAccents } from "../../utils";
import Loading from "../Loading";

const GodWordWork = lazy(() => import('./GodWordWork'));
const NewVideo = lazy(() => import('./NewVideo'));
const NotifyAndNews = lazy(() => import('./NotifyAndNews'));
const Sac = lazy(() => import('./Sac'));
const TinlanhConcept = lazy(() => import('./TinlanhConcept'));
const Witness = lazy(() => import('./Witness'));
const Banner = lazy(() => import('./Banner'));


function Home() {
  const [categories, setCategories] = useState({
    godWordWork: "",
    witNess: "",
    notifyAndNews: "",
  });
  useEffect(() => {
    const getAllCategory = async () => {
      const respone = await getCategories();
      const data = await respone.data;

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

  }, [categories]);

  return (
    <>
    {categories.godWordWork || categories.witNess || categories.witNess ? <>
    <Suspense fallback={<Loading />}>
      <Banner />
      <TinlanhConcept />
      <GodWordWork category={categories.godWordWork} />
      <Witness category={categories.witNess} />
      <NewVideo />
      <Sac />
      <NotifyAndNews category={categories.notifyAndNews} />
    </Suspense>
    </> : <></>}
    </>
  );
}

export default Home;