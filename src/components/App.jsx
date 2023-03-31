import * as React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";

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

function Routes() {
  return useRoutes([
    { path: "/", element: <Home /> },
    {
      path: "/players",
      element: <Players />,
      children: [
        { path: ":playerId", element: <Player /> },
        {
          path: "",
          element: <div class="sidebar-instruction">Select a player</div>,
        },
      ],
    },
    {
      path: "/teams",
      element: <Teams />,
      children: [
        { path: ":teamId", element: <Team /> },
        {
          path: "",
          element: <div class="sidebar-instruction">Select a team</div>,
        },
      ],
    },
    { path: "/:teamId", element: <TeamPage /> },
    {
      path: "/:teamId/articles",
      element: <Articles />,
      children: [
        { path: ":articleId", element: <Article /> },
        {
          path: "",
          element: <div class="sidebar-instruction">Select an article</div>,
        },
      ],
    },
  ]);
}

export default function App() {
  return (
    <Router>
      <Navbar />

      <React.Suspense fallback={<Loading />}>
        <Routes />
      </React.Suspense>
    </Router>
  );
}

/* <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/players" element={<Players />}>
    <Route path=":playerId" element={<Player />} />
  </Route>
  <Route path="/teams" element={<Teams />}>
    <Route path=":teamId" element={<Team />} />
    <Route
      path=""
      element={<div class="sidebar-instruction">Select a team</div>}
    />
  </Route>{" "}
  <Route path="/:teamId" element={<TeamPage />} />
  <Route path="/:teamId/articles" element={<Articles />}>
    <Route path=":articleId" element={<Article />} />
    <Route
      path=""
      element={<div class="sidebar-instruction">Select an article</div>}
    />
  </Route>
</Routes>; */
