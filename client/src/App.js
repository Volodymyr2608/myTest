import { useRoutes } from './hooks/useRouter';
import { useAuth } from "./hooks/useAuth";
import { useSelector } from "react-redux";

function App() {
  useAuth();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const routes = useRoutes(isAuth)
  return (
    <>
      {routes}
    </>
  );
}

export default App;
