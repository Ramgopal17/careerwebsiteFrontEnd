import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import globalEnv from "../../api/globalenv.js";
import "./applyNow.css";
import Swal from "sweetalert2";
import {
  mdiTextBoxSearch,
  mdiEmailOutline,
  mdiAccount,
  mdiPhone,
} from "@mdi/js";
import Icon from "@mdi/react";
import globalenv from "../../api/globalenv";
import ReCAPTCHA from "react-google-recaptcha";

import codes from "country-calling-code";

const Form = () => {
  const [selectedCountryCode, setSelectedCountryCode] = useState("91");
  const [firstName, setFirstName] = useState("");
  const [FirstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [LastNameError, setLastNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [jobAppliedFor, setJobAppliedFor] = useState("");
  const [jobError, setJobError] = useState("");
  const [resume, setResume] = useState(null);
  const [base64, setBase64] = useState();
  const form = useRef();
  const [fileSizeError, setFileSizeError] = useState("");
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [verified, setVerified] = useState(false);
  const [uploadErr, setUploadErr] = useState("");
  const [expired, setExpired] = useState(false);
  const [job, setJob] = useState([]);

  function onChangeRecaptcha(value) {
    if (value) {
      setVerified(true);
      setExpired(false);
    }
  }

  const hasErrors = () => {
    return (
      FirstNameError ||
      LastNameError ||
      emailError ||
      mobileNumberError ||
      jobError ||
      fileSizeError ||
      uploadErr ||
      !verified ||
      expired
    );
  };

  function onExpired() {
    setExpired(true);
    setVerified(false);
  }
  const recaptchaRef = useRef(null);
  const handleCountryCodeChange = (event) => {
    setSelectedCountryCode(event.target.value);
  };
  const handleAttachmentChange = async (e) => {
    const file = e.target.files[0];
    let errorFound = false;

    if (!file) {
      setUploadErr("Please Upload Your Resume");
      setFileSizeError("");
      setIsFileUploaded(false);
      errorFound = true;

      return;
    }

    const allowedFileTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedFileTypes.includes(file.type)) {
      setUploadErr("Only PDF, DOC, and DOCX files are allowed.");
      setFileSizeError("");
      setIsFileUploaded(false);
      errorFound = true;

      return;
    }
    const base64 = await convertBase64(file);
    setResume(file);
    setBase64(base64);
    setIsFileUploaded(true);
    setUploadErr("");

    if (file.size > 10 * 1024 * 1024) {
      setFileSizeError("Attached file size exceeds 10MB.");
      errorFound = true;
    } else {
      setFileSizeError("");
    }
    return errorFound;
  };

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    let errorFound = false;
    if (/^[0-9]*$/.test(inputValue) || inputValue === "") {
      setMobileNumber(inputValue);
    }

    if (inputValue.length === 10 || inputValue.length === 0) {
      setMobileNumber(inputValue);
      setMobileNumberError("");
    } else {
      setMobileNumberError("Mobile number should be 10 digits.");
      errorFound = true;
    }
    return errorFound;
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,4}$/;
    return re.test(email);
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    let errorFound = false;

    if (!validateEmail(value)) {
      setEmailError("Please enter a valid email address");
      errorFound = true;
    } else {
      setEmailError("");
    }
    return errorFound;
  };

  const handleFirstNameChange = (e) => {
    const { value } = e.target;
    setFirstName(value);
    let errorFound = false;

    if (value.trim() === "") {
      setFirstNameError("This field can not be empty");
      errorFound = true;
    } else if (value.length < 3) {
      setFirstNameError("Name must be at least 3 characters long");
      errorFound = true;
    } else if (value.length > 50) {
      setFirstNameError("Name cannot exceed 50 characters");
      errorFound = true;
    } else {
      setFirstNameError("");
    }
    return errorFound;
  };

  const handleLastNameChange = (e) => {
    const { value } = e.target;
    let errorFound = false;
    setLastName(value);

    if (value.trim() === "") {
      setLastNameError("This field can not be empty");
      errorFound = true;
    } else if (value.length < 3) {
      setLastNameError("Name must be at least 3 characters long");
      errorFound = true;
    } else if (value.length > 50) {
      setLastNameError("Name cannot exceed 50 characters");
      errorFound = true;
    } else {
      setLastNameError("");
    }

    return errorFound;
  };

  const handleJob = (e) => {
    const { value } = e.target;

    setJobAppliedFor(value);

    if (value.trim() === "") {
      setJobError("This field can not be empty");
    } else {
      setJobError("");
    }
  };

  const fileInputRef = useRef(null);
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  useEffect(() => {
    fetch(`${globalEnv.api}/api/job-openings?populate=*`)
      .then((response) => response.json())
      .then((data) => {
        setJob(data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const ckeckFormValid = () => {
    const errorsDiv = document.getElementsByClassName("error-message");

    return errorsDiv.length ? true : false;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const emptyInput = document.querySelector("input[value='']");
    if (emptyInput) {
      emptyInput.focus();
    }
    if (ckeckFormValid()) {
      return;
    }

    let config = {
      Host: "smtp.elasticemail.com",
      Username: "jobs@metapercept.com",
      Password: "0F563091426DC166D1601E5583DDC627B290",
      To: "jobs@metapercept.com",
      From: `jobs@metapercept.com`,
      Subject: `An Application for job role ${jobAppliedFor} applied by ${firstName} ${lastName} `,
      Body: ` <pre style="font-size: 18px; font-family: 'Arial', sans-serif;">Dear HR,
      I am writing to express my interest in a job role at <b>${jobAppliedFor} </b>and to submit my application for consideration. I recently came across a job posting for <b>${jobAppliedFor} </b>on your company's website, and I believe that my skills and experience align well with the requirements outlined in the job description. I have always admired Metapercept's commitment to innovation, exceptional customer service, and dedication to making a positive impact in the industry. I am eager to contribute my expertise and collaborate with a team of talented individuals at Metapercept.
     
      Throughout my career, I have developed strong skills in mention key skills such as problem-solving, communication, leadership, etc., that I believe would be an asset to Metapercept in achieving its goals. Furthermore, I am impressed by Metapercept's focus on employee growth and development. I am committed to continuous learning and staying up-to-date with the latest industry trends and advancements. I am confident that my eagerness to learn and adapt, combined with my strong work ethic, would contribute to a culture of excellence at Metapercept.
     
      Please find attached my resume for your review, which provides additional details about my qualifications and achievements. I would welcome the opportunity to further discuss how my skills and experience align with Metapercept's vision and the requirements of the position.
     
      Thank you for considering my application. I appreciate your time and attention to my candidacy. I look forward to the possibility of contributing to Metapercept's success and being a part of your dynamic team.
     
      Please feel free to contact me at your convenience to schedule an interview or if you require any additional information. Thank you once again for your consideration.
     
      Sincerely,
      Name: ${firstName} ${lastName},
      Email: ${email},
      Mobile: +${selectedCountryCode}${mobileNumber}
</pre>`,
      Attachments: [
        {
          name: `${resume.name}`,
          data: `${base64}`,
        },
      ],
    };
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        First_Name: firstName,
        Last_Name: lastName,
        Email_Address: email,
        Mobile_Number: "+" + selectedCountryCode + mobileNumber,
        Job: jobAppliedFor,
        Resume: resume,
      })
    );

    if (fileInputRef.current.files.length > 0) {
      formData.append("files.Resume", fileInputRef.current.files[0]);
    }

    try {
      await axios.post(`${globalenv.api}/api/forms?populate=*`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        icon: "success",
        title: "Application Form submitted successfully!",
        confirmButtonText: "OK",
      }).then(async () => {
        if (window.Email) {
          await window.Email.send(config)
            .then(() => {
              return "email sent succesfully";
            })
            .catch(() => {
              return "email failed";
            });
        }
        handleReset();
      });
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.details &&
        error.response.data.error.details.errors &&
        error.response.data.error.details.errors.length > 0 &&
        error.response.data.error.details.errors[0].path[0] === "Email_Address"
      ) {
        setEmailError("This Email is already used");
      } else {
        Swal.fire({
          icon: "error",
          title: "Application Form submission failed.",
          text: "An error occurred while submitting the form.",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setMobileNumber("");
    setJobAppliedFor("");
    setResume(null);
    setFileSizeError("");
    setUploadErr("");
    setJobError("");
    setEmailError("");
    setFirstNameError("");
    setLastNameError("");
    setMobileNumberError("");
    setVerified(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  };
  const inputRef = useRef(null);

  return (
    <div className="form-container">
      <h1>
        {" "}
        <center
          style={{
            fontSize: "35px",
            fontWeight: "400",
            color: "var(--tp-theme-vogue)",
          }}
        >
          Reframe your Future with us
        </center>
      </h1>
      <form
        onSubmit={handleSubmit}
        ref={form}
        className="mt-25 p-4 sendResumeForm"
      >
        <div className="row">
          <div className="col">
            <div className="form-group">
              <Icon
                path={mdiAccount}
                size={1.5}
                style={{ marginRight: "5px", color: "#086d38" }}
              />
              <input
                type="text"
                ref={inputRef}
                id="firstName"
                value={firstName}
                name="firstName"
                onChange={handleFirstNameChange}
                required
                autoComplete="off"
              />
              <label
                style={{ fontWeight: "400" }}
                htmlFor="firstName"
                className="cutoffText4"
              >
                First Name*
              </label>
            </div>
            <div className="d-flex">
              {FirstNameError && (
                <span className="error-message">{FirstNameError}</span>
              )}
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <Icon
                path={mdiAccount}
                size={1.5}
                style={{ marginRight: "5px", color: "#086d38" }}
              />
              <input
                type="text"
                ref={inputRef}
                id="lastName"
                value={lastName}
                name="lastName"
                onChange={handleLastNameChange}
                required
                autoComplete="off"
              />
              <label
                style={{ fontWeight: "400" }}
                htmlFor="lastName"
                className="cutoffText4"
              >
                Last Name*
              </label>
            </div>
            <div className="d-flex">
              {LastNameError && (
                <span className="error-message">{LastNameError}</span>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <Icon
                path={mdiEmailOutline}
                size={1.5}
                style={{ marginRight: "5px", color: "#086d38" }}
              />
              <input
                type="text"
                ref={inputRef}
                id="email"
                value={email}
                name="email"
                onChange={handleEmailChange}
                required
                autoComplete="off"
              />
              <label
                style={{ fontWeight: "400" }}
                htmlFor="email"
                className="cutoffText4"
              >
                Email*
              </label>
            </div>
            <div className="d-flex" style={{ marginLeft: "30px !important" }}>
              {emailError && (
                <span className="error-message">{emailError}</span>
              )}
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Icon
                  path={mdiPhone}
                  size={1.5}
                  style={{ marginRight: "5px", color: "#086d38" }}
                />

                <select
                  value={selectedCountryCode}
                  onChange={handleCountryCodeChange}
                  className=" codeSelect"
                  style={{ fontWeight: "400" }}
                >
                  {codes
                    .filter(
                      (country) =>
                        !["DOM", "JEY", "GGY", "PRI", "IMN"].includes(
                          country.isoCode3
                        )
                    )
                    .map((country) => (
                      <option
                        key={country.isoCode3}
                        value={country.countryCodes}
                        defaultValue={country.isoCode3 === "IND"}
                      >
                        {`${country.isoCode3} +${country.countryCodes}`}
                      </option>
                    ))}
                </select>
              </div>

              <input
                type="tel"
                id="mobileNumber"
                value={mobileNumber}
                ref={inputRef}
                name="mobileNumber"
                onChange={handlePhoneChange}
                required
                pattern="[0-9]*"
                autoComplete="off"
                maxLength={10}
                style={{
                  marginLeft: "0.7em",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              />
              <label
                style={{ fontWeight: "400" }}
                id="phoneLabel"
                htmlFor="mobileNumber"
                className="cutoffText4"
              >
                Mobile*
              </label>
            </div>
            <div className="d-flex" style={{ marginLeft: "300px !important" }}>
              {mobileNumberError && (
                <span
                  className="error-message text-center"
                  style={{ marginLeft: "150px !important" }}
                >
                  {mobileNumberError}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="form-group">
          <Icon
            path={mdiTextBoxSearch}
            size={1.5}
            style={{ marginRight: "5px", color: "#086d38" }}
          />
          <select
            id="jobAppliedFor"
            ref={inputRef}
            value={jobAppliedFor}
            onChange={handleJob}
            required
          >
            <option style={{ display: "none" }}></option>
            <option style={{ color: "#c9c9ce" }} disabled>
              Choose your Job Category
            </option>

            {job.map((item) => (
              <option key={item.id} value={item.attributes.Title}>
                {item?.attributes.Title}
              </option>
            ))}
          </select>

          <label
            style={{ fontWeight: "400" }}
            className="custom-select"
            htmlFor="jobAppliedFor"
          >
            Job Role*
          </label>
          <div className="d-flex">
            {jobError && <span className="error-message">{jobError}</span>}
          </div>
        </div>

        <div className="mt-50">
          <label
            style={{ fontWeight: "400" }}
            htmlFor="resume"
            className="drop-container"
            id="dropcontainer"
          >
            <span style={{ fontWeight: "400" }} className="drop-title">
              Drop Your Resume here
            </span>
            or
            <input
              type="file"
              id="resume"
              accept=".pdf,.doc,.docx"
              name="resume"
              onChange={handleAttachmentChange}
              ref={fileInputRef}
              required
              className="custom-file-input"
            />
            <span style={{ fontSize: "14px", textAlign: "center" }}>
              Only PDF, DOC, and DOCX files are allowed.
            </span>
            <div className="d-flex">
              {fileSizeError && (
                <center className="error-message text-center">
                  {fileSizeError}
                </center>
              )}
              {!isFileUploaded && uploadErr && (
                <center className="error-message">{uploadErr}</center>
              )}
            </div>
          </label>
        </div>

        <div className=" pt-25 d-md-flex justify-content-between">
          <div className="custom-captcha2 ">
            <ReCAPTCHA
              sitekey="6LcTtlUpAAAAAF_p8G4Tlrlq2hRpbq64OFk7O3VB"
              onChange={onChangeRecaptcha}
              onExpired={onExpired}
              ref={recaptchaRef}
            />
          </div>

          <div className="">
            <div className="form-button">
              <button
                type="submit"
                disabled={hasErrors()}
                id="focus_scroll"
                style={{ fontSize: "13px" }}
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="reset ms-4"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
