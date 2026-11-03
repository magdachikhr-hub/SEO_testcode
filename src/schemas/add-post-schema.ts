import * as yup from "yup";

// Create yup schema as you already have it
const newPostSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required("პოსტის სათაური სავალდებულოა")
    .min(3, "სათაური უნდა შეიცავდეს მინიმუმ 3 სიმბოლოს"),
  content: yup
    .string()
    .trim()
    .required("პოსტის შინაარსი სავალდებულოა")
    .min(10, "შინაარსი უნდა შეიცავდეს მინიმუმ 10 სიმბოლოს"),
});

export type NewPostFormValues = yup.InferType<typeof newPostSchema>;

export default newPostSchema;
