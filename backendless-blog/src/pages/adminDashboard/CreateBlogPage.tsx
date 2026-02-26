import { useFormik } from "formik";
import createBlogPageSchema from "../../features/adminDashboard/schemas/createBlogPageSchema";
import type { CreateBlogType } from "../../interfaces/createBlogPage";
import Backendless from "../../backendless/backendless";
import { useState } from "react";
import CofirmationModal from "../../ui/CofirmationModal";
import Button from "../../ui/Button";
import FormErrorMessage from "../../ui/FormErrorMessage";
import { useNavigate } from "react-router-dom";

function CreateBlogPage() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  //handle show modal
  const handleShowModal = () => {
    setShowModal((show) => !show);
  };

  //handle submit
  const handleSubmitBlog = async (values: CreateBlogType) => {
    try {
      const response = await Backendless.Data.of("Posts").save(values);
      console.log(response);
      setShowModal(false);
      navigate("/feeds");
    } catch (error) {
      console.log(error);
    }
  };

  //FORMIK SETUP
  const formik = useFormik<CreateBlogType>({
    //Initial values
    initialValues: {
      title: "",
      author: "",
      content: "",
    },

    //schema:
    validationSchema: createBlogPageSchema,

    onSubmit: (values: CreateBlogType) => {
      handleSubmitBlog(values);
    },
  });

  const isWrongInput =
    formik.errors.title !== undefined ||
    formik.errors.author !== undefined ||
    formik.errors.content !== undefined;

  const isNotEmpty =
    formik.values.title !== "" &&
    formik.values.author !== "" &&
    formik.values.content !== "";

  const isError = isWrongInput || !isNotEmpty;
  return (
    <main className="pt-12 h-dvh">
      <div>
        <div className="flex justify-center pt-12 text-3xl pb-10 ">
          <h1 className="bg-linear-to-r from-white to-stone-500 bg-clip-text  text-transparent">
            Create Log Form
          </h1>
        </div>

        <section className="flex justify-center">
          <div>
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col pb-5">
                <label className="text-stone-400 text-lg font-light">
                  Blog title
                </label>
                <input
                  id="title"
                  name="title"
                  onChange={formik.handleChange}
                  value={formik.values?.title}
                  type="text"
                  placeholder="Input your new Log title"
                  className="border w-100 h-12 px-4 py-2 border-stone-500 rounded-md my-4 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-indigo-500 text-stone-400 font-light"
                />
                {formik?.errors && (
                  <FormErrorMessage>{formik?.errors?.title}</FormErrorMessage>
                )}
              </div>

              <div className="flex flex-col pb-5">
                <label className="text-stone-400 text-lg font-light">
                  Author
                </label>
                <input
                  id="author"
                  name="author"
                  onChange={formik.handleChange}
                  value={formik.values?.author}
                  type="text"
                  placeholder="Input your name as 'Author'"
                  className="border w-100 h-12 px-4 py-2 border-stone-500 rounded-md my-4 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-indigo-500 text-stone-400 font-light"
                />
                {formik?.errors && (
                  <FormErrorMessage>{formik?.errors?.author}</FormErrorMessage>
                )}
              </div>

              <div className="flex flex-col pb-5">
                <label className="text-stone-400 text-lg font-light">
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  onChange={formik.handleChange}
                  value={formik.values?.content}
                  placeholder="Drop your ideas"
                  className="border w-100 h-30 px-4 py-2 border-stone-500 rounded-md my-4 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-indigo-500 text-stone-400 font-light"
                  maxLength={5000}
                />
                {formik?.errors && (
                  <FormErrorMessage>{formik?.errors?.content}</FormErrorMessage>
                )}
                {showModal && (
                  <CofirmationModal
                    type="submit"
                    onCloseModal={handleShowModal}>
                    Are you sure want to submit this post? You can edit it later
                  </CofirmationModal>
                )}
              </div>
            </form>
            {showModal || (
              <Button
                disabled={isError}
                type="button"
                onClick={handleShowModal}>
                Submit
              </Button>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default CreateBlogPage;
