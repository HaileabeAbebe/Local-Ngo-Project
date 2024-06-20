// AddNews.js
import { useMutation } from "react-query";
import * as apiCall from "../../services/newsService";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import ManageNewsForm from "../../forms/NewsForm/ManageNewsForm";

const AddNews = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(apiCall.createNews, {
    onSuccess: () => {
      showToast({ message: "News created successfully!", type: "SUCCESS" });
      navigate("/news");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleSave = (newsFormData: FormData) => {
    mutate(newsFormData);
  };

  return <ManageNewsForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddNews;
