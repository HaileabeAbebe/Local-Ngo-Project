import { Outlet } from "react-router-dom";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-white">
      <AdminHeader />
      <div className="flex flex-1">
        <AdminSidebar />
        <div className="flex-1 p-6 overflow-auto ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
