/*
 * Copyright (C) 2017 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import StudentColumnHeader from './StudentColumnHeader'

function getProps(gradebook, options) {
  const columnId = 'student'
  const sortRowsBySetting = gradebook.getSortRowsBySetting()
  const {direction, settingKey} = sortRowsBySetting

  return {
    ref: options.ref,
    addGradebookElement: gradebook.keyboardNav.addGradebookElement,
    disabled: !gradebook.contentLoadStates.studentsLoaded,
    loginHandleName: gradebook.options.login_handle_name,
    includeAdditionalSortOptions: gradebook.options.additional_sort_options_enabled,
    onHeaderKeyDown: event => {
      gradebook.handleHeaderKeyDown(event, columnId)
    },
    onMenuDismiss() {
      setTimeout(gradebook.handleColumnHeaderMenuClose)
    },
    onSelectPrimaryInfo: gradebook.setSelectedPrimaryInfo,
    onSelectSecondaryInfo: gradebook.setSelectedSecondaryInfo,
    onToggleEnrollmentFilter: gradebook.toggleEnrollmentFilter,
    removeGradebookElement: gradebook.keyboardNav.removeGradebookElement,
    sectionsEnabled: gradebook.sections_enabled,
    selectedEnrollmentFilters: gradebook.getSelectedEnrollmentFilters(),
    selectedPrimaryInfo: gradebook.getSelectedPrimaryInfo(),
    selectedSecondaryInfo: gradebook.getSelectedSecondaryInfo(),
    sisName: gradebook.options.sis_name,
    sortBySetting: {
      direction,
      disabled: !gradebook.contentLoadStates.studentsLoaded,
      isSortColumn: sortRowsBySetting.columnId === columnId,
      // sort functions with additional sort options enabled
      onSortBySortableName: () => {
        gradebook.setSortRowsBySetting(columnId, 'sortable_name', direction)
      },
      onSortBySisId: () => {
        gradebook.setSortRowsBySetting(columnId, 'sis_user_id', direction)
      },
      onSortByIntegrationId: () => {
        gradebook.setSortRowsBySetting(columnId, 'integration_id', direction)
      },
      onSortByLoginId: () => {
        gradebook.setSortRowsBySetting(columnId, 'login_id', direction)
      },
      onSortInAscendingOrder: () => {
        gradebook.setSortRowsBySetting(columnId, settingKey, 'ascending')
      },
      onSortInDescendingOrder: () => {
        gradebook.setSortRowsBySetting(columnId, settingKey, 'descending')
      },
      // sort functions with additional sort options disabled
      onSortBySortableNameAscending: () => {
        gradebook.setSortRowsBySetting(columnId, 'sortable_name', 'ascending')
      },
      onSortBySortableNameDescending: () => {
        gradebook.setSortRowsBySetting(columnId, 'sortable_name', 'descending')
      },
      settingKey
    },
    studentGroupsEnabled: gradebook.showStudentGroups()
  }
}

export default class StudentColumnHeaderRenderer {
  constructor(gradebook) {
    this.gradebook = gradebook
  }

  render(_column, $container, _gridSupport, options) {
    const props = getProps(this.gradebook, options)
    ReactDOM.render(<StudentColumnHeader {...props} />, $container)
  }

  destroy(_column, $container, _gridSupport) {
    ReactDOM.unmountComponentAtNode($container)
  }
}
