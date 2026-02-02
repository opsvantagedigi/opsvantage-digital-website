import type { AppProps } from 'next/app';
import { Layout } from '@/components/Layout';
import '../globals.css'; // Assuming this is your global stylesheet for Tailwind

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;