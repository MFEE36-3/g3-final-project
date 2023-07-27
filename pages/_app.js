import '@/styles/globals.css';
import Layout from '@/components/layout/layout';
import ResAuthContext, { ResContextProvider } from '@/context/ResAuthContext';

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);


  return <ResContextProvider>
    {getLayout}<Component {...pageProps} />;
  </ResContextProvider>
}
