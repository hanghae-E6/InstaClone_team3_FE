import { MdOutlineCancel } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoIosRefresh } from "react-icons/io";

export const SIGNUP_VALIDATION = Object.freeze({
  EMAIL: {
    REGEX: /^[a-z0-9]{4,16}@.[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/,
  },
  NICKNAME: {
    REGEX: /^[a-z0-9-\s]{4,16}$/,
  },
  PASSWORD: {
    REGEX: /^[A-Za-z0-9!@#$%]{8,20}$/,
  },
  MESSAGE: {
    SUCCESS: (
      <IoIosCheckmarkCircleOutline style={{ color: "#a9abae" }} size={25} />
    ),
    WARNING: <MdOutlineCancel style={{ color: "#ee2e3e" }} size={25} />,
    DEFAULT: (
      <IoIosRefresh
        style={{ color: "#4492d8", transform: "rotate(90deg)" }}
        size={25}
      />
    ),
  },
});
