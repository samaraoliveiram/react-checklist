import React, { useState } from "react";
import { useSpring, animated, interpolate } from "react-spring";
import { useGesture } from "react-use-gesture";
import { Icon } from "@blueprintjs/core";
import { theme } from "../components/Theme";

type Props = {
  onSwipeRight: () => any;
  onSwipeLeft: () => any;
  onClick: () => any;
  size: string;
};

const SwipeAble: React.FC<Props> = ({
  children,
  onClick,
  onSwipeRight,
  onSwipeLeft,
  size
}) => {
  const [isDragging, setDragging] = useState(false);
  const [{ x, bg }, set] = useSpring(() => ({ x: 0, bg: "#DFE4EA" }));
  const bind = useGesture({
    onDrag: ({ distance, last, down, delta }) => {
      setDragging(distance > 0);
      const bg = delta[0] < 0 ? "#f55757" : "#82d487";
      const x = down ? delta[0] : 0;
      set({ x, bg });
      if (delta[0] > 300 && last) {
        onSwipeRight();
      } else if (delta[0] < -300 && last) {
        onSwipeLeft();
      }
    }
  });
  const transform = interpolate([x], x => `translate3d(${x}px,0,0)`);
  const edit: number = size == "big" ? 55 : 35;
  const trash: number = size == "big" ? 50 : 30;
  const hg = size == "big" ? "100px" : "70px";

  return (
    //@ts-ignore
    <animated.div
      {...bind()}
      style={{
        backgroundColor: bg,
        display: "flex",
        position: "relative",
        height: hg,
        justifyContent: "space-between",
        alignItems: "center",
        padding: `0px ${theme.sizes.md}`,
        boxSizing: "border-box"
      }}
    >
      <div>
        <Icon icon="edit" iconSize={edit} style={{ color: "white" }} />
      </div>
      <animated.div
        onClick={() => !isDragging && onClick()}
        style={{
          transform,
          position: "absolute",
          height: "100%",
          width: "100%",
          left: "0"
        }}
      >
        {children}
      </animated.div>
      <div>
        <Icon icon="trash" iconSize={trash} style={{ color: "white" }} />
      </div>
    </animated.div>
  );
};

export { SwipeAble };
