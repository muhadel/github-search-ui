import { ReactNode } from 'react';
import styled from 'styled-components';

interface MainLayoutProps {
  children: ReactNode;
}

const MainContainer = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: '#f5f5f7',
  padding: 0,
  margin: '0 auto',
  width: '100%',
  textAlign: 'center',
}));

const ContentWrapper = styled('div')(() => ({
  flexGrow: 1,
  padding: '20px',
  overflow: 'auto',
  width: '100%',
}));

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <MainContainer>
      <ContentWrapper>{children}</ContentWrapper>
    </MainContainer>
  );
};

export default MainLayout;
