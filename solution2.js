const PAIRS = { R: 'T', C: 'F', J: 'M', A: 'N' };
const SCORE_INFO = [3, 2, 1, 0, 1, 2, 3];

function solution(survey, choices) {
  const typeChoices = getTypeChoices(survey);
  const scores = calculateScores(SCORE_INFO)(choices)(typeChoices);

  return getResult(PAIRS)(scores);
}

const calculateScores = (scoreInfo) => (choices) => (typeChoices) => {
  return choices.reduce((acc, choice, i) => {
    const [first, second] = typeChoices[i];
    const score = scoreInfo[choice - 1];

    if (choice < 4) {
      acc[first] += score;
    } else if (choice > 4) {
      acc[second] += score;
    }

    return acc;
  }, createInitialScores(PAIRS));
};

const getResult = (pairs) => (scores) =>
  Object.entries(pairs)
    .map(([key, value]) => (scores[key] >= scores[value] ? key : value))
    .join('');

const createInitialScores = (pairs) => Object.entries(pairs).reduce((acc, [key, value]) => ({ ...acc, [key]: 0, [value]: 0 }), {});

const getTypeChoices = (survey) => survey.map((pair) => pair.split(''));
