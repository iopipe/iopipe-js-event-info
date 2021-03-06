export default {
  session: {
    new: true,
    sessionId: 'amzn1.echo-api.session.[unique-value-here]',
    attributes: {
      key: 'string value',
      correctAnswerText: 'Donner',
      speechOutput:
        "Question 1. What was Rudolph's father's name? 1. Blixen. 2. Comet. 3. Donner. 4. Dasher. ",
      repromptText:
        "Question 1. What was Rudolph's father's name? 1. Blixen. 2. Comet. 3. Donner. 4. Dasher. ",
      correctAnswerIndex: 3,
      STATE: '_TRIVIAMODE',
      score: 0,
      questions: [16, 20, 29, 2, 19],
      currentQuestionIndex: 0
    },
    user: {
      userId: 'amzn1.ask.account.[unique-value-here]'
    },
    application: {
      applicationId: 'amzn1.ask.skill.[unique-value-here]'
    }
  },
  version: '1.0',
  request: {
    locale: 'en-US',
    timestamp: '2016-10-27T18:21:44Z',
    type: 'LaunchRequest',
    requestId: 'amzn1.echo-api.request.[unique-value-here]',
    intent: {
      slots: {
        Item: {
          name: 'Item',
          value: 'snowball'
        }
      },
      name: 'AnswerIntent'
    }
  },
  context: {
    AudioPlayer: {
      playerActivity: 'IDLE',
      token: 'audioplayer-token',
      offsetInMilliseconds: 0
    },
    System: {
      device: {
        supportedInterfaces: {
          AudioPlayer: {}
        }
      },
      application: {
        applicationId: 'amzn1.ask.skill.[unique-value-here]'
      },
      user: {
        userId: 'amzn1.ask.account.[unique-value-here]',
        accessToken: 'Atza|AAAAAAAA',
        permissions: {
          consentToken: 'ZZZZZZZ'
        }
      },
      apiEndpoint: 'https://api.amazonalexa.com',
      apiAccessToken: 'AxThk'
    }
  }
};
