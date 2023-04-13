import React from "react";
import { Container } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from 'next/head';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>SaaS NTUA NextJS Demo</title>
      </Head>
      <Header />
      <Container sx={{ pt: 8, pb: 8 }}>{children}</Container>
      <Footer />
    </>
  );
};

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}