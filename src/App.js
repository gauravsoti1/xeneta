import { List, ListItem, Paper } from "@material-ui/core";
import React from "react";
import TradePrice from "screens/TradePrice/TradePrice";
import styled from "styled-components";
import { ReactComponent as XenetaSvg } from "assets/images/xeneta.svg";

function App() {
  return (
    <Container>
      <Sidebar>
        <LogoContainer>
          <XenetaLogo />
          <List>
            <ListItem>Trade Prices</ListItem>
          </List>
        </LogoContainer>
      </Sidebar>
      <RightContent>
        <TradePrice />
      </RightContent>
    </Container>
  );
}

const Container = styled.div`
  background: #eee;
`;

const Sidebar = styled(Paper)`
  width: 17.5%;
  height: 100vh;
  position: fixed;
  // background-image: linear-gradient(90deg, #a1c4fd 0%, #c2e9fb 100%);
`;

const LogoContainer = styled.div`
  padding: 1rem;
  text-align: center;
`;
const XenetaLogo = styled(XenetaSvg)`
  width: 45%;
`;

const RightContent = styled.div`
  margin-left: 18%;
`;

export default App;
