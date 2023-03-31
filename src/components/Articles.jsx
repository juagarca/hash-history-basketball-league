import { useParams, Outlet } from "react-router-dom";

import Loading from "./Loading";
import { Sidebar } from "./Sidebar";

import useTeamsArticles from "../hooks/useTeamsArticles";

export default function Articles() {
  const { teamId } = useParams();
  const { response: teamsArticles, loading } = useTeamsArticles(teamId);

  return loading ? (
    <Loading />
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
