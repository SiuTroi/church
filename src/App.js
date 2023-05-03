import { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CategoryPage from "./components/Pages/CategoryPage";
import Single from "./components/Pages/Single";
import { getCategories } from "./api";
import { removeVietnameseAccents } from "./utils";
import Loading from "./components/Loading";

const Header = lazy(() => import("./components/Header"));
const Home = lazy(() => import("./components/home"));
const Search = lazy(() => import("./components/Pages/Search"));
const Footer = lazy(() => import("./components/Footer"));

function App() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getAllCategory = async () => {
      const respone = await getCategories();
      const data = await respone.data;
      setCategories(data);
    };
    getAllCategory();
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <div className="app">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Category */}
            {categories.length > 0 && categories.map((categoryItem, index) => {
              let catePath = removeVietnameseAccents(categoryItem.category);
              return (
                <Route
                  path={`/${catePath}`}
                  element={<CategoryPage category={categoryItem.category} categoryItem={categoryItem} />}
                  key={index}
                />
              );
            })}

            {/* Single */}
            {categories.length > 0 && categories.map((categoryItem, index) => {
              let catePath = removeVietnameseAccents(categoryItem.category);
              return (
                <Route
                  path={`/${catePath}/:title`}
                  element={<Single />}
                  key={index}
                />
              );
            })}

            {/* Search */}
            <Route path="/search" element={<Search />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </Suspense>
  );
}

export default App;
