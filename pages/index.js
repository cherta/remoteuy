import React from "react";
import NextLink from "next/link";
import dynamic from "next/dynamic";
import styled from "styled-components";
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
  box-shadow: 0px 1px 4px 0px rgba(194, 84, 19, 0.3);
  position: fixed;
  width: 100%;
  top: 0;
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: row;
  padding: 0 0.5rem;
  height: 2rem;
  background: #fff;
  font-family: "Montserrat", sans-serif;
  font-size: 0.8rem;
  color: #232b2f;
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
  margin-bottom: 3rem;
  text-align: center;
  * {
    text-align: left;
  }
`;

const Paragraph = styled.p`
  font-family: "Montserrat", sans-serif;
  line-height: normal;
  font-size: 1rem;
  color: #232b2f;
  margin-bottom: 1.5rem;
  padding: 0 1rem;
  b {
    font-weight: bold;
  }
`;

export default () => {
  return (
    <Layout>
      <Header>
        <Title>
          🌎<span>.uy</span>
        </Title>
        {/* <NextLink href="/resources">
          <Link>Para leer 📘</Link>
        </NextLink> */}
      </Header>
      <Content>
        <Paragraph>
          <b>remote.uy</b> es un listado de empresas uruguayas que promueven el trabajo remoto o distribuído. Si querés agregar una empresa podés ayudarnos{" "}
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
      <Footer>
        Sitio creado para la promoción del trabajo remoto en Uruguay con el objetivo de 
      </Footer>
      <ReactTooltip clickable delayHide={500} place="right" />
      {/* <Button>
        <Link>
          <a href="">➕</a>
        </Link>
      </Button> */}
    </Layout>
  );
};
