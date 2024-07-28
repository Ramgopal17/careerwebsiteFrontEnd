import React from "react";

function HowWeWork() {
  return (
    <>
      <style jsx="true">
        {`
      .customLi {
        //color: var(--tp-grey-3) !important;
        list-style-type: disc;
        // list-style-position:inside;
        margin-bottom:5px
      }
    `}
      </style>
      <div className="pt-25 pb-25 theme-bg-black">
        <div className="tp-sv-detials-area  ">
          <h1 className="text-center">How we work</h1>
          <div className="container pt-25">
            <div className="row">
              <div className="col-lg-6 pb-4 pb-lg-0">
                <div
                  className="tp-sv-details-serive-left wow tpfadeUp"
                  data-wow-delay=".3s"
                >
                  <div className="section-title-wraper">
                    <div className="">
                    
                      <p
                        className="mb-0 pb-25"
                        style={{ textAlign: "left" }}
                      >
                      A collaborative and inclusive approach defines our work ethos. We foster an environment where creativity thrives, and every team member, from freshers to seasoned professionals, contributes to our collective success. Our commitment to a flexible and learning-centric atmosphere ensures that everyone has the opportunity to grow and excel.
                      </p>
                      <ul className="p-2">
                        <li className="customLi">
                        Fuel collaborative innovation with diverse perspectives for creative solutions.
                        </li>
                        <li className="customLi">
                        Create an inclusive environment, value each contribution, and foster strong belonging.

                        </li>
                        <li className="customLi">
                        Cultivate continuous learning with diverse resources for professional growth.
                        </li>
                        <li className="customLi">
                        Explore diverse projects for skill development and expertise.
                        </li>
                        <li className="customLi">
                        Open career paths for advancement and achievement.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 ">
                <div className="tp-sv-details-serive-left wow tpfadeUp d-flex justify-content-center">
                  <img
                    src="/img/howwework.jpg"
                    alt="solutions"
                    className="serviceFlowImg"
                    style={{ width: "min(100%, 500px)", height: "auto" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HowWeWork;
