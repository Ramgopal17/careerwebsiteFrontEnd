import React, { Fragment, useEffect, useState } from "react";
import PageTitle from "../../components/pagetitle/pageTitle";
import CareerList from "../../components/careerList/careerList.js";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/footer-12";
import Scrollbar from "../../components/scrollbar/scrollbar";
import { useParams } from "react-router-dom";
import globalEnv from "../../api/globalenv";
const CareerPage = () => {
  const { slug } = useParams();

  const [Category, setCategory] = useState([]);
  useEffect(() => {
    fetch(
      `${globalEnv.api}/api/categories?filters[Slug][$eq]=${slug}&populate=*`
    )
      .then((response) => response.json())
      .then((data) => {
        setCategory(data.data);
      })
      .catch((error) => console.error(error));
  }, [slug]);

  return (
    <Fragment>
      <div className="theme-bg-black">
        <Navbar />
      </div>
      <PageTitle
        pageTitle={`Category/${Category.map((item) => item.attributes.Title)}`}
        pagesub={"Blog"}
      />

      <CareerList blLeft={"order-lg-1"} blRight={"order-lg-2"} />

      <Footer />
      <Scrollbar />
    </Fragment>
  );
};
export default CareerPage;
