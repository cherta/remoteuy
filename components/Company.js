import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAmericas, faBuilding } from "@fortawesome/free-solid-svg-icons";

const icons = {
  allowFullRemote: faGlobeAmericas,
  hasPhisicalOffices: faBuilding
};

const descriptions = {
  allowFullRemote: `Allows employees to work remote everyday of the year`,
  hasPhisicalOffices: `Has a phisical office`
};

const Wrapper = styled.div`
  display: flex;
  padding: 1rem;
  background-color: ${({ color }) =>
    color === "light" ? `rgb(255, 126, 50, 0.05)` : `rgb(255, 126, 50, 0.15)`};
`;

const Picture = styled.img`
  width: 3rem;
  height: 3rem;
  object-fit: contain;
`;

const Information = styled.div`
  padding: 0 0.5rem;
`;

const Title = styled.h2`
  font-family: "Montserrat", sans-serif;
  font-size: 1.5rem;
  line-height: 2rem;
  color: #232b2f;
`;

const Description = styled.p`
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.625rem;
  color: #232b2f;
`;

const IconList = styled.div`
  display: flex;
  margin-top: 0.5rem;

  svg {
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
    color: #232b2f;
    &:last-child {
      margin-right: 0;
    }
  }
`;

export const Company = ({ name, picture, description, color, meta }) => {
  return (
    <Wrapper color={color}>
      <Picture src={picture} />
      <Information>
        <Title>{name}</Title>
        <Description>{description}</Description>
        <IconList>
          {Object.keys(meta)
            .filter(key => !!meta[key])
            .map(key => {
              return (
                <FontAwesomeIcon
                  data-tip={descriptions[key]}
                  key={key}
                  icon={icons[key]}
                />
              );
            })}
        </IconList>
      </Information>
    </Wrapper>
  );
};
