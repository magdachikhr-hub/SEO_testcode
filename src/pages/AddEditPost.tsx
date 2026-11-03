import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { CloseIcon, ErrorIcon } from "../svg";
import { useNavigate, useParams } from "react-router-dom";
import { useMemo, useRef, useState } from "react";
import { usePostsStore } from "../store";
import { objectToFormData } from "../helpers";
import { newPostSchema } from "../schemas";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { NewPostFormValues } from "../schemas/add-post-schema";
import { uploadImage } from "../services/posts-services";

const AddEditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addPost, getPostById, changePost } = usePostsStore();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    // setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<NewPostFormValues>({
    defaultValues: {
      title: "",
      content: "",
    },
    resolver: yupResolver(newPostSchema),
  });
  const post = getPostById(id || "");
  // useEffect(() => {
  //   if (id) {
  //     setValue("title.geo", post?.title.geo || "");
  //     setValue("title.eng", post?.title.eng || "");
  //     setValue("content.geo", post?.content.geo || "");
  //     setValue("content.eng", post?.content.eng || "");
  //     setValue("date", formatDateForInput(new Date(post?.date || "")));
  //     setValue("status", post?.status == "publish" || false);
  //     setValue("isFeatured", post?.isFeatured || false);
  //     setValue("time", new Date(post?.date || "").toTimeString().slice(0, 5));
  //   }
  // }, [id, setValue]);

  const fileRef = useRef<HTMLInputElement>(null);
  const handleFileChange = () => {
    if (fileRef.current?.files && fileRef.current.files[0]) {
      const file = fileRef.current.files[0];
      setUploadedFile(file);
    }
  };
  const quillGeoRef = useRef<ReactQuill | null>(null);

  const handleImageUpload = (ref: ReactQuill | null) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      if (!input || !input.files || input.files.length === 0 || !ref) return;
      const file = input.files[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await uploadImage(formData);
        const range = ref.getEditor()?.getSelection();
        if (range) {
          ref.getEditor()?.insertEmbed(range.index, "image", response.data.url);
        }
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: "1" }, { header: "2" }, { font: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ align: [] }],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: () => handleImageUpload(quillGeoRef.current),
        },
      },
    }),
    []
  );

  const onSubmit: SubmitHandler<NewPostFormValues> = async (data) => {
    let poster: File | string | undefined;

    if (uploadedFile) {
      poster = uploadedFile;
    } else if (post) {
      poster = post.poster;
    } else {
      alert("სურათის ატვირთვა სავალდებულოა");
      return;
    }
    const object = poster ? { ...data, image: poster } : { ...data };
    const formData = objectToFormData(object);
    try {
      if (post) {
        await changePost(post.id, formData);
      } else {
        await addPost(formData);
      }
      navigate("/posts");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div>
      <div>
        <img src="/images.jpg" alt="" />
     <h3>ფოტო 1</h3>
        <p className="author">ავტორი: უცნობი</p>
        <p className="resolution">1400</p>

        
          <strong>10 ₾</strong>
          <button type="button">🛒</button>
        
        </div>
            <div>
           <img src="/York.webp" alt="" />
     <h3>ფოტო 2</h3>
        <p className="author">ავტორი: უცნობი</p>
        <p className="resolution">1400</p>

        
          <strong>10 ₾</strong>
          <button type="button">🛒</button>
        
        </div>
            <div>
          <img src="/blackpanther.jpg" alt="" />
     <h3>ფოტო 3</h3>
        <p className="author">ავტორი: უცნობი</p>
        <p className="resolution">1400</p>

        
          <strong>10 ₾</strong>
          <button type="button">🛒</button>
        
        </div>
            <div>
           <img src="/flash.jpg" alt="" />
     <h3>ფოტო 4</h3>
        <p className="author">ავტორი: უცნობი</p>
        <p className="resolution">1400</p>

        
          <strong>10 ₾</strong>
          <button type="button">🛒</button>
        
        </div>
      </div>
  
   
  
    <FormElement onSubmit={handleSubmit(onSubmit)}>
      <CloseIcon onClick={() => navigate("/posts")} />
      <Title>{id ? "სტატიის რედაქტირება" : "სტატიის დამატება"}</Title>
      <LanguageWrapper>
        <LanguageBox>
          <StyledLabel htmlFor="title-geo">სათაური (ქართული)</StyledLabel>
          <StyledInput type="text" id="title-geo" {...register("title")} />
          <Error>
            {errors.title && (
              <ErrorWrapper>
                <ErrorIcon /> {errors.title.message}
              </ErrorWrapper>
            )}
          </Error>
        </LanguageBox>
      </LanguageWrapper>
      {/* {id && post && !activeGalleryItem && (
        <StyledPoster src={import.meta.env.VITE_API_URL + post.poster} />
      )}
      {activeGalleryItem && (
        <StyledPoster
          src={import.meta.env.VITE_API_URL + activeGalleryItem.url}
        />
      )} */}
      {uploadedFile && <StyledPoster src={URL.createObjectURL(uploadedFile)} />}
      <h6>პოსტერი:</h6>
      <>
        <StyledLabel htmlFor="file">პოსტერი</StyledLabel>
        <StyledInput
          type="file"
          id="file"
          ref={fileRef}
          onChange={handleFileChange}
        />
      </>

      <StyledLabel htmlFor="content-geo">სტატია (ქართული)</StyledLabel>
      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <StyledQuill
            id="content-geo"
            ref={quillGeoRef}
            modules={modules}
            theme="snow"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <Error style={{ marginTop: "50px" }}>
        {errors.content && (
          <ErrorWrapper>
            <ErrorIcon /> {errors.content.message}
          </ErrorWrapper>
        )}
      </Error>

      <SubmitBtn type="submit">
        {isSubmitting
          ? "მუშავდება..."
          : id
          ? "ცვლილებების შენახვა"
          : "სტატიის დამატება"}
      </SubmitBtn>
    </FormElement>
    </div>
  );
};

export default AddEditPost;

const FormElement = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  margin: auto;
  text-align: center;
  margin-bottom: 20px;
`;
const StyledLabel = styled.label``;

const StyledInput = styled.input`
  height: 44px;
  width: 50%;
  padding: 3px 5px;
  border-radius: 8px;
  margin-top: 10px;
  &::placeholder {
    opacity: 0.5;
  }
`;

const StyledQuill = styled(ReactQuill)`
  width: 100%;
  height: 400px;
  resize: none;
  padding: 3px 5px;
  border-radius: 8px;
  margin-top: 10px;
`;
const SubmitBtn = styled.button`
  padding: 10px 20px;
  background-color: #15be15;
  color: white;
  font-size: 18px;
  margin-left: auto;
  margin-top: 50px;
  border-radius: 8px;
`;

const Error = styled.div`
  width: 100%;
  margin-top: 5px;
  margin-left: 10px;
  color: var(--primary);
  font-size: 12px;
  height: 20px;
`;

const ErrorWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LanguageWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const LanguageBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledPoster = styled.img`
  width: 300px;
  height: auto;
  margin: auto;
`;
