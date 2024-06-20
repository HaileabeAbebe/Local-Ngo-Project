import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as apiCall from "../../services/newsService";
import { useAppContext } from "../../contexts/AppContext";
import ManageNewsForm from "../../forms/NewsForm/ManageNewsForm";

const EditNews = () => {
  const { newsId } = useParams();
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const { data: news, refetch } = useQuery(
    "fetchNewsById",
    () => apiCall.fetchNewsById(newsId || ""),
    {
      enabled: !!newsId,
    }
  );

  const { mutate, isLoading } = useMutation(apiCall.updateNewsById, {
    onSuccess: () => {
      showToast({ message: "News updated successfully", type: "SUCCESS" });
      refetch();
      navigate(`/news/${news._id}`);
    },
    onError: async (error) => {
      if (error instanceof Response) {
        const err = await error.json();
        showToast({ message: err.message, type: "ERROR" });
      } else {
        // Otherwise, it's a JavaScript error
        console.log(error);
      }
    },
  });

  const handleSave = (newsFormData: FormData) => {
    mutate(newsFormData);
  };
  return (
    <ManageNewsForm onSave={handleSave} isLoading={isLoading} news={news} />
  );
};

export default EditNews;
