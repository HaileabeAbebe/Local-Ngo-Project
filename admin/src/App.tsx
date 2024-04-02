import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects/ProjectList";
import SignIn from "./pages/SignIn";
import ProjectDetail from "./pages/Projects/ProjectDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditProject from "./pages/Projects/EditProject";
import AddProject from "./pages/Projects/AddProject";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />{" "}
            </Layout>
          }
        />
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/projects"
          element={
            <Layout>
              <Projects />
            </Layout>
          }
        />
        <Route
          path="/projects/:projectId"
          element={
            <Layout>
              <ProjectDetail />
            </Layout>
          }
        />
        <Route
          path="/edit-project/:projectId"
          element={
            <Layout>
              <EditProject />
            </Layout>
          }
        />
        <Route
          path="/add-project"
          element={
            <Layout>
              <AddProject />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
