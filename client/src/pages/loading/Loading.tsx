import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const text = keyframes`
    0% { color: #f2f2f2; }
    40% { color:#fff; }
    70%, 100% { color:#f2f2f2; }
`;

const Background = styled.div`
  background-color: #f2f2f2;
  height: 100vh;
`;

const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  user-select: none;
  cursor: default;
`;
const Txt = styled.span`
  font-size: 20rem;
  font-weight: 900;
  text-transform: uppercase;
  text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa,
    0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1),
    0 3px 5px rgba(0, 0, 0, 0.1), 0 5px 10px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.1),
    0 20px 20px rgba(0, 0, 0, 0.15);
  white-space: nowrap;
`;

const Span = styled.span`
  animation: ${text} cubic-bezier(0.75, 0, 0.5, 1) 1.2s infinite;
  color: #f2f2ef;

  &:nth-of-type(1) {
    animation-delay: 0ms;
  }
  &:nth-of-type(2) {
    animation-delay: 100ms;
  }
  &:nth-of-type(3) {
    animation-delay: 200ms;
  }
  &:nth-of-type(4) {
    animation-delay: 300ms;
  }
  &:nth-of-type(5) {
    animation-delay: 400ms;
  }
  &:nth-of-type(6) {
    animation-delay: 500ms;
  }
  &:nth-of-type(7) {
    animation-delay: 600ms;
  }
`;

const letters = ['L', 'O', 'A', 'D', 'I', 'N', 'G'];

export const LoadingPage = () => {
  return (
    <Background>
      <Loader>
        <Txt>
          {letters.map((letter) => (
            <Span key={letter}>{letter}</Span>
          ))}
        </Txt>
      </Loader>
    </Background>
  );
};
