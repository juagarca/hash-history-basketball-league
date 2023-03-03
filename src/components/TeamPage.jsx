import { useParams, Link } from "react-router-dom";
import useTeamNames from "../hooks/useTeamNames";
import useTeamsArticles from "../hooks/useTeamsArticles";
import useTeam from "../hooks/useTeam";
import TeamLogo from "./TeamLogo";
import slugify from "../utils/slugify";

function useTeamPageData(teamId) {
  const { response: teamNames, loading: loadingTeamNames } = useTeamNames();
  const { response: teamsArticles, loading: loadingTeamsArticles } =
    useTeamsArticles(teamId);
  const { response: team, loading: loadingTeam } = useTeam(teamId);

  return {
    teamNames,
    teamsArticles,
    team,
    loading: loadingTeamNames || loadingTeamsArticles || loadingTeam,
  };
}

export default function TeamPage() {
  const { teamId } = useParams();
  const { teamNames, teamsArticles, team, loading } = useTeamPageData(teamId);

  if (loading) {
    return <p>Loading</p>;
  }

  if (!teamNames.includes(teamId)) {
    return <p>{teamId} is not a valid team name!</p>;
  }

  return (
    <div className="panel">
      <TeamLogo id={teamId} />
      <h1 className="medium-header">{team.name}</h1>
      <h4 style={{ margin: 5 }}>
        <Link to={{ pathname: "/players", search: `?teamId=${teamId}` }}>
          View Roster
        </Link>
      </h4>
      <h4>Championships</h4>
      <ul className="championships">
        {team.championships.map((championship) => (
          <li key={championship}>{championship}</li>
        ))}
      </ul>
      <ul className="info-list row" style={{ width: "100%" }}>
        <li>
          Est.<div>{team.established}</div>
        </li>
        <li>
          Manager<div>{team.manager}</div>
        </li>
        <li>
          Coach<div>{team.coach}</div>
        </li>
        <li>
          Record
          <div>
            {team.wins} - {team.losses}
          </div>
        </li>
      </ul>
      <ul className="articles">
        {teamsArticles.map((teamArticle) => (
          <li key={teamArticle.id}>
            <h4 className="article-title">
              <Link to={`/articles/${slugify(teamArticle.title)}`}>
                {teamArticle.title}
              </Link>
            </h4>
            <div className="article-date">
              {new Date(teamArticle.date).toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
