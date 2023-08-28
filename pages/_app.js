import { store } from '@/app/store';
import '@/styles/globals.css'
import Head from 'next/head';
import { Provider } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
export default function App({ Component, pageProps }) {
  return <>
  <Head>
      <link href="/icon.png" rel="icon" type="image/gif" />
      <title>Tocos management website</title>
  </Head>
    <Provider store={store}>
      <ToastContainer />
    <Component {...pageProps} />
    </Provider>
    </>
}
