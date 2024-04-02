import { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects/ProjectList";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Layout from "./layouts/Layout";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProjectDetail from "./pages/Projects/ProjectDetail";
import AddProject from "./pages/Projects/AddProject";
import EditProject from "./pages/Projects/EditProject";

const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Layout>
              <SignUp />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
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
          path="/project/:projectId"
          element={
            <Layout>
              <ProjectDetail />
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
        <Route
          path="/edit-project"
          element={
            <Layout>
              <EditProject />
            </Layout>
          }
        />
        <Route
          path="/blog"
          element={
            <Layout>
              <Blog />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
