import React, { useEffect, useState } from "react";

import { styled } from "styled-components";
import PlanModal from "../../inculeds/PlanModal";
import HomeSideBar from "../../inculeds/HomeSideBar";
import { Link } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import MobileSideBar from "../../inculeds/MobileSideBar";

export default function HomePage() {
  const [show, SetShow] = useState(false);
  const [isPlan, setPlan] = useState(false);

  useEffect(() => {
    const hasPageRefreshed = localStorage.getItem("hasPageRefreshed");

    if (!hasPageRefreshed) {
      localStorage.setItem("hasPageRefreshed", "true");
      localStorage.removeItem("segment_data");
      window.location.reload();
    }
  }, []);

  return (
    localStorage.getItem("hasPageRefreshed") && (
      <Container>
        <Side>
          <HomeSideBar setPlan={setPlan} />
          <MobileSideBar show={show} SetShow={SetShow} />
          <MobileMenuIcon onClick={() => SetShow(true)}>
            <TiThMenu />
          </MobileMenuIcon>
        </Side>
        <Wrapper>
          <Box>
            <TopSection>
              <Title>
                Mark<Span>GPT</Span>
              </Title>
              <Create>
                Welcome to MarkGPT, we help you to get the best marketing
                strategies and contents{" "}
              </Create>
            </TopSection>
            <BottomConatiner>
              <Link to="/business">
                <SectionConatiner>
                  <Next>Setup your business</Next>

                  {/* <ArroConatiner>
                  <Arrow
                    src={require("../../../assets/image/business/Arrow.png")}
                  />
                </ArroConatiner> */}
                </SectionConatiner>
              </Link>
            </BottomConatiner>
          </Box>
        </Wrapper>
        <PlanModal isPlan={isPlan} setPlan={setPlan} />
      </Container>
    )
  );
}
const Container = styled.div`
  color: rgba(255, 255, 255, 1);
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: end;
`;
const Side = styled.div`
  width: 0%;
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
  margin: 0;

  text-align: center;
  display: grid;
  flex-direction: column;
  align-items: center;

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
  }
  @media (max-width: 640px) {
    width: unset;
  }
`;
const Box = styled.div`
  width: 70%;
  margin: 0 auto;
  @media (max-width: 640px) {
    width: 70%;
  }
  @media (max-width: 480px) {
    width: 85%;
  }
`;
const TopSection = styled.div``;
const Title = styled.h1`
  font-family: gordita_medium;
  font-size: 45px;
  @media (max-width: 980px) {
    font-size: 40px;
  }
`;
const Span = styled.span`
  color: rgba(30, 145, 227, 1);
  font-family: "gordita_medium";
`;
const Create = styled.p`
  color: #c5c5c5;
  font-size: 16px;
  width: 65%;
  margin: 0 auto;
  @media (max-width: 980px) {
    font-size: 14px;
    width: 80%;
  }
  @media (max-width: 768px) {
    font-size: 14px;
    width: unset;
  }
`;

const BottomConatiner = styled.div``;
const SectionConatiner = styled.div`
  display: flex;
  align-items: center;
  /* width: 450px; */
  margin: 0 auto;
  justify-content: center;
  border-radius: 100px;
  border: 1px solid #253644;
  background: #1a2630;
  width: 60%;
  /* padding: 10px; */
  margin-top: 30px;
  padding: 10px;
  @media (max-width: 980px) {
    width: unset;
  }
  @media (max-width: 768px) {
    padding: 10px 20px;
    width: unset;
  }
`;
const Next = styled.h5`
  color: rgba(30, 145, 227, 1);
  @media (max-width: 980px) {
    font-size: 14px;
  }
`;
