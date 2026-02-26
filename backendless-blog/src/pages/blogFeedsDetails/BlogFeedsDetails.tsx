import {
  useLoaderData,
  useNavigate,
  useParams,
  type ActionFunctionArgs,
} from "react-router-dom";
import Backendless from "../../backendless/backendless";
import createBlogPageSchema from "../../features/adminDashboard/schemas/createBlogPageSchema";
import { useFormik } from "formik";
import type { CreateBlogType } from "../../interfaces/createBlogPage";
import { useState } from "react";
import CofirmationModal from "../../ui/CofirmationModal";

function BlogFeedsDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModaldelete] = useState(false);
  const postDetails = useLoaderData();
  const navigate = useNavigate();
  const { id } = useParams();

  //Handle editing modal
  const handleIsEditing = () => {
    setIsEditing((editing) => !editing);
  };

  //Handle editing modal
  const handleShowModal = () => {
    setShowModalEdit((show) => !show);
  };

  //Handle delete modal
  const handleDeleteModal = () => {
    setShowModaldelete((show) => !show);
  };

  //Handle delete Data
  const handleDeletePost = async () => {
    try {
      const response: any = await Backendless.Data.of("Posts").remove(`${id}`);
      console.log("delete res", response);
      //   if (!response.ok) throw new Error("Page not found");

      if (response) navigate("/feeds");
    } catch (error) {
      console.log(error);
    }
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

      //   console.log("updated data -->", response);
      setIsEditing(false);
      setShowModalEdit(false);
      if (response) navigate(`/feeds/${id}`);
    } catch (error) {
      console.log(error);
      return error;
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
        <button onClick={handleDeleteModal} className="border cursor-pointer">
          Delete Post
        </button>

        {showModalDelete && (
          <CofirmationModal
            onContinue={handleDeletePost}
            onCloseModal={handleDeleteModal}>
            Are you sure want to delete this post?
          </CofirmationModal>
        )}
      </div>

      <section>
        <h1>{postDetails.title}</h1>
        <p>{postDetails.author}</p>
        <p>{postDetails.content}</p>
      </section>

      {/* form edit temp */}
      {isEditing && (
        <>
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
                  <p className="text-xs text-red-700">
                    {formik?.errors?.title}
                  </p>
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
                  <p className="text-xs text-red-700">
                    {formik?.errors?.author}
                  </p>
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
                {showModalEdit && (
                  <CofirmationModal
                    type="submit"
                    onCloseModal={handleShowModal}>
                    Are you sure?
                  </CofirmationModal>
                )}
                <button
                  onClick={handleIsEditing}
                  className="border cursor-pointer">
                  Cancel
                </button>
              </div>
            </form>
          </section>
          <button onClick={handleShowModal} className="border cursor-pointer">
            Submit
          </button>
        </>
      )}
    </div>
  );
}

export const fetchBlogDetailsById = async ({ params }: ActionFunctionArgs) => {
  const errorMessage = {
    message: "",
  };

  try {
    const response = await Backendless.Data.of("Posts").findById(params.id!);
    console.log("Blog Details", response);

    return response;
  } catch (error) {
    console.log(error);
    errorMessage.message = "Page Not Found";

    return errorMessage;
  }
};

export default BlogFeedsDetails;
