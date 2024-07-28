import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CareerSidebar from "../careerSidebar/careerSidebar.js";
import { AiOutlinePlus } from "react-icons/ai";
import "./careerList.css";
import globalEnv from "../../api/globalenv.js";
import Nodata from "../../images/no-data.png";
import Recentjob from "../recentJob/recentJob.js";

const CareerList = (props) => {
  const [category, setCategory] = useState([]);
  const [visibleItems, setVisibleItems] = useState(8);
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    fetch(
      `${globalEnv.api}/api/categories?filters[Slug][$eq]=${slug}&populate=*`
    )
      .then((response) => response.json())
      .then((data) => {
        setCategory(data.data);
      })
      .catch((error) => console.error(error));
  }, [slug]);

  useEffect(() => {
    const totalItems = Math.ceil(
      category.flatMap((blog) => blog.attributes.Subcategories.data).length
    );

    if (totalItems <= visibleItems) {
      setLoadMoreVisible(false);
    } else {
      setLoadMoreVisible(true);
    }
  }, [category, visibleItems]);

  const currentJobs = category
    .flatMap((blog) => blog?.attributes?.Subcategories?.data)
    .slice(0, visibleItems);

  const loadMoreItems = () => {
    const totalItems = Math.ceil(
      category.flatMap((blog) => blog.attributes.Subcategories.data).length
    );

    if (visibleItems + 6 >= totalItems) {
      setVisibleItems(totalItems);
      setLoadMoreVisible(false);
    } else {
      setVisibleItems(visibleItems + 6);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <section className="wpo-blog-highlights-section theme-bg-black">
        <div className="container">
          <div className="row">
            <div className={`col col-lg-8 col-md-12 ${props.blRight}`}>
              <div
                className={`${
                  currentJobs.length > 0
                    ? "tp-job-post-area theme-bg  theme-bg-black"
                    : ""
                }`}
                style={{
                  padding: "0px 12px ",
                  backgroundColor: "black",
                }}
              >
                <div className="container">
                  <div className="row">
                    {currentJobs.length > 0 ? (
                      currentJobs.map((blog, i) => (
                        <div key={i} className="col-lg-6 tpfadeUp">
                          <Link
                            to={`/category/subcategory/${encodeURIComponent(
                              blog?.attributes?.Slug
                            )}`}
                          >
                            <div className="tp-job-item">
                              <div className="row ">
                                <div className="col">
                                  <div className="tp-job-item__info ">
                                    <h3 className="tp-job-item__title">
                                      <div
                                        to={`/category/subcategory/${encodeURIComponent(
                                          blog?.attributes?.Slug
                                        )}`}
                                        style={{ color: "#c9c9ce" }}
                                      >
                                        {blog?.attributes?.Title}
                                      </div>
                                    </h3>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
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
                          We have no job posts for this category. <br />
                          Visit us again.
                        </center>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {loadMoreVisible && (
                <div className="loadMoreDiv pt-istop-btn-wrapper text-center mt-10 ">
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

export default CareerList;
