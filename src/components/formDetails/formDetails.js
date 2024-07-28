import React, { Fragment } from "react";
import Navbar from "../navbar/Navbar";
import PageTitle from "../pagetitle/pageTitle";
import Scrollbar from "../scrollbar/scrollbar";

import ApplyNow from "../applyForm/applyNow";
import Footer from "../footer/footer-12";

const FormDetails = () => {
  return (
    <Fragment>
      <div className="theme-bg-black">
        <Navbar />
      </div>
      <PageTitle pagesub={"Blog"} pageTitle={`Job Application Form`} />
      <div>
        <div className="pt-25 pb-25">
          <ApplyNow />
        </div>
      <Footer />
      </div>
      <Scrollbar />
    </Fragment>
  );
};

export default FormDetails;
