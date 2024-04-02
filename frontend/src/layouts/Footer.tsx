import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="bg-white text-green-900 text h-20 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">Green Project</h2>
          <p>Addisababa</p>
        </div>
        <div>
          <p>
            © {new Date().getFullYear()} Green Project. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
