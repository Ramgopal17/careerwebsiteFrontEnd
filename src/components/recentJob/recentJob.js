import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./recentJob.css";
import globalenv from "../../api/globalenv";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
const RecentJob = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `${globalenv.api}/api/job-openings?pagination[page]=1&pagination[pageSize]=6&sort[0]=createdAt:desc&populate=*`
    )
      .then((response) => response.json())
      .then((data) => {
        setJobs(data.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <section
      className="wpo-blog-sponsored-section section-padding"
      id="spacing"
    >
      <div className="container">
        <div className="wpo-section-title">
          <h2>Recent Job Openings</h2>
        </div>

        <div
          className="wpo-blog-highlights-wrap"
          style={{ border: "1px solid #eee", padding: "20px 20px 0" }}
        >
          <div className="wpo-blog-items">
            <div className="row">
              {loading
                ? [...Array(4)].map((_, index) => (
                    <div className="col-lg-3 p-3 rounded-8" key={index}>
                      <SkeletonTheme>
                        <p>
                          <Skeleton height={"25vh"} />
                        </p>
                      </SkeletonTheme>
                    </div>
                  ))
                : jobs.slice(0, 4).map((item, i) => (
                    <div key={i} className="col-lg-3 mb-20">
                      <Link
                        to={`/highlight-single/Latest/${item?.attributes?.Slug}`}
                      >
                        <div
                          className="it-blog tp-lasted-blog mb-30 aos-init aos-animate it-blog-wrapper"
                          data-aos="fade-up"
                          data-aos-duration="1000"
                        >
                          <div className="it-blog-info white-bg">
                            <div>
                              <h3
                                style={{
                                  fontSize: "24px",
                                  maxHeight: "3em",
                                  minHeight: "2.5em",
                                  overflow: "hidden",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  color: "#032B5F",
                                }}
                              >
                                {item?.attributes?.Title.trim()}
                              </h3>

                              <i
                                className="fi flaticon-calendar"
                                style={{
                                  fontSize: "13px",
                                  marginRight: "3px",
                                  marginTop: "2px",
                                  color: "black",
                                }}
                              ></i>
                              <span className="date" style={{ color: "black" }}>
                                {new Date(
                                  item?.attributes?.createdAt
                                ).toLocaleDateString("en-GB")}{" "}
                              </span>
                            </div>

                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentJob;
