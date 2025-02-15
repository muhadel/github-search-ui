import styled from 'styled-components';
import { GitHubUser, GitHubRepository, GitHubIssue, SearchType } from '../../types';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 16px;
  border: 1px solid #d0d7de;
  border-radius: 8px;
  background-color: #ffffff;
  transition: background-color 0.2s ease-in-out;
  width: 100%;
  max-width: 320px;
  box-sizing: border-box;

  &:hover {
    background-color: #f6f8fa;
  }

  @media (max-width: 1200px) {
    max-width: 280px;
  }

  @media (max-width: 800px) {
    max-width: 240px;
  }

  @media (max-width: 600px) {
    max-width: 100%;
    padding: 8px;
  }
`;

const TitleLink = styled.a`
  font-size: 16px;
  font-weight: 600;
  color: #0969da;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 6px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const Description = styled.p`
  font-size: 14px;
  color: #24292f;
  margin: 4px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #57606a;
  gap: 12px;
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const UserCard = ({ user }: { user: GitHubUser }) => (
  <CardContainer>
    <TitleLink href={user.html_url} target="_blank">
      <Avatar src={user.avatar_url} alt={user.login} />
      {user.login}
    </TitleLink>
  </CardContainer>
);

const RepositoryCard = ({ repo }: { repo: GitHubRepository }) => (
  <CardContainer>
    <TitleLink href={repo.html_url} target="_blank">
      <Avatar src={repo.owner.avatar_url} alt={repo.owner.login} />
      {repo.full_name}
    </TitleLink>
    {repo.description && <Description>{repo.description}</Description>}
    <Footer>
      {repo.language && <span>🟡 {repo.language}</span>}
      <span>⭐ {repo.stargazers_count}</span>
    </Footer>
  </CardContainer>
);

const IssueCard = ({ issue }: { issue: GitHubIssue }) => (
  <CardContainer>
    <TitleLink href={issue.html_url} target="_blank">
      {issue.title}
    </TitleLink>
    <Footer>Opened by {issue.user.login}</Footer>
  </CardContainer>
);

interface GitHubCardProps {
  item: GitHubUser | GitHubRepository | GitHubIssue;
  searchType: SearchType;
}

const GitHubCard = ({ item, searchType }: GitHubCardProps) => {
  if (searchType === 'users' && 'login' in item) {
    return <UserCard user={item as GitHubUser} />;
  } else if (searchType === 'repositories' && 'full_name' in item) {
    return <RepositoryCard repo={item as GitHubRepository} />;
  } else if (searchType === 'issues' && 'title' in item) {
    return <IssueCard issue={item as GitHubIssue} />;
  }
  return null;
};

export default GitHubCard;
