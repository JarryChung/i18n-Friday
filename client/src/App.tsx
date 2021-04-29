import { useAuth } from 'components/AuthProvider';
import { LoadingPage } from 'pages/loading/Loading';
import { LoginPage } from 'pages/login/Login';
import { RootPage } from 'pages/Root';
import './App.css';

function App() {
  const { user, isLoading } = useAuth();
  return (
    <div className="App">{isLoading ? <LoadingPage /> : user ? <RootPage /> : <LoginPage />}</div>
  );
}

export default App;
