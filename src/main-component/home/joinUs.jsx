import React from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const groupImages = [
  "/img/employee-group-photos/1.jpg",
  "/img/employee-group-photos/2.jpg",
  "/img/employee-group-photos/3.jpg",
  "/img/employee-group-photos/4.jpg",
  "/img/employee-group-photos/5.jpg",
  "/img/employee-group-photos/6.jpg",
  "/img/employee-group-photos/7.jpg",
];

function JoinUs({ newRecentJobCategory }) {
  const settings = {
    dots: true,
    arrows: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <>
      <style jsx="true">
        {`
          .joinUs {
            & .cardDiv {
              padding: 30px 20px;
              border-radius: 8px;

              background: linear-gradient(
                90deg,
                rgba(255, 189, 135, 1) 0%,
                rgba(255, 222, 144, 1) 50%
              );
              & span {
                margin-left: 0;
              }

              & .tp-common-btn {
                overflow: auto;
              }
              & img {
                width: 100%;
              }

              @media (max-width: 991px) {
                padding: 30px 20px 0px;
              }
            }
          }
          .slick-slider {
            width: 90%;
          }
          .slick-prev {
            left: -40px;
          }
          .slick-next {
            right: -40px;
          }
        `}
      </style>
      <div className="pt-25 pb-25  joinUs">
        <div className="container">
          <div className="cardDiv">
            <div className="row">
              <div className="col-lg-6 mb-30 mb-lg-0 d-flex justify-content-center">
                <Slider {...settings}>
                  {groupImages.map((image, i) => (
                    <div
                      key={i}
                      className="tp-sv-details-serive-left wow tpfadeUp d-flex justify-content-center "
                    >
                      <img
                        src={image}
                        alt="employees"
                        className="serviceFlowImg"
                        style={{
                          width: "min(100%, 600px)",
                          height: "auto",
                          aspectRatio: "4/3",
                        }}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="col-lg-6 pb-4 pb-lg-0 d-flex align-items-center">
                <div
                  className="tp-sv-details-serive-left wow tpfadeUp"
                  data-wow-delay=".3s"
                >
                  <div className="section-title-wraper ">
                    <div className="tp-section">
                      <h1 className=" mb-25 ">Life at metapercept</h1>
                      <p
                        className="mb-0 pb-25"
                        style={{ textAlign: "left" }}
                      >
                        Metapercept offers more than just a workplace; it's a
                        community where collaboration and celebration thrive.
                        From shared lunches to festive gatherings, our diverse
                        team forms a supportive family, spanning experienced
                        professionals to fresh talents. We value inclusivity,
                        ensuring every voice matters. Explore snapshots of our
                        team on various occasions, capturing the essence of Life
                        at Metapercept—a blend of professional excellence and
                        shared moments.
                      </p>
                      <div className="loadMoreDiv pt-istop-btn-wrapper   ">
                        <Link
                          to={`/career/${newRecentJobCategory}`}
                          className="tp-common-btn text-center "
                        >
                          <span className="text-center button-space">
                            <span style={{ color: "white" }}>Apply now</span>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JoinUs;
