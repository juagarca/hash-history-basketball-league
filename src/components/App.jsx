import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Home from "./Home";
import Players from "./Players";
import Player from "./Player";
import Teams from "./Teams";
import Team from "./Team";
import TeamPage from "./TeamPage";
import Articles from "./Articles";
import Article from "./Article";

export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/players" element={<Players />}>
          <Route path=":playerId" element={<Player />} />
        </Route>
        <Route path="/teams" element={<Teams />}>
          <Route path=":teamId" element={<Team />} />
        </Route>
        <Route path="/:teamId" element={<TeamPage />} />
        <Route path="/:teamId/articles" element={<Articles />}>
          <Route path=":articleId" element={<Article />} />
        </Route>
      </Routes>
    </Router>
  );
}
