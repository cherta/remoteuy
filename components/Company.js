import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAmericas, faBuilding } from "@fortawesome/free-solid-svg-icons";

const icons = {
  allowFullRemote: faGlobeAmericas,
  hasPhysicalOffices: faBuilding
};

const descriptions = {
  allowFullRemote: `Allows employees to work remote every day of the year`,
  hasPhysicalOffices: `Has a physical office`
};

const Wrapper = styled.div`
  display: flex;
  padding: 1.5rem 1rem;
  margin: 1rem 1.5rem;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
  transition: 300ms;

  &:hover {
    box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.11),
      0 5px 15px 0 rgba(0, 0, 0, 0.08);
  }
`;

const Picture = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;
`;

const Information = styled.div`
  padding: 0 0.5rem;
`;

const Title = styled.h2`
  font-family: "Montserrat", sans-serif;
  font-size: 1.7rem;
  line-height: 2rem;
  font-weight: bold;

  a {
    color: #232b2f;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Description = styled.p`
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.25rem;
  color: #232b2f;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0.5rem 0;
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

export const Company = ({ name, url, picture, description, color, meta }) => {
  return (
    <Wrapper color={color}>
      <Picture src={picture} />
      <Information>
        <Title>
          {url ? (
            <a href={url} target="_blank">
              {name}
            </a>
          ) : (
            name
          )}
        </Title>
        <Description title={description}>{description}</Description>
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
