import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Loading from "./Loading";

const Home = React.lazy(() => import("./Home"));
const Players = React.lazy(() => import("./Players"));
const Player = React.lazy(() => import("./Player"));
const Teams = React.lazy(() => import("./Teams"));
const Team = React.lazy(() => import("./Team"));
const TeamPage = React.lazy(() => import("./TeamPage"));
const Articles = React.lazy(() => import("./Articles"));
const Article = React.lazy(() => import("./Article"));

export default function App() {
  return (
    <Router>
      <Navbar />

      <React.Suspense fallback={<Loading />}>
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
      </React.Suspense>
    </Router>
  );
}
