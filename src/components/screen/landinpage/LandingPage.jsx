import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../contexts/Context";
import { styled } from "styled-components";
import NavBar from "../../inculeds/NavBar";
import HomeSideBar from "../../inculeds/HomeSideBar";
import { Link } from "react-router-dom";
import TypingEffect from "../../helpers/TypingEffect";
import { TiThMenu } from "react-icons/ti";
import MobileSideBar from "../../inculeds/MobileSideBar";
import { RotatingTriangles } from "react-loader-spinner";
import { nav } from "../../helpers/NavMenu";
import PlanModal from "../../inculeds/PlanModal";

export default function LandingPage() {
  const [show, SetShow] = useState(false);
  const [copied, setCopied] = useState(false);
  nav.map((i) => {
    return (
      (i.segment_verifyed = 2),
      (i.business_verifyed = 1),
      (i.point_verifyed = 3)
    );
  });

  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  const {
    state: { segment_data },
    dispatch,
  } = useContext(MyContext);

  let text = TypingEffect(segment_data?.landing_page, 70);

  const handleCopy = () => {
    // The text you want to copy
    const copiedText = "hi";
    navigator.clipboard
      .writeText(copiedText)
      .then(() => {
        setCopied(true); // Update the state to indicate copied status
      })
      .catch((error) => {
        console.error("Copy failed:", error);
      });
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

  return (
    <div>
      {text ? (
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
                <Title>Landing page copy</Title>
              </TopSection>
              <CenterSection>
                <SubBox>
                  <SubTitleContainer>
                    <SubTitle>Landing page content</SubTitle>
                    <CopyButtonConatiner onClick={handleCopy}>
                      <CopyButtonName>
                        {copied ? "copied" : "Copy"}
                      </CopyButtonName>
                      <IconContainer>
                        <CopyIcon
                          src={require("../../../assets/image/landing/copy.png")}
                        />
                      </IconContainer>
                    </CopyButtonConatiner>
                  </SubTitleContainer>

                  <DecriptionContainer>
                    {text}
                    {/* {segment_data?.landing_page} */}
                    {/* <div dangerouslySetInnerHTML={{ __html: htmlContent }} /> */}
                    {/* {jsonString[""] && <CanvasRenderer htmlData={jsonString[""]} />} */}
                    {/* <HeadLine>{headline}</HeadLine>
                <SubHeadLine>{subheadline}</SubHeadLine>
                <Decription>{text}</Decription> */}
                    {/* <canvas ref={canvasRef} width={800} height={600} /> */}
                  </DecriptionContainer>
                </SubBox>
              </CenterSection>
              <Link to="/social">
                <ButtonContainer>
                  <ButtonName>Social media details</ButtonName>
                  <ArrowContainer>
                    <ArrowIcon
                      src={require("../../../assets/image/business/Arrow.png")}
                    />
                  </ArrowContainer>
                </ButtonContainer>
              </Link>
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
    </div>
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
    width: 65%;
  }
  @media (max-width: 768px) {
    width: 60%;
  }
  @media (max-width: 640px) {
    width: unset;
  }
`;
const Box = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px 0;
  align-items: center;
`;
const TopSection = styled.div`
  margin-bottom: 20px;
`;
const Title = styled.h2`
  font-family: "gordita_medium";
  @media (max-width: 480px) {
    font-size: 23px;
  }
`;
const CenterSection = styled.div`
  border-radius: 20px;
  border: 1px solid #212f41;
  padding: 30px;
  background: rgba(8, 11, 13, 0.1);
  backdrop-filter: blur(4px);
  @media (max-width: 480px) {
    padding: 17px;
  }
`;
const SubBox = styled.div``;
const SubTitleContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: center;
`;
const SubTitle = styled.h4`
  font-size: 20px;
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;
const CopyButtonConatiner = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px 8px;
  border-radius: 6px;

  border: 1px solid #253644;
  background: #1a2630;
`;
const CopyButtonName = styled.h5`
  margin-right: 10px;
  color: #1e91e3;
  @media (max-width: 480px) {
    font-size: 13px;
  }
`;
const IconContainer = styled.div``;
const CopyIcon = styled.img`
  display: block;
`;
const DecriptionContainer = styled.div``;
// const HeadLine = styled.h5`
//   width: 100%;
//   margin-bottom: 10px;
//   text-align: left;
//   font-size: 14px;
//   color: #1e91e3;
//   @media (max-width: 768px) {
//     font-size: 13px;
//   }
// `;
// const SubHeadLine = styled.h5`
//   width: 100%;
//   text-align: left;
//   margin-bottom: 10px;
//   font-size: 14px;
//   color: #1e91e3;
//   @media (max-width: 768px) {
//     font-size: 13px;
//   }
// `;
// const Decription = styled.p`
//   width: 100%;
//   text-align: left;

//   color: #d5d5d5;
//   @media (max-width: 768px) {
//     font-size: 14px;
//   }
// `;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  /* width: 450px; */
  margin: 0 auto;
  cursor: pointer;

  justify-content: center;
  border-radius: 100px;
  border: 1px solid #253644;
  background: #1a2630;
  width: fit-content;
  /* padding: 10px; */
  margin-top: 30px;
  padding: 10px 20px;
`;
const ButtonName = styled.h5`
  color: rgba(30, 145, 227, 1);
`;
const ArrowContainer = styled.div`
  margin-left: 6px;
  width: 20px;
`;
const ArrowIcon = styled.img`
  display: block;
  width: 100%;
`;
