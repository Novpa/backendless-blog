import {
  useLoaderData,
  useNavigate,
  useParams,
  type Params,
} from "react-router-dom";
import Backendless from "../../backendless/backendless";
import createBlogPageSchema from "../../features/adminDashboard/schemas/createBlogPageSchema";
import { useFormik } from "formik";
import type { CreateBlogType } from "../../interfaces/createBlogPage";
import { useState } from "react";

function BlogFeedsDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const postDetails = useLoaderData();
  const navigate = useNavigate();
  const { id } = useParams();

  //Handle editing modal
  const handleIsEditing = () => {
    setIsEditing((editing) => !editing);
  };

  //Handle submit
  const handleUpdatePost = async (values: CreateBlogType) => {
    try {
      const response = await Backendless.Data.of("Posts").save({
        objectId: id,
        title: values.title,
        author: values.author,
        content: values.content,
      });

      if (response) navigate(`/feeds/${id}`);

      console.log("updated data -->", response);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik<CreateBlogType>({
    //Initial values
    initialValues: {
      title: postDetails.title,
      author: postDetails.author,
      content: postDetails.content,
    },

    //validateSchema
    validationSchema: createBlogPageSchema,

    //action
    onSubmit: (values: CreateBlogType) => {
      console.log(values);
      handleUpdatePost(values);
    },
  });

  return (
    <div>
      <div>
        <h1>Blog feeds details</h1>
        <button onClick={handleIsEditing} className="border cursor-pointer">
          Edit
        </button>
        <button className="border cursor-pointer">Delete Post</button>
      </div>

      <section>
        <h1>{postDetails.title}</h1>
        <p>{postDetails.author}</p>
        <p>{postDetails.content}</p>
      </section>

      {/* form edit temp */}
      {isEditing && (
        <section className="flex justify-center">
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col pb-5">
              <label>Blog title</label>
              <input
                id="title"
                name="title"
                onChange={formik.handleChange}
                value={formik.values?.title}
                type="text"
                placeholder="Input your new Log title"
                className="border border-indigo"
              />
              {formik?.errors && (
                <p className="text-xs text-red-700">{formik?.errors?.title}</p>
              )}
            </div>

            <div className="flex flex-col pb-5">
              <label>Author</label>
              <input
                id="author"
                name="author"
                onChange={formik.handleChange}
                value={formik.values?.author}
                type="text"
                placeholder="Input your name as 'Author'"
                className="border border-indigo"
              />
              {formik?.errors && (
                <p className="text-xs text-red-700">{formik?.errors?.author}</p>
              )}
            </div>

            <div className="flex flex-col pb-5">
              <label>Content</label>
              <textarea
                id="content"
                name="content"
                onChange={formik.handleChange}
                value={formik.values?.content}
                placeholder="Drop your ideas'"
                className="border border-indigo"
                maxLength={5000}
              />
              {formik?.errors && (
                <p className="text-xs text-red-700">
                  {formik?.errors?.content}
                </p>
              )}
            </div>

            <div className="flex gap-5">
              <button type="submit" className="border cursor-pointer">
                Submit
              </button>
              <button
                onClick={handleIsEditing}
                className="border cursor-pointer">
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
}

export const fetchBlogDetailsById = async ({
  params,
}: {
  params: Params<"todoId">;
}) => {
  try {
    const response = await Backendless.Data.of("Posts").findById(params?.id);
    console.log("Blog Details", response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateBlogAction = async ({ params, request }) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const author = formData.get("author");
  const content = formData.get("content");
  console.log("Input Data", title, author, content);

  const error = {};

  try {
    //Validate
    const validateNewInput = await createBlogPageSchema.validate({
      title,
      author,
      content,
    });
    console.log("validate-->", validateNewInput);

    //Action
    // const response = await Backendless.Data.of("Posts").save({
    //   objectId: params.id,
    // });

    // console.log(response);
  } catch (error) {
    console.log("err", error);
  }
};

export default BlogFeedsDetails;
