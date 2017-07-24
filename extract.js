const cheerio = require('cheerio');
const fs = require('fs');
const print = console.log.bind(console);

/*
sources:
curl http://www.hko.gov.hk/cgi-bin/hko/warndb_c1.pl?opt=1&sgnl=91&start_ym=194601&end_ym=201707&submit=%E6%90%9C%E5%B0%8B > data.html
*/

const html = fs.readFileSync('data.html').toString();
const $ = cheerio.load(html);

const records = [];
$('table[border=2] tr').each( (i, tr) => {
  let record = [];
  $(tr).find('td').each( (i, td) => {
      record.push($(td).text().trim());
  });
  records.push(record.join(','));
});

const header = 'intensity,name,signal,start_date,start_time,end_date,end_time,duration\n';
fs.writeFileSync('data.csv', header + records.join('\n').trim());
