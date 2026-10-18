import fs from 'node:fs';
import assert from 'node:assert/strict';
import {questions,words,engineering} from './data.js';
const unique=a=>new Set(a).size===a.length;
assert.equal(questions.length,36);
assert.equal(words.length,20);
assert.equal(engineering.length,20);
assert(unique(questions.map(x=>x.id))&&unique(words.map(x=>x.id))&&unique(engineering.map(x=>x.id)));
for(const q of questions){assert.equal(q.part,5);assert.equal(q.options.length,4);assert(q.answer>=0&&q.answer<4);assert(q.question.includes('_____'));assert(q.explanation.length>=8);assert(q.grammar&&q.topic)}
for(const w of [...words,...engineering])assert(w.term&&w.zh&&w.example&&w.exampleZh);
for(const f of ['index.html','styles.css','app.js','data.js','sw.js','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png'])assert(fs.existsSync(new URL(f,import.meta.url)));
const manifest=JSON.parse(fs.readFileSync(new URL('./manifest.webmanifest',import.meta.url)));
assert.equal(manifest.display,'standalone');assert.equal(manifest.icons.length,2);
const app=fs.readFileSync(new URL('./app.js',import.meta.url),'utf8');
for(const functionName of ['initDB','getData','save','practice','quiz','lexicon','stats','exportData','importData','render'])assert(app.includes(`function ${functionName}`));
console.log('PASS: 36 original Part 5 questions, 20 business words, 20 engineering terms');
console.log('PASS: question/answer/explanation schema, unique IDs, assets, manifest, major app functions');
