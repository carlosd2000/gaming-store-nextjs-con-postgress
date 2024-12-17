import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://kit.fontawesome.com" />
          <script src="https://kit.fontawesome.com/78ddf66f88.js" crossOrigin="anonymous"></script>
          {/* Añadir el script del bot */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w, d) {
                w.CollectId = "6710692f48b2ba247e87f168";
                var h = d.head || d.getElementsByTagName("head")[0];
                var s = d.createElement("script");
                s.setAttribute("type", "text/javascript");
                s.async = true;
                s.setAttribute("src", "https://collectcdn.com/launcher.js");
                h.appendChild(s);
              })(window, document);`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
