import { wrapper } from '@/store';
import '@/styles/globals.css'
import '@/styles/main.scss'
import '@/styles/theme.css'
import type { AppProps } from 'next/app'
import { SnackbarProvider } from 'notistack';
import { useEffect } from 'react';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
  const {store} = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <SnackbarProvider>
    <Component {...pageProps} />
    </SnackbarProvider>
    </Provider>
  )
}
