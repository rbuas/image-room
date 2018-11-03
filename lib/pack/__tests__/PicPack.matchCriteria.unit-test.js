const { matchCriteria } = require('../PicPack.filterCriteria');

describe('PicPack.matchCriteria', () => {
  it('should throw an error when call missing picInfo', () => {
    const lazyCall = () => matchCriteria(null, { Rating: [3, 2] });
    expect(lazyCall).toThrowError('Missing picInfo in matchCriteria.');
  });

  it('should throw an error when call missing criteria', () => {
    const lazyCall = () => matchCriteria({});
    expect(lazyCall).toThrowError('Missing criteria in matchCriteria.');
  });

  it('should not match when pic.Rating isnt in the criteria.Rating array', () => {
    const picInfo = { Rating: 4 };
    const matchs = matchCriteria(picInfo, { Rating: [3, 2] });
    expect(matchs).toBe(false);
  });

  it('should match when pic.Rating is in the criteria.Rating array', () => {
    const picInfo = { Rating: 3 };
    const matchs = matchCriteria(picInfo, { Rating: [3, 2] });
    expect(matchs).toBe(true);
  });

  it('should match when pic.Rating is equal the criteria.Rating value', () => {
    const picInfo = { Rating: 3 };
    const matchs = matchCriteria(picInfo, { Rating: 3 });
    expect(matchs).toBe(true);
  });

  it('should not match when pic.Rating isnt equal the criteria.Rating value', () => {
    const picInfo = { Rating: 3 };
    const matchs = matchCriteria(picInfo, { Rating: 2 });
    expect(matchs).toBe(false);
  });

  it('should match when criteria.Rating is not defined', () => {
    const picInfo = { Rating: 3 };
    const matchs = matchCriteria(picInfo, { Rating: undefined });
    expect(matchs).toBe(true);
  });

  it('should match when pic.Rating is not defined', () => {
    const picInfo = { Rating: undefined };
    const matchs = matchCriteria(picInfo, { Rating: 2 });
    expect(matchs).toBe(false);
  });

  it('should not match when pic.Rating is not defined and criteria.Rating is', () => {
    const picInfo = { Rating: undefined };
    const matchs = matchCriteria(picInfo, { Rating: 3 });
    expect(matchs).toBe(false);
  });

  it('should not match when criteria has a wording problem (Rating vs rating)', () => {
    const picInfo = { Rating: 2 };
    const matchs = matchCriteria(picInfo, { rating: 2 });
    expect(matchs).toBe(false);
  });

  it('should match when all criterias are respected', () => {
    const picInfo = { Rating: 3, Orientation: 'Vertical' };
    const matchs = matchCriteria(picInfo, { Rating: undefined, Orientation: 'Vertical' });
    expect(matchs).toBe(true);
  });

  it('should not match when one criteria is not respected', () => {
    const picInfo = { Rating: 3, Orientation: 'Vertical' };
    const matchs = matchCriteria(picInfo, { Rating: 2, Orientation: 'Vertical' });
    expect(matchs).toBe(false);
  });

  it('should match when all criterias are respected and informed', () => {
    const picInfo = { Rating: 3, Orientation: 'Vertical' };
    const matchs = matchCriteria(picInfo, { Rating: [3, 4], Orientation: 'Vertical' });
    expect(matchs).toBe(true);
  });

  it('should match when picInfo[property] is an array and contains criteria[property] item', () => {
    const picInfo = {
      Keywords: ['shadow', 'dance', 2015, 'rbuas', 'Paris', 'Efet'],
      Rating: 3,
    };
    const matchs = matchCriteria(picInfo, { Rating: 3, Keywords: ['dance'] });
    expect(matchs).toBe(true);
  });

  it('should match when picInfo[property] is an array and contains criteria[property] item', () => {
    const picInfo = {
      Keywords: ['shadow', 'dance', 2015, 'rbuas', 'Paris', 'Efet'],
      Rating: 3,
    };
    const matchs = matchCriteria(picInfo, { Rating: 3, Keywords: ['dance', 'rbuas'] });
    expect(matchs).toBe(true);
  });
});
