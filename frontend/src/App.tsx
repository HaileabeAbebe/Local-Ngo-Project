import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Layout from "./layouts/Layout";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProjectDetail from "./pages/projects/ProjectDetail";
import AddProject from "./pages/projects/AddProject";
import EditProject from "./pages/projects/EditProject";
import { useAppContext } from "./contexts/AppContext";
import Blogs from "./pages/blogs/Blogs";
import AddBlog from "./pages/blogs/AddBlog";
import Projects from "./pages/projects/ProjectList";
import BlogDetail from "./pages/blogs/BlogDetail";

const App: FC = () => {
  const { isLoggedIn } = useAppContext();
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
      {isLoggedIn && (
        <>
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
        </>
      )}
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
  );
};

export default App;
