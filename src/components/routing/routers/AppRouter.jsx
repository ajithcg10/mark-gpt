import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { RotatingTriangles } from "react-loader-spinner";

const LazyHome = React.lazy(() => import("../../screen/home/HomePage"));
const LazyBusiness = React.lazy(() => import("../../screen/business/Business"));
const LazySegments = React.lazy(() => import("../../screen/segments/Segments"));
const LazyPoints = React.lazy(() => import("../../screen/painpoints/Points"));
const LazyPage = React.lazy(() => import("../../inculeds/PageNotFound.jsx"));
const LazyLanding = React.lazy(() =>
  import("../../screen/landinpage/LandingPage")
);
const LazySocailMediaListPage = React.lazy(() =>
  import("../../screen/socialmedia/SocialMediaListPage")
);
const LazySocialSinglePage = React.lazy(() =>
  import("../../screen/socialmedia/SocialSinglePage")
);

export default function AppRouter() {
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <Suspense
      fallback={
        <div style={style}>
          <RotatingTriangles
            visible={true}
            height="100"
            width="100"
            ariaLabel="rotating-triangels-loading"
            wrapperStyle={{}}
            wrapperClass="rotating-triangels-wrapper"
          />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<LazyHome />} />
        <Route path="/business" element={<LazyBusiness />} />

        <Route path="/segments" element={<LazySegments />} />

        <Route path="/points" element={<LazyPoints />} />
        <Route path="/landing" element={<LazyLanding />} />
        <Route path="/social" element={<LazySocailMediaListPage />} />
        <Route path="/socialmedia" element={<LazySocialSinglePage />} />
        <Route path="/*" element={<LazyPage />} />
      </Routes>
    </Suspense>
  );
}
