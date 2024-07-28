import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CareerSidebar from "../careerSidebar/careerSidebar.js";
import "./careerList.css";
import { AiOutlinePlus } from "react-icons/ai";
import globalEnv from "../../api/globalenv.js";
import Nodata from "../../images/no-data.png";
import Recentjob from "../recentJob/recentJob.js";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import showdown from "showdown";
import "react-loading-skeleton/dist/skeleton.css";
const ClickHandler = () => {
  window.scrollTo(10, 0);
};
const CareerHomePageNewList = (props) => {
  const [category, setCategory] = useState([]);
  const [visibleItems, setVisibleItems] = useState(2);
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    fetch(
      `${globalEnv.api}/api/subcategories?filters[Slug][$eq]=${slug}&populate[Job_openings][populate]=*`
    )
      .then((response) => response.json())
      .then((data) => {
        setCategory(data.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [slug]);
  const propsToPass = {
    prop1: `${slug}`,
  };
  const loadMoreItems = () => {
    const totalItems = Math.ceil(
      category.flatMap((blog) => blog?.attributes?.Job_openings?.data).length
    );

    if (visibleItems + 2 >= totalItems) {
      setVisibleItems(totalItems);
      setLoadMoreVisible(false);
    } else {
      setVisibleItems(visibleItems + 2);
    }
  };

  const currentJobs = category
    .flatMap((blog) => blog?.attributes?.Job_openings?.data)
    .slice(0, visibleItems);

  useEffect(() => {
    const totalItems = Math.ceil(
      category.flatMap((blog) => blog.attributes.Job_openings.data).length
    );
    setLoadMoreVisible(totalItems > visibleItems);
  }, [category, visibleItems]);

  return (
    <div>
      <section className="wpo-blog-pg-section  theme-bg-black pt-25 pb-25">
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
                              <Skeleton count={8} />
                            </p>
                          </SkeletonTheme>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : currentJobs.length > 0 ? (
                  currentJobs?.map((blog) => (
                    <div className="post" key={blog.id}>
                      <div className="entry-details">
                        <Link
                          onClick={ClickHandler}
                          to={`/career-single/${blog?.attributes?.Slug}`}
                        >
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
                        </Link>
                        <div className="listing " id="cutoffTextlist">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: new showdown.Converter().makeHtml(
                                blog?.attributes?.Description || ""
                              ),
                            }}
                            className="theme-bg-black"
                          ></div>
                        </div>
                        <Link
                          onClick={ClickHandler}
                          to={`/career-single/${blog?.attributes?.Slug}`}
                          className="read-more"
                          state={propsToPass}
                        >
                          READ MORE...
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center no-data-message">
                    <img
                      src={Nodata}
                      className="no-data-icon"
                      style={{
                        width: "40vh",
                        height: "40vh",
                        margin: "0 auto",
                      }}
                      alt="nodata"
                    />

                    <center className="no-data-text">
                      Oops! No Openings found in this Subcategory.
                    </center>
                  </div>
                )}
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
            </div>
            <CareerSidebar blLeft={props.blLeft} />
          </div>
        </div>
      </section>
      <div className="container pt-25 pb-25">
        <Recentjob />
      </div>
    </div>
  );
};

export default CareerHomePageNewList;
