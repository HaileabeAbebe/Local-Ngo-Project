//not found page with 404 status code
import { FC } from "react";

const NotFound: FC = () => {
  return (
    <div className="container mx-auto text-center">
      <h1 className="text-6xl font-bold text-red-600">Oops!</h1>
      <h2 className="text-4xl font-bold text-red-600">Page Not Found</h2>
      <h3 className="text-2xl font-bold text-red-600">Status Code: 404</h3>
      <h1 className="text-8xl font-bold text-red-600">&#128546;</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
