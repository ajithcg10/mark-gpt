import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";
import { MyContext } from "../contexts/Context";
import { useNavigate } from "react-router";

export default function PlanModal() {
  const {
    state: { plan_modal },
    dispatch,
  } = useContext(MyContext);
  let navigate = useNavigate();
  const current_plan = [
    {
      feature: "Automatically block cookies/script",
      image: require("../../assets/image/blue_tick.png"),
    },
    {
      feature: "Scan and list cookies",
      image: require("../../assets/image/blue_tick.png"),
    },
  ];
  const premium_plan = [
    {
      feature: "Automatically block cookies/script",
      image: require("../../assets/image/blue_tick.png"),
    },
    {
      feature: "Scan and list cookies",
      image: require("../../assets/image/blue_tick.png"),
    },
    {
      feature: "User Consent logging",
      image: require("../../assets/image/blue_tick.png"),
    },
    {
      feature: "Explicit/Implicit consent",
      image: require("../../assets/image/blue_tick.png"),
    },
    {
      feature: "Location based exclusion for banner",
      image: require("../../assets/image/blue_tick.png"),
    },
  ];
  return (
    <div>
      {plan_modal.isPlan && (
        <BackContainer
        //   style={{
        //     opacity: isModal && "1",
        //     visibility: isModal && "unset",
        //   }}
        >
          <Overlay>
            <Modal style={{ transform: plan_modal.isPlan && "scale(1)" }}>
              <LeftContainer>
                <div>
                  <Left>
                    <SubHeading>Your current plan</SubHeading>
                    <Heading>Free plan</Heading>
                  </Left>
                  {current_plan.map((data) => {
                    return (
                      <Right>
                        <TickImageConatiner>
                          <Tick src={data.image} />
                        </TickImageConatiner>
                        <Feature>{data.feature}</Feature>
                      </Right>
                    );
                  })}
                </div>
                <ButtonContainer
                  onClick={() => {
                    dispatch({
                      type: "UPDATE_PLAN_MODAL",
                      payload: {
                        isPlan: false,
                      },
                    });
                    navigate("/");
                  }}
                >
                  <ReviewButton>Current Plan</ReviewButton>
                </ButtonContainer>

                {/* <Button></Button> */}
              </LeftContainer>
              <RightConatiner>
                <div>
                  <Left>
                    <PermiumConatiner>
                      <PremiumIcon>
                        <Icon src={require("../../assets/image/Star.png")} />
                      </PremiumIcon>
                      <SubHeading>Premium plan</SubHeading>
                    </PermiumConatiner>
                    <Heading>
                      $369.0 <Span>per year</Span>
                    </Heading>
                  </Left>
                  {premium_plan.map((data) => {
                    return (
                      <Right>
                        <TickImageConatiner>
                          <Tick src={data.image} />
                        </TickImageConatiner>
                        <Feature>{data.feature}</Feature>
                      </Right>
                    );
                  })}
                </div>
                <ButtonContainer>
                  <ReviewButton className="active">Upgrade plan</ReviewButton>
                </ButtonContainer>
              </RightConatiner>
              <CloseButton
                onClick={() =>
                  dispatch({
                    type: "UPDATE_PLAN_MODAL",
                    payload: {
                      isPlan: false,
                    },
                  })
                }
              >
                <img
                  src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/taid/11-04-2022/closereg.png"
                  alt=""
                />
              </CloseButton>
            </Modal>
          </Overlay>
        </BackContainer>
      )}
    </div>
  );
}
const videoAnimation = keyframes`
 0% { transform:scale(0,0); opacity:0; }
 100% { transform:scale(1,1); opacity:1; }
`;
const BackContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9999;
  left: 0;
  top: 0px;
  //     border-radius: 8px;
  border: 1px solid rgba(248, 248, 248, 0.1);
  backdrop-filter: blur(4px);
  opacity: 1;
  transition: 0.5s;
  //   visibility: hidden;
  animation-name: ${videoAnimation};
  animation-duration: 0.5s;
`;
const Overlay = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Modal = styled.div`
  transition: 0.3s;
  display: flex;
  justify-content: space-between;
  transform: scale(0);
  width: max-content;

  max-width: 920px;
  max-height: 90vh;
  overflow: hidden;
  //   background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/taid/03-02-2022/images/modal/background.svg");
  // background-position: center;
  // background-repeat: no-repeat;
  background: rgba(8, 11, 13, 0.24) rgba(116, 116, 116, 0.4);

  border-radius: 8px;
  border: 1px solid rgba(116, 116, 116, 0.4);
  padding: 20px 0px;
  box-sizing: border-box;
  border-radius: 10px;
  transition: 0.5s;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  @media all and (max-width: 1080px) {
    width: max-content;
  }
  @media all and (max-width: 980px) {
    width: 83%;
    flex-direction: column;
    max-height: unset;
    padding: unset;
  }
  @media all and (max-width: 640px) {
    width: 87%;
  }
  @media all and (max-width: 640px) {
    width: 87%;
  }
  @media all and (max-width: 480px) {
    width: 90%;
  }
`;

const LeftContainer = styled.div`
  position: relative;
  border-right: 1px solid rgba(248, 248, 248, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media all and (max-width: 480px) {
    padding: 0px 20px;
  }
`;

const Left = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(248, 248, 248, 0.1);
  margin-bottom: 20px;

  @media all and (max-width: 768px) {
    width: 100%;
  }
`;
const PermiumConatiner = styled.div`
  display: flex;
  align-items: center;
`;
const PremiumIcon = styled.div`
  margin-right: 10px;
`;
const Icon = styled.img``;
const Heading = styled.h3`
  font-family: "gordita_medium";
  font-size: 28px;
  color: #rgba(238, 238, 238, 1);
  margin-bottom: 20px;

  @media all and (max-width: 640px) {
    font-size: 24px;
  }
  @media all and (max-width: 480px) {
    font-size: 20px;
  }
  @media all and (max-width: 360px) {
    font-size: 18px;
  }
`;
const Span = styled.span`
  font-size: 14px;
`;
const SubHeading = styled.p`
  margin: 10px 0px;
  font-family: "gordita_regular";
  font-size: 16px;
  color: #eeeeee;

  @media all and (max-width: 640px) {
    max-width: 80%;
  }
  @media all and (max-width: 480px) {
    font-size: 14px;
    max-width: 100%;
  }
  @media all and (max-width: 360px) {
    font-size: 15px;
  }
`;

const Right = styled.div`
  display: flex;
  width: unset;
  //   align-items: center;
  margin-top: 10px;

  @media all and (max-width: 980px) {
    // width: 37%;
  }
  //   @media all and (max-width: 768px) {
  //     display: none;
  //   }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: start;
  margin-top: 30px;
  @media all and (max-width: 480px) {
    margin-bottom: 10px;
  }
`;
const ReviewButton = styled.h4`
  border: 1px solid rgba(37, 54, 68, 1);
  padding: 10px;
  width: 100%;
  cursor: pointer;
  border-radius: 6px;
  color: #c1c1c1;
  margin-right: 20px;
  text-align: center;
  background: #1a2630;
  &.active {
    color: #1e91e3;
  }
`;
const CloseButton = styled.span`
  width: 20px;
  height: 20px;

  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
`;
const TickImageConatiner = styled.div`
  width: 20px;
  margin-right: 10px;
`;
const Tick = styled.img`
  display: block;
  width: 100%;
`;
const Feature = styled.h4`
  width: max-content;
  @media all and (max-width: 480px) {
    font-size: 13px;
  }
`;

const RightConatiner = styled.div`
  border-right: 1px solid rgba(248, 248, 248, 0.1);
  padding: 20px;
  display: flex;
  opacity: 0.4;
  flex-direction: column;
  justify-content: space-between;
  @media all and (max-width: 480px) {
    padding: 0px 20px;
  }
`;
