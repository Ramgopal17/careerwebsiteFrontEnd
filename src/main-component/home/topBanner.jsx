import React from "react";
import { Link } from "react-router-dom";

function TopBanner({ newRecentJobCategory }) {

  return (
    <>
      <style jsx="true">
        {`
          .topBanner {
            & h2 {
              font-size: 40px;
              color: black;
            }
            & p {
              color: gray;
              font-size: 20px;
            }
            & img {
              width: min(100%, 600px);
            }
            & .tp-common-btn {
              overflow: auto;
            }
            .desc-on-top-banner {
              font-size: 16px;
            }
            @media (max-width: 425px) {
              & h2 {
                font-size: 30px;
              }
              & p {
                font-size: 14px;
              }
            }
          }
        `}
      </style>
      <div className="container pt-25 pb-25 topBanner">
        <div className="row">
          <div className="col-lg-6 mb-20 mb-lg-0">
            <div>
              <img src="/img/topbanner.jpg" alt="" />
            </div>
          </div>
          <div className="col-lg-6 d-flex align-items-center">
            <div className="pl-lg-30  ">
              <h2>Are you looking for a dream job?</h2>
              <p className="desc-on-top-banner">
              Explore jobs at Metapercept to see what works best for you. We offer holistic career growth and a fantastic work-life balance to help you develop your career in the right direction.
              </p>
              <div className="loadMoreDiv pt-istop-btn-wrapper   ">
                <Link
                  to={`/career/${newRecentJobCategory}`}
                  className="tp-common-btn text-center "
                >
                  <span style={{ color: "white", marginLeft: 0 }}>
                    Apply now
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopBanner;
