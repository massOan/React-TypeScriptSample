import React from 'react'
import logo from './logo.svg'
// import './App.css'
import styled from '@emotion/styled'
import { StateComponent1 } from './exam/StateComponent1';


const Container = styled.div`
  text-align: center;
`;

const Header = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const Applogo = styled.img`
  height: 40vmin;
  pointer-events: none;
`;

// interface PropsExample {
//   name: String,
//   color?: String
// }

// export const PropsExampleimpl = ({ name, color = "Blue" }: PropsExample) => {
//   return PropsExampleimpl
// }

function App() {
  const message = 'HELLO' // 더블쿼트 + 세미콜론 제거

  return (
    <Container>
      <header className='App-header'>
        <StateComponent1></StateComponent1>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>

    </Container>
  )

}

export default App
