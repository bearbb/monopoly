import { useState, useEffect } from "react";

import "src/components/Die.css";
interface DieProps {
  face: string;
  isRolling: boolean;
}
export const Die = (props: DieProps) => {
  return (
    <div className="Die">
      <i
        className={`fas fa-dice-${props.face} ${props.isRolling && "shaking"}`}
      />
    </div>
  );
};
