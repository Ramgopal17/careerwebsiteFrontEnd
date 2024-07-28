import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "../homePage/homePage";
import CareerPage from "../careerPage/careerPage";
import CareerDetails from "../careerDetails/careerDetails";
import ErrorPage from "../errorPage/errorPage";

import CareerPageTag from "../careerPage/careerPageTag";
import CareerDetailsTag from "../careerDetails/careerDetailsTag";
import HighlightNewList from "../careerPage/careerPageHighLight";
import HighlightLatestSingle from "../../main-component/highlightSingle1/highlightLatestSingle";
import FormDetails from "../../components/formDetails/formDetails";
import Home from "../home/home";

const AllRoute = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/career" element={<Homepage />} />
          <Route
            path="highlight-single/latest/:slug"
            element={<HighlightLatestSingle />}
          />
          <Route path="career/:slug" element={<CareerPage />} />
          <Route path="career/tag/:slug" element={<CareerPageTag />} />
          <Route path="career-single/:slug" element={<CareerDetails />} />
          <Route
            path="category/subcategory/:slug"
            element={<HighlightNewList />}
          />
          <Route
            path="career-single/tag/:slug"
            element={<CareerDetailsTag />}
          />
          <Route path="career/form" element={<FormDetails />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AllRoute;
