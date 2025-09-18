import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ImagesView from "./views/ImagesView";
import BreedsView from "./views/BreedsView";
import FavoritesView from "./views/FavoritesView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ImagesView />} />
          <Route path="breeds" element={<BreedsView />} />
          <Route path="favorites" element={<FavoritesView />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
