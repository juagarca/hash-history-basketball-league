import { useLocation, Link } from "react-router-dom";

import slugify from "../utils/slugify";

export function CustomLink({ to, children }) {
  const location = useLocation();
  const urlSplit = location.pathname.split("/");

  const match = to === urlSplit[urlSplit.length - 1];
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
