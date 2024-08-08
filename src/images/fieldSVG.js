import { useState, useContext } from "react";
import styled from "styled-components";
import { GlobalContext } from "../GlobalContext";

const Path = styled.path`
  transition: transform 0.5s ease, fill 0.5s ease;
  transform-origin: center;
  transform-box: fill-box;
  fill: var(--gray);

  cursor: pointer;

  &:hover {
    transform: scale(2);
    transform-origin: center;
    transform-box: fill-box;
  }
  &.clicked {
    transform: scale(2.5);
    transform-origin: center;
    transform-box: fill-box;
    fill: var(--red);
  }
`;

const FieldSVG = ({ className }) => {
  const { svgController, setSVgController } = useContext(GlobalContext);
  const { selectedPlayer, setSelectedPlayer } = useContext(GlobalContext);
  const { isShowing, setIsShowing } = useContext(GlobalContext);
  const { editMode, setEditMode } = useContext(GlobalContext);
  const { editPlayerMode, setEditPlayerMode } = useContext(GlobalContext);

  const handleClick = (pos) => {
    if (editPlayerMode) {
      if (selectedPlayer == pos) {
        setIsShowing(true);
        setTimeout(() => {
          setSelectedPlayer("");
          setEditPlayerMode(false);
        }, 600);
      } else {
        setSelectedPlayer(pos);
      }
    } else {
      setIsShowing(true);
      setSelectedPlayer(pos);

      setTimeout(() => {
        setEditMode(false);
        setEditPlayerMode(true);
        setIsShowing(false);
      }, 600);
    }
  };
  return (
    <svg
      className={className}
      width="700"
      height="700"
      viewBox="0 0 609 551"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M586.938 232.527L305.031 515.073L22 231.402C55.6338 106.727 169.288 15 304.318 15C439.755 15 553.686 107.279 586.938 232.527Z"
        fill="white"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M336.936 483.003L454.783 365.099C437.131 298.142 376.187 248.772 303.718 248.772C231.583 248.772 170.868 297.687 152.9 364.172L271.756 483.087C268.893 488.351 267.266 494.386 267.266 500.801C267.266 521.302 283.878 537.922 304.369 537.922C324.86 537.922 341.471 521.302 341.471 500.801C341.471 494.352 339.827 488.288 336.936 483.003Z"
        fill="#207EFD"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M314.88 324.642C311.221 326.161 307.208 327 303 327C298.703 327 294.611 326.126 290.89 324.546L226.25 389.217C228.017 393.115 229 397.443 229 402C229 405.514 228.415 408.892 227.338 412.041L291.079 475.813C295.012 474.007 299.388 473 304 473C308.228 473 312.259 473.846 315.931 475.379L379.37 411.909C377.843 408.242 377 404.22 377 400C377 396.072 377.73 392.315 379.063 388.857L314.88 324.642Z"
        fill="white"
      />
      <ellipse
        cx="303.913"
        cy="407.674"
        rx="15.622"
        ry="15.6297"
        fill="#207EFD"
      />
      <rect
        width="11.7194"
        height="11.7194"
        transform="matrix(0.706932 -0.707281 0.706932 0.707281 295 302.289)"
        fill="white"
      />
      <rect
        width="11.7194"
        height="11.7194"
        transform="matrix(0.706932 -0.707281 0.706932 0.707281 391.136 400.333)"
        fill="white"
      />
      <rect
        width="11.7194"
        height="11.7194"
        transform="matrix(0.706932 -0.707281 0.706932 0.707281 198.464 400.333)"
        fill="white"
      />
      <rect x="295" y="406" width="18.2257" height="3.90743" fill="white" />

      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M312 488H295V496.533L303.5 504L312 496.533V488Z"
        fill="white"
      />
      <Path
        d="M451.5 194L453.633 200.564H460.535L454.951 204.621L457.084 211.186L451.5 207.129L445.916 211.186L448.049 204.621L442.465 200.564H449.367L451.5 194Z"
        fill="#FD002E"
        className={selectedPlayer == "Right" ? "clicked" : ""}
        onClick={() => handleClick("Right")}
      />
      <Path
        d="M199.5 365L201.633 371.564H208.535L202.951 375.621L205.084 382.186L199.5 378.129L193.916 382.186L196.049 375.621L190.465 371.564H197.367L199.5 365Z"
        fill="#FD002E"
        className={selectedPlayer == "Third" ? "clicked" : ""}
        onClick={() => handleClick("Third")}
      />
      <Path
        d="M405.5 365L407.633 371.564H414.535L408.951 375.621L411.084 382.186L405.5 378.129L399.916 382.186L402.049 375.621L396.465 371.564H403.367L405.5 365Z"
        fill="#FD002E"
        className={selectedPlayer == "First" ? "clicked" : ""}
        onClick={() => handleClick("First")}
      />
      <Path
        d="M303.5 384L305.633 390.564H312.535L306.951 394.621L309.084 401.186L303.5 397.129L297.916 401.186L300.049 394.621L294.465 390.564H301.367L303.5 384Z"
        fill="#FD002E"
        className={selectedPlayer == "Pitcher" ? "clicked" : ""}
        onClick={() => handleClick("Pitcher")}
      />
      <Path
        d="M302.5 129L304.633 135.564H311.535L305.951 139.621L308.084 146.186L302.5 142.129L296.916 146.186L299.049 139.621L293.465 135.564H300.367L302.5 129Z"
        fill="#FD002E"
        className={selectedPlayer == "Center" ? "clicked" : ""}
        onClick={() => handleClick("Center")}
      />
      <Path
        d="M156.5 194L158.633 200.564H165.535L159.951 204.621L162.084 211.186L156.5 207.129L150.916 211.186L153.049 204.621L147.465 200.564H154.367L156.5 194Z"
        fill="#FD002E"
        className={selectedPlayer == "Left" ? "clicked" : ""}
        onClick={() => handleClick("Left")}
      />
      <Path
        d="M250.5 293L252.633 299.564H259.535L253.951 303.621L256.084 310.186L250.5 306.129L244.916 310.186L247.049 303.621L241.465 299.564H248.367L250.5 293Z"
        fill="#FD002E"
        className={selectedPlayer == "Shortstop" ? "clicked" : ""}
        onClick={() => handleClick("Shortstop")}
      />
      <Path
        d="M303.5 500L305.633 506.564H312.535L306.951 510.621L309.084 517.186L303.5 513.129L297.916 517.186L300.049 510.621L294.465 506.564H301.367L303.5 500Z"
        fill="#FD002E"
        className={selectedPlayer == "Catcher" ? "clicked" : ""}
        onClick={() => handleClick("Catcher")}
      />
      <Path
        d="M356.5 294L358.633 300.564H365.535L359.951 304.621L362.084 311.186L356.5 307.129L350.916 311.186L353.049 304.621L347.465 300.564H354.367L356.5 294Z"
        fill="#FD002E"
        className={selectedPlayer == "Second" ? "clicked" : ""}
        onClick={() => handleClick("Second")}
      />
    </svg>
  );
};

export default FieldSVG;
