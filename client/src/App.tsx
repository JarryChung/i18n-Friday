import { useAuth } from 'components/AuthProvider';
import { LoadingPage } from 'pages/loading/Loading';
import { LoginPage } from 'pages/login/Login';
import { MainPage } from 'pages/Root';
import './App.css';

function App() {
  const { user, isLoading } = useAuth()
  return (
    <div className="App">
      {
        isLoading
          ? user
            ? <MainPage />
            : <LoginPage />
          : <LoadingPage />
      }
    </div>
  );
}

export default App;
