import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { styled } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../contexts/Context";
import { AiOutlineCloseSquare } from "react-icons/ai";
import bg from "../../assets/image/Bg.png";

export default function MobileSideBar({ show, SetShow }) {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(5);
  const [list, setList] = useState([]);
  const [isloading, setLoading] = useState(false);
  let navigate = useNavigate();

  const {
    state: { user_data },
    dispatch,
  } = useContext(MyContext);

  const handle = () => {
    localStorage.removeItem("social_data");
    localStorage.removeItem("segment_data");
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://api.markgpt.ai/api/v1/accounts/prompt-history/",
          {
            headers: {
              Authorization: `Bearer ${user_data.access_token}`,
              "Content-Type": "application/json", // Adjust the Content-Type if needed
            },
          }
        );
        const jsonData = await response.json();
        setData(jsonData?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  const loadMore = () => {
    setCount((perv) => perv + 5);
  };

  const formData = new FormData();
  formData.append("buisness_name", list.buisness_name);
  formData.append("industry", list.industry);
  formData.append("primary_function", list.primary_function);

  const makePostRequest = async () => {
    const url = "https://api.markgpt.ai/api/v1/accounts/prompt-detail/"; // Replace with your API URL
    const bearerToken = user_data.access_token; // Replace with your actual Bearer token
    setLoading(true);
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
        setLoading(false);
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
          },
        });
        navigate("/segments");
      }
      if (response.data.StatusCode === 6000) {
        setLoading(false);
      }

      // Handle the response data here (e.g., update state, display messages, etc.)
    } catch (error) {
      // Handle errors here
      console.error("Error making the API call:", error);
    }
  };
  console.log("hiiii");
  return (
    <Container className={show && "active"}>
      <TopSection>
        <IconConatiner onClick={() => SetShow(false)}>
          <AiOutlineCloseSquare />
        </IconConatiner>
        <Title onClick={() => navigate("/")}>
          Mark<Span>GPT</Span>
        </Title>
        {data && (
          <AddConatiner
            onClick={() =>
              dispatch({
                type: "UPDATE_PLAN_MODAL",
                payload: {
                  isPlan: true,
                },
              })
            }
          >
            <AddIconContainer>
              <AddIcon src={require("../../assets/image/add.png")} />
            </AddIconContainer>
            <AddContent>Add new business</AddContent>
          </AddConatiner>
        )}

        <HomeSection>
          {data.slice(0, count).map((item) => {
            return (
              <Link to="/">
                <HomeConatiner
                  onClick={() => {
                    setList(item);
                    makePostRequest();
                  }}
                >
                  <HomeIconContainer>
                    {/* <LineDiv>e</LineDiv> */}
                    <HomeIconSection>
                      <HomeIcon src={require("../../assets/image/found.png")} />
                    </HomeIconSection>
                  </HomeIconContainer>
                  {isloading && item.id == list.id ? (
                    <Loading>Loading....</Loading>
                  ) : (
                    <Content>
                      <HomeContent>{item.buisness_name}</HomeContent>
                      <Industry>{item.industry}</Industry>
                    </Content>
                  )}
                  <DownloadImage>
                    <Img src={require("../../assets/image/download.png")} />
                  </DownloadImage>
                </HomeConatiner>
              </Link>
            );
          })}
          <Load onClick={() => loadMore()}>Load more..</Load>
          {/* <HistoryConatiner>
              <HistoryIconContainer>
                <HistoryIcon
                  src={require("../../assets/image/dashborad/history.png")}
                />
              </HistoryIconContainer>
              <HistoryContent>Search history</HistoryContent>
            </HistoryConatiner> */}
        </HomeSection>
        {data.length == 0 && (
          <HomeSection>
            <Img
              src={require("../../assets/image/no_found.png")}
              alt="No Found"
            />
          </HomeSection>
        )}
      </TopSection>
      <BottomSection>
        <UpgradeConatiner
          onClick={() =>
            dispatch({
              type: "UPDATE_PLAN_MODAL",
              payload: {
                isPlan: true,
              },
            })
          }
        >
          <UpgradeIconContainer>
            <UpgradeIcon
              src={require("../../assets/image/dashborad/Support.png")}
            />
          </UpgradeIconContainer>
          <UpgradeContent>Upgrade</UpgradeContent>
        </UpgradeConatiner>
        <ProfileConatiner
          onClick={() => {
            dispatch({
              type: "UPDATE_USER_DATA",
              payload: {
                is_verified: false,
              },
            });
          }}
        >
          <ProfileIconContainer>
            <ProfileIcon
              src={require("../../assets/image/dashborad/profile.png")}
            />
            <Username>{user_data.name}</Username>
          </ProfileIconContainer>

          <OptionIconContainer>
            <OptionIcon
              src={require("../../assets/image/dashborad/option.png")}
            />
          </OptionIconContainer>
        </ProfileConatiner>
      </BottomSection>
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
  border-right: 1px solid #212f41;
  z-index: 2;
  background-image: url(${bg});
  background-position: center;
  backdrop-filter: blur(4px);
  position: fixed;
  width: 300px;
  overflow: hidden;
  left: -390px;
  display: flex;
  transition: all ease-in 0.5s;
  flex-direction: column;
  justify-content: space-between;
  padding: 50px 10px;

  &.active {
    z-index: 2;
    height: 100vh;
    overflow-y: scroll;
    left: 0px;
    transition: all ease-in 0.5s;
  }
`;
const TopSection = styled.div``;
const IconConatiner = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 31px;
`;

const Title = styled.h1`
  font-family: gordita_medium;
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 30px;
`;
const AddConatiner = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 8px;
  border: 2px dashed #41474e;
  background: rgba(255, 255, 255, 0.04);
  height: 50px;
  justify-content: center;
  margin-bottom: 10px;
`;
const AddIconContainer = styled.div`
  margin-right: 10px;
`;
const AddIcon = styled.img`
  display: block;
  width: 100%;
`;
const AddContent = styled.h5`
  font-family: "gordita_medium";
  color: rgba(30, 145, 227, 1);
  @media (max-width: 980px) {
    font-size: 13px;
  }
`;
const Span = styled.span`
  color: rgba(30, 145, 227, 1);
  font-family: "gordita_medium";
`;
const HomeSection = styled.div``;
const HomeConatiner = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  background: #f8f8f8;
  position: relative;
  height: unset;
  margin-bottom: 10px;
`;
const Load = styled.h5`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 8px;
  border: 1px solid #253644;
  background: #1a2630;
  height: 50px;
  justify-content: center;
  margin-bottom: 60px;
`;
const HomeIconContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Loading = styled.h5`
  color: rgba(30, 145, 227, 1);
`;
const HomeIcon = styled.img`
  display: block;
`;
const HomeContent = styled.h5`
  color: rgba(30, 145, 227, 1);
  font-family: "gordita_medium";
  @media (max-width: 980px) {
    font-size: 14px;
  }
`;

const HomeIconSection = styled.div`
  margin-right: 19px;
`;

const BottomSection = styled.div``;
const UpgradeConatiner = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-top: 10px;
  border-radius: 8px;
  border: 1px solid #1e91e3;
  background: #1a2630;
  height: 50px;
  justify-content: center;
`;
const UpgradeIconContainer = styled.div`
  margin-right: 10px;
`;
const UpgradeIcon = styled.img`
  // display: block;
`;
const UpgradeContent = styled.h5`
  font-family: "gordita_medium";
  color: rgba(30, 145, 227, 1);
  @media (max-width: 980px) {
    font-size: 14px;
  }
`;
const ProfileConatiner = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-top: 10px;
  border-radius: 8px;
  border: 1px solid #303437;
  background: rgba(255, 255, 255, 0.04);
  height: 50px;
  justify-content: space-between;
`;
const ProfileIconContainer = styled.div`
  display: flex;
  align-items: center;
`;
const ProfileIcon = styled.img``;
const Username = styled.h5`
  margin-left: 30px;
  font-family: "gordita_medium";
  @media (max-width: 980px) {
    font-size: 14px;
  }
`;
const OptionIconContainer = styled.div``;
const OptionIcon = styled.img``;
const Content = styled.div``;
const DownloadImage = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`;
const Industry = styled.h5`
  color: rgba(97, 105, 114, 1);
  font-size: 14px;
`;
const Img = styled.img`
  display: block;
  width: 100%;
`;
