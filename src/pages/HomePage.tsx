import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import MainLayout from '../layouts/MainLayout';
import SearchBar from '../components/GitHubSearchBar';
import SearchResults from '../components/GitHubSearchResults';
import { useSearchGithubQuery } from '../services/githubApi';
import { GitHubIssue, GitHubRepository, GitHubUser, SearchType } from '../types';
import GitHubLoader from '../components/GitHubLoader';

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('users');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<(GitHubUser | GitHubRepository | GitHubIssue)[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const searchQuery = query.trim().length >= 3 ? query.trim() : '';

  const { data, isFetching, isError } = useSearchGithubQuery(
    { query: searchQuery, type: searchType, page },
    { skip: !searchQuery }
  );

  useEffect(() => {
    if (searchQuery && isFetching && page === 1) {
      setIsSearching(true);
    } else if (!isFetching) {
      setIsSearching(false);
    }
  }, [searchQuery, isFetching, page]);

  useEffect(() => {
    if (data?.items) {
      setItems((prevItems) => {
        return page === 1 ? data.items : [...prevItems, ...data.items];
      });
    }
  }, [data, page]);

  const fetchMoreData = () => {
    if (!isFetching && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearch = (q: string, type: SearchType) => {
    if (q && type) {
      setQuery(q);
      setSearchType(type);
      setPage(1);
      setItems([]);
      setHasMore(false);
      setIsSearching(true);
    }
  };

  const handleOnScroll = () => {
    if (data?.total_count) {
      const updatedHasMore = data.total_count > items.length;
      setHasMore(updatedHasMore);
    }
  };

  return (
    <MainLayout>
      <SearchBar onSearch={handleSearch} />

      {isSearching ? (
        <GitHubLoader />
      ) : isError ? (
        <p>Error loading results.</p>
      ) : items.length > 0 ? (
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<GitHubLoader />}
          scrollThreshold={0.9}
          onScroll={handleOnScroll}
        >
          <SearchResults searchType={searchType} results={items} />
        </InfiniteScroll>
      ) : (
        searchQuery && <p>No results found.</p>
      )}
    </MainLayout>
  );
};

export default HomePage;
