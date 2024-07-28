import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./careerSingleTag.css";
import globalEnv from "../../api/globalenv.js";
import Recentjob from "../recentJob/recentJob.js";
import Skeleton from "react-loading-skeleton";
import showdown from "showdown";
import "react-loading-skeleton/dist/skeleton.css";
import ApplyNow from "../../components/applyForm/applyNow.js";
const CareerSingleTag = ({ data, ...props }) => {
  const { slug } = useParams();
  const [item, setItem] = useState([]);
  const [tagItem, setTagItem] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    let url = item.map((item1) => item1?.attributes?.Tag).join(",");

    fetch(
      `${globalEnv.api}/api/job-openings?filters[Tag][$eq]=${url}&populate=*`
    )
      .then((response) => response.json())
      .then((data) => {
        setTagItem(data.data);
      })
      .catch((error) => console.error(error));
  }, [item]);
  const index = tagItem.findIndex((x) => {
    return item.map((p) => p?.id)?.includes(x?.id);
  });

  useEffect(() => {
    setCurrentIndex(index);
  }, [slug, tagItem, index]);

  const currentData = tagItem[currentIndex];
  return (
    <div>
      <section className="wpo-blog-single-section  theme-bg-black pt-25 pb-10">
        <div className="container">
          <div className="wpo-blog-content">
            <div className="entry-meta">
              {!currentData ? (
                <Skeleton />
              ) : (
                <>
                  <i
                    className="fi flaticon-calendar"
                    style={{
                      marginRight: "5px",
                      fontSize: "18px",
                      color: "#fff",
                    }}
                  ></i>
                  <span
                    style={{
                      fontSize: "16px",
                      color: "#fff",
                      textTransform: "none",
                      margin: "0px",
                    }}
                  >
                    Posted on:{" "}
                    {new Date(
                      currentData?.attributes?.createdAt
                    ).toLocaleDateString("en-GB")}
                  </span>{" "}
                </>
              )}
            </div>
          </div>

          <div className="listing">
            <div
              dangerouslySetInnerHTML={{
                __html: new showdown.Converter().makeHtml(
                  currentData?.attributes?.Description || ""
                ),
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

export default CareerSingleTag;
