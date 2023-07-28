import React, { useContext, useEffect, useState } from "react";

import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { MyContext } from "../contexts/Context";

export default function HomeSideBar() {
  const {
    state: { user_data },
    dispatch,
  } = useContext(MyContext);

  return (
    <Container>
      <TopSection>
        <Title>
          Mark<Span>GPT</Span>
        </Title>
        <HomeSection>
          <Link to="/">
            <HomeConatiner>
              <HomeIconContainer>
                <LineDiv>e</LineDiv>
                <HomeIconSection>
                  <HomeIcon
                    src={require("../../assets/image/dashborad/home.png")}
                  />
                </HomeIconSection>
              </HomeIconContainer>
              <HomeContent>Home</HomeContent>
            </HomeConatiner>
          </Link>
          <HistoryConatiner>
            <HistoryIconContainer>
              <HistoryIcon
                src={require("../../assets/image/dashborad/history.png")}
              />
            </HistoryIconContainer>
            <HistoryContent>Search history</HistoryContent>
          </HistoryConatiner>
        </HomeSection>
      </TopSection>
      <BottomSection>
        <UpgradeConatiner>
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
  width: 250px;
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
const HomeConatiner = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  background: #f8f8f8;
  height: 50px;
`;
const LineDiv = styled.h6`
  border: 0.1px solid rgba(30, 145, 227, 1);
  background: rgba(30, 145, 227, 1);
  text-indent: 100%;
  white-space: nowrap;
  margin-right: 10px;
  overflow: hidden;
  width: 5px;
  height: 35px;
  border-radius: 5px;
`;
const HomeIconContainer = styled.div`
  display: flex;
  align-items: center;
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
const HistoryConatiner = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 10px;
  margin-top: 10px;
  border-radius: 8px;
  border: 1px solid rgba(248, 248, 248, 0.1);
  height: 50px;
`;
const HistoryIconContainer = styled.div`
  margin-right: 30px;
`;
const HomeIconSection = styled.div`
  margin-right: 19px;
`;
const HistoryIcon = styled.img`
  display: block;
`;
const HistoryContent = styled.h5`
  font-family: "gordita_medium";
  @media (max-width: 980px) {
    font-size: 14px;
  }
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
