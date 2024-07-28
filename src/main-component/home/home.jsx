import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/footer-12";
import Scrollbar from "../../components/scrollbar/scrollbar";
import HowWeWork from "./howWeWork";
import OurPerk from "./ourPerk";
import OurRecruitmentProcess from "./ourRecruitmentProcess";
import JoinUs from "./joinUs";
import TopBanner from "./topBanner";
import globalenv from "../../api/globalenv";

function Home() {
  const [newRecentJobCategory, setNewRecentJobCategory] = useState("");

 useEffect(() => {
    let isMounted = true;
  
    fetch(`${globalenv.api}/api/job-openings?sort[0]=createdAt:desc&populate[Subcategory][populate]=Category`)
      .then((response) => response.json())
      .then((data) => {
        if (isMounted && data && data[0]?.attributes?.Subcategory?.data?.attributes?.Category?.data?.attributes) {
          setNewRecentJobCategory(
            data[0].attributes.Subcategory.data.attributes.Category.data.attributes.Slug
          );
        }
      })
      .catch((error) => console.error(error));
  
    // Cleanup function to handle unmounting
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <>
      <style jsx="true">
        {`
          h1,
          h3 {
            color: var(--tp-theme-vogue);
          }
          img {
            border-radius: 8px;
          }
        `}
      </style>
      <div className="theme-bg-black">
        <Navbar hclass={"wpo-header-style-1"} topbarNone={"topbar-none"} />
      </div>
      <TopBanner newRecentJobCategory={newRecentJobCategory} />
      <HowWeWork />
      <OurPerk />
      <OurRecruitmentProcess />
      <JoinUs newRecentJobCategory={newRecentJobCategory} />
      <Footer />
      <Scrollbar />
    </>
  );
}

export default Home;
