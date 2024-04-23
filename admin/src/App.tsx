import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects/Projects";
import SignIn from "./pages/SignIn";
import ProjectDetail from "./pages/Projects/ProjectDetail";
import EditProject from "./pages/Projects/EditProject";
import AddProject from "./pages/Projects/AddProject";
import Users from "./pages/Users/Users";

// Import the new components here
import Analytics from "./pages/Analytics/Analytics";
import News from "./pages/News/News";
import Blogs from "./pages/Blogs/Blogs";
import TeamMembers from "./pages/TeamMembers/TeamMembers";
import Contact from "./pages/Contact/Contact";
import AboutUs from "./pages/AboutUs/AboutUs";
import Settings from "./pages/Settings/Settings";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route
        path="/sign-in"
        element={
          <Layout>
            <SignIn />
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
        path="/analytics"
        element={
          <Layout>
            <Analytics />
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
      <Route
        path="/news"
        element={
          <Layout>
            <News />
          </Layout>
        }
      />
      <Route
        path="/blogs"
        element={
          <Layout>
            <Blogs />
          </Layout>
        }
      />
      <Route
        path="/users"
        element={
          <Layout>
            <Users />
          </Layout>
        }
      />
      <Route
        path="/team-members"
        element={
          <Layout>
            <TeamMembers />
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
      <Route
        path="/about-us"
        element={
          <Layout>
            <AboutUs />
          </Layout>
        }
      />
      <Route
        path="/settings"
        element={
          <Layout>
            <Settings />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
