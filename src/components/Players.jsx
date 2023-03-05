import * as React from "react";
import { useLocation, useSearchParams, Link } from "react-router-dom";
import usePlayerNames from "../hooks/usePlayerNames";
import slugify from "../utils/slugify";

export function CustomLink({ to, children }) {
  const location = useLocation();
  const playerId = location.pathname.split("/")[2];

  const match = to === playerId;
  const styles = match ? { fontWeight: 900, color: "var(--white)" } : {};

  return (
    <li>
      <Link
        style={{ ...styles }}
        to={{
          pathname: to,
          search: location.search,
        }}
      >
        {children}
      </Link>
    </li>
  );
}

export function Sidebar({ title, list }) {
  return (
    <div>
      <h3 className="header">{title}</h3>
      <ul className="sidebar-list">
        {list.map((item) => (
          <CustomLink key={item} to={slugify(item)}>
            {item.toUpperCase()}
          </CustomLink>
        ))}
      </ul>
    </div>
  );
}

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
    <p>Loading</p>
  ) : (
    <div className="container">
      <Sidebar title="Players" list={playerNames} />
    </div>
  );
}
