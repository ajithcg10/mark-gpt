import React from "react";
import { styled } from "styled-components";
import { nav } from "../helpers/NavMenu";

export default function NavBar() {
  return (
    <Conatiner>
      <Box>
        {nav.map((i) => {
          return (
            <Item>
              <NumberConatiner>
                <NavSection>
                  <NavConatiner>
                    <NavId>{i.id}</NavId>
                    <NavMenu>{i.menu_name}</NavMenu>
                  </NavConatiner>

                  <NavLIne className={i.id == 5 ? "active" : ""}></NavLIne>
                </NavSection>
              </NumberConatiner>
            </Item>
          );
        })}
      </Box>
    </Conatiner>
  );
}
const Conatiner = styled.div`
  width: 100%;
  padding-top: 50px;
`;
const Box = styled.div`
  display: flex;

  width: 60%;
  margin: 0 auto;
`;
const Item = styled.div`
  width: 70%;
`;
const NumberConatiner = styled.div``;
const NavSection = styled.div`
  display: flex;
  align-items: center;
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
  &.active {
    display: none;
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
`;
