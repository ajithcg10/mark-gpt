import React, { useState, useContext } from "react";
import axios from "axios";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "../../inculeds/ButtonLoader";
import { auth, Provider } from "../../config/firbase";
import { signInWithPopup } from "firebase/auth";
import { MyContext } from "../../contexts/Context";

export default function Siginup() {
  const { dispatch } = useContext(MyContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [isError, setError] = useState(false);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  formData.append("first_name", firstName);
  formData.append("last_name", lastName);

  const handleSubmit = async (event) => {
    if (
      firstName.length !== 0 &&
      // lastName.length !== 0 &&
      email.length !== 0 &&
      password.length !== 0 &&
      repassword.length !== 0 &&
      password === repassword
    ) {
      setLoading(true);
      try {
        // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint URL
        const response = await axios.post(
          "https://api.markgpt.ai/api/v1/accounts/sign_up/",
          formData
        );
        if (response.data.StatusCode === 6000) {
          setLoading(true);
          navigate("/auth/signin", { replace: true });

          // dispatch({
          //   type: "UPDATE_USER_DATA",
          //   payload: {
          //     is_verified: true,
          //     access_token: response.data.data.access,
          //     name: email,
          //   },
          // });
        }
        if (response.data.StatusCode === 6001) {
          setLoading(false);
        }
      } catch (error) {
        console.log("Error:", error);
        setLoading(false);
      }
    } else {
      setError(true);
    }
  };
  setTimeout(() => {
    if (isError) {
      setError(false);
    }
  }, 5000);

  // firbsae auth
  const handleClick = () => {
    signInWithPopup(auth, Provider)
      .then((result) => {
        result.user.getIdToken().then((idToken) => {
          axios
            .post(`https://api.markgpt.ai/api/v1/accounts/firebase-signup/`, {
              id_token: idToken,
            })
            .then((res) => {
              dispatch({
                type: "UPDATE_USER_DATA",
                payload: {
                  is_verified: true,
                  access_token: res.data.access_token,
                  name: res.data.name,
                },
              });
            })
            .catch((err) => {
              console.error("Error sending ID token to backend:", err);
            });
        });
      })
      .catch((error) => {
        console.error("Error with Firebase authentication:", error);
      });
  };
  // firbsae auth

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
              <SubTitle>Sign up</SubTitle>
            </TopSection>
            <FormSection>
              <FormTitle>
                <Form>
                  <NameSection>
                    <FirstNAme>
                      <Label>First name</Label>
                      <InputName
                        type="text"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                      />
                      {isError && firstName.length === 0 ? (
                        <ErrorMsg>This field is required</ErrorMsg>
                      ) : null}
                    </FirstNAme>

                    <LastName>
                      <Label>Last name</Label>
                      <InputLastName
                        type="text"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                      />
                      {isError && lastName.length === 0 ? (
                        <ErrorMsg>This field is required</ErrorMsg>
                      ) : null}
                    </LastName>
                  </NameSection>
                </Form>
                <SingleForm>
                  <InputConatiner>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                    {isError && email.length === 0 ? (
                      <ErrorMsg>This field is required</ErrorMsg>
                    ) : null}
                  </InputConatiner>

                  <InputConatiner>
                    <Label>Set Password</Label>
                    <Input
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                    <ShowPassword
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <Show
                        alt="Icon"
                        src={require("../../../assets/image/authsection/Iconly.png")}
                      />
                    </ShowPassword>
                    {isError && password.length === 0 ? (
                      <ErrorMsg>This field is required</ErrorMsg>
                    ) : null}
                  </InputConatiner>
                  <InputConatiner>
                    <Label>Re enter password</Label>
                    <Input
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setRePassword(e.target.value)}
                      value={repassword}
                    />
                    <ShowPassword
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <Show
                        alt="Icon"
                        src={require("../../../assets/image/authsection/Iconly.png")}
                      />
                    </ShowPassword>
                    {isError && repassword.length === 0 ? (
                      <ErrorMsg>This field is required</ErrorMsg>
                    ) : null}
                  </InputConatiner>
                </SingleForm>
              </FormTitle>
              <ButtonContainer onClick={() => handleSubmit()}>
                <Content> {isLoading ? <ButtonLoader /> : "Sign Up"}</Content>
              </ButtonContainer>

              <GoggleContainer
                onClick={() => {
                  handleClick();
                }}
              >
                <Facilty>Or signup using</Facilty>
                <ChooseAuth>
                  <SoftwearImage>
                    <Image
                      alt="goggle_icon"
                      src={require("../../../assets/image/authsection/goggle.png")}
                    />
                  </SoftwearImage>
                  {/* <SoftwearImage>
                    <Image
                      alt="apple_icon"
                      src={require("../../../assets/image/authsection/apple.png")}
                    />
                  </SoftwearImage>
                  <SoftwearImage>
                    <Image
                      alt="microsoft"
                      src={require("../../../assets/image/authsection/microsofat.png")}
                    />
                  </SoftwearImage> */}
                </ChooseAuth>
              </GoggleContainer>
            </FormSection>
          </Box>
        </BottomConatiner>
        <Signin>
          Already have an account?
          <Span onClick={() => navigate("/auth/signin", { replace: true })}>
            {" "}
            Sign in
          </Span>
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
  @media (max-width: 768px) {
    width: 550px;
  }
  @media (max-width: 640px) {
    width: 90%;
  }
  @media (max-width: 480px) {
    padding: 20px;
  }
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
const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const NameSection = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 30px;
  @media (max-width: 480px) {
    flex-wrap: wrap;
  }
`;
const ErrorMsg = styled.p`
      position: absolute;
    font-size: 13px;
   color: #1e91e3;
    left: 0;
    bottom: -24px;
}
`;
const FirstNAme = styled.div`
  display: flex;
  //   background: aqua;
  position: relative;
  width: 100%;

  margin-right: 10px;

  //   border-bottom: 1px solid #8e98a3;
  flex-direction: column;
  @media (max-width: 480px) {
    margin-right: 0px;
    margin-bottom: 30px;
  }
`;
const LastName = styled.div`
  display: flex;
  position: relative;
  //   background: aqua;
  //   border-bottom: 1px solid #8e98a3;
  width: 100%;

  flex-direction: column;
`;
const Label = styled.label`
  color: var(--beeka-neutral-300, #6a7683);
  font-size: 14px;
`;
const InputName = styled.input`
  border-bottom: 1px solid #8e98a3;
  text-align: left;
  &: focus {
    border-bottom: 1px solid #1e91e3;
  }
`;
const InputLastName = styled.input`
  text-align: left;
  border-bottom: 1px solid #8e98a3;
  &: focus {
    border-bottom: 1px solid #1e91e3;
  }
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
  margin-bottom: 30px;
`;

const Input = styled.input`
  text-align: left;
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
  cursor: pointer;

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
  cursor: pointer;
  justify-content: center;
  align-items: center;
`;
const Facilty = styled.div`
  margin-right: 10px;
  color: #c6ccd2;
  font-size: 14px;
  @media (max-width: 480px) {
    margin-right: 5px;
  }
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
  cursor: pointer;
`;
