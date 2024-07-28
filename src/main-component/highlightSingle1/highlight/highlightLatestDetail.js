import React, { useEffect, useState, useMemo } from "react";
import showdown from "showdown";
import ApplyNow from "../../../components/applyForm/applyNow";
import Recentjob from "../../../components/recentJob/recentJob";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./highlightLatestDetails.css";

const HighlightDetails = ({ jobs, blRight, blLeft }) => {
  const htmlContent = jobs?.attributes?.Description || "";
  const [content, setContent] = useState("");

  useEffect(() => {
    window.scrollTo(10, 0);
    const convertedContent = new showdown.Converter().makeHtml(htmlContent);

    const hasHeadings = /<h[1-6][^>]*>(.*?)<\/h[1-6]>/.test(convertedContent);

    if (hasHeadings) {
      const midpoint = Math.floor(convertedContent.length / 2);
      const nearestHeadingIndex = findNearestHeadingIndex(
        convertedContent,
        midpoint
      );

      const firstPart = convertedContent.slice(0, nearestHeadingIndex);
      const secondPart = convertedContent.slice(nearestHeadingIndex);

      setContent({
        firstPart,
        secondPart,
        hasHeadings: true,
      });
    } else {
      setContent({
        firstPart: convertedContent,
        secondPart: "",
        hasHeadings: false,
      });
    }
  }, [htmlContent]);

  const findNearestHeadingIndex = (content, position) => {
    const headings = content.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/g) || [];

    let nearestHeadingIndex = -1;
    let minDistance = Number.MAX_SAFE_INTEGER;

    headings.forEach((heading, index) => {
      const headingIndex = content.indexOf(heading);
      const distance = Math.abs(headingIndex - position);

      if (distance < minDistance) {
        minDistance = distance;
        nearestHeadingIndex = headingIndex;
      }
    });

    return nearestHeadingIndex;
  };

  const formattedDate = useMemo(() => {
    return jobs ? new Date(jobs?.attributes?.createdAt).toLocaleDateString("en-GB") : "";
  }, [jobs]);

  return (
    <div>
      <section className="wpo-blog-single-section theme-bg-black pt-25 pb-10">
        <div className="container">
          <div className="wpo-blog-content" key={jobs?.id}>
            <div>
              {!jobs ? (
                <SkeletonTheme baseColor="#202020" highlightColor="#444">
                  <p>
                    <Skeleton height={20} count={25} />
                  </p>
                </SkeletonTheme>
              ) : (
                <span
                  style={{
                    fontSize: "16px",
                    color: "#fff",
                    textTransform: "none",
                    margin: "0px",
                  }}
                >
                  Posted on: {formattedDate}
                </span>
              )}
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: content.firstPart || "",
              }}
            ></div>
          </div>
        </div>
      </section>
      <div className="pt-25">
        <ApplyNow />
      </div>
      <div className="container pt-25 pb-25">
        <Recentjob />
      </div>
    </div>
  );
};

export default HighlightDetails;
