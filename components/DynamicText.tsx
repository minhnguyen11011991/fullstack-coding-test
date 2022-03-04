import { Heading } from "@chakra-ui/react";
import React, { forwardRef, useImperativeHandle, useState } from "react";

const DynamicText = forwardRef((props, ref) => {
  const [value, setValue] = useState("Random Text");

  const changeValue = (newValue) => {
    setValue(newValue);
  };

  useImperativeHandle(ref, () => ({
    changeValue,
  }));

  return <Heading as='h1' size='xl' maxWidth='xl' >{value}</Heading>;
});

export default DynamicText;
