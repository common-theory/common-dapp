import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 16px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FooterLink = styled.a`
  margin: 8px;
`;

export default class Footer extends React.Component {
  render() {
    return (
      <Container>
        <FooterLink href="https://github.com/common-theory" target="_blank">
          <img title="common-theory source code" src="./github-logo-white.png" width="40px" height="40px" />
        </FooterLink>
        <FooterLink href="https://discord.gg/4FFVg8a" target="_blank">
          <img title="discord" src="./discord-logo-white.png" width="40px" height="40px" />
        </FooterLink>
      </Container>
    );
  }
}
