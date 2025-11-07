import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import NewArticlePage from "./pages/NewArticlePage";
import EditArticlePage from "./pages/EditArticlePage";
import ArticlesPage from "./pages/ArticlesPage";
import ArticlePage from "./pages/ArticlePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuth } from "./AuthContext";

const RequireAuth = ({ children }) => {
  const { user, loadingAuth } = useAuth();

  if (loadingAuth) {
    return <div className="container status">Checking authentication...</div>;
  }

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="page-wrapper">
          <Routes>
            <Route path="/" element={<Navigate to="/articles" replace />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/articles/:slug" element={<ArticlePage />} />

            <Route
              path="/new-article"
              element={
                <RequireAuth>
                  <NewArticlePage />
                </RequireAuth>
              }
            />

            <Route
              path="/articles/:slug/edit"
              element={
                <RequireAuth>
                  <EditArticlePage />
                </RequireAuth>
              }
            />

            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <ProfilePage />
                </RequireAuth>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
