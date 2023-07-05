import React, { useState } from "react";
import { styled } from "styled-components";

export default function SignPage() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <Container>
        <TopConatiner>
          <Title>
            Mark<Span>GPT</Span>
          </Title>
        </TopConatiner>
        <BottomConatiner>
          <Box>
            <TopSection>
              <SubTitle>Sign in</SubTitle>
            </TopSection>
            <FormSection>
              <FormTitle>
                <SingleForm>
                  <InputConatiner>
                    <Label>Email</Label>
                    <Input />
                  </InputConatiner>
                  <InputConatiner>
                    <Label>Set Password</Label>
                    <Input type={showPassword ? "text" : "password"} />
                    <ShowPassword
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <Show
                        alt="Icon"
                        src={require("../../../assets/image/authsection/Iconly.png")}
                      />
                    </ShowPassword>
                  </InputConatiner>
                </SingleForm>
              </FormTitle>
              <ButtonContainer>
                <Content>Signup</Content>
              </ButtonContainer>
              <GoggleContainer>
                <Facilty>Or signup using</Facilty>
                <ChooseAuth>
                  <SoftwearImage>
                    <Image
                      alt="goggle"
                      src={require("../../../assets/image/authsection/goggle.png")}
                    />
                  </SoftwearImage>
                </ChooseAuth>
              </GoggleContainer>
            </FormSection>
          </Box>
        </BottomConatiner>
        <Signin>
          Dont have a account? <Span> Sign in</Span>
        </Signin>
      </Container>
    </div>
  );
}
const Container = styled.div`
  width: 100%;
  height: 100vh;
  text-align: center;
  padding: 60px 0px;
`;
const TopConatiner = styled.div``;
const Title = styled.h1`
  font-family: gordita_medium;
  margin-bottom: 20px;

  font-size: 30px;
`;
const Span = styled.span`
  color: rgba(30, 145, 227, 1);
  font-family: "gordita_medium";
`;
const BottomConatiner = styled.div``;
const Box = styled.div`
  width: 600px;
  margin: 0 auto;
  border-radius: 8px;
  border: 1px solid #212f41;
  background: rgba(8, 11, 13, 0.1);
  box-shadow: 0px 4px 64px 0px rgba(47, 47, 47, 0.08);
  height: 3;
  padding: 40px;
  text-align: initial;
`;
const TopSection = styled.div`
  margin-bottom: 30px;
`;
const SubTitle = styled.div`
  color: #1e91e3;
  font-size: 25px;
  font-family: "gordita_medium";
`;
const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: baseline;
  width: 100%;
`;
const FormTitle = styled.div`
  width: 100%;
`;
const Label = styled.label`
  color: var(--beeka-neutral-300, #6a7683);
  font-size: 14px;
`;

const SingleForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
`;
const InputConatiner = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 30px; //   background: aqua;

  width: 100%;
  flex-direction: column;
`;

const Input = styled.input`
  text-align: center;
  border-bottom: 1px solid #8e98a3;
  &: focus {
    border-bottom: 1px solid #1e91e3;
  }
`;
const ShowPassword = styled.div`
  position: absolute;
  right: 0;
`;
const Show = styled.img``;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;

  justify-content: center;
  align-items: center;
  /* margin: 0 auto; */
  height: 50px;
  text-align: center;
  border-radius: 74px;
  border: 1px solid #253644;
  background: #1a2630;
  margin-bottom: 30px;
`;
const Content = styled.div`
  color: #1e91e3;
`;
const GoggleContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const Facilty = styled.div`
  margin-right: 10px;
  color: #c6ccd2;
  font-size: 14px;
`;
const ChooseAuth = styled.div`
  display: flex;
  align-items: center;
  display: flex;
  justify-content: center;
`;
const SoftwearImage = styled.div`
  margin-right: 10px;
  width: 20px;
`;
const Image = styled.img`
  display: block;
  width: 100%;
`;
const Signin = styled.h5`
  color: #c6ccd2;
  margin-top: 30px;
`;
