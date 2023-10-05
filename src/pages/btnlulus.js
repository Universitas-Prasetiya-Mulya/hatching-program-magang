import React, { useState } from "react";
import { Button } from "@nextui-org/react";
export default function BtnLulus({btnColor= 'primary', setBtnColor=()=>{}}) {
  const [buttonColor, setButtonColor] = useState("primary");

  const handleButtonClick = () => {
    setButtonColor("success");
  };

  return (
    <Button className="z-0" color={btnColor} onClick={setBtnColor} size="sm">
     Lulus
    </Button>
  );
}
