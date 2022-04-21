const app = getApp()

Page({
  data: {
    root: {
      cn: [
        {
          te: 'text',
          id: 't1',
          cn: [
            {
              te: 'plain-text',
              tt: new Date().getTime(),
            }
          ]
        },
        {
          te: 'scroll-view',
          id: 't2',
          c2: 'height: 200px;border: 1px red solid;',
          c33: true,
          cn: [
            {
              te: 'view',
              id: 't3',
              c2: 'display: flex; flex-direction: column;',
              cn: [
                {
                  te: 'text',
                  id: 't4',
                  c2: 'font-size: 40px;',
                  cn: [
                    {
                      te: 'plain-text',
                      id: 't5',
                      tt: '111111111111'
                    },
                  ]
                },
                {
                  te: 'text',
                  id: 't6',
                  c2: 'font-size: 40px;',
                  cn: [
                    {
                      te: 'plain-text',
                      id: 't7',
                      tt: '111111111111'
                    },
                  ]
                },
                {
                  te: 'text',
                  id: 't8',
                  c2: 'font-size: 40px;',
                  cn: [
                    {
                      te: 'plain-text',
                      id: 't9',
                      tt: '111111111111'
                    },
                  ]
                },
                {
                  te: 'text',
                  id: 't10',
                  c2: 'font-size: 40px;',
                  cn: [
                    {
                      te: 'plain-text',
                      id: 't11',
                      tt: '111111111111'
                    },
                  ]
                },
              ]
            },
            {
              te: 'view',
              id: 't12',
              c2: 'display: flex; flex-direction: column;',
              cn: [
                {
                  te: 'text',
                  id: 't13',
                  c2: 'font-size: 40px;',
                  cn: [
                    {
                      te: 'plain-text',
                      id: 't13',
                      tt: '2222222222'
                    },
                  ]
                },
                {
                  te: 'text',
                  id: 't14',
                  c2: 'font-size: 40px;',
                  cn: [
                    {
                      te: 'plain-text',
                      id: 't15',
                      tt: '2222222222'
                    },
                  ]
                },
                {
                  te: 'text',
                  id: 't16',
                  c2: 'font-size: 40px;',
                  cn: [
                    {
                      te: 'plain-text',
                      id: 't17',
                      tt: '2222222222'
                    },
                  ]
                },
                {
                  te: 'text',
                  id: 't18',
                  c2: 'font-size: 40px;',
                  cn: [
                    {
                      te: 'plain-text',
                      id: 't19',
                      tt: '2222222222'
                    },
                  ]
                },
              ]
            },
            {
              te: 'view',
              id: 't19',
              cn: [
                {
                  te: 'view',
                  id: 't20',
                  c2: 'display: flex; flex-direction: column;',
                  cn: [
                    {
                      te: 'text',
                      id: 't21',
                      c2: 'font-size: 40px;',
                      cn: [
                        {
                          te: 'plain-text',
                          id: 't22',
                          tt: '3333333333'
                        },
                      ]
                    },
                    {
                      te: 'text',
                      id: 't23',
                      c2: 'font-size: 40px;',
                      cn: [
                        {
                          te: 'plain-text',
                          id: 't24',
                          tt: '3333333333'
                        },
                      ]
                    },
                    {
                      te: 'text',
                      id: 't25',
                      c2: 'font-size: 40px;',
                      cn: [
                        {
                          te: 'plain-text',
                          id: 't26',
                          tt: '3333333333'
                        },
                      ]
                    },
                    {
                      te: 'text',
                      id: 't27',
                      c2: 'font-size: 40px;',
                      cn: [
                        {
                          te: 'plain-text',
                          id: 't28',
                          tt: '3333333333'
                        },
                      ]
                    },
                  ]
                },
              ]
            },
          ]
        }
      ]
    }
  },
  onLoad() {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },
  onButtonTap() {
    this.setData({
      root: {
        cn: [
          {
            te: 'text',
            id: 't1',
            cn: [
              {
                te: 'plain-text',
                tt: new Date().getTime(),
              }
            ]
          },
          {
            te: 'scroll-view',
            id: 't2',
            c2: 'height: 200px;border: 1px red solid;',
            c33: true,
            cn: [
              {
                te: 'view',
                id: 't3',
                c2: 'display: flex; flex-direction: column;',
                cn: [
                  {
                    te: 'text',
                    id: 't4',
                    c2: 'font-size: 40px;',
                    cn: [
                      {
                        te: 'plain-text',
                        id: 't5',
                        tt: '111111111111'
                      },
                    ]
                  },
                  {
                    te: 'text',
                    id: 't6',
                    c2: 'font-size: 40px;',
                    cn: [
                      {
                        te: 'plain-text',
                        id: 't7',
                        tt: '111111111111'
                      },
                    ]
                  },
                  {
                    te: 'text',
                    id: 't8',
                    c2: 'font-size: 40px;',
                    cn: [
                      {
                        te: 'plain-text',
                        id: 't9',
                        tt: '111111111111'
                      },
                    ]
                  },
                  {
                    te: 'text',
                    id: 't10',
                    c2: 'font-size: 40px;',
                    cn: [
                      {
                        te: 'plain-text',
                        id: 't11',
                        tt: '111111111111'
                      },
                    ]
                  },
                ]
              },
              {
                te: 'view',
                id: 't12',
                c2: 'display: flex; flex-direction: column;',
                cn: [
                  {
                    te: 'text',
                    id: 't13',
                    c2: 'font-size: 40px;',
                    cn: [
                      {
                        te: 'plain-text',
                        id: 't13',
                        tt: '2222222222'
                      },
                    ]
                  },
                  {
                    te: 'text',
                    id: 't14',
                    c2: 'font-size: 40px;',
                    cn: [
                      {
                        te: 'plain-text',
                        id: 't15',
                        tt: '2222222222'
                      },
                    ]
                  },
                  {
                    te: 'text',
                    id: 't16',
                    c2: 'font-size: 40px;',
                    cn: [
                      {
                        te: 'plain-text',
                        id: 't17',
                        tt: '2222222222'
                      },
                    ]
                  },
                  {
                    te: 'text',
                    id: 't18',
                    c2: 'font-size: 40px;',
                    cn: [
                      {
                        te: 'plain-text',
                        id: 't19',
                        tt: '2222222222'
                      },
                    ]
                  },
                ]
              },
              {
                te: 'view',
                id: 't19',
                cn: [
                  {
                    te: 'view',
                    id: 't20',
                    c2: 'display: flex; flex-direction: column;',
                    cn: [
                      {
                        te: 'text',
                        id: 't21',
                        c2: 'font-size: 40px;',
                        cn: [
                          {
                            te: 'plain-text',
                            id: 't22',
                            tt: '3333333333'
                          },
                        ]
                      },
                      {
                        te: 'text',
                        id: 't23',
                        c2: 'font-size: 40px;',
                        cn: [
                          {
                            te: 'plain-text',
                            id: 't24',
                            tt: '3333333333'
                          },
                        ]
                      },
                      {
                        te: 'text',
                        id: 't25',
                        c2: 'font-size: 40px;',
                        cn: [
                          {
                            te: 'plain-text',
                            id: 't26',
                            tt: '3333333333'
                          },
                        ]
                      },
                      {
                        te: 'text',
                        id: 't27',
                        c2: 'font-size: 40px;',
                        cn: [
                          {
                            te: 'plain-text',
                            id: 't28',
                            tt: '3333333333'
                          },
                        ]
                      },
                    ]
                  },
                ]
              },
            ]
          }
        ]
      }
    })
  },
})
