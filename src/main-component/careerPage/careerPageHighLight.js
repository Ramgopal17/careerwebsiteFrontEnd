import React, { Fragment, useState,useEffect } from "react";
import PageTitle from "../../components/pagetitle/pageTitle";
import Navbar from "../../components/navbar/Navbar.js";
import Footer from "../../components/footer/footer-12";
import Scrollbar from "../../components/scrollbar/scrollbar";
import { useParams } from "react-router-dom";
import CareerNewList from "../../components/careerList/careerHomePageNewList";
import globalEnv from "../../api/globalenv";

const CareerPageHighLight = () => {
  const { slug } = useParams();
  const [Category,setCategory]=useState([])
  useEffect(() => {
    fetch(
      `${globalEnv.api}/api/subcategories?filters[SLug][$eq]=${slug}&populate[Job_openings][populate]=*`
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
      <PageTitle pageTitle={`${Category.map((item)=>item.attributes.Title)}`} pagesub={"Blog"} />
  
      <CareerNewList blLeft={"order-lg-1"} blRight={"order-lg-2"} />
   
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};
export default CareerPageHighLight;
