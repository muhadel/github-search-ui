import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin: 20px 0;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  background-color: #24292f;
  border-radius: 50%;
  animation: ${pulse} 1.4s infinite ease-in-out;

  &:nth-child(1) {
    animation-delay: 0s;
  }
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

const GitHubLoader = () => (
  <LoaderWrapper>
    <Dot />
    <Dot />
    <Dot />
  </LoaderWrapper>
);

export default GitHubLoader;
