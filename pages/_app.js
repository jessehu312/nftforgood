import '../styles/globals.css';
import { AuthProvider } from '@/lib/auth';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';

function MyApp({ Component, pageProps }) {
  if (process.browser) {
    const engine = new Styletron();
    return (
      <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </BaseProvider>
      </StyletronProvider>
    );
  }

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
