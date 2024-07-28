import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CareerSidebar from "../careerSidebar/careerSidebar.js";
import { AiOutlinePlus } from "react-icons/ai";
import "./careerListTag.css";
import globalEnv from "../../api/globalenv.js";
import Recentjob from "../../components/recentJob/recentJob.js";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import showdown from "showdown";
const ClickHandler = () => {
  window.scrollTo(10, 0);
};
const CareerListTag = (props) => {
  const [jobs, setJobs] = useState([]);
  const [visibleItems, setVisibleItems] = useState(2);
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const endPoint = useParams();
  let slug = endPoint.slug;
  useEffect(() => {
    fetch(
      `${globalEnv.api}/api/job-openings?filters[tag][$eq]=${slug}&populate=*`
    )
      .then((response) => response.json())
      .then((data) => {
        setJobs(data.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [slug]);

  const propsToPass = {
    prop1: `${slug}`,
  };
  useEffect(() => {
    const totalItems = jobs.length;

    if (totalItems <= visibleItems) {
      setLoadMoreVisible(false);
    } else {
      setLoadMoreVisible(true);
    }
  }, [jobs, visibleItems]);
  const currentJobs = jobs.slice(0, visibleItems);
  const loadMoreItems = () => {
    const totalItems = jobs.length;
    if (visibleItems + 2 >= totalItems) {
      setVisibleItems(totalItems);
      setLoadMoreVisible(false);
    } else {
      setVisibleItems(visibleItems + 2);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <section className="wpo-blog-pg-section pt-25 pb-25 theme-bg-black">
        <div className="container">
          <div className="row">
            <div className={`col col-lg-8 col-12 ${props.blRight}`}>
              <div className="wpo-blog-content">
                {loading ? (
                  <div>
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className="col-lg-12  rounded-8">
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
                  currentJobs.map((blog, bitem) => (
                    <div className={`post ${blog.blClass}`} key={bitem}>
                      <div className="wpo-blog-content">
                        <h2>{blog?.attributes?.Title}</h2>
                      </div>
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
                            blog?.attributes?.createdAt
                          ).toLocaleDateString("en-GB")}
                        </span>{" "}
                      </div>
                      <div className="entry-details">
                        <div className="listing" id="cutoffTextlist">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: new showdown.Converter().makeHtml(
                                blog?.attributes?.Description || ""
                              ),
                            }}
                          ></div>
                        </div>
                        <Link
                          onClick={ClickHandler}
                          to={`/career-single/tag/${blog?.attributes?.Slug}`}
                          state={propsToPass}
                          className="read-more"
                        >
                          READ MORE...
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="pagination-wrapper">
                {loadMoreVisible && (
                  <div className="loadMoreDiv pt-istop-btn-wrapper text-center mt-20 ">
                    <button
                      className="tp-common-btn text-center "
                      onClick={loadMoreItems}
                    >
                      <span className="text-center button-space">
                        <span>Load More</span>
                        <span>
                          <AiOutlinePlus />
                        </span>
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            <CareerSidebar blLeft={props?.blLeft} />
          </div>
        </div>
      </section>
      <div className="container pt-25 pb-25">
        <Recentjob />
      </div>
    </div>
  );
};

export default CareerListTag;
