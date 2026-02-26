import * as yup from "yup";

const createBlogPageSchema = yup.object().shape({
  title: yup
    ?.string()
    .required("Title is required")
    .min(10, "Title must have minimum 10 characters")
    .max(100, "Title must have maximum 100 characters"),

  author: yup
    ?.string()
    .required("Author is required")
    .min(5, "Author must have minimum 5 characters")
    .max(20, "Author must have maximum 20 characters"),

  content: yup
    ?.string()
    .required("Content is required")
    .min(100, "Content must have minimum 100 characters")
    .max(5000, "Content must have maximum 5000 characters"),
});

export default createBlogPageSchema;
