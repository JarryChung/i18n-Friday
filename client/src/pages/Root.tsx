import styled from '@emotion/styled';
import { Header } from 'components/Header';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Management } from './project/Management';
import { Detail } from './project/Detail';
import { Role } from './role/Role';

export const RootPage = () => {
  return (
    <HashRouter>
      <Header />

      <Container>
        <Switch>
          <Redirect exact from="/" to="/project" />
          <Route exact path="/project" component={Management} />
          <Route exact path="/project/:id" component={Detail} />
          <Route exact path="/role" component={Role} />
        </Switch>
      </Container>
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
