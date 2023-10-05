import Image from "next/image";
import close from "/public/close.svg";

function CloseProfil(props) {
  return props.trigger ? (
    <div className="flex place-content-end">
      <button onClick={() => props.setTrigger(false)}>
        <Image src={close} alt="close" />
      </button>
      {props.children}
    </div>
  ) : (
    ""
  );
}

export default CloseProfil;
