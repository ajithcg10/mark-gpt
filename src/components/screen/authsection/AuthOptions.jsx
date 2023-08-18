import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { auth, Provider } from "../../config/firbase";
import { signInWithPopup } from "firebase/auth";

export default function AuthOptions() {
  const handleClick = () => {
    signInWithPopup(auth, Provider).then((data) => {});
  };
  return (
    <div>
      <Container>
        <Box>
          <TopSection>
            <Title>
              Mark<Span>GPT</Span>
            </Title>
            <CreateAc>
              Don’t have an account?
              <Link to="signup/">
                <Span> Create account</Span>
              </Link>
            </CreateAc>
          </TopSection>
          <BottomConatiner>
            <GoggleConatiner onClick={() => handleClick()}>
              <GoggleAuthImage>
                <Image
                  src={require("../../../assets/image/authsection/goggle.png")}
                />
              </GoggleAuthImage>
              <GoggleAuthContent>Continue with Google</GoggleAuthContent>
            </GoggleConatiner>
            <SectionConatiner>
              <LeftSection></LeftSection>
              <Content>Or</Content>
              <RightSection></RightSection>
            </SectionConatiner>
            <Link to="signin">
              <SignIn>Continue with email</SignIn>
            </Link>
          </BottomConatiner>
        </Box>
      </Container>
    </div>
  );
}
const Container = styled.div`
  color: rgba(255, 255, 255, 1);
  width: 100%;
  height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Box = styled.div`
  @media (max-width: 480px) {
    width: 88%;
  }
`;
const TopSection = styled.div``;
const Title = styled.h1`
  font-family: gordita_medium;
  margin-bottom: 20px;
  font-size: 45px;
  @media (max-width: 640px) {
    font-size: 40px;
  }
`;
const Span = styled.span`
  color: rgba(30, 145, 227, 1);
  font-family: "gordita_medium";
`;
const CreateAc = styled.h5`
  margin-bottom: 40px;
  color: #c6ccd2;
  font-size: 18px;
  @media (max-width: 640px) {
    font-size: 16px;
  }
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;
const BottomConatiner = styled.div``;
const GoggleConatiner = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  width: 450px;
  height: 50px;
  margin-bottom: 30px;
  border-radius: 74px;
  border: 1px solid #253644;
  background: #1a2630;
  @media (max-width: 640px) {
    width: 350px;
    margin: 0 auto 20px;
  }
  @media (max-width: 480px) {
    width: unset;
  }
`;
const GoggleAuthImage = styled.div`
  margin-right: 6px;
`;
const Image = styled.img``;
const GoggleAuthContent = styled.h6`
  font-size: 14px;
  color: #1e91e3;
`;
const SectionConatiner = styled.div`
  display: flex;
  align-items: center;

  width: 450px;
  margin: 0 auto;
  justify-content: center;
  @media (max-width: 640px) {
    width: 350px;
  }
  @media (max-width: 480px) {
    width: unset;
  }
`;
const LeftSection = styled.div`
  width: 300px;
  border-bottom: 1px solid rgba(48, 67, 84, 1);
  display: inherit;
`;
const Content = styled.h6`
  font-size: 14px;
  margin: 0 10px;
`;
const RightSection = styled.div`
  width: 300px;
  border-bottom: 1px solid rgba(48, 67, 84, 1);
  display: inherit;
`;
const SignIn = styled.h6`
  font-size: 14px;
  margin-top: 30px;
`;
