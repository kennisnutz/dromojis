import React from "react";
import { MediaCardDiv } from "./styled/styled";
import dropmoji from "../static/logo.png";

const MediaCard = () => {
  return (
    <>
      <MediaCardDiv>
        <img
          src={dropmoji}
          alt="dropmojis_nft"
          width={"200px"}
          height={"200px"}
        />
      </MediaCardDiv>
    </>
  );
};

export default MediaCard;
