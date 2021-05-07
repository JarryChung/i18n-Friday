import styled from '@emotion/styled';

export const TextButton = styled.button<{
  color: string;
}>`
  outline: 0;
  border: 0;
  background-color: inherit;
  cursor: pointer;
  margin: 0 0.2rem;
  color: ${(props) => props.color};
`;
