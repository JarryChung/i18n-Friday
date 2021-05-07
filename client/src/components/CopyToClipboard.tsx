import styled from '@emotion/styled';
import copy from 'copy-to-clipboard';
import { Children, ReactHTMLElement, MouseEvent, cloneElement, useState } from 'react';
import { CopyTwoTone, CheckCircleTwoTone } from '@ant-design/icons'

interface IOptions {
  debug: boolean;
  message: string;
  format: string;
}
interface ICoreProps {
  text: string;
  children: ReactHTMLElement<HTMLElement>;
  onCopy?: (text: string, isCopied: boolean) => void;
  options?: Partial<IOptions>
}
interface ICopyToClipboardProps {
  text: string;
  children: ReactHTMLElement<HTMLElement> | string;
  options?: Partial<IOptions>
}

const Core = (props: ICoreProps) => {
  const onClick = (event: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
    const { text, children, onCopy, options } = props;
    const elem = Children.only(children);
    const isCopied = copy(text, options);

    onCopy && onCopy(text, isCopied);

    typeof elem?.props?.onClick === 'function' && elem.props.onClick(event);
  }

  const { text: _text, onCopy: _onCopy, options: _options, children, ...p } = props;
  const elem = Children.only(children);
  return cloneElement(elem, {...p, onClick});
}

export const CopyToClipboard = (props: ICopyToClipboardProps) => {
  const { text, children, options } = props;
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = (_: string, isCopied: boolean) => {
    setIsCopied(isCopied)
  }

  const onResetStatus = () => {
    setIsCopied(false)
  }

  return <Container onMouseEnter={onResetStatus}>
    {children}
    <CopyIcon text={text} onCopy={onCopy} options={options}>
      {isCopied 
        ? <CheckCircleTwoTone twoToneColor="#52c41a" /> as ReactHTMLElement<HTMLElement> 
        : <CopyTwoTone />  as ReactHTMLElement<HTMLElement>}
    </CopyIcon>
  </Container>
}

const Container = styled.span`
  display: inline-block;
  width: 100%;
  position: relative;
  &:hover span {
    visibility: visible;
  }
`;

const CopyIcon = styled(Core)`
  position: absolute;
  top: 50%;
  right: .4rem;
  transform: translate(0, -50%);
  visibility: hidden;
`;
