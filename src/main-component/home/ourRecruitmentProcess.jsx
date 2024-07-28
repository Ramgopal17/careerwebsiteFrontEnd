import React from "react";

const process = [
  {
    name: "Review",
    desc: "Application and screening are based on a diverse set of skills-based criteria.",
    color: "#ec1c24",
    icon: <i className="fa-solid fa-magnifying-glass"></i>,
  },
  {
    name: "Intro call",
    desc: "Candidates are asked to submit answers to questions via video or to have an intro call with one of our recruiters.",
    color: "#086d38",
    icon: <i className="fa-solid fa-phone"></i>,
  },
  {
    name: "Interview",
    desc: "Online interviews to deepen our understanding of your qualifications and potential fit.",
    color: "#324da0",
    icon: <i className="fa-solid fa-laptop"></i>,
  },
  {
    name: "Test",
    desc: "Finalists complete a multi-day task (compensated for your time).",
    color: "#f47f20",
    icon: <i className="fa-solid fa-list-check"></i>,
  },
  {
    name: "Offer",
    desc: "Extend an offer to the candidate deemed best suited for the role.",
    color: "#fcb713",
    icon: <i className="fa-solid fa-envelope-open-text"></i>,
  },
];

function OurRecruitmentProcess() {
  return (
    <>
      <style jsx="true">
        {`
        .processesContainer{
          display:flex;
        }
        .processesContainer > .singleProcess{
          width:calc(100% / 5);
        }
        .outerCircle{
          width: 130px;
          height: 130px;
          flex-shrink:0;
          border-radius:50%;
          border: 3px solid ;
          padding:15px;
          position: relative;
          
        }
        .innerCircle{
          width: 100%;
          height: 100%;
          border-radius:50%;
          border: 8px solid;
          padding:20px;
          display:flex;
          align-items: center;
          justify-content: center;
        }
        .innerCircle i{
          font-size:30px;
          color:green;
        }
        .singleProcess{
          padding: 0 20px;
       
         
        }
        .singleProcess:last-child .connection{
          display:none;
        }
        .singleProcess h2{
          font-size:24px;

        }
        .connection{
          z-index:1;
          display:flex;
          align-items: center;
          position:absolute;
          right:10px;
          top:50%;
          transform:translate(100%,-50%)
        }
        .connection .firstCircles .outerCircle,
        .connection .secondCircles .outerCircle{
           width: 20px;
           height: 20px;
           border-radius:50%;
           border: 3px solid ;
           padding:2px;
           background-color:black;
          }
          .connection .firstCircles .innerCircle,
          .connection .secondCircles .innerCircle{
            width: 100%;
          height: 100%;
          border : none;
          padding :0;
          border-radius:50%;
          }
        .connection .bar{
          width: 50px;
          height:3px;
          flex-shrink:0;
         // background-color:blue;
          border-top: 10px  dotted;
        }
        
        @media (max-width: 991px){
          .processesContainer{
          display:block;
          }
          .processesContainer > .singleProcess{
            width:100%;
            display:flex;
            gap:30px;
          }
          
          .processesContainer > .singleProcess:not(:last-child){
            margin-bottom:50px;
          }
          .connection{
          right::auto;
            top:100%;
            left:50%;
            transform: translate(-50%, 50%)  rotate(90deg);
          }
          .connection .bar{
            width: 30px;
          }
        }
        @media (max-width: 425px){
          .processesContainer > .singleProcess{
            display:block;
          }
          .connection{
            display:none;
          }
          .singleProcess .outerCircle{
            transform: scale(0.8) translateX(-20px);
          }
        }
      `}
      </style>
      <div className="theme-bg-black pt-25 pb-25 ">
        <div className="container">
          <h1 className="text-center pb-25">Our recruitment process</h1>
          <div className="processesContainer">
            {process.map((item, i) => (
              <div className="col-2 singleProcess" key={i}>
                <div
                  className="outerCircle "
                  style={{ borderColor: `${item.color}` }}
                >
                  <div
                    className="innerCircle"
                    style={{ borderColor: `${item.color}` }}
                  >
                    {item.icon}
                  </div>
                  <div className="connection ">
                    <div className="firstCircles">
                      <div
                        className="outerCircle"
                        style={{ borderColor: `${item.color}` }}
                      >
                        <div
                          className="innerCircle"
                          style={{ backgroundColor: `${item.color}` }}
                        ></div>
                      </div>
                    </div>
                    <div
                      className="bar"
                      style={{ borderColor: `${item.color}` }}
                    ></div>
                  </div>
                </div>
                <div className="mt-20 pl-5">
                  <h2 className="mb-15">{item.name}</h2>
                  <p className="mb-0">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default OurRecruitmentProcess;
