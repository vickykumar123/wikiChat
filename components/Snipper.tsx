import { SpinnerCircular } from "spinners-react";

export default function Snipper({ size = 50 }: { size: number }) {
  return (
    <div className="flex justify-center items-center">
      <SpinnerCircular size={size} color="#fffff" />
    </div>
  );
}
