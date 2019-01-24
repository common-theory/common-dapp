import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px;
  padding: 4px;
  cursor: pointer;
  border-radius: 2px;
  border: 1px solid #000;
  -moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;-o-user-select:none;
`;

export default class Button extends React.Component<{
  onClick: () => void
}> {
  state = {
    mouseOn: false,
    mouseDown: false
  };
  onMouseEnter = () => this.setState({ mouseOn: true });
  onMouseLeave = () => this.setState({ mouseDown: false, mouseOn: false });
  onMouseDown = () => this.setState({ mouseDown: true });
  onMouseUp = () => this.setState({ mouseDown: false });

  render() {
    let backgroundColor = '#fff';
    if (this.state.mouseDown) {
      backgroundColor = '#107F28';
    } else if (this.state.mouseOn) {
      backgroundColor = '#18B23A';
    }
    return (
      <Container
        onClick={this.props.onClick}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        style={{
          backgroundColor
        }}
      >
        {this.props.children}
      </Container>
    );
  }
}
