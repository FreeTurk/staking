import '../styles/globals.css'
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <MoralisProvider appId="dwHnoEU6cc12Vb3WixkQ1Bc9iP3gyuzL0xDgBnOg" serverUrl="https://ljutlahvjfvd.usemoralis.com:2053/server">
        <Component {...pageProps} />
      </MoralisProvider>
    </>
  )
}

export default MyApp
