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

import { RELATION_OWNED_BY } from '@backstage/catalog-model';
import { MarkdownContent, UserIcon } from '@backstage/core-components';
import {
  IconComponent,
  useAnalytics,
  useApp,
} from '@backstage/core-plugin-api';
import {
  EntityRefLinks,
  getEntityRelations,
} from '@backstage/plugin-catalog-react';
import { TemplateEntityV1beta3 } from '@backstage/plugin-scaffolder-common';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import LanguageIcon from '@mui/icons-material/Language';
import React, { useCallback } from 'react';
import { CardHeader } from './CardHeader';
import { CardLink } from './CardLink';
import { usePermission } from '@backstage/plugin-permission-react';
import { taskCreatePermission } from '@backstage/plugin-scaffolder-common/alpha';

const StyledBox = styled(Box)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 10,
  WebkitBoxOrient: 'vertical',
});

const StyledMarkdown = styled(MarkdownContent)({
  '& :first-child': {
    margin: 0,
  },
});

const Label = styled('div')(({ theme }) => ({
  color: theme.palette.text.secondary,
  textTransform: 'uppercase',
  fontWeight: 'bold',
  letterSpacing: 0.5,
  lineHeight: 1,
  fontSize: '0.75rem',
}));

const Footer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  flex: 1,
  alignItems: 'center',
});

const OwnedBy = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  color: theme.palette.primary.main,
}));

/**
 * The Props for the {@link TemplateCard} component
 * @alpha
 */
export interface TemplateCardProps {
  template: TemplateEntityV1beta3;
  additionalLinks?: {
    icon: IconComponent;
    text: string;
    url: string;
  }[];

  onSelected?: (template: TemplateEntityV1beta3) => void;
}

/**
 * The `TemplateCard` component that is rendered in a list for each template
 * @alpha
 */
export const TemplateCard = (props: TemplateCardProps) => {
  const { onSelected, template } = props;
  const analytics = useAnalytics();
  const ownedByRelations = getEntityRelations(template, RELATION_OWNED_BY);
  const app = useApp();
  const iconResolver = (key?: string): IconComponent =>
    key ? app.getSystemIcon(key) ?? LanguageIcon : LanguageIcon;
  const hasTags = !!template.metadata.tags?.length;
  const hasLinks =
    !!props.additionalLinks?.length || !!template.metadata.links?.length;
  const displayDefaultDivider = !hasTags && !hasLinks;

  const { allowed: canCreateTask } = usePermission({
    permission: taskCreatePermission,
  });

  const handleChoose = useCallback(() => {
    analytics.captureEvent('click', `Template has been opened`);
    onSelected?.(template);
  }, [analytics, onSelected, template]);

  return (
    <Card>
      <CardHeader template={template} />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StyledBox>
              <StyledMarkdown
                content={template.metadata.description ?? 'No description'}
              />
            </StyledBox>
          </Grid>
          {displayDefaultDivider && (
            <Grid item xs={12}>
              <Divider data-testid="template-card-separator" />
            </Grid>
          )}
          {hasTags && (
            <>
              <Grid item xs={12}>
                <Divider data-testid="template-card-separator--tags" />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  {template.metadata.tags?.map(tag => (
                    <Grid key={`grid-${tag}`} item>
                      <Chip
                        style={{ margin: 0 }}
                        size="small"
                        label={tag}
                        key={tag}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </>
          )}
          {hasLinks && (
            <>
              <Grid item xs={12}>
                <Divider data-testid="template-card-separator--links" />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  {props.additionalLinks?.map(({ icon, text, url }, index) => (
                    <Grid item xs={6} key={index}>
                      <CardLink icon={icon} text={text} url={url} />
                    </Grid>
                  ))}
                  {template.metadata.links?.map(
                    ({ url, icon, title }, index) => (
                      <Grid item xs={6} key={index}>
                        <CardLink
                          icon={iconResolver(icon)}
                          text={title || url}
                          url={url}
                        />
                      </Grid>
                    ),
                  )}
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </CardContent>
      <CardActions style={{ padding: '16px', flex: 1, alignItems: 'flex-end' }}>
        <Footer>
          <OwnedBy>
            {ownedByRelations.length > 0 && (
              <>
                <UserIcon fontSize="small" />
                <EntityRefLinks
                  style={{ marginLeft: '8px' }}
                  entityRefs={ownedByRelations}
                  defaultKind="Group"
                  hideIcons
                />
              </>
            )}
          </OwnedBy>
          {canCreateTask ? (
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={handleChoose}
            >
              Choose
            </Button>
          ) : null}
        </Footer>
      </CardActions>
    </Card>
  );
};