/// <reference path="../../d3.d.ts" />
/// <reference path="number-format.ts" />
/// <reference path="time-format.ts" />

d3.locale = function(locale) {
  return {
    numberFormat: d3_locale_numberFormat(locale),
    timeFormat: d3_locale_timeFormat(locale)
  };
};
