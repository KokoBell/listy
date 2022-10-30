import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head >
                <link rel="manifest" href="/manifest.json" />
                <meta name="application-name" content="Listy" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="Listy" />
                <meta name="description" content="Track your grocery costs and have an easy grocery list, right on your phone." />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="msapplication-TileColor" content="#555BFF" />
                <meta name="msapplication-tap-highlight" content="yes" />
                <meta name="theme-color" content="#555BFF" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}