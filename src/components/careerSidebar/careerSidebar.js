import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Col } from "react-bootstrap";
import "./careerSidebar.css";
import globalenv from "../../api/globalenv";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
const CareerSidebar = (props) => {
  const { slug } = useParams();
  const [jobs,setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uniqueCatsList, setUniqueCats] = useState([]);

  useEffect(() => {
    fetch(`${globalenv.api}/api/categories?populate=*`)
      .then((response) => response.json())
      .then((data) => {
        setValueToUniqueCats(data.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [slug]);

  useEffect(() => {
    fetch(`${globalenv.api}/api/job-openings?&populate=*`)
      .then((response) => response.json())
      .then((data) => {
        setJobs(data.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  const uniqueTags = new Set();
  const objectsWithUniqueTags = [];

  for (const obj of jobs) {
    if (!uniqueTags.has(obj.attributes.Tag)) {
      uniqueTags.add(obj.attributes.Tag);
      objectsWithUniqueTags.push(obj);
    }
  }

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
    <Col lg={4} xs={12} className={`col col-lg-4 col-12 ${props.blLeft}`}>
      <div className="blog-sidebar">
        <div className="widget category-widget theme-bg-black">
          <h3>Job Categories</h3>
          <ul>
            {loading ? (
              <div>
                {[...Array(10)].map((_, index) => (
                  <SkeletonTheme
                    baseColor="#121212"
                    highlightColor="#333"
                    key={index}
                  >
                    <p>
                      <Skeleton count={1} />
                    </p>
                  </SkeletonTheme>
                ))}
              </div>
            ) : (
              uniqueCatsList.map((blog) => (
                blog.attributes.Subcategories.data.length !== 0 && (
                
                <li key={blog.id}>
                  <Link
                    to={`/career/${blog.attributes.Slug}`}
                    className={`${
                      blog.attributes.Slug === slug ? "active" : ""
                    }`}
                  >
                    {blog.attributes.Title}
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
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  {" "}
                  <SkeletonTheme baseColor="#202020" highlightColor="#444">
                    <p>
                      <Skeleton size={"sm"} height={"30px"} />
                    </p>
                    <p>
                      <Skeleton size={"sm"} height={"30px"} />
                    </p>
                  </SkeletonTheme>
                </div>{" "}
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  {" "}
                  <SkeletonTheme baseColor="#202020" highlightColor="#444">
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
                <li key={blog.id} style={{ fontSize: "19px" }}>
                  <Link to={`/career/tag/${blog.attributes.Tag}`}>
                    {blog.attributes.Tag}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </Col>
  );
};

export default CareerSidebar;
