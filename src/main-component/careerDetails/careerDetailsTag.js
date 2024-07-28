import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar.js";
import PageTitle from "../../components/pagetitle/pagetitleDetail";
import Scrollbar from "../../components/scrollbar/scrollbar";
import { useParams } from "react-router-dom";
import CareerSingleTag from "../../components/careerDetails/careerSingleTag.js";
import Footer from "../../components/footer/footer-12";
import globalEnv from "../../api/globalenv";

const CareerDetailsTag = () => {
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
      <CareerSingleTag
        slug={slug}
        blLeft={"d-none"}
        blRight={"col-lg-10 offset-lg-2"}
      />

      <Footer />
      <Scrollbar />
    </Fragment>
  );
};

export default CareerDetailsTag;
