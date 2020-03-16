import React from "react";
import NextLink from "next/link";
import Head from "next/head";
import dynamic from "next/dynamic";
import styled from "styled-components";
import YouTube from "react-youtube-embed";
import companies from "../data/companies";
import { Company } from "../components/Company";

const ReactTooltip = dynamic(() => import("react-tooltip"), { ssr: false });

const Layout = styled.div``;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 0.5rem;
  justify-content: space-between;
  height: 4.5rem;
  background: #fff;
  box-shadow: 0px 1px 12px 0px rgba(35, 43, 47, 0.25);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1;
`;

const Title = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 2.5rem;
  color: #232b2f;
  span {
    font-weight: 400;
    font-size: 2rem;
  }
`;

const Link = styled.a`
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  color: white;
`;

const Content = styled.section`
  max-width: 720px;
  margin: 0 auto 0 auto;
  margin-top: 6.375rem;
  text-align: center;
  * {
    text-align: left;
  }
`;

const Paragraph = styled.p`
  font-family: "Montserrat", sans-serif;
  font-size: 1.2rem;
  color: #232b2f;
  margin-bottom: 1.5rem;
  padding: 0 1rem;
  line-height: 1.2;

  b {
    font-weight: 700;
  }
`;

const VideoContainer = styled.div`
  height: calc(100vh - 4.5rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default () => {
  return (
    <Layout>
      <Head>
        <title>
          Listado de empresas uruguayas que promueven el trabajo remoto o
          distribuído
        </title>
      </Head>
      <Header>
        <Title>
          🌎<span>.uy</span>
        </Title>
        {/* <NextLink href="/resources">
          <Link>Para leer 📘</Link>
        </NextLink> */}
      </Header>
      <Content>
        <VideoContainer>
          <Paragraph>
            A las 20:30 UYT del Lunes 16 de Marzo estaremos transmitiendo en
            vivo <b>CÓMO TRABAJAR REMOTO</b> con recomendaciones, herramientas y
            mucho más para aprender sobre el trabajo remoto.
          </Paragraph>
          <YouTube id="GlMixBRO54s" />
          <Paragraph
            css={`
              margin-bottom: 0;
              margin-top: 1.5rem;
            `}
          >
            Participantes: Luisa Martínez (VP of Market Entry en Kuelap, Inc),
            Ines Martinez (CEO en The Next Co.), Justin Graside (Growth Lead en
            Tavano Team), Gabriel Chertok (Engineering Manager en Ingenious)
          </Paragraph>
        </VideoContainer>
        <Paragraph>
          remote.uy es un listado de empresas uruguayas que promueven el trabajo
          remoto o distribuído.
        </Paragraph>
        <Paragraph>
          Si querés agregar una empresa podés ayudarnos{" "}
          <a href="https://github.com/cherta/remoteuy" target="_blank">
            mandando un PR a nuestro repositorio de GH
          </a>
          .
        </Paragraph>
        {companies.map((company, index) => {
          return (
            <Company
              key={company.name}
              color={index % 2 === 0 ? "light" : "dark"}
              {...company}
            />
          );
        })}
      </Content>
      <ReactTooltip clickable delayHide={500} place="right" />
      {/* <Button>
        <Link>
          <a href="">➕</a>
        </Link>
      </Button> */}
    </Layout>
  );
};
