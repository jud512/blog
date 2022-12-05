import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Write from "./pages/write/Write";
import Single from "./pages/single/Single";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import "./style.scss";
import Profile from "./pages/profile/Profile";
import Dashboard from "./pages/dashboard/Dashboard";
import Datatable from "./components/datatable/Datatable";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <Single />,
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/users",
        element: <Datatable type="users" />,
      },
      {
        path: "/dashboard/posts",
        element: <Datatable type="posts" />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Login />,
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
