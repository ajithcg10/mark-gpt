import React from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div>
      <Container>
        <InnerContainer>
          <ImageContainer>
            <Image
              src={
                "https://talrop-techies-park-assets.sgp1.digitaloceanspaces.com/images/404.svg"
              }
              alt="Error 404"
            />
          </ImageContainer>
          <Title>Page not found</Title>
          <Text>
            You seems to have clicked on a broken link or entered a URL that
            doesn't exist on this site.
          </Text>
          <Button to="/">Go to Dashboard</Button>
        </InnerContainer>
      </Container>
    </div>
  );
}
const Container = styled.div`
  /* padding-top: 100px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh !important;
  padding-right: unset !important;
  padding-bottom: unset !important;
  @media all and (max-width: 768px) {
    padding-top: 0px;
  }
`;
const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const ImageContainer = styled.div`
  width: 43%;
  @media (max-width: 1440px) {
    width: 43%;
  }
  @media (max-width: 840px) {
    min-width: 200px;
  }
`;
const Image = styled.img`
  display: block;
  width: 100%;
`;
const Title = styled.h3`
  font-size: 24px;
  color: #fff;
  font-family: "gordita_medium";

  @media only screen and (max-width: 640px) {
    font-size: 21px;
  }
  @media only screen and (max-width: 480px) {
    font-size: 18px;
  }
`;
const Text = styled.p`
  font-size: 16px;
  color: #747474;
  width: 68%;
  text-align: center;
  margin: 10px 0 20px;
  font-family: "gordita_regular";
  @media only screen and (max-width: 1280px) {
    width: 71%;
  }
  @media only screen and (max-width: 480px) {
    width: 90%;
    font-size: 14px;
  }
`;
const Button = styled(Link)`
  font-family: "gordita_medium";
  text-align: center;
  font-size: 16px;
  background-color: #233b4f;
  color: #1e91e3;
  border-radius: 6px;
  padding: 12px 30px;
  @media only screen and (max-width: 980px) {
    font-size: 15px;
    padding: 10px 25px;
  }
  @media only screen and (max-width: 480px) {
    padding: 10px 20px;
  }
`;
