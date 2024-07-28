import React from "react";

function OurPerk() {


  const OurPerksData=[
    {   
      "title":"Professional Development Support",
      "description":"Sharpen your skills with our commitment to professional development. Benefit from financial support for certifications, courses, and our in-house training programs to keep you at the forefront of your field.",
      "icon":<i className="fa-solid fa-phone"></i>
    },{
      "title":"Empower Your Work-Life Harmony",
      "description":"Achieve the ideal balance between work and life with our adaptable work arrangements. We empower you by ensuring a harmonious blend that meets personal and professional commitments.",
      "icon":<i className="fa-solid fa-scale-balanced"></i>
    },{
      "title":"Innovative and Inclusive Work Environment",
      "description":"Be part of a culture that celebrates diversity and encourages innovation. Our inclusive work environment fosters creativity and collaboration, ensuring every team member's unique perspective is valued.",
      "icon":<i className="fa-solid fa-building"></i>
    },{
      "title":"Collaborative Safety Culture",
      "description":"Be part of a collaborative safety culture where every team member plays a role in maintaining a secure workplace. We create an environment where everyone feels safe, supported, and empowered.",
      "icon":<i className="fa-solid fa-shield"></i>
    },{
      "title":"Flexible Leave Policies",
      "description":"Navigate life events easily through flexible leave policies, accommodating personal and family needs.",
      "icon":<i className="fa-solid fa-shuffle"></i>
    },{
      "title":"Comprehensive Health and Safety Measures",
      "description":"Prioritize your well-being with our robust health benefits and safety protocols. We are also constantly driven to provide a secure environment for all team members.",
      "icon":<i className="fa-solid fa-notes-medical"></i>
    }

  ]
  return (
    <>
      <style jsx="true">
        {`
          .perks {
            margin-bottom: 25px;
            & i {
              font-size: 30px;
              color: green;
            }
          }
          .ourPerks {
            height: 100%;
            border-radius: 8px;
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
          }
          .ourPerks:hover {
            box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
          }
        `}
      </style>
      <div className="pt-25  ">
        <div className="container">
          <h1 className="text-center pb-25">Our perks</h1>
          <div className="row ">
            {OurPerksData.map((item, i) => (
              <div key={i} className=" col-xl-4 col-md-6 perks">
                <div
                  className="ca-service-wrapper p-0 mb-30 wow tpfadeUp ourPerks"
                  data-wow-delay=".4s"
                >
                  <div
                    className="ca-service__item x aos-init aos-animate p-4 pb-0"
                    style={{
                      height: "100%",
                      border: "none",
                    }}
                  >
                    <div className=" mb-20">
                    {item.icon}
                    </div>
                    <h3 className=" mb-20">{item.title}</h3>
                    <p className="mb-0">
                     {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default OurPerk;
