import { expect } from '@jest/globals';
import createNewAccount from 'src/pages/api/create_new_account';
import { mockRequest } from 'test/utils';

describe('/api/create_new_account', () => {
  test('returns true', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {},
    });

    await createNewAccount(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      result: true,
    });
  });

  test('returns false for username and password validations', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: 'kenny', 
        password: ''}
    });

    await createNewAccount(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      result: false,
      errors: {
        username: {
          usernameLength: false
        },
        password: {
          length: false,
          specialCharacter: false,
          letter: false,
          number: false
        }
      }
    });
  });

  test('returns false for password validations', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: 'kennykha@gmail.com', 
        password: ''}
    });

    await createNewAccount(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      result: false,
      errors: {
        username: {
          usernameLength: true
        },
        password: {
          length: false,
          specialCharacter: false,
          letter: false,
          number: false
        }
      }
    });
  });

  test('returns false for username validation & password length validation', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: '', 
        password: '1a!'}
    });

    await createNewAccount(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      result: false,
      errors: {
        username: {
          usernameLength: false
        },
        password: {
          length: false,
          specialCharacter: true,
          letter: true,
          number: true
        }
      }
    });
  });


});
