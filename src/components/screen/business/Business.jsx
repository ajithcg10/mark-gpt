import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../contexts/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { styled } from "styled-components";
import NavBar from "../../inculeds/NavBar";
import HomeSideBar from "../../inculeds/HomeSideBar";
import { TiThMenu } from "react-icons/ti";
import MobileSideBar from "../../inculeds/MobileSideBar";
import ButtonLoader from "../../inculeds/ButtonLoader";
import BusinessModal from "../../inculeds/BusinessModal";
import PlanModal from "../../inculeds/PlanModal";

export default function Business() {
  const [show, SetShow] = useState(false);
  const [isError, setError] = useState(false);
  const [isModal, setModal] = useState(false);
  const [inputType, setInputType] = useState({
    business_name: true,
    business_industry: false,
    business_primary: false,
  });
  const [inputValues, setInputValues] = useState([]);
  const [business, setBusiness] = useState("");
  const [industry, setIndustry] = useState("");
  const [primary, setPrimary] = useState("");
  const [isLoading, setLoading] = useState(false);
  // const [business, setBusiness] = useState("");
  let navigate = useNavigate();

  const {
    state: { user_data },
    dispatch,
  } = useContext(MyContext);

  useEffect(() => {
    if (
      inputValues.length !== 0 &&
      inputValues[0] !== "" &&
      inputType.business_name === true
    ) {
      setInputType({
        ...inputType,
        business_industry: !inputType.business_industry,
        business_name: !inputType.business_name,
      });
    } else if (
      inputValues.length !== 0 &&
      inputValues[0] !== "" &&
      inputType.business_industry === true
    ) {
      setInputType({
        ...inputType,
        business_primary: !inputType.business_primary,
        business_industry: !inputType.business_industry,
      });
    }
  }, [inputValues.length]);

  setTimeout(() => {
    if (inputValues.length !== 0) {
      setInputValues([]);
    }
  }, 500);

  function business_value() {
    setInputValues([...inputValues, business]);
    // setBusiness("");
  }
  function industry_value() {
    setInputValues([...inputValues, industry]);
    // setIndustry("");
  }
  const formData = new FormData();
  formData.append("buisness_name", business);
  formData.append("industry", industry);
  formData.append("primary_function", primary);

  const makePostRequest = async () => {
    const url = "https://api.markgpt.ai/api/v1/accounts/prompt-detail/"; // Replace with your API URL
    const bearerToken = user_data.access_token; // Replace with your actual Bearer token
    setLoading(true);
    if (primary.length == 0) {
      setError(true);
      setLoading(false);
    }
    try {
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json", // Adjust the Content-Type if needed
        },
        params: {
          prompt_no: 1,
        },
      });
      if (response.data.StatusCode === 6000) {
        let jsonData = {};
        setModal(true);

        const sections = response.data.data.segments
          .split("\n\n")
          .map((section) => section.split("\n"));
        sections.forEach((section) => {
          const sectionName = section[0].trim();
          jsonData[sectionName] = section.slice(1).map((item) => {
            const [key, value] = item.trim().split(":");
            return { [key.trim()]: value.trim() };
          });
        });

        dispatch({
          type: "UPDATE_SEGMENT_DATA",
          payload: {
            segment: jsonData,
            business: {
              business,
              industry,
              primary,
            },
          },
        });
        setLoading(false);
      }
      if (response.data.StatusCode === 6001) {
        navigate("/business");
        setLoading(false);
      }

      // Handle the response data here (e.g., update state, display messages, etc.)
    } catch (error) {
      setLoading(false);
      // Handle errors here
      console.error("Error making the API call:", error);
    }
  };
  useEffect(() => {
    async function fetchSegment_Data() {
      let promise = new Promise((resolve, reject) => {
        let segment_data = localStorage.getItem("segment_data");
        segment_data = JSON.parse(segment_data);

        dispatch({
          type: "UPDATE_SEGMENT_DATA",
          payload: { ...segment_data },
        });
      });

      let result = await promise;
    }

    fetchSegment_Data();
  }, []);
  useEffect(() => {
    localStorage.removeItem("hasPageRefreshed");
  }, []);
  setTimeout(() => {
    if (isError) {
      setError(false);
    }
  }, 1000);
  console.log(isError);

  return (
    <Container>
      <Side>
        <HomeSideBar />
        <MobileSideBar show={show} SetShow={SetShow} />
        <MobileMenuIcon onClick={() => SetShow(true)}>
          <TiThMenu />
        </MobileMenuIcon>
      </Side>

      <Wrapper>
        {/* <NavBar /> */}
        {inputType.business_name && (
          <Box>
            <TopSection>
              <Title>
                Mark<Span>GPT</Span>
              </Title>
              <Create>Enter the name of your business</Create>
              <Example>(eg: Puma)</Example>
            </TopSection>
            <BottomConatiner>
              <InputConatiner>
                <Input
                  value={business}
                  placeholder="Enter business name (required)"
                  onChange={(e) => {
                    setBusiness(e.target.value);
                  }}
                />
                {isError && <ErrorMsg>This field is required</ErrorMsg>}
              </InputConatiner>

              <SectionConatiner
                onClick={() => {
                  business_value();
                  if (business.length == 0) {
                    setError(true);
                  }
                }}
              >
                <Next>Next</Next>
                <ArroConatiner>
                  <Arrow
                    src={require("../../../assets/image/business/Arrow.png")}
                  />
                </ArroConatiner>
              </SectionConatiner>
            </BottomConatiner>
            <NoteConatiner>
              <Content>
                <Color>Important note :</Color> Since you are using the free
                version you can only add one business.
              </Content>
            </NoteConatiner>
          </Box>
        )}
        {inputType.business_industry && (
          <Box>
            <TopSection>
              <Title>
                Mark<Span>GPT</Span>
              </Title>
              <Create>Enter the name of your business industry</Create>
              <Example>(eg: textiles & footwear)</Example>
            </TopSection>
            <BottomConatiner>
              <InputConatiner>
                <Input
                  value={industry}
                  onChange={(e) => {
                    setIndustry(e.target.value);
                  }}
                  placeholder="Business industray (required)"
                />
                {isError && <ErrorMsg>This field is required</ErrorMsg>}
              </InputConatiner>
              <SectionConatiner
                onClick={() => {
                  industry_value();
                  if (industry.length == 0) {
                    setError(true);
                  }
                }}
              >
                <Next>Next</Next>
                <ArroConatiner>
                  <Arrow
                    src={require("../../../assets/image/business/Arrow.png")}
                  />
                </ArroConatiner>
              </SectionConatiner>
            </BottomConatiner>
          </Box>
        )}
        {inputType.business_primary && (
          <Box>
            <TopSection>
              <Title>
                Mark<Span>GPT</Span>
              </Title>
              <Create>
                Welcome to MarkGPT, Enter the basic details of your business.
              </Create>
              <Example>(eg: Puma primary)</Example>
            </TopSection>
            <BottomConatiner>
              <InputConatiner>
                <Input
                  placeholder="Primary function (required)"
                  value={primary}
                  onChange={(e) => {
                    setPrimary(e.target.value);
                  }}
                />
                {isError && primary.length == 0 && (
                  <ErrorMsg>This field is required</ErrorMsg>
                )}
              </InputConatiner>

              <SectionConatiner onClick={() => makePostRequest()}>
                <Next> {isLoading ? <ButtonLoader /> : "Submit"}</Next>
                <ArroConatiner>
                  <Arrow
                    src={require("../../../assets/image/business/Arrow.png")}
                  />
                </ArroConatiner>
              </SectionConatiner>
            </BottomConatiner>
          </Box>
        )}
      </Wrapper>
      <BusinessModal isModal={isModal} setModal={setModal} />
      <PlanModal />
    </Container>
  );
}
const Container = styled.div`
  color: rgba(255, 255, 255, 1);
  width: 100%;
  height: 100vh;
  display: flex;
  @media (max-width: 640px) {
    display: block;
  }
`;
const Side = styled.div`
  width: 20%;
  @media (max-width: 1280px) {
    width: 25%;
  }
  @media (max-width: 1080px) {
    width: 30%;
  }
  @media (max-width: 980px) {
    width: 35%;
  }
  @media (max-width: 768px) {
    width: 40%;
  }
`;

const MobileMenuIcon = styled.div`
  display: none;

  @media (max-width: 640px) {
    font-size: 30px;

    color: rgba(30, 145, 227, 1);
    position: relative;
    left: 20px;
    display: block;
    top: 20px;
  }
`;
const Wrapper = styled.div`
  text-align: center;
  display: grid;
  flex-direction: column;
  align-items: center;

  height: 100vh;
  padding: 50px 0px;
  width: 80%;
  @media (max-width: 1280px) {
    width: 75%;
  }
  @media (max-width: 1080px) {
    width: 70%;
  }
  @media (max-width: 980px) {
    width: 65%;
  }
  @media (max-width: 768px) {
    width: 60%;
    align-items: center;
  }
  @media (max-width: 640px) {
    width: unset;
  }
`;
const Box = styled.div`
  width: 70%;
  margin: 0 auto;
  position: relative;
`;
const TopSection = styled.div`
  margin-bottom: 30px;
`;
const Title = styled.h1`
  font-family: gordita_medium;
  // margin-bottom: 20px;
  font-size: 45px;
  @media (max-width: 980px) {
    font-size: 40px;
  }
`;
const Span = styled.span`
  color: rgba(30, 145, 227, 1);
  font-family: "gordita_medium";
`;
const Create = styled.h5`
  color: rgba(197, 197, 197, 1);
  font-size: 16px;
  @media (max-width: 980px) {
    font-size: 14px;
  }
  @media (max-width: 768px) {
    font-size: 14px;
    width: unset;
  }
`;
const Example = styled.p`
  font-size: 14px;
  color: rgba(93, 104, 114, 1);
  @media (max-width: 980px) {
    font-size: 13px;
  }
  @media (max-width: 768px) {
    font-size: 13px;
    width: unset;
  }
`;
const BottomConatiner = styled.div``;
const NoteConatiner = styled.div`
  position: absolute;

  bottom: -70%;
  right: 0;
  left: 0;
  width: unset;
  margin: 0 auto;

  padding: 10px;

  border-radius: 8px;
  border: 2px dashed #41474e;
  background: rgba(255, 255, 255, 0.04);
  height: unset;
`;
const Content = styled.h5`
  color: #73808c;

  font-size: 13px;
`;
const Color = styled.span`
  color: #eb6464;
`;
const InputConatiner = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 450px;
  height: 50px;
  margin: 0 auto;
  border-radius: 74px;
  padding: 0 20px;
  border: 1px solid #8e98a3;
  //   background: #1a2630;
  @media (max-width: 980px) {
    width: unset;
  }
`;
const ErrorMsg = styled.p`
      position: absolute;
    font-size: 13px;
   color: #1e91e3;
       right: 0;
    left: 0;
    bottom: -27px;
}
`;

const Input = styled.input`
  width: 100%;
  &::placeholder {
    color: #6d7782;
  }
  @media (max-width: 980px) {
    font-size: 12px;
  }
`;

const SectionConatiner = styled.div`
  display: flex;
  align-items: center;
  /* width: 450px; */
  margin: 0 auto;
  justify-content: center;
  border-radius: 100px;
  border: 1px solid #253644;
  background: #1a2630;
  width: 150px;
  /* padding: 10px; */
  margin-top: 30px;
  cursor: pointer;
  height: 50px;
`;
const Next = styled.h5`
  color: rgba(30, 145, 227, 1);
`;
const ArroConatiner = styled.div`
  margin-left: 6px;
  width: 20px;
`;
const Arrow = styled.img`
  display: block;
  width: 100%;
`;
