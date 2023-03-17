import { useParams, Outlet } from "react-router-dom";

import { Sidebar } from "./Sidebar";

import useTeamsArticles from "../hooks/useTeamsArticles";

export default function Articles() {
  const { teamId } = useParams();
  const { response: teamsArticles, loading } = useTeamsArticles(teamId);

  return loading ? (
    <p>Loading</p>
  ) : (
    <div className="container two-column">
      <Sidebar
        title="Articles"
        list={teamsArticles.map((article) => article.title)}
      />

      <Outlet />
    </div>
  );
}
