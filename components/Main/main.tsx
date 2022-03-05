import Head from "next/head";
import { useContext } from "react";

import styles from "../../styles/Home.module.css";

import { AuthContext } from "store/auth-context";
import Nav from "components/Nav/nav";

const Main = (props) => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isLoggedIn && <Nav />}
      <main className={styles.main + ' ' + props.additionalClass}>
        {props.children}
      </main>
    </div>
  );
};

export default Main;