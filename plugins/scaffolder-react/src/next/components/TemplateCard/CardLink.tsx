/*
 * Copyright 2022 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { IconComponent } from '@backstage/core-plugin-api';
import { Link } from '@backstage/core-components';
import { styled } from '@mui/material/styles';
import React from 'react';

interface CardLinkProps {
  icon: IconComponent;
  text: string;
  url: string;
}

const LinkText = styled('div')({
  display: 'inline-flex',
  alignItems: 'center',
});

const StyledLink = styled(Link)({
  marginLeft: '8px',
});

export const CardLink = ({ icon: Icon, text, url }: CardLinkProps) => {
  return (
    <LinkText>
      <Icon fontSize="small" />
      <StyledLink to={url}>
        {text || url}
      </StyledLink>
    </LinkText>
  );
};