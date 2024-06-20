import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import * as apiCall from "../../services/downloadService";
import { IDownload } from "../../utils/types";

const EditDownload: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Ensure id is always a string
  const navigate = useNavigate();
  const { data: download, isLoading } = useQuery<IDownload>(
    ["download", id],
    () => apiCall.fetchDownloadById(id!)
  );

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    type: "manual",
    accessLevel: "public",
    file: null as File | null,
  });

  useEffect(() => {
    if (download) {
      setFormData({
        title: download.title,
        category: download.category,
        type: download.type,
        accessLevel: download.accessLevel,
        file: null,
      });
    }
  }, [download]);

  const mutation = useMutation(
    ({ id, data }: { id: string; data: FormData }) =>
      apiCall.updateDownload(id, data),
    {
      onSuccess: () => {
        navigate("/downloads");
      },
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("title", formData.title);
    formDataToSubmit.append("category", formData.category);
    formDataToSubmit.append("type", formData.type);
    formDataToSubmit.append("accessLevel", formData.accessLevel);
    if (formData.file) {
      formDataToSubmit.append("file", formData.file);
    }
    mutation.mutate({ id: id!, data: formDataToSubmit });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          title="Enter the title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>
      <div>
        <label>Category</label>
        <input
          type="text"
          name="category"
          title="Enter the title"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        />
      </div>
      <div>
        <label>Type</label>
        <select
          name="type"
          title="Select the type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
          <option value="manual">Manual</option>
          <option value="strategy">Strategy</option>
        </select>
      </div>
      <div>
        <label>Access Level</label>
        <select
          name="access Level"
          value={formData.accessLevel}
          title={"Select the access level"}
          onChange={(e) =>
            setFormData({ ...formData, accessLevel: e.target.value })
          }>
          <option value="public">Public</option>
          <option value="protected">Protected</option>
        </select>
      </div>
      <div>
        <label>File</label>
        <input
          type="file"
          placeholder="file"
          onChange={(e) => {
            if (e.target.files) {
              setFormData({ ...formData, file: e.target.files[0] });
            }
          }}
        />
      </div>
      <button type="submit">Update Download</button>
    </form>
  );
};

export default EditDownload;
