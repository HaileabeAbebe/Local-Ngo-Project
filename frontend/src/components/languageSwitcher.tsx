import { useTranslation } from "react-i18next";
import { FlagIcon } from "react-flag-kit";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex space-x-4">
      <button
        onClick={() => changeLanguage("en")}
        aria-label="English"
        className="px-2 py-2 rounded-md hover:bg-gray-300 transition">
        <FlagIcon code="GB" />
      </button>
      <button
        onClick={() => changeLanguage("am")}
        aria-label="Amharic"
        className="px-2 py-2 rounded-md hover:bg-gray-300 transition">
        <FlagIcon code="ET" />
      </button>
    </div>
  );
};

export default LanguageSwitcher;
