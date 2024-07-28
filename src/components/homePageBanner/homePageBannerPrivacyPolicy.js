import React from "react";
import "./homePageBanner.css";
import HeroHeader from "./heroHeader.js";
import headerBg from "../../images/heroHeaderBg1.png";

const homePageBannerPrivacyPolicy = () => {
  return (
    <>
      <HeroHeader
        backImage={headerBg}
        backColor="#c9e0d7"
        title="Privacy Policy"
      />
    </>
  );
};

export default homePageBannerPrivacyPolicy;
