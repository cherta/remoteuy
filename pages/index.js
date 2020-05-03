import React from "react";
import NextLink from "next/link";
import Head from "next/head";
import dynamic from "next/dynamic";
import styled, { css } from "styled-components";
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

const IntroContainer = styled.div`
  margin-top: 3rem;
  margin-bottom: 3rem;
  align-self: center;
  @media (max-width: 1200px) {
    width: 100vw;
  }
`;

const IntroPicture = styled.img`
  width: 1200px;
  height: 600px;
  object-fit: cover;
  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const Paragraph = styled.p`
  font-family: "Open Sans", sans-serif;
  font-size: 1.2rem;
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

const Credit = styled(Paragraph)`
  font-size: 0.75rem;
  text-align: right;
  margin-top: 0.3rem;
`;

const CompaniesGrid = styled.div`
  display: grid;
  align-self: center;
  width: 1200px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  gap: 1px 1px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    width: 100vw;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: 100vw;
  }

  @media (min-width: 1200px) {
    ${Company}:nth-child(3n+1):nth-last-child(-n+3),
    ${Company}:nth-child(3n+1):nth-last-child(-n+3) ~ ${Company} {
      border-bottom: none;
    }
  }

  @media (max-width: 1200px) {
    ${Company}:nth-child(2n+1):nth-last-child(-n+2),
    ${Company}:nth-child(2n+1):nth-last-child(-n+2) ~ ${Company} {
      border-bottom: none;
    }
  }

  

  ${Company} {
    border-bottom: 1px solid grey;
    border-right: 1px solid grey;

    @media (min-width: 1200px) {
      &:nth-child(3n) {
        border-right: none;
      }
    }

    @media (max-width: 1200px) {
      &:nth-child(2n) {
        border-right: none;
      }
    }

    @media (max-width: 768px) {
      & {
        border-right: none;
      }
    }

    @media (max-width: 768px) {
      &:last-child {
        border-bottom: none;
      }
    }
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

export default () => {
  return (
    <Layout>
      <Head>
        <title>Empresas uruguayas que promueven el trabajo remoto</title>
        <meta
          property="og:title"
          content="Empresas uruguayas que promueven el trabajo remoto"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://remote.uy" />
        <meta
          property="og:image"
          content="https://remote.uy/images/arseniy-kapran-hkjUkfqaVpU-unsplash.jpg"
        />
      </Head>
      <Content>
        <Title>Remote Uruguay</Title>
        <Paragraph>
          Remote.uy es un listado de empresas uruguayas que promueven el trabajo
          remoto o distribuído. Si querés agregar una empresa podés ayudarnos{" "}
          <a href="https://github.com/cherta/remoteuy" target="_blank">
            mandando un PR a nuestro repositorio de GH
          </a>
          .
        </Paragraph>
        <IntroContainer>
          <IntroPicture src="/images/arseniy-kapran-hkjUkfqaVpU-unsplash.jpg"></IntroPicture>
          <Credit>
            Photo by{" "}
            <a
              href="https://unsplash.com/@whatam1?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              target="_blank"
            >
              Arseniy Kapran
            </a>{" "}
            on{" "}
            <a
              href="https://unsplash.com/s/photos/mate-computadora?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              target="_blank"
            >
              Unsplash
            </a>
          </Credit>
        </IntroContainer>

        <Title>Empresas</Title>
        <CompaniesGrid>
          {companies.map((company) => {
            return <Company key={company.name} {...company} />;
          })}
        </CompaniesGrid>
      </Content>
      <Footer>
        <Paragraph>
          <a href="https://github.com/cherta/remoteuy" target="_blank">
            GitHub
          </a>
        </Paragraph>
      </Footer>
      <ReactTooltip clickable delayHide={500} place="left" />
    </Layout>
  );
};
