import { Html, Head, Main, NextScript } from 'next/document'
import Link from 'next/link'

export default function Document() {
    return <>
        <Html lang="ja">
            <Head>
                <meta name="viewport" content="initial-scale=1" />
                <link rel="icon" href="/yossoi.svg" />
            </Head>
            <body>
                <header>
                    <h1><Link href="/">Reactions</Link></h1>
                </header>
                <Main />
                <footer><a href="https://github.com/file-get-contents/vercel">https://github.com/file-get-contents/vercel</a></footer>
                <NextScript />
            </body>
        </Html>
    </>
}
