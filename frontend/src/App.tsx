import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Layout from "./layouts/Layout";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Blogs from "./pages/blogs/Blogs";
import AddBlog from "./pages/blogs/AddBlog";
import BlogDetail from "./pages/blogs/BlogDetail";
import Events from "./pages/events/Events";
import BackgroundHistory from "./pages/AboutUs/BackgroundHistory";
import MissionVisionValues from "./pages/AboutUs/MissionVisionValues";
import OrganizationalStructure from "./pages/AboutUs/OrganizationalStructure";
import Announcements from "./pages/Announcements/Announcements";
import OfficialProfile from "./pages/AboutUs/OfficialProfile";
import TermAndConditions from "./pages/TermAndConditions";
import EditDownload from "./pages/Downloads/EditDownloads";
import Downloads from "./pages/Downloads/Downloads";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminOverview from "./pages/Admin/AdminOverview";
import ProtectedAdminRoute from "./components/molecules/ProtectedAdminRoute";
import ProtectedRoute from "./components/molecules/ProtectedRoute";
import AddEvent from "./pages/events/AddEvent";
import AddAnnouncement from "./pages/Announcements/AddAnnouncement";
import EventDetail from "./pages/events/EventDetail";
import EditEvent from "./pages/events/EditEvent";
import Users from "./pages/Admin/users/Users";
import Analytics from "./pages/Admin/analytics";
import AnnouncementDetail from "./pages/Announcements/AnnouncementDetail";
// import OthersDownload from "./pages/Downloads/OthersDownload";
// import Manuals from "./pages/Downloads/Manuals";
// import Strategies from "./pages/Downloads/Strategies";
// News
import News from "./pages/news/News";
import AddNews from "./pages/news/AddNews";
import EditNews from "./pages/news/EditNews";
import NewsDetail from "./pages/news/NewsDetail";
// Project
// import Projects from "./pages/projects/Projects";
// import ProjectDetail from "./pages/projects/ProjectDetail";
// import AddProject from "./pages/projects/AddProject";
// import EditProject from "./pages/projects/EditProject";
// import AddDownload from "./pages/Downloads/AddDownloads";
// import TeamMembers from "./pages/Admin/TeamMembers";
// import Settings from "./pages/Admin/Settings";

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
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        }>
        <Route
          path="/admin/overview"
          element={
            <ProtectedAdminRoute>
              <AdminOverview />
            </ProtectedAdminRoute>
          }
        />
        {/* <Route
          path="projects"
          element={
            <ProtectedAdminRoute>
              <Projects />
            </ProtectedAdminRoute>
          }
        /> */}
        <Route
          path="news"
          element={
            <ProtectedAdminRoute>
              <News />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="add-news"
          element={
            <ProtectedAdminRoute>
              <AddNews />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="edit-news/:newsId"
          element={
            <ProtectedAdminRoute>
              <EditNews />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="news/:newsId"
          element={
            <ProtectedAdminRoute>
              <NewsDetail />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="blogs"
          element={
            <ProtectedAdminRoute>
              <Blogs />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="add-blog"
          element={
            <ProtectedAdminRoute>
              <AddBlog />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="blogs/:blogId"
          element={
            <ProtectedAdminRoute>
              <BlogDetail />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="users"
          element={
            <ProtectedAdminRoute>
              <Users />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="analytics"
          element={
            <ProtectedAdminRoute>
              <Analytics />
            </ProtectedAdminRoute>
          }
        />
        {/* <Route path="team-members" element={<ProtectedAdminRoute><TeamMembers /></ProtectedAdminRoute>} />
  <Route path="settings" element={<ProtectedAdminRoute><Settings /></ProtectedAdminRoute>} /> */}
      </Route>

      {/* <Route
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
          <ProtectedRoute>
            <Layout>
              <AddProject />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-project/:projectId"
        element={
          <ProtectedRoute>
            <Layout>
              <EditProject />
            </Layout>
          </ProtectedRoute>
        }
      /> */}

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
          <ProtectedRoute>
            <Layout>
              <AddNews />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-news/:newsId"
        element={
          <ProtectedRoute>
            <Layout>
              <EditNews />
            </Layout>
          </ProtectedRoute>
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
        path="/events/:eventId"
        element={
          <Layout>
            <EventDetail />
          </Layout>
        }
      />
      <Route
        path="/add-event"
        element={
          <Layout>
            <AddEvent />
          </Layout>
        }
      />
      <Route
        path="/edit-event/:eventId"
        element={
          <Layout>
            <EditEvent />
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
      {/* <Route
        path="/strategies"
        element={
          <Layout>
            <Strategies />
          </Layout>
        }
      /> */}
      {/* <Route
        path="/manuals"
        element={
          <Layout>
            <Manuals />
          </Layout>
        }
      /> */}
      {/* <Route
        path="/others"
        element={
          <Layout>
            <OthersDownload />
          </Layout>
        }
      /> */}
      {/* <Route
        path="/add-download"
        element={
          <ProtectedRoute>
            <Layout>
              <AddDownload />
            </Layout>
          </ProtectedRoute>
        }
      /> */}
      <Route
        path="/edit-download"
        element={
          <ProtectedRoute>
            <Layout>
              <EditDownload />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/downloads/:downloadId"
        element={
          <Layout>
            <Downloads />
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
        path="/announcements"
        element={
          <Layout>
            <Announcements />
          </Layout>
        }
      />
      <Route
        path="/announcements/annoucementId"
        element={
          <Layout>
            <AnnouncementDetail />
          </Layout>
        }
      />
      <Route
        path="/add-announcement"
        element={
          <Layout>
            <AddAnnouncement />
          </Layout>
        }
      />
      <Route
        path="/edit-announcement/:announcementId"
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
          <ProtectedRoute>
            <Layout>
              <AddBlog />
            </Layout>
          </ProtectedRoute>
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
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
