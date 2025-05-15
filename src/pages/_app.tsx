import '@/styles/global.css'; // Import file CSS
import type { AppProps } from 'next/app';
import AuthProvider from '@/context/Auth';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
