import MainPage from "./pages/MainPage";
import NotFound from "./pages/NotFound";
import User from "./pages/User";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/users">
        <Route path=":id" element={<User />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
