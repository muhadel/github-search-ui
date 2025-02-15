import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';
import GithubIcon from '../../assets/github-icon.svg';
import { SearchType } from '../../types';
import GitHubDropdown from '../GitHubDropdown';
import GitHubInput from '../GitHubInput';

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  width: 100%;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 500px;
`;

const Logo = styled.img`
  width: 50px;
  height: 50px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  text-align: justify;
  font-size: 20px;
  font-weight: bold;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #777;
  margin: 0;
`;

const InputRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
  width: 100%;
  max-width: 500px;
`;

interface SearchBarProps {
  onSearch: (query: string, type: SearchType) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('users');

  const debouncedSetQuery = useCallback(
    debounce((q) => onSearch(q, searchType), 500),
    [searchType]
  );

  return (
    <SearchContainer>
      <HeaderRow>
        <Logo src={GithubIcon} alt="GitHub Logo" />
        <TitleWrapper>
          <Title>GitHub Searcher</Title>
          <Subtitle>Search users, repositories, or issues</Subtitle>
        </TitleWrapper>
      </HeaderRow>
      <InputRow>
        <GitHubInput
          onChange={(e) => {
            setQuery(e.target.value);
            debouncedSetQuery(e.target.value);
          }}
          placeholder="Start typing to search .."
        />
        <GitHubDropdown
          options={[
            { label: 'Users', value: 'users' },
            { label: 'Repositories', value: 'repositories' },
            { label: 'Issues', value: 'issues' },
          ]}
          value={searchType}
          onChange={(e) => {
            const newType = e.target.value as SearchType;
            setSearchType(newType);
            onSearch(query, newType);
          }}
        />
      </InputRow>
    </SearchContainer>
  );
};

export default SearchBar;
