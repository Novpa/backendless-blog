import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import CreateBlogPage from "./pages/adminDashboard/CreateBlogPage";
import BlogFeeds from "./pages/blogFeeds/BlogFeeds";
import BlogFeedsDetails from "./pages/blogFeedsDetails/BlogFeedsDetails";
import Landing from "./pages/Landing/Landing";

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: Landing,
      },
      {
        path: "admin/dashboard",
        Component: CreateBlogPage,
      },
      {
        path: "feeds",
        Component: BlogFeeds,
      },
      {
        path: "feeds/:id",
        Component: BlogFeedsDetails,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
