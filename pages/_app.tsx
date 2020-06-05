import App, { AppInitialProps } from 'next/app';
import Head from 'next/head';
import { setCookie, parseCookies } from 'nookies';
import { v4 as uuidv4 } from 'uuid';
import * as Sentry from '@sentry/browser';

import AppLogo from '../lib/pages/components/_app/AppLogo';

Sentry.init({
  dsn: process.env.sentryDsn,
});

class CustomApp extends App {
  static async getInitialProps({ Component, ctx }): Promise<AppInitialProps> {
    const isServer = Boolean(ctx.req);
    if (isServer) {
      const requestCookies = parseCookies(ctx);
      if (!requestCookies.sessionId) {
        setCookie(ctx, 'sessionId', uuidv4(), {
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: true,
        });
      }
    }

    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  componentDidCatch(error, errorInfo): void {
    Sentry.withScope((scope) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key]);
      });

      Sentry.captureException(error);
    });

    super.componentDidCatch(error, errorInfo);
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>Le Jeu du post-it</title>
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
          <meta name="theme-color" content="#ffffff" />
          <meta
            name="description"
            content='Jouez avec vos amis au celèbre "jeu du post-it sur la tête", dans la même pièce ou aux quatre coins du monde.'
          />
          <meta property="og:image" content="/meta-og-image.png" />
        </Head>
        <div className="container">
          <header>
            <nav>
              <AppLogo />
            </nav>
          </header>
          <main>
            <div>
              <Component {...pageProps} />
            </div>
          </main>

          <style jsx>{`
            .container {
              min-height: 75vh;
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
            }

            @media screen and (min-width: 360px) {
              .container {
                min-height: 85vh;
              }
            }

            main {
              width: 280px;
              margin: 0 20px;
              flex-grow: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
            }
          `}</style>
          <style jsx global>{`
            * {
              box-sizing: border-box;
            }

            body {
              margin: 0;
              padding: 0;
              background-color: lightyellow;
              font-size: 20px;
              font-family: -apple-system, 'Segoe UI', 'Roboto', 'Oxygen',
                'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Inter',
                'Helvetica Neue', sans-serif;
            }

            ul {
              padding-inline-start: 0;
            }

            form {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: baseline;
            }

            form *:not(:last-child) {
              margin-bottom: 14px;
            }

            .input-field {
              width: 280px;
              height: 42px;
              border: 3px solid black;
              border-radius: 0;
              padding: 8px;
              font-size: 18px;
              font-weight: bold;
            }
          `}</style>
        </div>
      </>
    );
  }
}

export default CustomApp;
