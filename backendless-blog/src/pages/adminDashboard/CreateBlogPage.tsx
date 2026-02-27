import { useFormik } from "formik";
import createBlogPageSchema from "../../features/adminDashboard/schemas/createBlogPageSchema";
import type { CreateBlogType } from "../../interfaces/createBlogPage";
import Backendless from "../../backendless/backendless";
import { useState } from "react";
import CofirmationModal from "../../ui/CofirmationModal";
import Button from "../../ui/Button";
import FormErrorMessage from "../../ui/FormErrorMessage";
import { useNavigate, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../ui/Loader";

function CreateBlogPage() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const navigation = useNavigation();
  // console.log(navigation.state);

  //handle show modal
  const handleShowModal = () => {
    setShowModal((show) => !show);
  };

  //handle submit
  const handleSubmitBlog = async (values: CreateBlogType) => {
    try {
      const response: any = await Backendless.Data.of("Posts").save(values);
      console.log(response);
      setShowModal(false);
      toast.success("Congratulations, Your Log Successfully Made.");
      navigate(`/feeds/${response.objectId}`);
      // navigate("/feeds");
    } catch (error) {
      console.log(error);
      toast.error("There's something wrong!");
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
    <>
      {navigation.state === "loading" && <Loader />}
      <main className="pt-12 h-dvh ">
        <div>
          <div className="flex justify-center pt-12 text-xl md:text-3xl pb-10 ">
            <h1>Create Log Form</h1>
          </div>

          <section className="flex justify-center">
            <div className="w-[85%] sm:w-[75%] md:w-[50%]">
              <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col pb-5">
                  <label className="text-stone-400 text-md md:text-lg font-light">
                    Blog title
                  </label>
                  <input
                    id="title"
                    name="title"
                    onChange={formik.handleChange}
                    value={formik.values?.title}
                    type="text"
                    placeholder="Input your new Log title"
                    className="border w-full h-12 px-4 py-2 border-stone-500 rounded-md my-4 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-indigo-500 text-stone-400 font-light"
                  />
                  {formik?.errors && (
                    <FormErrorMessage>{formik?.errors?.title}</FormErrorMessage>
                  )}
                </div>

                <div className="flex flex-col pb-5">
                  <label className="text-stone-400 text-md md:text-lg font-light">
                    Author
                  </label>
                  <input
                    id="author"
                    name="author"
                    onChange={formik.handleChange}
                    value={formik.values?.author}
                    type="text"
                    placeholder="Input your name as 'Author'"
                    className="border w-full h-12 px-4 py-2 border-stone-500 rounded-md my-4 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-indigo-500 text-stone-400 font-light"
                  />
                  {formik?.errors && (
                    <FormErrorMessage>
                      {formik?.errors?.author}
                    </FormErrorMessage>
                  )}
                </div>

                <div className="flex flex-col pb-5">
                  <label className="text-stone-400 text-md md:text-lg font-light">
                    Content
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    onChange={formik.handleChange}
                    value={formik.values?.content}
                    placeholder="Drop your ideas"
                    className="border w-full h-30 px-4 py-2 border-stone-500 rounded-md my-4 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-indigo-500 text-stone-400 font-light"
                    maxLength={5000}
                  />
                  {formik?.errors && (
                    <FormErrorMessage>
                      {formik?.errors?.content}
                    </FormErrorMessage>
                  )}
                  {showModal && (
                    <CofirmationModal
                      type="submit"
                      onCloseModal={handleShowModal}>
                      Are you sure want to submit this post? You can edit it
                      later
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
    </>
  );
}

export default CreateBlogPage;
