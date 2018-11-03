const pickBy = require('lodash.pickby');
const forEach = require('lodash.foreach');
const intersection = require('lodash.intersection');

function matchCriteria(picInfo, criteria) {
  if (!picInfo) {
    throw new Error('Missing picInfo in matchCriteria.');
  }
  if (!criteria) {
    throw new Error('Missing criteria in matchCriteria.');
  }

  let matchs = true;
  forEach(criteria, (critValue, critKey) => {
    if (critValue === undefined) {
      return; // keep matchs as true and pass to new criteria
    }

    const picValue = picInfo[critKey];
    if (Array.isArray(critValue)) {
      if (Array.isArray(picValue)) {
        matchs = intersection(critValue, picValue).length === critValue.length;
      } else {
        matchs = critValue.includes(picValue);
      }
    } else {
      matchs = picValue === critValue;
    }

    if (!matchs) {
      return false; // stop searching if it not match
    }
  });

  return matchs;
}

function filterCriteria(catalogInfo, criteria) {
  if (!criteria) {
    return catalogInfo;
  }

  return pickBy(catalogInfo, (picInfo) => matchCriteria(picInfo, criteria));
}

module.exports = {
  matchCriteria,
  filterCriteria,
};
