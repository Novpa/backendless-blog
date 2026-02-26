import { useFormik } from "formik";
import createBlogPageSchema from "../../features/adminDashboard/schemas/createBlogPageSchema";
import type { CreateBlogType } from "../../interfaces/createBlogPage";
import Backendless from "../../backendless/backendless";

function CreateBlogPage() {
  //handle submit
  const handleSubmitBlog = async (values: CreateBlogType) => {
    try {
      const response = await Backendless.Data.of("Posts").save(values);
      console.log(response);
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

  return (
    <div>
      <div className="flex justify-center pt-10">
        <h1>Create blog page</h1>
      </div>

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
              <p className="text-xs text-red-700">{formik?.errors?.content}</p>
            )}
          </div>

          <button type="submit" className="border cursor-pointer">
            Submit
          </button>
        </form>
      </section>
    </div>
  );
}

export default CreateBlogPage;
