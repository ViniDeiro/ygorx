import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="description" content="Site oficial de Igor Xavier (YgorX), jogador profissional de Free Fire, empreendedor e investidor brasileiro especializado em eSports, tecnologia e educação" />
        <meta name="keywords" content="Igor Xavier, YgorX, jogador de Free Fire, eSports, pro player, streamer, empreendedor brasileiro, tecnologia, investimentos, educação, gaming hub" />
        <meta name="author" content="Igor Xavier" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 