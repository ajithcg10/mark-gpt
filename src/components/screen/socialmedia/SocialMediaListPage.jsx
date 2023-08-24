import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../contexts/Context";
import axios from "axios";
import { styled } from "styled-components";
import NavBar from "../../inculeds/NavBar";
import HomeSideBar from "../../inculeds/HomeSideBar";
import PlanModal from "../../inculeds/PlanModal";
import { TiThMenu } from "react-icons/ti";
import MobileSideBar from "../../inculeds/MobileSideBar";
import { social_media } from "../../helpers/Object";
import { nav } from "../../helpers/NavMenu";
import ButtonLoader from "../../inculeds/ButtonLoader";
import { useNavigate } from "react-router-dom";

export default function SocialMediaListPage() {
  const [show, SetShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const {
    state: { social_cart, user_data },
    dispatch,
  } = useContext(MyContext);
  let navigate = useNavigate();

  const formData = new FormData();
  formData.append("social_media", social_cart);

  const makePostRequest = async () => {
    const url = "https://api.markgpt.ai/api/v1/accounts/prompt/"; // Replace with your API URL
    const bearerToken = user_data.access_token; // Replace with your actual Bearer token
    if (social_cart.length == 0) {
      setLoading(false);
    }
    if (social_cart.length !== 0) {
      setLoading(true);
      try {
        const response = await axios.post(url, formData, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Content-Type": "application/json", // Adjust the Content-Type if needed
          },
          params: {
            prompt_no: 4,
          },
        });
        const content = response.data.data.add_points
          ?.split("\n")
          .filter((item) => item.trim() !== "");
        if (response.data.StatusCode === 6000) {
          dispatch({
            type: "UPDATE_SOCIAL_DATA",
            payload: {
              add_points: content,
              social_cart: social_cart,
            },
          });

          navigate("/socialmedia");
          setLoading(false);
        }

        // Handle the response data here (e.g., update state, display messages, etc.)
      } catch (error) {
        // Handle errors here
        console.error("Error making the API call:", error);
        setLoading(false);
      }
    }
  };
  nav.map((i) => {
    return (
      (i.segment_verifyed = 2),
      (i.business_verifyed = 1),
      (i.point_verifyed = 3),
      (i.landing_verifyed = 4)
    );
  });
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
            <Title>Social media</Title>
            <Description>
              Select social media platforms for which you need to generate the
              content.
            </Description>
          </TopSection>
          <CenterSection>
            <Ul>
              {social_media.map((i) => {
                return social_cart.some((p) => p === i.social_name) ? (
                  <Li
                    className="active"
                    onClick={() => {
                      dispatch({
                        type: "Remove_Social",
                        payload: i.social_name,
                      });
                    }}
                  >
                    <TickConatiner className="active">
                      <TickIcon
                        src={require("../../../assets/image/social/tick.png")}
                      />
                    </TickConatiner>
                    <IconContainer>
                      <Icon src={i.social_image} />
                    </IconContainer>
                  </Li>
                ) : (
                  <Li
                    onClick={() => {
                      dispatch({
                        type: "Add_Social",
                        payload: i.social_name,
                      });
                    }}
                  >
                    <TickConatiner>
                      <TickIcon
                        src={require("../../../assets/image/social/tick.png")}
                      />
                    </TickConatiner>
                    <IconContainer>
                      <Icon src={i.social_image} />
                    </IconContainer>
                  </Li>
                );
              })}
            </Ul>
          </CenterSection>

          <ButtonConainer onClick={() => makePostRequest()}>
            <Next> {isLoading ? <ButtonLoader /> : "Generate content"}</Next>
            <ArrowConatiner>
              <ArrowIcon
                src={require("../../../assets/image/segments/Arrow.png")}
              />
            </ArrowConatiner>
          </ButtonConainer>
        </Box>
      </Wrapper>
      <PlanModal />
    </Container>
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
  width: 70%;
  margin: 0 auto;
  @media (max-width: 1080px) {
    width: 85%;
  }
  @media (max-width: 768px) {
    width: 90%;
  }
`;
const TopSection = styled.div`
  margin-bottom: 40px;
`;
const Title = styled.h2`
  font-family: "gordita_medium";
  margin-bottom: 10px;
  @media (max-width: 480px) {
    font-size: 23px;
  }
`;
const Description = styled.p`
  color: #c5c5c5;
  width: 55%;
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
const CenterSection = styled.div``;
const Ul = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Li = styled.li`
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  padding: 20px 20px;
  margin-right: 10px;
  border: 1px solid #212f41;
  background: rgba(8, 11, 13, 0.1);
  backdrop-filter: blur(3px);
  &:last-child {
    margin-right: 0px;
  }
  &.active {
    border-radius: 5px;
    border: 1px solid #1e91e3;
    background: rgba(8, 11, 13, 0.1);
    backdrop-filter: blur(3px);
  }
  @media (max-width: 980px) {
    padding: 15px 15px;
  }
  @media (max-width: 768px) {
    padding: 12px 12px;
  }
  @media (max-width: 480px) {
    padding: 5px 5px;
  }
`;
const TickConatiner = styled.div`
  position: absolute;
  right: 0;
  top: -13px;
  display: none;
  width: 20px;
  &.active {
    display: block;
  }
  @media (max-width: 480px) {
    width: 15px;
  }
`;
const TickIcon = styled.img`
  display: block;
  width: 100%;
`;

const IconContainer = styled.div`
  width: 30px;
  @media (max-width: 480px) {
    width: 25px;
  }
`;
const Icon = styled.img`
  display: block;
  width: 100%;
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
  padding: 0px 10px;
  height: 50px;
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
