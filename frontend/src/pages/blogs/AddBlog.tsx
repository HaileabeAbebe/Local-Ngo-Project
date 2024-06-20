// AddBlog.tsx
import { useMutation } from "react-query";
import ManageBlogForm from "../../forms/ManageBlogForm/ManageBlogForm";
import * as apiCall from "../../services/blogService";
import { useAppContext } from "../../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(apiCall.addBlog, {
    onSuccess: () => {
      showToast({ message: "Blog created successfully!", type: "SUCCESS" });
      navigate("/blogs");
    },
    onError: async (error) => {
      if (error instanceof Response) {
        const err = await error.json();
        showToast({ message: err.message, type: "ERROR" });
      } else {
        console.log(error);
      }
    },
  });

  const handleSave = (blogFormData: FormData) => {
    mutate(blogFormData);
  };

  return <ManageBlogForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddBlog;
