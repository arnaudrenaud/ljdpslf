import Head from 'next/head';
import { setCookie, parseCookies } from 'nookies';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import AppLogo from '../lib/pages/components/_app/AppLogo';

const App = ({ Component, pageProps }): JSX.Element => {
  return (
    <>
      <Head>
        <title>Le Jeu du post-it</title>
        <link rel="icon" href="/favicon.ico" />
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
            font-family: -apple-system, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
              'Cantarell', 'Fira Sans', 'Droid Sans', 'Inter', 'Helvetica Neue',
              sans-serif;
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
};

App.getInitialProps = ({ ctx }): object => {
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

  return {};
};

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};

export default App;
