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

  test('returns false for username & password validations', async () => {
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

  test('returns true for username validation & password validations', async () => {
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

  test('returns false for username validation & false for all password validations', async () => {
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

  test('returns false for username validation & password special character validation', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: '', 
        password: '1abcdeor3psldkgahiwnz'}
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
          length: true,
          specialCharacter: false,
          letter: true,
          number: true
        }
      }
    });
  });

  test('returns false for username validation & password letter validation', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: '', 
        password: '123456!295819201925890158'}
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
          length: true,
          specialCharacter: true,
          letter: false,
          number: true
        }
      }
    });
  });

  test('returns false for username validation & password number validation', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: '', 
        password: 'awoidjaiojdawioj!@#jawiaoajf'}
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
          length: true,
          specialCharacter: true,
          letter: true,
          number: false
        }
      }
    });
  });

  test('returns true for username & password validations', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: 'kennykha@gmail.com', 
        password: 'awoidjai12ojdawioj!@#jawiaoajf'}
    });

    await createNewAccount(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      result: true,
      errors: {
        username: {
          usernameLength: true
        },
        password: {
          length: true,
          specialCharacter: true,
          letter: true,
          number: true
        }
      }
    });
  });


});
