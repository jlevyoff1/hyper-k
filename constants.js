// Based on regex from xterm.js's WebLinksAddon:
//
// consider everthing starting with http:// or https://
// up to first whitespace, `"` or `'` as url
// NOTE: The repeated end clause is needed to not match a dangling `:`
// resembling the old (...)*([^:"\'\\s]) final path clause
// additionally exclude early + final:
// - unsafe from rfc3986: !*'()
// - unsafe chars from rfc1738: {}|\^~[]` (minus [] as we need them for ipv6 adresses, also allow ~)
// also exclude as finals:
// - final interpunction like ,.!?
// - any sort of brackets <>()[]{} (not spec conform, but often used to enclose urls)
// - unsafe chars from rfc1738: {}|\^~[]`
//
// Note the first capturing group, if present, is what we pass to handlers.
// So use non-capturing groups (?:...) if necessary.
const URL_REGEX =
  /((?:https?|HTTPS?):[/]{2}[^\s"'!*(){}|\\\^<>`]*[^\s"':,.!?{}|\\\^~\[\]`()<>])/;

const IMAGE_URL_REGEX =
  /(?:https?|HTTPS?):[/]{2}[^\s"'!*(){}|\\\^<>`]*[^\s"':,.!?{}|\\\^~\[\]`()<>]\.(?:png|jpg|jpeg|gif|webp)/;

const COMMAND_REGEX = /`([^`]+)`/;

const COMBINED_REGEX = new RegExp(
  `((?:${COMMAND_REGEX.source})|(?:${IMAGE_URL_REGEX.source}))`,
  "g"
);

module.exports = { URL_REGEX, IMAGE_URL_REGEX, COMMAND_REGEX, COMBINED_REGEX };
