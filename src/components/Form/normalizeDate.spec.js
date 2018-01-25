import normalizeDate from './normalizeDate';

describe('normalizeDate', () => {
  it('should normalizeDate', () => {
    const result = normalizeDate('1');
    expect(result).toEqual('1');

    const result2 = normalizeDate('12');
    expect(result2).toEqual('12/');

    const result3 = normalizeDate('123');
    expect(result3).toEqual('12/3');

    const result4 = normalizeDate('1231');
    expect(result4).toEqual('12/31/');

    const result5 = normalizeDate('12/31/20');
    expect(result5).toEqual('12/31/20');

    const result6 = normalizeDate('12/31/201');
    expect(result6).toEqual('12/31/201');

    const result7 = normalizeDate('12/31/2017');
    expect(result7).toEqual('12/31/2017');
  });
});
