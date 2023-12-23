import IndexView from "@/components/Views/IndexView";
import React from "react";

interface IndexProps {
  toggleTheme: () => void;
}

const Index: React.FC<IndexProps> = ({ toggleTheme }) => {
  return <IndexView toggleTheme={toggleTheme} />;
};

export default Index;
