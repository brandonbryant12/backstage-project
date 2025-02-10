/*
 * Copyright 2024 The Backstage Authors
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

import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const HeaderRoot = styled(Box, {
  shouldForwardProp: prop => 
    !['backgroundImage', 'textColor'].includes(prop as string),
})<{
  backgroundImage?: string;
  textColor?: string;
}>(({ theme, backgroundImage, textColor }) => ({
  color: textColor || theme.palette.common.white,
  padding: theme.spacing(2, 2, 3),
  backgroundImage,
  backgroundPosition: 0,
  backgroundSize: 'inherit',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

const TitleSection = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
}));

export interface TemplateCardHeaderProps {
  /**
   * Main title to display in the header
   */
  title?: React.ReactNode;
  /**
   * Subtitle to display below the title
   */
  subtitle?: React.ReactNode;
  /**
   * Optional section to display at the bottom of the header
   */
  bottomSection?: React.ReactNode;
  /**
   * Background image for the header
   */
  backgroundImage?: string;
  /**
   * Text color for the header content
   */
  textColor?: string;
}

/**
 * A card header component specifically designed for template cards,
 * with support for a bottom section (e.g., for dates)
 */
export function TemplateCardHeader(props: TemplateCardHeaderProps) {
  const { title, subtitle, bottomSection, backgroundImage, textColor } = props;

  return (
    <HeaderRoot backgroundImage={backgroundImage} textColor={textColor}>
      <TitleSection>
        {subtitle && (
          <Typography variant="subtitle2" component="h3">
            {subtitle}
          </Typography>
        )}
        {title && (
          <Typography variant="h6" component="h4">
            {title}
          </Typography>
        )}
      </TitleSection>
      {bottomSection}
    </HeaderRoot>
  );
}