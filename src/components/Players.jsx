import * as React from "react";
import { useLocation, useSearchParams, Outlet } from "react-router-dom";

import Loading from "./Loading";
import { Sidebar } from "./Sidebar";

import usePlayerNames from "../hooks/usePlayerNames";

export default function Players() {
  const location = useLocation();
  const [searchParams] = useSearchParams(location.search);

  const [team, setTeam] = React.useState(searchParams.get("teamId"));

  const { response: playerNames, loading } = usePlayerNames(team);

  React.useEffect(() => {
    if (location.search === "") {
      searchParams.delete("teamId");
      setTeam(null);
    } else {
      setTeam(searchParams.get("teamId"));
    }
  }, [location.search, searchParams]);

  return loading ? (
    <Loading />
  ) : (
    <div className="container two-column">
      <Sidebar title="Players" list={playerNames} />

      <Outlet />
    </div>
  );
}
