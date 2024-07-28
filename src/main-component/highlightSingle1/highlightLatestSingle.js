import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar.js";
import PageTitle from "../../components/pagetitle/pagetitleDetail";
import Scrollbar from "../../components/scrollbar/scrollbar";
import { useParams } from "react-router-dom";
import Footer from "../../components/footer/footer-12";
import HighlightLatestDetails from "./highlight/highlightLatestDetail";
import globalEnv from "../../api/globalenv.js";
import axios from "axios";

const HighlightLatestSingle = () => {
  const [job, setJobs] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `${globalEnv.api}/api/job-openings?filters[Slug][$eq]=${slug}&populate=*`
        );
        setJobs(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchJobs();
  }, [slug]);

  return (
    <Fragment>
      <div className="theme-bg-black">
        <Navbar />
      </div>
      <PageTitle pageTitle={job[0]?.attributes?.Title} pagesub={"Blog"} />

      <HighlightLatestDetails
        jobs={job[0]}
        slug={slug}
        blLeft={"d-none"}
        blRight={"col-lg-10 offset-lg-2"}
      />

      <Footer />
      <Scrollbar />
    </Fragment>
  );
};

export default HighlightLatestSingle;
