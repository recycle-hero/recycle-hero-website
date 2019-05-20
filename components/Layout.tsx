import Link from "next/link";
import Head from "next/head";
import "antd/dist/antd.css";

import { Icon, Layout as AntLayout, Menu, Typography } from "antd";
const { Header, Content, Footer } = AntLayout;

import styled from "@emotion/styled";

const MenuItemWithPadding = styled(Menu.Item)`
  padding-left: 20px;
  padding-right: 20px;
`;

const WhiteText = styled.span`
  color: white;
`;

export const Layout = ({ children, title, currentPage }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[currentPage]}
        style={{ lineHeight: "64px" }}
      >
        <MenuItemWithPadding key="logo">
          <Icon type="delete" /> <WhiteText>Recycling Hero</WhiteText>
        </MenuItemWithPadding>
        <MenuItemWithPadding key="home">
          <Link href="/">
            <div>
              <Icon type="home" />
              Home
            </div>
          </Link>
        </MenuItemWithPadding>
        <MenuItemWithPadding key="about">
          <Link href="/about">
            <div>
              <Icon type="team" />
              About
            </div>
          </Link>
        </MenuItemWithPadding>
        <MenuItemWithPadding key="classify">
          <Link href="/classify-images">
            <div>
              <Icon type="help" />
              Help Train
            </div>
          </Link>
        </MenuItemWithPadding>
        <MenuItemWithPadding key="contact">
          <Link href="/contact">
            <div>
              <Icon type="mail" />
              Contact
            </div>
          </Link>
        </MenuItemWithPadding>
      </Menu>
    </Header>

    <Content style={{ padding: "50px" }}>{children}</Content>

    <Footer>Recycle Hero - Made with love in Sydney</Footer>
  </div>
);
