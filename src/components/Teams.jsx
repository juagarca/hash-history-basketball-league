import { Outlet } from "react-router-dom";

import { Sidebar } from "./Sidebar";

import useTeamNames from "../hooks/useTeamNames";

export default function Teams() {
  const { response: teamNames, loading } = useTeamNames();

  return loading ? (
    <p>Loading</p>
  ) : (
    <div className="container two-column">
      <Sidebar title="Teams" list={teamNames} />

      <Outlet />
    </div>
  );
}
