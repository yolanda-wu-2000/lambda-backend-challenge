import fetch from 'node-fetch'
import { handler } from './breeds-get'

const mockedFetch: jest.Mock = fetch as any

jest.mock('node-fetch')

describe('breeds-get handler', () => {
  const mockPayload = {
    message: {
      beagle: [],
      sheepdog: ['english', 'shetland'],
    },
    status: 'success',
  }

  const mockExpectedBody = {
    message: ['beagle', 'english sheepdog', 'shetland sheepdog'],
    status: 'success',
  }

  mockedFetch.mockResolvedValueOnce({
    status: 200,
    statusText: 'OK',
    ok: true,
    json: () => {
      return mockPayload
    },
  })

  mockedFetch.mockResolvedValueOnce({
    status: 408,
    statusText: 'Request Timeout',
    ok: false,
    json: {},
  })

  it('returns payload from fetch request', async () => {
    const response = await handler()
    expect(response).toMatchObject({ body: mockExpectedBody })
  })

  it('the fetch fails with timeout error', async () => {
    await expect(handler()).rejects.toThrow('HTTP Error Response: 408 Request Timeout')
  })
})
