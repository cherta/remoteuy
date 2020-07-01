import React from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import styled from "styled-components";
import companies from "../data/companies";
import { Company } from "../components/Company";

const ReactTooltip = dynamic(() => import("react-tooltip"), { ssr: false });

const Layout = styled.div``;

const Title = styled.h1`
  font-family: "Open Sans", sans-serif;
  font-weight: 700;
  font-size: 2.5rem;
  color: #232b2f;
  margin-bottom: 2rem;
`;

const Content = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 1024px;
  margin: 12rem auto 0 auto;
  @media (max-width: 1200px) {
    padding: 0 0.5rem;
    margin: 4rem auto 0 auto;
  }
`;

const Paragraph = styled.p`
  font-family: "Open Sans", sans-serif;
  font-size: ${({ small }) => `${small ? `0.7rem` : `1.2rem`}`};
  color: #232b2f;
  line-height: 1.2;

  b {
    font-weight: 700;
  }

  a {
    padding: 0 0.2rem;
    color: #232b2f;
    text-decoration: underline;
  }

  a:hover {
    color: #dcd4d0;
    background: #232b2f;
  }
`;

const Footer = styled.div`
  margin-top: 4rem;
  margin-bottom: 0.5rem;
  text-align: center;
  ${Paragraph} {
    font-size: 0.7rem;
  }
`;

const List = styled.ul`
  font-family: "Open Sans", sans-serif;
  font-size: 1.2rem;
  color: #232b2f;
  line-height: 1.2;
  list-style-type: disc;
  margin-top: 1rem;
  li {
    margin-bottom: 0.5rem;
  }
  li a {
    color: #232b2f;
    text-decoration: underline;
  }

  li a:hover {
    color: #232b2f;
  }
`;

const MenuItem = styled(Link)``;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  max-width: 1200px;
  margin: 1rem auto 0 auto;
  @media (max-width: 1200px) {
    padding: 0 0.5rem;
    margin: 1rem auto 0 auto;
  }
  a {
    font-family: "Open Sans", sans-serif;
    font-size: 1rem;
    color: #232b2f;
    line-height: 1.2;
    padding: 0 0.2rem;
    text-decoration: underline;
  }
  a:hover {
    color: #dcd4d0;
    background: #232b2f;
  }
`;

export default () => {
  return (
    <Layout>
      <Head>
        <title>Empresas uruguayas que promueven el trabajo remoto</title>
        <meta
          property="og:title"
          content="Empresas uruguayas que promueven el trabajo remoto"
        />
        <meta
          property="og:description"
          content="Remote.uy es un listado de empresas uruguayas que promueven el trabajo remoto o distribuído. Si querés agregar una empresa podés ayudarnos mandando un PR a nuestro repositorio de GitHub"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://remote.uy" />
        <meta
          property="og:image"
          content="https://remote.uy/images/arseniy-kapran-hkjUkfqaVpU-unsplash.jpg"
        />
      </Head>
      <Header>
        <MenuItem href="/">
          <a>Inicio</a>
        </MenuItem>
      </Header>
      <Content>
        <Title>Recursos</Title>
        <Paragraph>
          Listado de recursos para gente que quiere mudarse a Uruguay.
        </Paragraph>
        <List>
          <li>
            <a
              href="https://www.uruguayxxi.gub.uy/es/quiero-invertir/guias-inversor/establecer-una-empresa/"
              target="_blank"
            >
              Querés abrir una empresa en Uruguay?
            </a>{" "}
            - Esto te permite facturar a empresas de Uruguay y el exterior
          </li>
          <li>
            <a
              href="https://www.investinuruguay.uy/es/servicios-herramientas/fast-track/"
              target="_blank"
            >
              Querés trabajar en Uruguay?
            </a>{" "}
            - Esto te permite trabajar en Uruguay como dependiente
          </li>
        </List>
        <br />
        <br />
        <Paragraph small>
          Gracias a{" "}
          <a href="https://twitter.com/isaantonaccio" target="_blank">
            Isabella Antonaccio
          </a>{" "}
          por facilitarnos estos datos.
        </Paragraph>
      </Content>
      <Footer>
        <Paragraph>
          <a href="https://github.com/cherta/remoteuy" target="_blank">
            GitHub
          </a>{" "}
          |
          <a
            href="https://github.com/cherta/remoteuy/graphs/contributors"
            target="_blank"
          >
            Autores: Gabriel Chertok &amp; una larga lista de personas
          </a>
          |
          <a href="http://owu.herokuapp.com/" target="_blank">
            Open Web Uruguay
          </a>
        </Paragraph>
      </Footer>
      <ReactTooltip clickable delayHide={500} place="left" />
    </Layout>
  );
};
