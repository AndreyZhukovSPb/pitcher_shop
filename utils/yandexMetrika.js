import { useEffect } from "react";
import Head from "next/head";

const YandexMetrika = () => {
  useEffect(() => {
    (function(m, e, t, r, i, k, a) {
      m[i] = m[i] || function() {
        (m[i].a = m[i].a || []).push(arguments)
      };
      m[i].l = 1 * new Date();
      k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    ym(97791386, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
    });
  }, []);

  return (
    <Head>
      <noscript>
        <div>
          <img src={`https://mc.yandex.ru/watch/97791386`} style={{ position: 'absolute', left: '-9999px' }} alt="" />
        </div>
      </noscript>
    </Head>
  );
};

export default YandexMetrika;
