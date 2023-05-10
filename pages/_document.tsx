import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return <>
        <Html lang="ja">
            <Head>
                <meta name="viewport" content="initial-scale=1" />
                <link rel="icon" href="/yossoi.svg" />
            </Head>
            <body>
                <header>
                    <h1>Reactions</h1>
                </header>
                <Main />
                <NextScript />
            </body>
        </Html>
    </>
}
