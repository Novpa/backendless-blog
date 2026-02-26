import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import CreateBlogPage from "./pages/adminDashboard/CreateBlogPage";
import BlogFeeds from "./pages/blogFeeds/BlogFeeds";
import BlogFeedsDetails from "./pages/blogFeedsDetails/BlogFeedsDetails";
import Landing from "./pages/Landing/Landing";
import { fetchBlogData as BlogDataLoader } from "./pages/blogFeeds/BlogFeeds";
import { fetchBlogDetailsById as BlogDetailsLoader } from "./pages/blogFeedsDetails/BlogFeedsDetails";
import NotFoundPage from "./ui/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    ErrorBoundary: NotFoundPage,
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
        loader: BlogDataLoader,
      },
      {
        path: "feeds/:id",
        Component: BlogFeedsDetails,
        loader: BlogDetailsLoader,
        // ErrorBoundary: NotFoundPage,
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
