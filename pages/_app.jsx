import '../styles/globals.css'
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <MoralisProvider appId="5kgRlGOtKZhluoI9DI4OMIxznPT72824BMw101bt" serverUrl="https://uy0dtkctddox.usemoralis.com:2053/server">
        <Component {...pageProps} />
      </MoralisProvider>
    </>
  )
}

export default MyApp
