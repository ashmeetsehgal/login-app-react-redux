import styled from 'styled-components';

const Planet = styled.div`
background: radial-gradient(pink, blue);
width: ${props => props.diameter}px;
height: ${props => props.diameter}px;
border-radius: 100px;
`;
export default Planet;
