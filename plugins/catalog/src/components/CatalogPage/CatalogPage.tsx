/*
 * Copyright 2020 The Backstage Authors
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

import {
  Content,
  PageWithHeader,
  SupportButton,
  TableColumn,
  TableProps,
} from '@backstage/core-components';
import { configApiRef, useApi } from '@backstage/core-plugin-api';
import {
  EntityKindPicker,
  EntityLifecyclePicker,
  EntityListProvider,
  EntityOwnerPicker,
  EntityTagPicker,
  EntityTypePicker,
  UserListFilterKind,
  UserListPicker,
} from '@backstage/plugin-catalog-react';
import React from 'react';
import { CatalogTable } from '../CatalogTable';
import { EntityRow } from '../CatalogTable/types';
import { CreateComponentButton } from '../CreateComponentButton/CreateComponentButton';
import {
  FilteredTableLayout,
  TableContainer,
  FilterContainer,
} from '../FilteredTableLayout';
import { CatalogPageHeader } from './CatalogPageHeader';

export type CatalogPageProps = {
  initiallySelectedFilter?: UserListFilterKind;
  columns?: TableColumn<EntityRow>[];
  actions?: TableProps<EntityRow>['actions'];
};

export const CatalogPage = ({
  columns,
  actions,
  initiallySelectedFilter = 'owned',
}: CatalogPageProps) => {
  const orgName =
    useApi(configApiRef).getOptionalString('organization.name') ?? 'Backstage';

  return (
    <PageWithHeader title={`${orgName} Catalog`} themeId="home">
      <Content>
        <EntityListProvider>
          <CatalogPageHeader>
            <CreateComponentButton />
            <SupportButton>All your software catalog entities</SupportButton>
          </CatalogPageHeader>
          <FilteredTableLayout>
            <FilterContainer>
              <EntityKindPicker initialFilter="component" hidden />
              <EntityTypePicker />
              <UserListPicker initialFilter={initiallySelectedFilter} />
              <EntityOwnerPicker />
              <EntityLifecyclePicker />
              <EntityTagPicker />
            </FilterContainer>
            <TableContainer>
              <CatalogTable columns={columns} actions={actions} />
            </TableContainer>
          </FilteredTableLayout>
        </EntityListProvider>
      </Content>
    </PageWithHeader>
  );
};
