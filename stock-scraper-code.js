function recordSemiconductorStocks() {
  // 調べたい銘柄のリスト（NVIDIA, TSMC, マイクロン）
  var symbols = ["NVDA", "TSM", "MU", "MSFT", "GOOGL", "AMZN"];
  
  // スプレッドシートに書き込むためのデータの箱（最初は今日の日付を入れておく）
  var rowData = [new Date()]; 
  
  // アクセスする時の設定
  var options = {
    "method": "get",
    "headers": {
      "User-Agent": "Mozilla/5.0"
    },
    "muteHttpExceptions": true
  };
  
  // 3つの銘柄を順番にループしてAPIを叩く！
  for (var i = 0; i < symbols.length; i++) {
    var url = "https://query1.finance.yahoo.com/v8/finance/chart/" + symbols[i];
    var response = UrlFetchApp.fetch(url, options);
    var json = JSON.parse(response.getContentText());
    
    // 株価を抜き出す
    var price = json.chart.result[0].meta.regularMarketPrice;
    
    // 抜き出した株価をデータの箱に横につなげていく
    rowData.push(price);
  }
  
  // スプレッドシートに書き込む
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // [日時, NVDAの株価, TSMの株価, MUの株価] を1行にまとめてドン！と追記
  sheet.appendRow(rowData);
  
  Logger.log("半導体3社、ビッグテック3社の株価、書き込み完了しました！");
}