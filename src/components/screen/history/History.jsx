import React, { useState } from "react";
// import { MyContext } from "../../contexts/Context";

import { styled } from "styled-components";
import HomeSideBar from "../../inculeds/HomeSideBar";
import MobileSideBar from "../../inculeds/MobileSideBar";
import { TiThMenu } from "react-icons/ti";

export default function History() {
  //   const [data, setData] = useState([]);
  const [show, SetShow] = useState(false);

  // const {
  //   state: { user_data },
  //   dispatch,
  // } = useContext(MyContext);

  //   const api = axios.create({
  //     headers: {
  //       Authorization: `Bearer ${user_data.access_token}`,
  //     },
  //   });

  //   async function getDataFromApi() {
  //     try {
  //       const response = await api.get(
  //         "http://api.markgpt.ai/api/v1/accounts/prompt-history/"
  //       ); // Replace '/your-resource' with the endpoint you want to fetch data from
  //       return setData(response.data?.data); // Return the data from the response
  //     } catch (error) {
  //       // Handle any errors that might occur during the request
  //       console.error("Error fetching data:", error);
  //       throw error;
  //     }
  //   }
  //   useEffect(() => {
  //     getDataFromApi();
  //   }, []);
  let data = [
    {
      id: 1,
      buisness_name: "Chickfest",
      Landing: "Landing page copy",
      date: "11th Nov, 2023",
    },
    {
      id: 1,
      buisness_name: "Chickfest",
      Landing: "Landing page copy",
      date: "11th Nov, 2023",
    },
    {
      id: 1,
      buisness_name: "Chickfest",
      Landing: "Landing page copy",
      date: "11th Nov, 2023",
    },
    {
      id: 1,
      buisness_name: "Chickfest",
      Landing: "Landing page copy",
      date: "11th Nov, 2023",
    },
    {
      id: 1,
      buisness_name: "Chickfest",
      Landing: "Landing page copy",
      date: "11th Nov, 2023",
    },
    {
      id: 1,
      buisness_name: "Chickfest",
      Landing: "Landing page copy",
      date: "11th Nov, 2023",
    },
    {
      id: 1,
      buisness_name: "Chickfest",
      Landing: "Landing page copy",
      date: "11th Nov, 2023",
    },
    {
      id: 1,
      buisness_name: "Chickfest",
      Landing: "Landing page copy",
      date: "11th Nov, 2023",
    },
    {
      id: 1,
      buisness_name: "Chickfest",
      Landing: "Landing page copy",
      date: "11th Nov, 2023",
    },
    {
      id: 1,
      buisness_name: "Chickfest",
      Landing: "Landing page copy",
      date: "11th Nov, 2023",
    },
    {
      id: 1,
      buisness_name: "Chickfest",
      Landing: "Landing page copy",
      date: "11th Nov, 2023",
    },
    {
      id: 1,
      buisness_name: "Chickfest",
      Landing: "Landing page copy",
      date: "11th Nov, 2023",
    },
    {
      id: 1,
      buisness_name: "Chickfest",
      Landing: "Landing page copy",
      date: "11th Nov, 2023",
    },
    {
      id: 1,
      buisness_name: "Chickfest",
      Landing: "Landing page copy",
      date: "11th Nov, 2023",
    },
    {
      id: 1,
      buisness_name: "Chickfest",
      Landing: "Landing page copy",
      date: "11th Nov, 2023",
    },
    {
      id: 1,
      buisness_name: "Chickfest",
      Landing: "Landing page copy",
      date: "11th Nov, 2023",
    },
    {
      id: 1,
      buisness_name: "Chickfest",
      Landing: "Landing page copy",
      date: "11th Nov, 2023",
    },
    {
      id: 1,
      buisness_name: "Chickfest",
      Landing: "Landing page copy",
      date: "11th Nov, 2023",
    },
    {
      id: 1,
      buisness_name: "Chickfest",
      Landing: "Landing page copy",
      date: "11th Nov, 2023",
    },
    {
      id: 1,
      buisness_name: "Chickfest",
      Landing: "Landing page copy",
      date: "11th Nov, 2023",
    },
    {
      id: 1,
      buisness_name: "Chickfest",
      Landing: "Landing page copy",
      date: "11th Nov, 2023",
    },
    {
      id: 1,
      buisness_name: "Chickfest",
      Landing: "Landing page copy",
      date: "11th Nov, 2023",
    },
    {
      id: 1,
      buisness_name: "Chickfest",
      Landing: "Landing page copy",
      date: "11th Nov, 2023",
    },
  ];

  return (
    <div>
      <Container>
        <HomeSideBar />
        <MobileSideBar show={show} SetShow={SetShow} />
        <MobileMenuIcon onClick={() => SetShow(true)}>
          <TiThMenu />
        </MobileMenuIcon>
        <Wrapper>
          <TopSection>
            <Title>Search history</Title>
            <Ul>
              {data.map((item) => {
                return (
                  <Li>
                    <BoxTop>
                      <Content>{item.buisness_name}</Content>
                      <LandiConatiner>
                        <LandingIcon>
                          <Icon
                            src={require("../../../assets/image/Arrow - blue2.png")}
                          />
                        </LandingIcon>

                        <LandingCopy>{item.Landing}</LandingCopy>
                      </LandiConatiner>
                    </BoxTop>
                    <BoxBottom>
                      <DateContainer>
                        <DateIconConatiner>
                          <Image
                            src={require("../../../assets/image/Time.png")}
                          />
                        </DateIconConatiner>
                        <Date>{item.date}</Date>
                      </DateContainer>
                      <DownloadConatiner>
                        <DownloadIconConatiner>
                          <Image
                            src={require("../../../assets/image/download.png")}
                          />
                        </DownloadIconConatiner>
                        <Download>Download</Download>
                      </DownloadConatiner>
                    </BoxBottom>
                  </Li>
                );
              })}
            </Ul>
          </TopSection>
        </Wrapper>
      </Container>
    </div>
  );
}
const Container = styled.div`
  color: #fff;
  color: rgba(255, 255, 255, 1);
  width: 100%;
  height: 100vh;
  display: flex;
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
  padding: 30px;
  width: 10;
  width: 100%;
  height: 100%;
`;
const TopSection = styled.div``;
const Title = styled.h3`
  margin-bottom: 20px;
`;
const Ul = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  width: 100%;
  grid-gap: 20px;
`;
const Li = styled.li`
  background: #171d23;

  border-radius: 6px;

  padding: 15px;
  display: flex;
  flex-direction: column;
  height: 150px;
  justify-content: space-between;
`;
const BoxTop = styled.div``;
const Content = styled.h4`
  margin-bottom: 10px;
`;
const LandiConatiner = styled.div`
  display: flex;
  align-items: baseline;
`;
const LandingIcon = styled.div`
  width: 10px;
  margin-right: 5px;
`;
const Icon = styled.img`
  display: block;
  width: 100%;
`;
const LandingCopy = styled.p``;
const BoxBottom = styled.div`
  display: flex;
  justify-content: space-between;
`;
const DateContainer = styled.div`
  display: flex;
`;
const DateIconConatiner = styled.div`
  width: 16px;
  margin-right: 5px;
`;
const Image = styled.img`
  display: block;
  width: 100%;
`;
const Date = styled.p``;
const DownloadConatiner = styled.div`
  display: flex;
`;
const DownloadIconConatiner = styled.div`
  width: 20px;
  margin-right: 5px;
`;
const Download = styled.p``;
