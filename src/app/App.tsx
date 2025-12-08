// src/app/App.tsx
import React, { useState } from "react";
import { Header } from "../widgets/header/Header";
import { Footer } from "../widgets/footer/Footer";
import { TabId, DEFAULT_TAB_ID } from "../shared/config/navigation";
import { HomePage } from "../pages/HomePage";
import { ProductsPage } from "../pages/ProductsPage";
import { PricingPage } from "../pages/PricingPage";
import { BlogPage } from "../pages/BlogPage";
import { ContactPage } from "../pages/ContactPage";
import { Language } from "../shared/config/i18n";


const App: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<TabId>(DEFAULT_TAB_ID);

  const renderPage = () => {
    switch (activeTabId) {
      case "home":
        return <HomePage />;
      case "products":
        return <ProductsPage />;
      case "pricing":
        return <PricingPage />;
      case "blog":
        return <BlogPage />;
      case "contact":
        return <ContactPage />;
      default:
        return null;
    }
  };

  return (
    <div className="page">
      <Header activeTabId={activeTabId} onTabChange={setActiveTabId} />
      <main>{renderPage()}</main>
      <Footer />
    </div>
  );
};

export default App;
