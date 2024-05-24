import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import Contact from "./pages/Contact";
import Layout from "./layouts/Layout";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProjectDetail from "./pages/projects/ProjectDetail";
import AddProject from "./pages/projects/AddProject";
import EditProject from "./pages/projects/EditProject";
import Blogs from "./pages/blogs/Blogs";
import AddBlog from "./pages/blogs/AddBlog";
import BlogDetail from "./pages/blogs/BlogDetail";
import Projects from "./pages/projects/Projects";
import News from "./pages/news/News";
import Events from "./pages/events/Events.tsx";
import BackgroundHistory from "./pages/AboutUs/BackgroundHistory.tsx";
import MissionVisionValues from "./pages/AboutUs/MissionVisionValues.tsx";
import OrganizationalStructure from "./pages/AboutUs/OrganizationalStructure.tsx";
import Strategies from "./pages/Downloads/Strategies.tsx";
import Announcements from "./pages/Announcements/Announcements.tsx";
import AddNews from "./pages/news/AddNews.tsx";
import EditNews from "./pages/news/EditNews.tsx";
import NewsDetail from "./pages/news/NewsDetail.tsx";
import OfficialProfile from "./pages/AboutUs/OfficialProfile.tsx";
import Manuals from "./pages/Downloads/Manuals.tsx";
import AddDownload from "./pages/Downloads/AddDownloads.tsx";
import TermAndConditions from "./pages/TermAndConditions.tsx";

const App: FC = () => {
  return (
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
        path="/projects"
        element={
          <Layout>
            <Projects />
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
        path="/add-news"
        element={
          <Layout>
            <AddNews />
          </Layout>
        }
      />
      <Route
        path="/edit-news/:newsId"
        element={
          <Layout>
            <EditNews />
          </Layout>
        }
      />
      <Route
        path="/news/:newsId"
        element={
          <Layout>
            <NewsDetail />
          </Layout>
        }
      />
      <Route
        path="/events"
        element={
          <Layout>
            <Events />
          </Layout>
        }
      />
      <Route
        path="/strategies"
        element={
          <Layout>
            <Strategies />
          </Layout>
        }
      />
      <Route
        path="/term-conditions"
        element={
          <Layout>
            <TermAndConditions />
          </Layout>
        }
      />
      <Route
        path="/manuals"
        element={
          <Layout>
            <Manuals />
          </Layout>
        }
      />
      <Route
        path="/add-download"
        element={
          <Layout>
            <AddDownload />
          </Layout>
        }
      />
      <Route
        path="/official-profile"
        element={
          <Layout>
            <OfficialProfile />
          </Layout>
        }
      />
      <Route
        path="/background-history"
        element={
          <Layout>
            <BackgroundHistory />
          </Layout>
        }
      />
      <Route
        path="/mission-vision-values"
        element={
          <Layout>
            <MissionVisionValues />
          </Layout>
        }
      />
      <Route
        path="/organizational-structure"
        element={
          <Layout>
            <OrganizationalStructure />
          </Layout>
        }
      />
      <Route
        path="/strategies"
        element={
          <Layout>
            <Strategies />
          </Layout>
        }
      />
      <Route
        path="/Manuals"
        element={
          <Layout>
            <Manuals />
          </Layout>
        }
      />
      <Route
        path="/announcements"
        element={
          <Layout>
            <Announcements />
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
        path="/edit-project/:projectId"
        element={
          <Layout>
            <EditProject />
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
        path="/blogs/:blogId"
        element={
          <Layout>
            <BlogDetail />
          </Layout>
        }
      />
      <Route
        path="/add-blog"
        element={
          <Layout>
            <AddBlog />
          </Layout>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
