import React from "react";
import { useContext } from "react";
import styled, { keyframes } from "styled-components";
import { MyContext } from "../contexts/Context";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/image/Bg.png";

export default function BusinessModal({ isModal, setModal }) {
  let navigate = useNavigate();
  const {
    state: { segment_data },
  } = useContext(MyContext);
  console.log(segment_data, "hu");
  return (
    <>
      {/* <SuccessModal isSuccess={isSuccess} setIsSuccess={setIsSuccess} /> */}
      {isModal && (
        <BackContainer
        //   style={{
        //     opacity: isModal && "1",
        //     visibility: isModal && "unset",
        //   }}
        >
          <Overlay>
            <Modal style={{ transform: isModal && "scale(1)" }}>
              <Container>
                <Left>
                  <Heading>Confirm?</Heading>
                  <SubHeading>
                    Since you are using the free version you can only add one
                    business. Are you sure you want to continue this company
                    information?
                  </SubHeading>
                </Left>
                <Right>
                  <Name>
                    <Span>Name:</Span> {segment_data?.business?.business}
                  </Name>
                  <Industry>
                    <Span>Industry: </Span>
                    {segment_data?.business?.industry}
                  </Industry>
                  <Primary>
                    <Span>Primary function:</Span>
                    {segment_data?.business?.primary}
                  </Primary>
                </Right>
                <ButtonContainer>
                  <ReviewButton onClick={() => navigate("/")}>
                    Review
                  </ReviewButton>
                  <ConfirmButton onClick={() => navigate("/segments")}>
                    Confirm
                  </ConfirmButton>
                </ButtonContainer>

                {/* <Button></Button> */}
              </Container>
              <CloseButton onClick={() => setModal(false)}>
                <img
                  src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/taid/11-04-2022/closereg.png"
                  alt=""
                />
              </CloseButton>
            </Modal>
          </Overlay>
        </BackContainer>
      )}
    </>
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
  transform: scale(0);
  width: 50%;
  max-width: 920px;
  max-height: 90vh;
  overflow: hidden;
  //   background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/taid/03-02-2022/images/modal/background.svg");
  // background-position: center;
  // background-repeat: no-repeat;
  // background: rgba(8, 11, 13, 0.24) rgba(116, 116, 116, 0.4);
  background-image: url(${bg});
  background-position: center;

  border-radius: 8px;
  border: 1px solid rgba(116, 116, 116, 0.4);
  padding: 25px;
  box-sizing: border-box;
  border-radius: 10px;
  transition: 0.5s;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  @media all and (max-width: 1080px) {
    width: 67%;
  }
  @media all and (max-width: 980px) {
    width: 83%;
  }
  @media all and (max-width: 640px) {
    width: 50%;
    padding: 30px;
  }
  @media all and (max-width: 640px) {
    width: 70%;
    padding: 40px 20px;
  }
  @media all and (max-width: 480px) {
    width: 90%;
    padding: 10px 10px;
  }
`;

const Container = styled.div`
  position: relative;
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
`;

const Left = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(248, 248, 248, 0.1);

  @media all and (max-width: 768px) {
    width: 100%;
  }
`;
const Heading = styled.h3`
  font-family: "gordita_regular";
  font-size: 28px;
  color: #rgba(238, 238, 238, 1);
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

const SubHeading = styled.p`
  margin: 10px 0px;
  font-family: "gordita_regular";
  font-size: 16px;
  color: rgba(115, 128, 140, 1);

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

const Span = styled.span`
  color: rgba(115, 128, 140, 1);
`;

const Right = styled.div`
  width: 100%;
  margin-top: 30px;

  @media all and (max-width: 980px) {
    width: 37%;
  }
  //   @media all and (max-width: 768px) {
  //     display: none;
  //   }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;
const ReviewButton = styled.h4`
  border: 1px solid rgba(37, 54, 68, 1);
  padding: 10px;
  width: 200px;
  cursor: pointer;
  border-radius: 23px;
  color: rgba(73, 113, 146, 1);
  margin-right: 20px;
  text-align: center;
  @media all and (max-width: 480px) {
    font-size: 15px;
  }
`;
const ConfirmButton = styled.h4`
  border: 1px solid rgba(26, 38, 48, 1);
  padding: 10px;
  background: #1a2630;
  color: rgba(30, 145, 227, 1);
  width: 200px;
  cursor: pointer;
  border-radius: 23px;
  text-align: center;
  @media all and (max-width: 480px) {
    font-size: 15px;
  }
`;
const Name = styled.h5`
  margin-bottom: 10px;
`;
const Industry = styled.h5`
  margin-bottom: 10px;
`;
const Primary = styled.h5`
  margin-bottom: 10px;
`;

const CloseButton = styled.span`
  width: 20px;
  height: 20px;

  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
`;
