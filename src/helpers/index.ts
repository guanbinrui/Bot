import fetch from 'node-fetch';
import BigNumber from 'bignumber.js';

export function scale10(m: BigNumber.Value, n = 1) {
  const x = new BigNumber(10).shiftedBy(n);
  return n === 1 ? x : x.multipliedBy(m);
}

export function getEnumAsArray<T extends object>(enumObject: T) {
  return (
    Object.keys(enumObject)
      // Leave only key of enum
      .filter((x) => Number.isNaN(Number.parseInt(x)))
      .map((key) => ({ key, value: enumObject[key as keyof T] }))
  );
}

export function createLookupTableResolver<K extends keyof any, T>(
  map: Partial<Record<K, T>>,
  fallback: T | ((key: K) => T)
) {
  function resolveFallback(key: K) {
    if (typeof fallback === 'function') return (fallback as (key: K) => T)(key);
    return fallback;
  }
  return (key: K) => map[key] ?? resolveFallback(key);
}

export async function fetchJSON<T>(url: string): Promise<T> {
  return (await fetch(url)).json() as Promise<T>;
}

export function formatBalance(
  rawValue: BigNumber.Value = '0',
  decimals = 0,
  significant = decimals
) {
  let balance = new BigNumber(rawValue);
  if (balance.isNaN()) return '0';
  const negative = balance.isNegative(); // balance < 0n
  const base = new BigNumber(1).shiftedBy(decimals); // 10n ** decimals

  if (negative) balance = balance.absoluteValue(); // balance * -1n

  let fraction = balance.modulo(base).toString(10); // (balance % base).toString(10)

  // add leading zeros
  while (fraction.length < decimals) fraction = `0${fraction}`;

  // match significant digits
  const matchSignificantDigits = new RegExp(
    `^0*[1-9]\\d{0,${significant > 0 ? significant - 1 : 0}}`
  );
  fraction = fraction.match(matchSignificantDigits)?.[0] ?? '';

  // trim tailing zeros
  fraction = fraction.replace(/0+$/g, '');

  const whole = balance.dividedToIntegerBy(base).toString(10); // (balance / base).toString(10)
  const value = `${whole}${fraction === '' ? '' : `.${fraction}`}`;

  const raw = negative ? `-${value}` : value;
  return raw.includes('.') ? raw.replace(/0+$/, '').replace(/\.$/, '') : raw;
}
