import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar.js";
import PageTitle from "../../components/pagetitle/pagetitleDetail";
import Scrollbar from "../../components/scrollbar/scrollbar";
import { useParams } from "react-router-dom";
import globalEnv from "../../api/globalenv";
import CareerSingle from "../../components/careerDetails/careerSingle.js";
import Footer from "../../components/footer/footer-12";

const CareerDetails = () => {
  const { slug } = useParams();
  const [item, setItem] = useState([]);

  useEffect(() => {
    fetch(
      `${globalEnv.api}/api/job-openings?filters[Slug][$eq]=${slug}&populate=*`
    )
      .then((response) => response.json())
      .then((data) => {
        setItem(data.data);
      })
      .catch((error) => console.error(error));
  }, [slug]);
  return (
    <Fragment>
      <div className="theme-bg-black">
        <Navbar />
      </div>
      <PageTitle
        pageTitle={item.map((item1) => item1?.attributes?.Title)}
        pagesub={"Blog"}
      />
    <CareerSingle blLeft={"d-none"} blRight={"col-lg-10 offset-lg-2"} />
    <Footer />
      <Scrollbar />
    </Fragment>
  );
};
export default CareerDetails;
