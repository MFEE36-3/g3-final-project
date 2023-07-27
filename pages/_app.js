import '@/styles/globals.css';
import Layout from '@/components/layout/layout';
import { AuthContextProvider } from '@/context/AuthContext';

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <ResContextProvider>
    <AuthContextProvider>
      {getLayout(<Component {...pageProps} />)}
    </AuthContextProvider>
    </ResContextProvider>
  );
}
