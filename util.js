window.getData = async (data, replacements) => {
  replacements.forEach(([gap, gapReplacements]) => {
    const change = data[0].close - data[gap].close;

    gapReplacements.forEach(([node, more, less, equal]) => {      
      if (change < 0) {
        node.innerHTML = less[0];
        node.classList.add(less[1]);
      } else if (change > 0) {
        node.innerHTML = more[0];
        node.classList.add(more[1]);
      } else {
        node.innerHTML = equal[0];
        node.classList.add(equal[1]);
      }
    });
  });
};

class TradingViewChart extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<iframe scrolling="no" allowtransparency="true" frameborder="0" src="https://www.tradingview-widget.com/embed-widget/advanced-chart/?locale=en#%7B%22autosize%22%3Atrue%2C%22symbol%22%3A%22${this.getAttribute('data-ticker')}%22%2C%22interval%22%3A%22M%22%2C%22timezone%22%3A%22America%2FNew_York%22%2C%22theme%22%3A%22dark%22%2C%22style%22%3A%221%22%2C%22enable_publishing%22%3Afalse%2C%22backgroundColor%22%3A%22rgba(0%2C%200%2C%200%2C%201)%22%2C%22gridColor%22%3A%22rgba(73%2C%20133%2C%20231%2C%200.06)%22%2C%22hide_top_toolbar%22%3Atrue%2C%22hide_legend%22%3Atrue%2C%22studies%22%3A%5B%22STD%3BSupertrend%22%5D%2C%22support_host%22%3A%22https%3A%2F%2Fwww.tradingview.com%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A%22100%25%22%2C%22utm_source%22%3A%2212cc0370-59d9-4129-8fb4-daa513211b0f-00-1aa206o37v5bz.worf.replit.dev%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22advanced-chart%22%2C%22page-uri%22%3A%2212cc0370-59d9-4129-8fb4-daa513211b0f-00-1aa206o37v5bz.worf.replit.dev%2F%22%7D" lang="en" style="box-sizing: border-box; display: block; height: 100%; width: 100%;"></iframe>`;
  }
}

customElements.define('tv-chart', TradingViewChart);
