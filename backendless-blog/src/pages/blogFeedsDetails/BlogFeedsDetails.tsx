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
import { formatTimestamp } from "../../utils/helperFunction";
import Button from "../../ui/Button";
import BackButton from "../../ui/BackButton";

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
    <section className="py-30 px-10 sm:px-20 md:px-30">
      <BackButton>Back to Feeds</BackButton>
      <div>
        <div className="block md:flex md:justify-between items-center">
          <h1 className="text-3xl lg:text-5xl py-5 md:py-5">
            {postDetails.title}
          </h1>
          <div className="flex gap-5">
            <Button type="button" onClick={handleIsEditing}>
              Edit
            </Button>
            <Button onClick={handleDeleteModal} type="button" style="secondary">
              Delete Post
            </Button>
          </div>
        </div>
        <div className="flex gap-5 text-xs sm:text-sm py-4 text-stone-400 font-light">
          <p>⦿ {postDetails.author}</p>
          <p>{formatTimestamp(postDetails.created, postDetails.updated)}</p>
        </div>

        {showModalDelete && (
          <CofirmationModal
            onContinue={handleDeletePost}
            onCloseModal={handleDeleteModal}>
            Are you sure want to delete this post?
          </CofirmationModal>
        )}
      </div>

      <section className="py-8 ">
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
    </section>
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
