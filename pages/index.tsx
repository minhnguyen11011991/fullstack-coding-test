import { Input } from "@chakra-ui/react";
import { useRef } from "react";

import DynamicText from "components/DynamicText";

import Main from "components/Main/main";

const Home = () => {
  const dynamicTextRef = useRef<{ changeValue?: (value: string) => void }>();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dynamicTextRef.current?.changeValue(e.currentTarget.value);
  };

  return (
    <Main>
      <DynamicText ref={dynamicTextRef} />
      <Input onChange={onChange} />
    </Main>
  );
};

export default Home;
