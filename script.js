window.onload = function () {
  const topic = document.getElementById('topic-select');
  const generate = document.getElementById('generate-btn');
  const generateNocache = document.getElementById('generate-nocache-btn');

  const title = document.getElementById('title');
  const subtitle = document.getElementById('subtitle');

  const titleText = 'AI Analysis';
  let subtitleText = '';

  const typeWriterTitle = () => {
    let i = 0;

    const typeWriterTitleInterval = setInterval(() => {
      if (i < titleText.length) {
        title.innerHTML += titleText[i];
        i++;
      } else {
        clearInterval(typeWriterTitleInterval);
      }
    }, 100);
  };

  const typeWriterSubtitle = (callback) => {
    subtitle.innerHTML = '';

    let i = 0;

    const typeWriterSubtitleInterval = setInterval(() => {
      if (i < subtitleText.length) {
        subtitle.innerHTML += subtitleText[i];
        i++;
      } else {
        clearInterval(typeWriterSubtitleInterval);
        callback();
      }
    }, 25);
  };

  typeWriterTitle();

  const generateAnalysis = (cache) => {
    topic.disabled = true;
    generate.disabled = true;
    generateNocache.disabled = true;

    const item = topic.value;

    subtitleText = 'Generating AI analysis...';
    typeWriterSubtitle(() => {
      fetch(`https://flat-sky-ab42.shreyasm-dev.workers.dev/cached?item=${item}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.cached && cache) {
            fetch(`https://flat-sky-ab42.shreyasm-dev.workers.dev/ai?item=${item}`)
              .then((res) => res.json())
              .then((res) => {
                subtitleText = res.response;

                typeWriterSubtitle(() => {
                  topic.disabled = false;
                  generate.disabled = false;
                  generateNocache.disabled = false;
                });
              });
          } else {
            const source = new EventSource(`https://flat-sky-ab42.shreyasm-dev.workers.dev/ai?item=${item}&streamed`);
            source.addEventListener('message', (event) => {
              if (subtitle.innerHTML === 'Generating AI analysis...') {
                subtitle.innerHTML = '';
              }
              
              if (event.data === '[DONE]') {
                source.close();

                topic.disabled = false;
                generate.disabled = false;
                generateNocache.disabled = false;

                fetch(`https://flat-sky-ab42.shreyasm-dev.workers.dev/cache?item=${item}&value=${encodeURIComponent(subtitle.innerHTML)}`);
              } else {
                subtitle.innerHTML += JSON.parse(event.data).response;
              }
            });
          }
        });
    });
  };

  generate.addEventListener('click', () => {
    generateAnalysis(true);
  });

  generateNocache.addEventListener('click', () => {
    generateAnalysis(false);
  });
};

const main = async () => {
  const data = await (
    await fetch(
      'https://aesa-finance-backend.deno.dev/data/USHMI,CUUR0000SA0R,CPIAUCSL,CPIUFDNS,CPIENGSL,APU000072610,GASOLINE,CPIAPPSL,CUSR0000SETG01,CUUR0000SETA01,GOLD/M'
    )
  ).json();

  const ThreeMChangeHElement = document.querySelector('.isGoodTime');
  const isGoodTimeChangeHHElement = document.querySelector('.ThreeMChangeH');
  const TwelveMChangeHElement = document.querySelector('.TwelveMChangeH');

  getData(data.USHMI, [
    [12, [[ThreeMChangeHElement, ['is', 'green'], ['is not', 'red'], ['neither is nor is not', 'blue']]]],
    [24, [[isGoodTimeChangeHHElement, ['up', 'red'], ['down', 'green'], ['the same', 'blue']]]],
    [60, [[TwelveMChangeHElement, ['up', 'red'], ['down', 'green'], ['at the same level', 'blue']]]],
  ]);

  const directionElement = document.querySelector('.inflationDirection');
  const powerChangeElement = document.querySelector('.powerChangeDirection');
  const power3ChangeElement = document.querySelector('.powerChangeLast3Months');
  const power12ChangeElement = document.querySelector('.powerChangeLastYear');

  getData(data.CUUR0000SA0R, [
    [
      1,
      [
        [directionElement, ['Up', 'green'], ['Down', 'red'], ['No change', 'blue']],
        [powerChangeElement, ['gone up', 'green'], ['gone down', 'red'], ['remained the same', 'blue']],
      ],
    ],
    [3, [[power3ChangeElement, ['up', 'green'], ['down', 'red'], ['the same', 'blue']]]],
    [12, [[power12ChangeElement, ['up', 'green'], ['down', 'red'], ['the same', ' blue']]]],
  ]);

  const InflationChangeElement = document.querySelector('.inflationTrend');
  const InflationImpactElement = document.querySelector('.inflationImpact');
  const HCChangeElement = document.querySelector('.HCMoreLess');

  getData(data.CPIAUCSL, [
    [
      1,
      [
        [InflationChangeElement, ['an increase', 'red'], ['a decrease', 'green'], ['a lack of change', 'blue']],
        [InflationImpactElement, ['recent upward change', 'red'], ['recent downward change', 'green'], ['retention', 'blue']],
      ],
    ],
    [12, [[HCChangeElement, ['more', 'red'], ['less', 'green'], ['the same', 'blue']]]],
  ]);

  const food1TrendElement = document.querySelector('.food1Trend');
  const foodGoodBadElement = document.querySelector('.foodGoodBad');

  getData(data.CPIUFDNS, [
    [
      1,
      [
        [food1TrendElement, ['increased', 'red'], ['decreased', 'green'], ['remained the same', 'blue']],
        [
          foodGoodBadElement,
          ['Based on the trend, it is as good a time as any', 'red'],
          ['Against the trend, it is a particularly good time', 'green'],
          ['Halting the trend, it will cost you the same as last month', 'blue'],
        ],
      ],
    ],
  ]);

  // Energy
  const energyTrendElement = document.querySelector('.energyTrend');
  const energyCostElement = document.querySelector('.energyCost');
  const energyAdviceElement = document.querySelector('.energyAdvice');

  getData(data.CPIENGSL, [
    [
      3,
      [
        [energyTrendElement, ['up', 'red'], ['down', 'green'], ['the same', 'blue']],
        [energyCostElement, ['increased', 'red'], ['decreased', 'green'], ['remained the same', 'blue']],
        [
          energyAdviceElement,
          ['Be sure to turn off the lights when you are not using them. :)', 'red'],
          ['Feel free to use the same amount of energy as usual, and you might still save some money.', 'green'],
          ['Feel free to use the same amount of energy as usual, and your bill should not change by much.S', 'blue'],
        ],
      ],
    ],
  ]);

  const electricityTrendElement = document.querySelector('.electricityTrend');
  const electricityMatchingElement = document.querySelector('.electricityMatching');
  const electricityCostMoreElement = document.querySelector('.electricityCostMore');
  const electricityUsageElement = document.querySelector('.electricityUsage');

  getData(data.APU000072610, [
    [
      3,
      [
        [electricityTrendElement, ['an up', 'red'], ['a down', 'green'], ['the same', 'blue']],
        [
          electricityUsageElement,
          ['you can anticipate a higher electricity bill .', 'red'],
          ['you can anticipate a lower electricity bill.', 'green'],
          ['you can anticipate about the same electricity bill, though fluctuations do occur.', 'blue'],
        ],
        [electricityCostMoreElement, ['more', 'red'], ['less', 'green'], ['the same', 'blue']],
      ],
    ],
    [12, [[electricityMatchingElement, ['an up', 'red'], ['a down', 'green'], ['a neutral move', 'blue']]]],
  ]);

  const gasolineTrendElement = document.querySelector('.gasolineTrend');
  const gasolineInLineElement = document.querySelector('.gasolineInLine');
  const gasolineGoesAgainstElement = document.querySelector('.gasolineGoesAgainst');
  const gasolineUpwardsElement = document.querySelector('.gasolineUpwards');

  getData(data.GASOLINE, [
    [
      1,
      [
        [gasolineTrendElement, ['an upward', 'red'], ['a downward', 'green'], ['a neutral', 'blue']],
        [gasolineInLineElement, ['more', 'red'], ['less', 'green'], ['the same', 'blue']],
      ],
    ],
    [12, [[gasolineGoesAgainstElement, ['an upward', 'red'], ['a downward', 'green'], ['a neutral', 'blue']]]],
    [gasolineUpwardsElement, ['more', 'red'], ['less', 'green'], ['the same', 'blue']],
  ]);

  const apparelShortElement = document.querySelector('.apparelShort');
  const apparelGoodElement = document.querySelector('.apparelGood');
  const apparelLongElement = document.querySelector('.apparelLong');

  getData(data.CPIAPPSL, [
    [
      1,
      [
        [apparelShortElement, ['an upward', 'red'], ['a downward', 'green'], ['a neutral', 'blue']],
        [apparelGoodElement, ['good', 'green'], ['bad', 'red'], ['normal', 'blue']],
      ],
    ],
    [12, [[apparelLongElement, ['an upward', 'red'], ['a downward', 'green'], ['a neutral', 'blue']]]],
  ]);

  const airlineTrendElement = document.querySelector('.airlineTrend');
  const airlineGoodTimeElement = document.querySelector('.airlineGoodTime');

  getData(data.CUSR0000SETG01, [
    [
      3,
      [
        [airlineTrendElement, ['gone up', 'red'], ['gone down', 'green'], ['remained neutral', 'blue']],
        [
          airlineGoodTimeElement,
          ['more expensive, signaling that you should hold off on leisure/nonessential air travel.', 'red'],
          [
            'cheaper, suggesting that now is a great time to book leisure travel (or any airfare) in order to get the best value for your money.',
            'green',
          ],
          ['priced about the same as usual. ', 'blue'],
        ],
      ],
    ],
  ]);

  const vehiclesUpElement = document.querySelector('.vehiclesUp');
  const vehiclesUpwardsElement = document.querySelector('.vehiclesUpwards');
  const vehiclesCostMoreElement = document.querySelector('.vehiclesCostMore');
  const vehiclesBadElement = document.querySelector('.vehiclesBad');

  getData(data.CUUR0000SETA01, [
    [
      3,
      [
        [vehiclesUpElement, ['up', 'red'], ['down', 'green'], ['not displaying a noticeable change', 'blue']],
        [vehiclesCostMoreElement, ['more', 'red'], ['less', 'green'], ['about the same', 'blue']],
        [
          vehiclesBadElement,
          ["wouldn't be a great time to purchase, for example, a new car or truck", 'red'],
          ['would probably be a good time to purchase, for example, a new car or truck', 'green'],
          ['would be an average price scenario in which to purchase, for example, a new car or truck.', 'blue'],
        ],
      ],
    ],
    [12, [[vehiclesUpwardsElement, ['up', 'red'], ['down', 'green'], ['at the same level']]]],
  ]);

  const goldChangeLongElement = document.querySelector('.goldChangeLong');

  getData(data.GOLD, [
    [24, [[goldChangeLongElement, ['has risen', 'green'], ['has gone down', 'red'], ['has remained the same', 'blue']]]],
  ]);
};

main();
