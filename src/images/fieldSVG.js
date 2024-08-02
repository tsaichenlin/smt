import { useState, useContext } from "react";
import styled from "styled-components";
import { GlobalContext } from "../GlobalContext";

const Path = styled.path`
  transition: transform 0.6s ease, fill 0.6s ease;
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
      setTimeout(() => {
        setEditMode(false);
        setEditPlayerMode(true);
        setSelectedPlayer(pos);
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M586.938 232.527L305.031 515.073L22 231.402C55.6338 106.727 169.288 15 304.318 15C439.755 15 553.686 107.279 586.938 232.527Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M336.936 483.003L454.783 365.099C437.131 298.142 376.187 248.772 303.718 248.772C231.583 248.772 170.868 297.687 152.9 364.172L271.756 483.087C268.893 488.351 267.266 494.386 267.266 500.801C267.266 521.302 283.878 537.922 304.369 537.922C324.86 537.922 341.471 521.302 341.471 500.801C341.471 494.352 339.827 488.288 336.936 483.003Z"
        fill="#207EFD"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M303 327C307.208 327 311.221 326.161 314.88 324.642L379.063 388.857C377.73 392.315 377 396.072 377 400C377 404.22 377.843 408.242 379.37 411.909L303.288 488.028L227.338 412.041C228.415 408.892 229 405.514 229 402C229 397.443 228.017 393.115 226.25 389.217L290.89 324.546C294.611 326.126 298.703 327 303 327Z"
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
        d="M460.5 191L462.633 197.564H469.535L463.951 201.621L466.084 208.186L460.5 204.129L454.916 208.186L457.049 201.621L451.465 197.564H458.367L460.5 191Z"
        fill="#FD002E"
        className={selectedPlayer == "right" ? "clicked" : ""}
        onClick={() => handleClick("right")}
      />
      <Path
        d="M201.5 365L203.633 371.564H210.535L204.951 375.621L207.084 382.186L201.5 378.129L195.916 382.186L198.049 375.621L192.465 371.564H199.367L201.5 365Z"
        fill="#FD002E"
        className={selectedPlayer == "third" ? "clicked" : ""}
        onClick={() => handleClick("third")}
      />
      <Path
        d="M407.5 351L409.633 357.564H416.535L410.951 361.621L413.084 368.186L407.5 364.129L401.916 368.186L404.049 361.621L398.465 357.564H405.367L407.5 351Z"
        fill="#FD002E"
        className={selectedPlayer == "first" ? "clicked" : ""}
        onClick={() => handleClick("first")}
      />
      <Path
        d="M303.5 384L305.633 390.564H312.535L306.951 394.621L309.084 401.186L303.5 397.129L297.916 401.186L300.049 394.621L294.465 390.564H301.367L303.5 384Z"
        fill="#FD002E"
        className={selectedPlayer == "pitcher" ? "clicked" : ""}
        onClick={() => handleClick("pitcher")}
      />
      <Path
        d="M302.5 148L304.633 154.564H311.535L305.951 158.621L308.084 165.186L302.5 161.129L296.916 165.186L299.049 158.621L293.465 154.564H300.367L302.5 148Z"
        fill="#FD002E"
        className={selectedPlayer == "center" ? "clicked" : ""}
        onClick={() => handleClick("center")}
      />
      <Path
        d="M165.5 191L167.633 197.564H174.535L168.951 201.621L171.084 208.186L165.5 204.129L159.916 208.186L162.049 201.621L156.465 197.564H163.367L165.5 191Z"
        fill="#FD002E"
        className={selectedPlayer == "left" ? "clicked" : ""}
        onClick={() => handleClick("left")}
      />
      <Path
        d="M267.5 266L269.633 272.564H276.535L270.951 276.621L273.084 283.186L267.5 279.129L261.916 283.186L264.049 276.621L258.465 272.564H265.367L267.5 266Z"
        fill="#FD002E"
        className={selectedPlayer == "shortstop" ? "clicked" : ""}
        onClick={() => handleClick("shortstop")}
      />
      <Path
        d="M303.5 500L305.633 506.564H312.535L306.951 510.621L309.084 517.186L303.5 513.129L297.916 517.186L300.049 510.621L294.465 506.564H301.367L303.5 500Z"
        fill="#FD002E"
        className={selectedPlayer == "catcher" ? "clicked" : ""}
        onClick={() => handleClick("catcher")}
      />
      <Path
        d="M356.5 294L358.633 300.564H365.535L359.951 304.621L362.084 311.186L356.5 307.129L350.916 311.186L353.049 304.621L347.465 300.564H354.367L356.5 294Z"
        fill="#FD002E"
        className={selectedPlayer == "second" ? "clicked" : ""}
        onClick={() => handleClick("second")}
      />
    </svg>
  );
};

export default FieldSVG;
/*
 <Circle
        cx="204"
        cy="374"
        r="6"
        fill={third ? "var(--red)" : "var(--gray)"}
      />
      <Circle
        cx="304"
        cy="396"
        r="6"
        fill={pitcher ? "var(--red)" : "var(--gray)"}
      />
      <Circle
        cx="258"
        cy="275"
        r="6"
        fill={shortstop ? "var(--red)" : "var(--gray)"}
      />
      <Circle
        cx="352"
        cy="311"
        r="6"
        fill={second ? "var(--red)" : "var(--gray)"}
      />
      <Circle
        cx="304"
        cy="511"
        r="6"
        fill={catcher ? "var(--red)" : "var(--gray)"}
      />
      <Circle
        cx="399"
        cy="359"
        r="6"
        fill={first ? "var(--red)" : "var(--gray)"}
      />
      <Circle
        cx="158"
        cy="204"
        r="6"
        fill={left ? "var(--red)" : "var(--gray)"}
      />
      <Circle
        cx="447"
        cy="204"
        r="6"
        fill={right ? "var(--red)" : "var(--gray)"}
      />
      <Circle
        cx="304"
        cy="158"
        r="6"
        fill={center ? "var(--red)" : "var(--gray)"}
      />*/
