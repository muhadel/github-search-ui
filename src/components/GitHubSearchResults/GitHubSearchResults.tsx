import styled from 'styled-components';
import GitHubCard from '../GitHubCard';
import { SearchType, GitHubUser, GitHubRepository, GitHubIssue } from '../../types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 16px;

  @media (max-width: 600px) {
    padding: 8px;
  }
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;

  @media (max-width: 600px) {
    justify-content: flex-start;
    padding: 8px;
  }
`;

interface GitHubSearchResultsProps<T extends GitHubUser | GitHubRepository | GitHubIssue> {
  searchType: SearchType;
  results: T[];
}

const GitHubSearchResults = <T extends GitHubUser | GitHubRepository | GitHubIssue>({
  searchType,
  results,
}: GitHubSearchResultsProps<T>) => {
  return (
    <Container>
      <CardsWrapper>
        {results.map((result, index) => (
          <GitHubCard key={index} item={result} searchType={searchType} />
        ))}
      </CardsWrapper>
    </Container>
  );
};

export default GitHubSearchResults;
