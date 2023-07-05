import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import NavBar from "../../inculeds/NavBar";
import HomeSideBar from "../../inculeds/HomeSideBar";

export default function Business() {
  const [inputType, setInputType] = useState({
    business_name: true,
    business_industry: false,
    business_primary: false,
  });
  const [inputValues, setInputValues] = useState([]);
  const [business, setBusiness] = useState("");
  const [industry, setIndustry] = useState("");
  // const [business, setBusiness] = useState("");

  useEffect(() => {
    if (inputValues.length != 0 && inputType.business_name == true) {
      setInputType({
        ...inputType,
        business_industry: !inputType.business_industry,
        business_name: !inputType.business_name,
      });
    } else if (inputValues.length != 0 && inputType.business_industry == true) {
      setInputType({
        ...inputType,
        business_primary: !inputType.business_primary,
        business_industry: !inputType.business_industry,
      });
    }
  }, [inputValues.length]);
  console.log(inputType.business_industry);
  setTimeout(() => {
    if (inputValues.length != 0) {
      setInputValues([]);
    }
  }, 2000);
  console.log(inputValues);
  function business_value() {
    setInputValues([...inputValues, business]);
    setBusiness("");
  }
  function industry_value() {
    console.log("ajith");
    setInputValues([...inputValues, industry]);
    setIndustry("");
  }

  return (
    <Container>
      <HomeSideBar />
      <Wrapper>
        <NavBar />
        {inputType.business_name && (
          <Box>
            <TopSection>
              <Title>
                Mark<Span>GPT</Span>
              </Title>
              <Create>Enter the name of your business</Create>
              <Example>(eg: Puma)</Example>
            </TopSection>
            <BottomConatiner>
              <InputConatiner>
                <Input
                  value={business}
                  placeholder="Enter business name (required)"
                  onChange={(e) => {
                    setBusiness(e.target.value);
                  }}
                />
              </InputConatiner>
              <SectionConatiner>
                <Next
                  onClick={() => {
                    business_value();
                  }}
                >
                  Next
                </Next>
                <ArroConatiner>
                  <Arrow
                    src={require("../../../assets/image/business/Arrow.png")}
                  />
                </ArroConatiner>
              </SectionConatiner>
            </BottomConatiner>
          </Box>
        )}
        {inputType.business_industry && (
          <Box>
            <TopSection>
              <Title>
                Mark<Span>GPT</Span>
              </Title>
              <Create>Enter the name of your business industry</Create>
              <Example>(eg: textiles & footwear)</Example>
            </TopSection>
            <BottomConatiner>
              <InputConatiner>
                <Input
                  value={industry}
                  onChange={(e) => {
                    setIndustry(e.target.value);
                  }}
                  placeholder="Business industray (required)"
                />
              </InputConatiner>
              <SectionConatiner>
                <Next
                  onClick={() => {
                    industry_value();
                  }}
                >
                  Next
                </Next>
                <ArroConatiner>
                  <Arrow
                    src={require("../../../assets/image/business/Arrow.png")}
                  />
                </ArroConatiner>
              </SectionConatiner>
            </BottomConatiner>
          </Box>
        )}
        {inputType.business_primary && (
          <Box>
            <TopSection>
              <Title>
                Mark<Span>GPT</Span>
              </Title>
              <Create>
                Welcome to MarkGPT, Enter the basic details of your business.
              </Create>
              <Example>(eg: Puma primary)</Example>
            </TopSection>
            <BottomConatiner>
              <InputConatiner>
                <Input placeholder="Primary function (required)" />
              </InputConatiner>
              <SectionConatiner>
                <Next>Get segments</Next>
                <ArroConatiner>
                  <Arrow
                    src={require("../../../assets/image/business/Arrow.png")}
                  />
                </ArroConatiner>
              </SectionConatiner>
            </BottomConatiner>
          </Box>
        )}
      </Wrapper>
    </Container>
  );
}
const Container = styled.div`
  color: rgba(255, 255, 255, 1);
  width: 100%;
  height: 100vh;
  display: flex;
`;
const Wrapper = styled.div`
  text-align: center;
  display: grid;
  flex-direction: column;
  /* align-items: center; */
  width: 100%;
  height: 100vh;
`;
const Box = styled.div`
  width: 70%;
  margin: 0 auto;
`;
const TopSection = styled.div``;
const Title = styled.h1`
  font-family: gordita_medium;
  margin-bottom: 20px;
  font-size: 45px;
`;
const Span = styled.span`
  color: rgba(30, 145, 227, 1);
  font-family: "gordita_medium";
`;
const Create = styled.h5`
  color: rgba(197, 197, 197, 1);
  font-size: 16px;
`;
const Example = styled.p`
  margin-bottom: 40px;
  font-size: 14px;
  color: rgba(93, 104, 114, 1);
`;
const BottomConatiner = styled.div``;
const InputConatiner = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
  width: 450px;
  height: 50px;
  margin: 0 auto;
  border-radius: 74px;
  padding: 0 20px;
  border: 1px solid #8e98a3;
  //   background: #1a2630;
`;
const GoggleAuthImage = styled.div`
  margin-right: 6px;
`;
const Input = styled.input`
  width: 100%;
  &::placeholder {
    color: #6d7782;
  }
`;
const GoggleAuthContent = styled.h6`
  font-size: 14px;
  color: #1e91e3;
`;
const SectionConatiner = styled.div`
  display: flex;
  align-items: center;
  /* width: 450px; */
  margin: 0 auto;
  justify-content: center;
  border-radius: 100px;
  border: 1px solid #253644;
  background: #1a2630;
  width: 150px;
  /* padding: 10px; */
  margin-top: 30px;
  padding: 10px;
`;
const Next = styled.h5`
  color: rgba(30, 145, 227, 1);
`;
const ArroConatiner = styled.div`
  margin-left: 6px;
  width: 20px;
`;
const Arrow = styled.img`
  display: block;
  width: 100%;
`;
