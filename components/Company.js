import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAmericas, faBuilding } from "@fortawesome/free-solid-svg-icons";

const icons = {
  allowFullRemote: faGlobeAmericas,
  hasPhysicalOffices: faBuilding,
};

const descriptions = {
  allowFullRemote: {
    true: `Allows employees to be remote every day of the week`,
    false: `Allow employees to be remote some days of the week`,
  },
  hasPhysicalOffices: {
    true: `Has a physical office`,
    false: `Doesn't have a physical office`,
  },
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2.5rem 1.5rem;
  position: relative;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Picture = styled.img`
  width: 3rem;
  height: 3rem;
  object-fit: contain;
  margin-right: 0.5rem;
`;

const Information = styled.div``;

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
  position: absolute;
  right: 1rem;
  bottom: 1rem;
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

const Icon = styled(FontAwesomeIcon)`
  opacity: ${({ active }) => (active ? 1 : 0.3)};
`;

const BaseCompany = ({
  name,
  url,
  picture,
  description,
  meta = {},
  ...rest
}) => {
  return (
    <Wrapper {...rest}>
      <TitleContainer>
        <Picture src={picture} />
        <Title>
          {url ? (
            <a href={url} target="_blank">
              {name}
            </a>
          ) : (
            name
          )}
        </Title>
      </TitleContainer>
      <Information>
        <Description title={description}>{description}</Description>
        <IconList>
          {Object.keys(meta).map((key) => {
            const active = !!meta[key];
            return (
              <Icon
                key={key}
                data-tip={descriptions[key][active]}
                icon={icons[key]}
                active={active}
              />
            );
          })}
        </IconList>
      </Information>
    </Wrapper>
  );
};

export const Company = styled(BaseCompany)``;
