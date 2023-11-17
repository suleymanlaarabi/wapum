import { Button } from "@chakra-ui/react";
import init, { greet } from "wapum-rust";
// Don't worry if vscode told you can't find my-crate
// It's because you're using a local crate
// after yarn dev, wasm-pack plugin will install my-crate for you

const Test = () => {
  const handleClick = () => {
    init().then(() => {
      greet("jej");
    });
  };

  return (
    <div>
      <Button onClick={handleClick}></Button>
    </div>
  );
};

export default Test;
