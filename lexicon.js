// Pure vocabulary filtering; shared by UI and self-checks.
export const LEXICON_PAGE_SIZE=30;
export const normalizeLexicon=value=>String(value??'').normalize('NFKC').toLocaleLowerCase().trim();
export function filterLexicon(items,state,reviews={}){
 const tokens=normalizeLexicon(state.search).split(/\s+/).filter(Boolean);
 return items.filter(item=>{
  if(state.topic!=='all'&&item.topic!==state.topic)return false;
  if(state.tier!=='all'&&item.tier!==state.tier)return false;
  if(state.status==='studied'&&!reviews[item.id])return false;
  if(state.status==='pending'&&reviews[item.id])return false;
  const haystack=normalizeLexicon([item.term,item.zh,item.collocation,item.collocationZh,item.example,item.exampleZh,item.topic].join(' '));
  return tokens.every(token=>haystack.includes(token));
 });
}
export function lexiconPage(items,state,reviews={}){
 const matched=filterLexicon(items,state,reviews),pages=Math.max(1,Math.ceil(matched.length/LEXICON_PAGE_SIZE));
 const pageNo=Math.max(0,Math.min(Number.isFinite(state.pageNo)?state.pageNo:0,pages-1));
 return {items:matched.slice(pageNo*LEXICON_PAGE_SIZE,(pageNo+1)*LEXICON_PAGE_SIZE),total:matched.length,pages,pageNo};
}
export const LEXICON_SOURCES=[
 ['ETS｜分數能力說明','https://www.ets.org/toeic/resources/scores/score-use.html'],
 ['ECDICT｜基礎英中詞義（MIT 授權）','https://github.com/skywind3000/ECDICT'],
 ['Pfeiffer｜真空技術','https://www.pfeiffervacuum.com/global/en/knowledge/vacuum-technology/knowledge-book/table_of_content/'],
 ['Leybold｜測漏與放氣','https://www.leybold.com/en/knowledge/vacuum-fundamentals/leak-detection/basics-of-leak-detection'],
 ['MKS｜質量流量控制','https://s1.mks.com/mass-flow-technology-technote'],
 ['Lam Research｜製程術語','https://www.lamresearch.com/technical-glossary/'],
 ['ASML｜微影原理','https://www.asml.com/en/technology/lithography-principles'],
 ['Fluke｜電學量測術語','https://www.fluke.com/en/learn/blog/electrical/multimeter-common-terminology'],
 ['NIST｜量測追溯性','https://www.nist.gov/calibrations/traceability'],
 ['OSHA｜上鎖掛牌','https://www.osha.gov/control-hazardous-energy/program']
];
