import styled from "styled-components";

type ModalProps = {
  children?: React.ReactNode;
};
const Modal: React.FC<ModalProps> = ({ children }) => {
  return (<><ModalElement>{children}</ModalElement>;
 
</>)};

export default Modal;

const ModalElement = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
`;
