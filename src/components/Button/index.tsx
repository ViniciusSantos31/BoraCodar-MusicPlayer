import { memo } from "react";
import "./styles.css";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon: string;
}

const Button: React.FC<ButtonProps> = ({ icon, ...rest }) => {
  return (
    <button className="control-button" {...rest}>
      <img src={icon} alt="track-controller" className="icon-button" />
    </button>
  );
};

export default memo(Button, (prevProps, nextProps) => {
  return Object.is(prevProps, nextProps);
});
