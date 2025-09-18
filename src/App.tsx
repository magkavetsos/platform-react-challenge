import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/layout/Layout";
import ImagesView from "./routes/Images/ImagesView";
import BreedsView from "./routes/Breeds/BreedsView";
import FavoritesView from "./routes/Favorites/FavoritesView";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ImagesView />} />
            <Route path="breeds" element={<BreedsView />} />
            <Route path="favorites" element={<FavoritesView />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
