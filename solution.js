function solution(today, terms, privacies) {
  const parsedToday = parseDate(today);
  const termsMap = createTermsMap(terms);
  const expiryChecker = isExpired(parsedToday);
  const expiryDates = privacies.map(getExpiryDate(termsMap));

  return expiryDates.reduce((acc, expiryDate, index) => (expiryChecker(expiryDate) ? [...acc, index + 1] : acc), []);
}

const createTermsMap = (terms) => terms.reduce((map, term) => (map.set(term.split(' ')[0], +term.split(' ')[1]), map), new Map());

const parseDate = (dateStr) => new Date(dateStr.replaceAll('.', '-'));

const addMonths = (date, months) => new Date(date.setMonth(date.getMonth() + months));

const getExpiryDate = (termsMap) => (privacy) => addMonths(parseDate(privacy.split(' ')[0]), termsMap.get(privacy.split(' ')[1]));

const isExpired = (today) => (expiryDate) => expiryDate <= today;
