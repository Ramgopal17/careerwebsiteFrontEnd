import React, { Fragment } from "react";
import Navbar from "../../components/navbar/Navbar";
import Hero from "../../components/homePageBanner/homePageBanner";
import Scrollbar from "../../components/scrollbar/scrollbar";

import HighlightsNews from "../../components/highlightsNews-1/highlightsNews-12";
import Footer from "../../components/footer/footer-12";

const HomePage = () => {
  return (
    <Fragment>
      <div className="theme-bg-black">
        <Navbar hclass={"wpo-header-style-1"} topbarNone={"topbar-none"} />
      </div>
      <Hero />

      <HighlightsNews blLeft={"order-lg-1"} blRight={"order-lg-2"} />

      <Footer />
      <Scrollbar />
    </Fragment>
  );
};

export default HomePage;
