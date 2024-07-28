import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./highlightsNews-12.css";
import globalEnv from "../../api/globalenv.js";
import { AiOutlinePlus } from "react-icons/ai";
import RecentJob from "../recentJob/recentJob";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const HighlightsNews = (props) => {
  const [subcategories, setSubcategories] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [visibleItems, setVisibleItems] = useState(14);
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);
  const [selectedTag, setSelectedTag] = useState("");
  const [loading, setLoading] = useState(true);
  const [uniqueCatsList, setUniqueCats] = useState([]);
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };
  useEffect(() => {
    fetch(`${globalEnv.api}/api/subcategories?populate=*`)
      .then((response) => response.json())
      .then((data) => {
        setSubcategories(data.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch(`${globalEnv.api}/api/categories?populate=*`)
      .then((response) => response.json())
      .then((data) => {
        setValueToUniqueCats(data.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const displayData = subcategories.slice(0, visibleItems);

  const uniqueTags = new Set();
  const objectsWithUniqueTags = [];
  useEffect(() => {
    fetch(`${globalEnv.api}/api/job-openings?&populate=*`)
      .then((response) => response.json())
      .then((data) => {
        setJobs(data.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  for (const obj of jobs) {
    if (!uniqueTags.has(obj.attributes.Tag)) {
      uniqueTags.add(obj.attributes.Tag);
      objectsWithUniqueTags.push(obj);
    }
  }

  const clickHandler1 = (tag) => {
    setSelectedTag(tag);
  };
  const loadMoreItems = () => {
    const totalItems = subcategories.length;

    if (visibleItems + 6 >= totalItems) {
      setVisibleItems(totalItems);
      setLoadMoreVisible(false);
    } else {
      setVisibleItems(visibleItems + 6);
    }
  };
function setValueToUniqueCats(data) {
    const uniqueCats = new Set();
    const objectsWithUniqueCats = [];
    for (const obj of data) {
      if (!uniqueCats.has(obj?.attributes?.Title)) {
        uniqueCats.add(obj?.attributes?.Title);
        objectsWithUniqueCats.push(obj);
      }
    }
 
    let sortedData = objectsWithUniqueCats.sort((a, b) => {
      const titleA = a?.attributes?.Title?.toLowerCase();
      const titleB = b?.attributes?.Title?.toLowerCase();

      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    });
    setUniqueCats(() => sortedData);
  }

  return (
    <div>
      <div>
        <section
          className="wpo-blog-highlights-section"
          style={{ backgroundColor: "black" }}
        >
          <div className="container ">
            <div className="row">
              <div className={`col col-lg-8 col-md-12 ${props.blRight} `}>
                <div
                  className="tp-job-post-area   "
                  style={{ padding: "0px 12px " }}
                >
                  <div className="container ">
                    <div className="row">
                      {displayData.length === 0 ? (
                        <div className="row">
                          {[...Array(10)].map((_, index) => (
                            <div key={index} className="col-lg-6 wow tpfadeUp">
                              <SkeletonTheme
                                baseColor="#202020"
                                highlightColor="#444"
                              >
                                <p>
                                  <Skeleton height={"100px"} />
                                </p>
                              </SkeletonTheme>
                            </div>
                          ))}
                        </div>
                      ) : (
                        displayData.map((item, i) => (
                 
                          <div key={i} className="col-lg-6 wow tpfadeUp ">
                            <Link
                              to={`/category/subcategory/${encodeURIComponent(
                                item?.attributes?.Slug
                              )}`}
                            >
                              <div
                                className="tp-job-item black-bg"
                                style={{ border: "2px solid #3d3d3d" }}
                              >
                                <div className="row">
                                  <div className="col ">
                                    <div className="tp-job-item__info">
                                      <h3 className="tp-job-item__title">
                                        <div
                                          to={`/category/subcategory/${encodeURIComponent(
                                            item?.attributes?.Slug
                                          )}`}
                                          style={{
                                            color: "#c9c9ce !important",
                                          }}
                                        >
                                          {item?.attributes?.Title}
                                        </div>
                                      </h3>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
                {loadMoreVisible && (
                  <div className="loadMoreDiv pt-istop-btn-wrapper  text-center   ">
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

              <div className={`col col-lg-4 col-md-12 ${props.hideClass}`}>
                <div className="blog-sidebar">
                  <div className="widget category-widget theme-bg-black">
                    <h3>Job Categories</h3>
                    <ul>
                      {loading ? (
                        <div>
                          {[...Array(10)].map((_, index) => (
                            <SkeletonTheme
                              baseColor="#121212"
                              highlightColor="#1e2222"
                              key={index}
                            >
                              <p>
                                <Skeleton count={1} />
                              </p>
                            </SkeletonTheme>
                          ))}
                        </div>
                      ) : (
                        uniqueCatsList?.map((blog) => (
                          blog.attributes.Subcategories.data.length !== 0 && (
                            <li key={blog?.id}>
                              <Link
                                onClick={ClickHandler}
                                to={`/career/${blog?.attributes?.Slug}`}
                              >
                                <>{blog?.attributes?.Title}</>
                         
                              </Link>
                            </li>
                          )
                        ))
                        
                      )}
                    </ul>
                  </div>

                  <div className="widget tag-widget theme-bg-black mb-0">
                    <h3>Tags</h3>

                    <ul className="highlightedTag">
                      {loading ? (
                        <div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            {" "}
                            <SkeletonTheme
                              baseColor="#202020"
                              highlightColor="#444"
                            >
                              <p className="custom-skeleton">
                                <Skeleton width={100} height={30} />
                              </p>
                              <p className="custom-skeleton">
                                <Skeleton width={150} height={30} />
                              </p>
                            </SkeletonTheme>
                          </div>{" "}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            {" "}
                            <SkeletonTheme
                              baseColor="#202020"
                              highlightColor="#444"
                            >
                              <p>
                                <Skeleton size={"sm"} height={"30px"} />
                              </p>
                              <p>
                                <Skeleton size={"sm"} height={"30px"} />
                              </p>
                            </SkeletonTheme>
                          </div>{" "}
                        </div>
                      ) : (
                        objectsWithUniqueTags.map((blog) => (
                          <li key={blog.id}>
                            <Link
                              onClick={() =>
                                clickHandler1(blog?.attributes?.Tag)
                              }
                              to={`/career/tag/${blog?.attributes?.Tag}`}
                              className={
                                selectedTag === blog?.attributes?.Tag
                                  ? "highlighted1"
                                  : ""
                              }
                            >
                              {blog?.attributes?.Tag}
                            </Link>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="container pt-25 pb-25">
          <RecentJob />
        </div>
      </div>
    </div>
  );
};

export default HighlightsNews;
