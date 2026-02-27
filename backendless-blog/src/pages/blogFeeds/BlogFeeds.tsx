import { useLoaderData, useNavigation } from "react-router-dom";
import Backendless from "../../backendless/backendless";
import FeedCard from "./FeedCard";
import Loader from "../../ui/Loader";

function BlogFeeds() {
  const posts = useLoaderData();
  const navigation = useNavigation();
  console.log("POSTS", posts);

  return (
    <>
      {navigation.state === "loading" && <Loader />}
      <main className="pt-30 md:px-10 lg:px-15 xl:px-30">
        <h1 className="px-10 pb-10 text-3xl md:text-4xl">
          Blog feeds{" "}
          <span className="font-extralight text-sm text-indigo-400">
            _______
          </span>
        </h1>
        <section className="grid grid-cols-2">
          {posts?.map((post: any, index: number) => (
            <FeedCard
              key={post.objectId}
              index={index}
              objectId={post.objectId}
              author={post.author}
              content={post.content}
              created={post.created}
              title={post.title}
              updated={post.updated}
            />
          ))}
        </section>
      </main>
    </>
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
