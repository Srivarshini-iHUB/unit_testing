import notFoundIllustration from "@/assets/images/page-not-found.svg";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const [isHomeHovered, setIsHomeHovered] = useState(false);
  const [isBackHovered, setIsBackHovered] = useState(false);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-backgroundFill flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Custom SVG Illustration */}
        <div className="mb-16">
          <img src={notFoundIllustration} className="w-[500px]" />
        </div>

        {/* Text Content */}
        <div className="mb-12 space-y-4">
          <h2 className="text-2xl md:text-3xl font-light text-gray-800">Page not found</h2>
          <p className="text-gray-500 text-lg leading-relaxed max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="iconButton"
            onMouseEnter={() => setIsHomeHovered(true)}
            onMouseLeave={() => setIsHomeHovered(false)}
            onClick={() => navigate("/")}
          >
            <Home
              className={`w-4 h-4 transition-transform duration-200 ${
                isHomeHovered ? "scale-110" : ""
              }`}
            />
            Go home
          </Button>

          <Button
            variant="viewButton"
            onMouseEnter={() => setIsBackHovered(true)}
            onMouseLeave={() => setIsBackHovered(false)}
            onClick={() => goBack()}
          >
            <ArrowLeft
              className={`w-4 h-4 transition-transform duration-200 ${
                isBackHovered ? "-translate-x-1" : ""
              }`}
            />
            Go back
          </Button>
        </div>

        {/* Subtle decoration */}
        <div className="mt-20">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
