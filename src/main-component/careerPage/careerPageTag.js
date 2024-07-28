import React, { Fragment } from "react";
import PageTitle from "../../components/pagetitle/pageTitle";
import Navbar from "../../components/navbar/Navbar.js";
import Footer from "../../components/footer/footer-12";
import Scrollbar from "../../components/scrollbar/scrollbar";
import { useParams } from "react-router-dom";
import CareerListTag from "../../components/careerList/careerListTag.js";

const CareerPageTag = () => {
  const { slug } = useParams();

  return (
    <Fragment>
      <div className="theme-bg-black">
      <Navbar />
      </div>
   <PageTitle pageTitle={`Tag/${slug}`} pagesub={"Blog"} />
  <CareerListTag blLeft={"order-lg-1"} blRight={"order-lg-2"} slug={slug} />
  <Footer />
      <Scrollbar />
    </Fragment>
  );
};
export default CareerPageTag;
