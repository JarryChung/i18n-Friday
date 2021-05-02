import styled from '@emotion/styled';
import { Header } from 'components/Header';
import { HashRouter } from 'react-router-dom';

export const RootPage = () => {
  return (
    <HashRouter>
      <Header />

      <Container>123</Container>
    </HashRouter>
  );
};

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: calc(100vh - 6rem);
  padding: 2rem;
  overflow: hidden;
`;
