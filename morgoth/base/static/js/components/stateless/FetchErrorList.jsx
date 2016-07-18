import React, { PropTypes as pt } from 'react';

import Avatar from 'material-ui/Avatar';
import { amber500 } from 'material-ui/styles/colors';
import ActionReportProblem from 'material-ui/svg-icons/action/report-problem';


function renderErrorItem(key, value) {
  return <li>{key.toUpperCase()}: {value}</li>;
}

function FetchErrorList({ errors }) {
  return (
    <div>
      <Avatar
        icon={<ActionReportProblem />}
        backgroundColor={amber500}
        size={96}
      />
      <p>An error occured.</p>
      <ul className="error-list">
        {Object.keys(errors).map(key => renderErrorItem(key, errors[key]))}
      </ul>
    </div>
  );
}

FetchErrorList.propTypes = {
  errors: pt.object.isRequired,
};

export default FetchErrorList;
