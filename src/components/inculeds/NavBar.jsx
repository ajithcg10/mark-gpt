import React from "react";
import { styled } from "styled-components";
import { nav } from "../helpers/NavMenu";

export default function NavBar() {
  return (
    <Conatiner>
      <Box>
        {nav.map((i) => {
          return (
            // <Item>
            //   <NumberConatiner>
            <NavSection className={i.id == 5 ? "active" : ""}>
              <NavConatiner>
                <NavId>{i.id}</NavId>
                <NavMenu>{i.menu_name}</NavMenu>
              </NavConatiner>

              <NavLIne
                id={i.id == 5 ? "active_line" : ""}
                className="line"
              ></NavLIne>
            </NavSection>
            //   </NumberConatiner>
            // </Item>
          );
        })}
      </Box>
    </Conatiner>
  );
}
const Conatiner = styled.div`
  width: 100%;
  padding-top: 50px;
  @media (max-width: 768px) {
    display: none;
  }
`;
const Box = styled.div`
  display: flex;

  width: fit-content;

  margin: 0 auto;
  @media (max-width: 980px) {
    width: 80%;
    margin: 0 auto;
    justify-content: center;
  }
`;
// const Item = styled.div`
//   width: 70%;
// `;
// const NumberConatiner = styled.div``;
const NavSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  position: relative;
  &.active {
    flex: none;
  }
  &:last-child {
    width: fit-content;
  }
`;
const NavConatiner = styled.div`
  display: flex;
  // width:100%
  // hegiht :100%
  position: relative;
`;
const NavId = styled.div`
  padding: 4px 12px;
  color: #8e98a3;
  border: 1px solid #1e91e3;
  background: #1a2630;
  border-radius: 52%;
  font-size: 14px;
`;
const NavLIne = styled.div`
  border-bottom: 1px solid rgba(142, 152, 163, 1);

  width: 100%;
  &#active_line {
    visibility: hidden;
  }
`;
const NavMenu = styled.p`
  position: absolute;
  top: 115%;
  font-size: 14px;
  left: 50%;
  color: rgba(30, 145, 227, 1);
  transform: translateX(-50%);
  width: 200px;
  right: 0;
  @media (max-width: 980px) {
    font-size: 13px;
  }
`;
