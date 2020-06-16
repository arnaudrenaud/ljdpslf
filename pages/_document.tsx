import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentInitialProps,
} from 'next/document';
import * as Sentry from '@sentry/browser';

process.on('unhandledRejection', (err) => {
  Sentry.captureException(err);
});

process.on('uncaughtException', (err) => {
  Sentry.captureException(err);
});

class MyDocument extends Document {
  static async getInitialProps(ctx): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html lang="fr">
        <Head />
        <body>
          <Main />
          <NextScript />
          {process.env.GOOGLE_ANALYTICS_TRACKING_ID && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.googleAnalyticsTrackingId}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                  
                    gtag('config', '${process.env.googleAnalyticsTrackingId}');
                  `,
                }}
              />
            </>
          )}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
