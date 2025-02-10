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

import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { TemplateEntityV1beta3 } from '@backstage/plugin-scaffolder-common';
import { FavoriteEntity } from '@backstage/plugin-catalog-react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import UpdateIcon from '@mui/icons-material/Update';
import { TemplateCardHeader } from './TemplateCardHeader';

const DateInfo = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  fontSize: '0.8rem',
  color: 'inherit',
}));

const StyledIcon = styled('span')({
  fontSize: '0.9rem',
  display: 'flex',
  alignItems: 'center',
});

const TypeAndFavorite = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
});

/**
 * Props for the CardHeader component
 */
export interface CardHeaderProps {
  template: TemplateEntityV1beta3;
}

/**
 * The Card Header with the background for the TemplateCard.
 */
export const CardHeader = (props: CardHeaderProps) => {
  const {
    template: {
      metadata: { title, name, annotations = {} },
      spec: { type },
    },
  } = props;

  const theme = useTheme();
  const { getPageTheme } = theme;
  const themeForType = getPageTheme({ themeId: type });

  const createdAt = annotations['created-at']
    ? new Date(annotations['created-at']).toLocaleDateString()
    : null;
  const updatedAt = annotations['updated-at']
    ? new Date(annotations['updated-at']).toLocaleDateString()
    : null;

  const topSection = (
    <TypeAndFavorite>
      <Typography variant="subtitle2" color="inherit">
        {type}
      </Typography>
      <FavoriteEntity entity={props.template} style={{ padding: 0 }} />
    </TypeAndFavorite>
  );

  const bottomSection = (
    <Grid container spacing={2}>
      {createdAt && (
        <Grid item xs={6}>
          <DateInfo variant="caption">
            <StyledIcon>
              <CalendarTodayIcon fontSize="inherit" />
            </StyledIcon>
            Created: {createdAt}
          </DateInfo>
        </Grid>
      )}
      {updatedAt && (
        <Grid item xs={6}>
          <DateInfo variant="caption">
            <StyledIcon>
              <UpdateIcon fontSize="inherit" />
            </StyledIcon>
            Updated: {updatedAt}
          </DateInfo>
        </Grid>
      )}
    </Grid>
  );

  return (
    <TemplateCardHeader
      title={title ?? name}
      topSection={topSection}
      bottomSection={bottomSection}
      backgroundImage={themeForType.backgroundImage}
      textColor={themeForType.fontColor}
    />
  );
};