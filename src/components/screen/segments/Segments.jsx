import React, { useContext, useEffect, useState } from "react";

import { MyContext } from "../../contexts/Context";
import axios from "axios";
import { styled } from "styled-components";
import { AiOutlineSend } from "react-icons/ai";
import HomeSideBar from "../../inculeds/HomeSideBar";
import NavBar from "../../inculeds/NavBar";
import { Link } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import MobileSideBar from "../../inculeds/MobileSideBar";
import { RotatingTriangles } from "react-loader-spinner";

export default function Segments() {
  const [show, SetShow] = useState(false);
  const data = {
    ta: ["hi", "jj"],
  };
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  const {
    state: { segment, segemnt_cart, user_data, segment_data },
    dispatch,
  } = useContext(MyContext);
  console.log(segment_data);
  // const datadata = segment_data?.segment.segments;
  // const lines = datadata?.split("\n");
  // console.log(lines, "---lines");
  // console.log(datadata, "----segemmm");
  if (segment_data) {
    const jsonData = {};
    const sections = segment_data?.segment?.segments
      .split("\n\n")
      .map((section) => section.split("\n"));
    sections.forEach((section) => {
      const sectionName = section[0].trim();
      jsonData[sectionName] = section.slice(1).map((item) => {
        const [key, value] = item.trim().split(":");
        return { [key.trim()]: value.trim() };
      });
    });
    console.log(jsonData, "sectoiiiii");
  }
  // useEffect(() => {
  //   if (segment_data) {
  //     const lines = segment_data?.split("\n");
  //     console.log(lines);
  //   }
  // }, [segment_data]);
  console.log(segment_data);
  // const sections = segment_data
  //   .split("\n\n")
  //   .map((section) => section.split("\n"));
  // const jsonData = {};
  // sections.forEach((section) => {
  //   const sectionName = section[0].trim();
  //   jsonData[sectionName] = section.slice(1).map((item) => {
  //     const [key, value] = item.trim().split(":");
  //     return { [key.trim()]: value.trim() };
  //   });
  // });
  // console.log(jsonData);
  const formData = new FormData();
  formData.append("targeted_audience", segemnt_cart);

  const [inputPair, setInputPair] = useState("");
  const [objectArray, setObjectArray] = useState([]);

  const handleChangePair = (e) => {
    setInputPair(e.target.value);
  };
  const handleAddPair = () => {
    const value = inputPair;

    function generateId() {
      return Math.random();
    }

    const newObject = value;

    setObjectArray((prevArray) => [...prevArray, newObject]);

    setInputPair("");
  };

  useEffect(() => {
    objectArray.map((i) => {
      dispatch({
        type: "Add_Segmaents",
        payload: i,
      });
    });
  }, [objectArray.length]);
  setTimeout(() => {
    if (objectArray.length != 0) {
      setObjectArray([]);
    }
  }, 500);

  const makePostRequest = async () => {
    const url = "http://api.markgpt.ai/api/v1/accounts/prompt/"; // Replace with your API URL
    const bearerToken = user_data.access_token; // Replace with your actual Bearer token

    try {
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json", // Adjust the Content-Type if needed
        },
        params: { prompt_no: "2" },
      });
      if (response.data.StatusCode == 6000) {
        dispatch({
          type: "UPDATE_SEGMENT_DATA",
          payload: response.data.data,
        });
      }

      // Handle the response data here (e.g., update state, display messages, etc.)
    } catch (error) {
      // Handle errors here
      console.error("Error making the API call:", error);
    }
  };

  return (
    <div>
      {data ? (
        <Container>
          <HomeSideBar />
          <MobileSideBar show={show} SetShow={SetShow} />
          <MobileMenuIcon onClick={() => SetShow(true)}>
            <TiThMenu />
          </MobileMenuIcon>
          <Wrapper>
            <NavBar />
            <SegmentContainer>
              <TopSection>
                <Title>Segments</Title>
                <Description>
                  Select segments which is applicable for your business.
                </Description>
              </TopSection>
              <CenterContainer>
                <Box>
                  {Object.keys(data)?.map((key) => {
                    return (
                      <Item>
                        <Content>{key}</Content>
                        <Sub>
                          {data &&
                            data[key]?.map((element) => {
                              console.log(element, "elu");
                              return segemnt_cart.some((p) => p == element) ? (
                                <ValueConatiner
                                  className="active"
                                  onClick={() => {
                                    dispatch({
                                      type: "Remove_Segmaents",
                                      payload: element,
                                    });
                                  }}
                                >
                                  <Segment>
                                    <Span>{element} </Span>
                                  </Segment>
                                </ValueConatiner>
                              ) : (
                                <ValueConatiner
                                  onClick={() => {
                                    dispatch({
                                      type: "Add_Segmaents",
                                      payload: element,
                                    });
                                  }}
                                >
                                  <Segment>
                                    <Span>{element} </Span>
                                  </Segment>
                                </ValueConatiner>
                              );
                            })}
                        </Sub>
                      </Item>
                    );
                  })}
                </Box>
              </CenterContainer>
              <BottomConatiner>
                <SegmentAddConatiner>
                  <Ul>
                    {segemnt_cart?.map((i) => {
                      return (
                        <Li>
                          <SegmentValue>
                            <Span key={i.Age}> {i}</Span>
                          </SegmentValue>
                          <CloseIconConatiner
                            onClick={() => {
                              dispatch({
                                type: "Remove_Segmaents",
                                payload: i,
                              });
                            }}
                          >
                            <CloseIcon
                              src={require("../../../assets/image/segments/close.png")}
                            />
                          </CloseIconConatiner>
                        </Li>
                      );
                    })}
                  </Ul>
                  <InputConatiner>
                    <Input
                      placeholder="Example, City: Newyork"
                      type="text"
                      value={inputPair}
                      onChange={handleChangePair}
                    />
                    <SenIcon onClick={handleAddPair}>
                      <AiOutlineSend />
                    </SenIcon>
                  </InputConatiner>
                </SegmentAddConatiner>
              </BottomConatiner>
              <Link to={segemnt_cart.length != 0 && "/points"}>
                <ButtonConainer onClick={() => makePostRequest()}>
                  <Next>Get pain points</Next>
                  <ArrowConatiner>
                    <ArrowIcon
                      src={require("../../../assets/image/segments/Arrow.png")}
                    />
                  </ArrowConatiner>
                </ButtonConainer>
              </Link>
            </SegmentContainer>
          </Wrapper>
        </Container>
      ) : (
        <div style={style}>
          <RotatingTriangles
            visible={true}
            height="100"
            width="100"
            ariaLabel="rotating-triangels-loading"
            wrapperStyle={{}}
            wrapperClass="rotating-triangels-wrapper"
          />
        </div>
      )}
    </div>
  );
}
const Container = styled.div`
  color: rgba(255, 255, 255, 1);
  width: 100%;
  height: 100vh;
  display: flex;
  @media (max-width: 640px) {
    flex-direction: column;
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
  /* align-items: center; */
  width: 100%;
  height: 100vh;
`;
const SegmentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px 0;
  align-items: center;
`;
const TopSection = styled.div`
  margin-bottom: 30px;
`;
const Title = styled.h2`
  font-family: "gordita_medium";
  @media (max-width: 480px) {
    font-size: 23px;
  }
`;
const Description = styled.p`
  @media (max-width: 980px) {
    font-size: 14px;
  }
  @media (max-width: 480px) {
    font-size: 13px;
  }
`;
const CenterContainer = styled.div`
  width: 70%;
  margin: 0 auto;

  margin-bottom: 30px;
  padding: 30px;
  border-radius: 20px;
  border: 1px solid #212f41;
  background: rgba(8, 11, 13, 0.1);
  backdrop-filter: blur(4px);
  max-height: 40vh;
  min-height: 40vh;
  @media (max-width: 1080px) {
    width: 85%;
  }
  @media (max-width: 768px) {
    width: 90%;
  }
`;
const Box = styled.ul`
  text-align: left;
  max-height: 30vh;
  min-height: 30vh;
  overflow-y: scroll;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    width: 1px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(132, 149, 171, 1);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(50, 68, 92, 1);
  }
`;
const Item = styled.li`
  margin-bottom: 20px;
`;
const Sub = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Content = styled.p`
  margin-bottom: 10px;
  color: #949ea8;
  font-size: 13px;
`;
const ValueConatiner = styled.div`
  border-radius: 10px;
  background: #1a2630;
  width: fit-content;
  padding: 10px;
  margin-right: 10px;
  margin-top: 10px;
  &.active {
    border-radius: 10px;
    border: 1px solid #1e91e3;
    background: #1a2630;
    color: #1e91e3;
  }
`;
const Segment = styled.h4`
  font-size: 14px;
  text-align: left;
  display: flex;
  // align-items: center;
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;
const Span = styled.span`
  font-size: 14px;
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;
const BottomConatiner = styled.div`
  width: 70%;
  margin: 0 auto;
  padding: 30px;
  border-radius: 20px;
  border: 1px solid #212f41;
  background: rgba(8, 11, 13, 0.1);
  backdrop-filter: blur(4px);
  @media (max-width: 1080px) {
    width: 85%;
  }
  @media (max-width: 768px) {
    width: 90%;
  }
`;
const SegmentAddConatiner = styled.div`
  text-align: left;
`;
const Ul = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;
const Li = styled.li`
  width: fit-content;
  font-size: 14px;
  border-radius: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  background: #1a2630;
  padding: 10px;
  text-align: center;
  display: flex;
  // align-items: center;
`;
const Input = styled.input`
  width: 100%;
  &::placeholder {
    color: #949ea8;
    font-size: 13px;
  }
`;
const InputConatiner = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: center;
`;
const SenIcon = styled.div``;

const SegmentValue = styled.div`
  text-align: left;
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;
const CloseIconConatiner = styled.div`
  margin-left: 10px;
`;
const CloseIcon = styled.img`
  display: block;
`;
const ButtonConainer = styled.div`
  display: flex;
  align-items: center;
  /* width: 450px; */
  cursor: pointer;

  margin: 0 auto;
  justify-content: center;
  border-radius: 100px;
  border: 1px solid #253644;
  background: #1a2630;
  width: fit-content;
  /* padding: 10px; */
  margin-top: 30px;
  padding: 10px 20px;M
`;
const Next = styled.h5`
  color: rgba(30, 145, 227, 1);
`;
const ArrowConatiner = styled.div`
  margin-left: 6px;
  width: 20px;
`;
const ArrowIcon = styled.img`
  display: block;
  width: 100%;
`;