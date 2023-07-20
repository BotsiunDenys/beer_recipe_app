import { BrowserRouter, Routes, Route } from "react-router-dom";
import BeerListPage from "./pages/BeerListPage";
import BeerRecipe from "./pages/BeerRecipe";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BeerListPage />} />
        <Route path="/recipe/:id" element={<BeerRecipe />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
