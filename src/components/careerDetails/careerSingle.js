import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Recentjob from "../recentJob/recentJob.js";
import "./careerSingle.css";
import globalEnv from "../../api/globalenv.js";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import showdown from "showdown";
import "react-loading-skeleton/dist/skeleton.css";
import ApplyNow from "../../components/applyForm/applyNow.js";
const CareerSingle = (props) => {
  const { slug } = useParams();
  const [item, setItem] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [catItem, setCatItem] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `${globalEnv.api}/api/job-openings?filters[Slug][$eq]=${slug}&populate=*`
    )
      .then((response) => response.json())
      .then((data) => {
        setItem(data.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [slug]);

  useEffect(() => {
    let url = item
      .map((item1) => {
        return item1.attributes?.Subcategory?.data?.attributes?.Title;
      })
      .join(",");
    fetch(
      `${globalEnv.api}/api/subcategories?filters[Title][$eq]=${url}&populate=Job_openings.Image`
    )
      .then((response) => response.json())
      .then((data) => {
        setCatItem(data.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [catItem, item]);

  let index = catItem[0]?.attributes?.Job_openings?.data.findIndex((x) => {
    return item.map((p) => p?.id)?.includes(x?.id);
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setCurrentIndex(index);
  }, [index]);

  const currentData = catItem[0]?.attributes?.Job_openings?.data[currentIndex];

  return (
    <div>
      <section
        className="wpo-blog-single-section section-padding theme-bg-black "
        style={{ paddingTop: "25px" }}
      >
        <div className="container">
          <div className="row">
            <div className={``}>
              <div className="wpo-blog-content">
                {loading ? (
                  <div>
                    {[...Array(1)].map((_, index) => (
                      <div key={index} className="col-lg-12 rounded-8">
                        <div style={{ marginBottom: "50px" }}>
                          <SkeletonTheme
                            baseColor="#202020"
                            highlightColor="#444"
                          >
                            <p>
                              <Skeleton count={25} />
                            </p>
                          </SkeletonTheme>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="entry-media"></div>
                )}
                <div className="entry-meta">
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
            </div>
          </div>
        </div>
      </section>
      <div className="loadMoreDiv pt-istop-btn-wrapper container  pt-25 ">
        <ApplyNow />
      </div>
      <div className="container pt-25 pb-25">
        <Recentjob />
      </div>
    </div>
  );
};

export default CareerSingle;
