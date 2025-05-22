import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import UnitConversionGuide from "./post/UnitConversionGuide";

const BlogList = lazy(() => import("./pages/BlogList"));
const PDFManipulationTechniques = lazy(() => import("./post/PDFManipulationTechniques"));
const ImageOptimizationGuide = lazy(() => import("./post/ImageOptimizationGuide"));
const SecurePasswordGuide = lazy(() => import("./post/SecurePasswordGuide"));
const QRCodeBestPractices = lazy(() => import("./post/QRCodeBestPractices"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const BlogRouter = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route
          path="/posts/pdf-manipulation-techniques"
          element={<PDFManipulationTechniques />}
        />
        <Route
          path="/posts/image-optimization-guide"
          element={<ImageOptimizationGuide />}
        />
        <Route
          path="/posts/secure-password-guide"
          element={<SecurePasswordGuide />}
        />
        <Route
          path="/posts/qr-code-best-practices"
          element={<QRCodeBestPractices />}
        />
        <Route
          path="/posts/unit-conversion-guide"
          element={<UnitConversionGuide />}
        />
      </Routes>
    </Suspense>
  );
};

export default BlogRouter;