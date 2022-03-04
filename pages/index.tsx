import Head from "next/head";
import { Input } from "@chakra-ui/react";

import styles from "../styles/Home.module.css";
import DynamicText from "components/DynamicText";
import { useRef } from "react";

const Home = () => {
  const dynamicTextRef = useRef<{ changeValue?: (value: string) => void }>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dynamicTextRef.current.changeValue(e.currentTarget.value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <DynamicText ref={dynamicTextRef} />
        <Input onChange={onChange} />
      </main>
    </div>
  );
};

export default Home;
