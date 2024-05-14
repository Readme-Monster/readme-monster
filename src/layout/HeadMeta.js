import React from "react";
import { Helmet } from "react-helmet";

const HeadMeta = () => {
  return (
    <div>
      <Helmet>
        <link rel="icon" href="/img/logo.png" type="image/x-icon" sizes="any" />
        <title>readme-monster</title>
        <meta
          name="description"
          content="README 생성, 쉽고 빠르게"
        />
        <meta name="keywords" content="리드미몬스터,ai,gpt,readme,markdown,builder" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Readme Monster" />
        <meta property="og:description" content= "리드미 자동 생성, 쉽고 빠르게"/>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://readme-monster.netlify.app/"/>
        <meta property="og:image" content="/images/metaThum.png" />
        <meta property="og:article:author" content="리드미몬스터" />
      </Helmet>
    </div>
  );
};

export default HeadMeta;