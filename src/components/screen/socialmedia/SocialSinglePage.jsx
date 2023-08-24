import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../contexts/Context";
import axios from "axios";
import { styled } from "styled-components";
import NavBar from "../../inculeds/NavBar";
import HomeSideBar from "../../inculeds/HomeSideBar";
import PlanModal from "../../inculeds/PlanModal";
import { RotatingTriangles } from "react-loader-spinner";
import { TiThMenu } from "react-icons/ti";
import MobileSideBar from "../../inculeds/MobileSideBar";
import { nav } from "../../helpers/NavMenu";

export default function SocialSinglePage() {
  const [show, SetShow] = useState(false);

  const {
    state: { social_media, social_data, user_data },
    dispatch,
  } = useContext(MyContext);

  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  nav.map((i) => {
    return (
      (i.segment_verifyed = 2),
      (i.business_verifyed = 1),
      (i.point_verifyed = 3),
      (i.landing_verifyed = 4)
    );
  });

  const filteredData = social_data?.social_cart;

  // let data = segment_data?.segment?.add_points;

  const formData = new FormData();
  formData.append("social_media", filteredData);

  const content = social_data?.add_points;

  useEffect(() => {
    if (content) {
      const makePostRequest = async () => {
        const url = "https://api.markgpt.ai/api/v1/accounts/prompt/"; // Replace with your API URL
        const bearerToken = user_data?.access_token; // Replace with your actual Bearer token

        try {
          const response = await axios.post(url, formData, {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
              "Content-Type": "application/json",
            },
            params: {
              prompt_no: 5,
            },
          });

          if (response.data.StatusCode === 6000) {
            dispatch({
              type: "UPDATE_SOCIAL_DATA",
              payload: {
                add_table: response.data.data,
              },
            });
          }

          // Handle the response data here (e.g., update state, display messages, etc.)
        } catch (error) {
          // Handle errors here
          console.error("Error making the API call:", error);
        }
      };
      makePostRequest();
    }
  }, [content]);

  let store = social_media?.filter((item) =>
    filteredData?.includes(item.social_name)
  );

  useEffect(() => {
    async function fetchSocial_Data() {
      let promise = new Promise((resolve, reject) => {
        let social_data = localStorage.getItem("social_data");
        social_data = JSON.parse(social_data);

        dispatch({
          type: "UPDATE_SOCIAL_DATA",
          payload: { ...social_data },
        });
      });

      let result = await promise;
    }

    fetchSocial_Data();
  }, []);
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
  return (
    <>
      {content ? (
        <Container>
          <Side>
            <HomeSideBar />
            <MobileSideBar show={show} SetShow={SetShow} />
            <MobileMenuIcon onClick={() => SetShow(true)}>
              <TiThMenu />
            </MobileMenuIcon>
          </Side>
          <Wrapper>
            <NavBar />
            <Box>
              <TopSection>
                <Title>Social media content</Title>
                <SavebuttonContainer>
                  <SaveIconConatiner>
                    <SaveIcone
                      src={require("../../../assets/image/social/save.png")}
                    />
                  </SaveIconConatiner>
                  <SaveButtonName>Save output</SaveButtonName>
                </SavebuttonContainer>
              </TopSection>
              {store.map((i) => {
                return (
                  <CenterSection>
                    <TopDiv>
                      <SocialContentContainer>
                        <SociaTitle>{i.social_name}</SociaTitle>
                        <SocialContainer>
                          <Item>
                            <SocialIconContainer>
                              <SocailIcon src={i.social_image} />
                            </SocialIconContainer>
                          </Item>
                        </SocialContainer>
                      </SocialContentContainer>

                      <CopyButtonConatiner>
                        <CopyButtonName>Copy</CopyButtonName>
                        <IconContainer>
                          <CopyIcon
                            src={require("../../../assets/image/landing/copy.png")}
                          />
                        </IconContainer>
                      </CopyButtonConatiner>
                    </TopDiv>
                    <CenterDiv>
                      <SubTitle>Ad Copies</SubTitle>
                      <Ul>
                        {content?.map((p) => {
                          return <Li>{p}</Li>;
                        })}
                      </Ul>
                    </CenterDiv>
                    <BottomDiv>
                      <BottomTitle>Calendar</BottomTitle>
                      {/* <div
                        dangerouslySetInnerHTML={{
                          __html: social_data?.add_table,
                        }}
                      /> */}
                      {/* <MainConatiner>
                        <Table>
                          <Thead>
                            <Tr>
                              <Th className="data">Sl no</Th>
                              <Th className="data">Date</Th>
                              <Th className="data">Content type</Th>
                              <Th className="data">Topic</Th>
                              <Th className="data">Metrics to track</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {i.calendar.map((item) => (
                              <Tr>
                                <Td data-title="Sl no">{item.Sl_no}</Td>
                                <Td data-title="Date">{item.date}</Td>
                                <Td data-title="Content type">
                                  {item.content_type}
                                </Td>
                                <Td data-title="Topic">{item.topic}</Td>
                                <Td data-title="Metrics to track">
                                  {item.track}
                                </Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </MainConatiner> */}
                    </BottomDiv>
                  </CenterSection>
                );
              })}
            </Box>
          </Wrapper>
          <PlanModal />
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
    </>
  );
}
const Container = styled.div`
  color: rgba(255, 255, 255, 1);
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  @media (max-width: 640px) {
    flex-direction: column;
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
    z-index: 1;
    color: rgba(30, 145, 227, 1);
    position: relative;
    left: 20px;
    display: block;
    top: 40px;
  }
`;
const Wrapper = styled.div`
  margin: 0;

  text-align: center;
  display: grid;
  flex-direction: column;
  /* align-items: center; */

  height: 100vh;
  width: 80%;
  @media (max-width: 1280px) {
    width: 75%;
  }
  @media (max-width: 1080px) {
    width: 70%;
  }
  @media (max-width: 980px) {
    width: 66%;
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
  width: 90%;
  margin: 0 auto;
`;
const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  padding-top: 50px;
  position: relative;
  @media (max-width: 980px) {
    flex-direction: column;
  }
`;
const Title = styled.h2`
  font-family: "gordita_medium";
  text-align: center;

  @media (max-width: 480px) {
    font-size: 23px;
  }
`;
const SavebuttonContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  cursor: pointer;
  border-radius: 100px;
  border: 1px solid #253644;
  background: #1a2630;
  box-shadow: 0px 4px 32px 0px rgba(0, 0, 0, 0.08);
  padding: 10px 25px;
  @media (max-width: 980px) {
    position: unset;
    position: unset;
    margin-top: 10px;
  }
`;
const SaveIconConatiner = styled.div`
  margin-right: 10px;
`;
const SaveIcone = styled.img`
  display: block;
  width: 100%;
`;
const SaveButtonName = styled.h5``;
const CenterSection = styled.div`
  border-radius: 20px;
  padding: 30px;
  border: 1px solid #212f41;
  background: rgba(8, 11, 13, 0.1);
  backdrop-filter: blur(4px);
  margin-bottom: 30px;
  @media (max-width: 980px) {
    padding: 20px;
  }
`;
const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;
const SocialContentContainer = styled.div`
  display: flex;
  align-items: center;
`;
const SocialContainer = styled.div``;
const Item = styled.div`
  border-radius: 5px;
  position: relative;
  padding: 20px 20px;
  margin-left: 10px;
  border: 1px solid #212f41;
  background: rgba(8, 11, 13, 0.1);
  backdrop-filter: blur(3px);
  @media (max-width: 980px) {
    padding: 15px 15px;
  }
`;
const SociaTitle = styled.h3`
  font-family: "gordita_medium";
  @media (max-width: 480px) {
    font-size: 18px;
  }
`;
const SocialIconContainer = styled.div`
  width: 30px;
`;
const SocailIcon = styled.img`
  display: block;
  width: 100%;
`;
const CopyButtonConatiner = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px 8px;
  border-radius: 6px;

  border: 1px solid #253644;
  background: #1a2630;
  @media (max-width: 480px) {
    margin-top: 10px;
  }
`;
const CopyButtonName = styled.h5`
  margin-right: 10px;
  color: #1e91e3;
`;
const IconContainer = styled.div``;
const CopyIcon = styled.img`
  display: block;
`;
const CenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  align-items: baseline;
  @media (max-width: 980px) {
    align-items: center;
  }
`;
const SubTitle = styled.h3`
  color: #d5d5d5;

  text-align: left;
  margin-bottom: 10px;
  @media (max-width: 480px) {
    font-size: 18px;
  }
`;
const Ul = styled.ul``;
const Li = styled.li`
  color: #d5d5d5;
  font-size: 15px;
  margin-bottom: 10px;
  text-align: left;
  @media (max-width: 980px) {
    text-align: center;
    font-size: 14px;
  }
`;
const BottomDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  @media (max-width: 980px) {
    align-items: normal;
  }
`;
const BottomTitle = styled.h3`
  margin-bottom: 10px;
  @media (max-width: 480px) {
    font-size: 18px;
  }
`;
// const MainConatiner = styled.div`
//   border: 1px solid #212f41;
//   border-radius: 13px;
// `;
// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
// `;
// const Thead = styled.thead``;
// const Th = styled.th`
//   padding: 8px;
//   color: #949ea8;
//   width: fit-content;
//   height: fit-content;
//   @media (max-width: 1080px) {
//     font-size: 14px;
//   }

//   @media (max-width: 980px) {
//     display: none;
//   }
// `;
// const Tbody = styled.tbody``;
// const Tr = styled.tr`
//   border-top: 1px solid #212f41;
//   &:last-child {
//     border-bottom: 0px solid #212f41;
//   }
//   @media (max-width: 980px) {
//     display: block;
//     border: 1px solid #303437;
//     background: rgba(255, 255, 255, 0.04);
//     &:nth-child(even) {
//       border: 1px solid #1e91e3;
//       background: #1a2630;
//     }
//   }
// `;
// const Td = styled.td`
//   padding: 8px;
//   text-align: left;
//   color: #d5d5d5;
//   @media (max-width: 1080px) {
//     font-size: 14px;
//   }

//   @media (max-width: 980px) {
//     padding: 0.5em;
//     text-align: right;
//     display: block;

//     &::before {
//       content: attr(data-title) " : ";
//       float: left;
//     }
//   }
// `;
