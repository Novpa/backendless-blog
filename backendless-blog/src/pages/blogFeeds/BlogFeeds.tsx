import { Link, useLoaderData } from "react-router-dom";
import Backendless from "../../backendless/backendless";

function BlogFeeds() {
  const posts = useLoaderData();
  console.log("POSTS", posts);

  return (
    <div>
      <h1>Blog feeds</h1>
      {posts?.map((post) => (
        <div key={post.objectId} className="border px-10 py-10">
          <h2>{post.title}</h2>
          <p>{post.author}</p>
          <p>{post.content.slice(0, 100)}...</p>
          <Link to={`${post.objectId}`}>Read</Link>
        </div>
      ))}
    </div>
  );
}

export const fetchBlogData = async () => {
  try {
    const response = await Backendless.Data.of("Posts").find();
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default BlogFeeds;
