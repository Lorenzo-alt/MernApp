import { createGlobalStyle } from 'styled-components'

export const GlobalStyled = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&family=Rubik:wght@400;500;700&display=swap');

html, body, #root, .app {
  height: 100%;
  width: 100%;
  font-family:"Rubik", sans-serif;
  margin: 0;
  padding: 0;
}

.logo:hover{
  cursor: pointer;
}
`
