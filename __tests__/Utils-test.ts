import {encryptSHA256, makeRandomString} from '../src/Utils';

it('Utils test', () => {
  const randString = makeRandomString(86);

  console.log(randString);

  expect(randString).toHaveLength(86);
});

it('hash', () => {
  const randString = makeRandomString(86);

  const hashed = encryptSHA256(randString);

  console.log('hashsed:', hashed);
});
