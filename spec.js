var newError = new Error('new')
  ,    error = new Error('old')

module.exports =
[ [null                           , null                              , {}]
, [{ '1.2.3.4': { http: error } } , { '1.2.3.4': { http: error } }    , {}]
, [{ '1.2.3.4': error }           , { '1.2.3.4': error }              , {}]
, [error                          , error                             , {}]


, [null                           , { '1.2.3.4': { http: newError } } , { error: '1.2.3.4 http down Error: new' }]
, [{ '1.2.3.4': { http: error } } , { '1.2.3.4': { http: newError } } , { error: '1.2.3.4 http down Error: new' }]
, [{ '1.2.3.4': error }           , { '1.2.3.4': { http: newError } } , { info : '1.2.3.4 up'
                                                                        , error: '1.2.3.4 http down Error: new' }]
, [error                          , { '1.2.3.4': { http: newError } } , { info :  'up'
                                                                        , error: '1.2.3.4 http down Error: new' }]

, [null                           , { '1.2.3.4': newError }           , { error: '1.2.3.4 down Error: new' }]
, [{ '1.2.3.4': { http: error } } , { '1.2.3.4': newError }           , { error: '1.2.3.4 down Error: new' }]
, [{ '1.2.3.4': error }           , { '1.2.3.4': newError }           , { error: '1.2.3.4 down Error: new' }]
, [error                          , { '1.2.3.4': newError }           , { info : 'up'
                                                                        , error: '1.2.3.4 down Error: new' }]

, [null                           , newError                          , { error: 'down Error: new' }]
, [{ '1.2.3.4': { http: error } } , newError                          , { error: 'down Error: new' }]
, [{ '1.2.3.4': error }           , newError                          , { error: 'down Error: new' }]

, [error                          , newError                          , { error: 'down Error: new' }]
, [{ '1.2.3.4': { http: error } } , null                              , { info: '1.2.3.4 http up' }]
, [{ '1.2.3.4': error }           , null                              , { info: '1.2.3.4 up' }]
, [error                          , null                              , { info: 'up' }]
]
