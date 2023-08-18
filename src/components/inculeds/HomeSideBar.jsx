import React, { useContext } from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { MyContext } from "../contexts/Context";

export default function HomeSideBar() {
  const {
    state: { user_data, segment_data },
    dispatch,
  } = useContext(MyContext);

  const handle = () => {
    localStorage.removeItem("social_data");
    localStorage.removeItem("segment_data");
  };

  return (
    <Container>
      <TopSection>
        <Title>
          Mark<Span>GPT</Span>
        </Title>
        {segment_data.business ? (
          <HomeSection>
            <Link to="/">
              <HomeConatiner onClick={() => handle()}>
                <HomeIconContainer>
                  {/* <LineDiv>e</LineDiv> */}
                  <HomeIconSection>
                    <HomeIcon src={require("../../assets/image/found.png")} />
                  </HomeIconSection>
                </HomeIconContainer>
                <Content>
                  <HomeContent>{segment_data.business.business}</HomeContent>
                  <Industry>{segment_data.business.industry}</Industry>
                </Content>
                <DownloadImage>
                  <Img src={require("../../assets/image/download.png")} />
                </DownloadImage>
              </HomeConatiner>
            </Link>
            {/* <HistoryConatiner>
              <HistoryIconContainer>
                <HistoryIcon
                  src={require("../../assets/image/dashborad/history.png")}
                />
              </HistoryIconContainer>
              <HistoryContent>Search history</HistoryContent>
            </HistoryConatiner> */}
          </HomeSection>
        ) : (
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
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(4px);
  width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 50px 10px;
  @media (max-width: 980px) {
    width: 300px;
  }
  @media (max-width: 640px) {
    display: none;
  }
`;
const TopSection = styled.div``;
const Title = styled.h1`
  font-family: gordita_medium;
  margin-bottom: 20px;
  font-size: 30px;
`;
const Span = styled.span`
  color: rgba(30, 145, 227, 1);
  font-family: "gordita_medium";
`;
const HomeSection = styled.div``;
const Img = styled.img`
  display: block;
  width: 100%;
`;
const HomeConatiner = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  background: #f8f8f8;
  position: relative;
  height: 60px;
`;

const HomeIconContainer = styled.div`
  display: flex;
  align-items: center;
`;
const HomeIcon = styled.img`
  display: block;
`;
const Content = styled.div``;
const DownloadImage = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`;
const HomeContent = styled.h5`
  color: rgba(30, 145, 227, 1);
  font-family: "gordita_medium";
  @media (max-width: 980px) {
    font-size: 14px;
  }
`;
const Industry = styled.h5`
  color: rgba(97, 105, 114, 1);
  font-size: 14px;
`;

const HomeIconSection = styled.div`
  margin-right: 19px;
`;

const BottomSection = styled.div``;
const UpgradeConatiner = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
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
  cursor: pointer;
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
