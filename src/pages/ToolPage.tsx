
import { useParams } from "react-router-dom";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useState, useEffect } from "react";
import { toolCategories, ToolCategory } from "@/data/tools";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// Import tool components
import imageTools from "@/components/tools/image";
import pdfTools from "@/components/tools/pdf";
import calculatorTools from "@/components/tools/calculator";
import conversionTools from "@/components/tools/conversion";
import qrTools from "@/components/tools/qr";
import passwordTools from "@/components/tools/password";
import colorTools from "@/components/tools/color";
import unitTools from "@/components/tools/unit";
import currencyTools from "@/components/tools/currency";
import miscellaneousTools from "@/components/tools/miscellaneous";
import youtube from "@/components/tools/social-media";
import seoandweb from "@/components/tools/seoandweb";
import code from "@/components/tools/code";
import socialMedia from "@/components/tools/social-media";
import encryption from "@/components/tools/encryption";
import clock from "@/components/tools/clock";
import file from "@/components/tools/file-sharing";


const ToolPage = () => {
  const { categoryId, toolId } = useParams();
  const [category, setCategory] = useState<ToolCategory | null>(null);
  const [subTool, setSubTool] = useState<{ id: string; title: string; description?: string } | null>(null);

  useEffect(() => {
    // Direct tool ID route handling
    if (toolId && !categoryId) {
      // Search through all categories for the tool
      for (const cat of toolCategories) {
        const foundTool = cat.subTools?.find((tool) => tool.id === toolId);
        if (foundTool) {
          setCategory(cat);
          setSubTool(foundTool);
          return;
        }
      }
      setCategory(null);
      setSubTool(null);
      return;
    }

    // Category-based route handling
    const foundCategory = toolCategories.find((cat) => cat.id === categoryId);
    setCategory(foundCategory || null);

    if (foundCategory && toolId) {
      const foundTool = foundCategory.subTools?.find((tool) => tool.id === toolId);
      setSubTool(foundTool || null);
    }
  }, [categoryId, toolId]);

  if (!category || !subTool) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Tool not found</h1>
            <Link to="/#tools">
              <Button>Back to Tools</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Render the tool component dynamically based on category and tool ID
  const renderToolContent = () => {
    if (categoryId === "image" && toolId && imageTools[toolId]) {
      const ToolComponent = imageTools[toolId];
      return <ToolComponent />;
    }
    
    if (categoryId === "pdf" && toolId && pdfTools[toolId]) {
      const ToolComponent = pdfTools[toolId];
      return <ToolComponent />;
    }
    
    if (categoryId === "calculator" && toolId && calculatorTools[toolId]) {
      const ToolComponent = calculatorTools[toolId];
      return <ToolComponent />;
    }
    
    if (categoryId === "conversion" && toolId && conversionTools[toolId]) {
      const ToolComponent = conversionTools[toolId];
      return <ToolComponent />;
    }
    
    if (categoryId === "qr" && toolId && qrTools[toolId]) {
      const ToolComponent = qrTools[toolId];
      return <ToolComponent />;
    }
    
    if (categoryId === "password" && toolId && passwordTools[toolId]) {
      const ToolComponent = passwordTools[toolId];
      return <ToolComponent />;
    }
    
    if (categoryId === "color" && toolId && colorTools[toolId]) {
      const ToolComponent = colorTools[toolId];
      return <ToolComponent />;
    }
    
    if (categoryId === "unit" && toolId && unitTools[toolId]) {
      const ToolComponent = unitTools[toolId];
      return <ToolComponent />;
    }

    if (categoryId === "miscellaneous" && toolId && miscellaneousTools[toolId]) {
      const ToolComponent = miscellaneousTools[toolId];
      return <ToolComponent />;
    }
    if (categoryId === "social" && toolId && socialMedia[toolId]) {
      const ToolComponent = socialMedia[toolId];
      return <ToolComponent />;
    }
    if (categoryId === "seoandweb" && toolId && seoandweb[toolId]) {
      const ToolComponent = seoandweb[toolId];
      return <ToolComponent />;
    }
    if (categoryId === "code" && toolId && code[toolId]) {
      const ToolComponent = code[toolId];
      return <ToolComponent />;
    }

    if (categoryId === "currency" && toolId && currencyTools[toolId]) {
      const ToolComponent = currencyTools[toolId];
      return <ToolComponent />;
    }
    if (categoryId === "encryption" && toolId && encryption[toolId]) {
      const ToolComponent = encryption[toolId];
      return <ToolComponent />;
    }
    if (categoryId === "clock" && toolId && clock[toolId]) {
      const ToolComponent = clock[toolId];
      return <ToolComponent />;
    }
    if (categoryId === "file" && toolId && file[toolId]) {
      const ToolComponent = file[toolId];
      return <ToolComponent />;
    }
    
    // Fallback for tools that haven't been implemented yet
    return (
      <div className="bg-muted/40 border rounded-xl p-6">
        <p className="text-center text-muted-foreground">
          Tool content for {subTool.title} will be implemented here.
        </p>
      </div>
    );
  };

  const Icon = category.icon;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container py-8">
        <div className="mb-8">
          <Link to="/#tools" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft size={16} className="mr-2" />
            Back to all tools
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", category.color)}>
              <Icon size={24} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{subTool.title}</h1>
              <p className="text-muted-foreground">{category.title} Tool</p>
            </div>
          </div>
          
          {subTool.description && (
            <p className="text-muted-foreground max-w-2xl mb-6">{subTool.description}</p>
          )}
        </div>
        
        {renderToolContent()}
      </main>
      <Footer />
    </div>
  );
};

export default ToolPage;
