import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const root=new URL('../',import.meta.url);
const read=p=>readFileSync(new URL(p,root),'utf8');
const html=read('index.html');
const script=html.match(/<script>([\s\S]*?)<\/script>/)?.[1];

test('inline script parses and all looked-up IDs exist',()=>{
 assert.ok(script,'inline script exists');
 assert.doesNotThrow(()=>new Function(script));
 const ids=[...new Set([...script.matchAll(/\$\('([^']+)'\)/g)].map(m=>m[1]))];
 const missing=ids.filter(id=>!html.includes('id="'+id+'"'));
 assert.deepEqual(missing,[]);
});

test('reveal button is X-only and event log scrolls internally',()=>{
 assert.match(html, /id="closeLab"[^>]*aria-label="סגירת מסך הניתוח"/);
 assert.doesNotMatch(html, /id="closeLab"[^>]*>[^<]*סגירה/);
 assert.match(html, /class="event-scroll"/);
 assert.match(html, /\.event-scroll\{height:220px/);
 assert.match(html, /id="eventCount"/);
});

test('safe local comparison viewer and input tool labels',()=>{
 for(const id of ['openComparison','compareModal','referenceUpload','replicaUpload','closeComparison','addTool','quickActions','inputToolsPanel']) assert.ok(html.includes('id="'+id+'"'),id);
 assert.match(html, /data-tooltip="חיפוש לפי תמונה"/);
 assert.match(html, /data-tooltip="חיפוש קולי"/);
 assert.match(html, /data-tooltip="כלי הזנה"/);
 assert.doesNotMatch(html, /id="lens"[^>]*title=/);
 assert.match(html, /id="inputModeLabel"/);
 assert.match(html, /keyboardCaps=false/);
 assert.match(html, /URL\.createObjectURL\(file\)/);
 assert.match(html, /URL\.revokeObjectURL\(/);
});

test('fictional account has no form action and preserves demo disclosure',()=>{
 assert.match(html, /notGoogle · demo/);
 assert.match(html, /id="demoForm" novalidate autocomplete="off"/);
 assert.match(html, /DEMO_ONLY_PASSWORD='LabOnly-123!'/);
 assert.match(html, /storedPassword:false/);
 assert.doesNotMatch(html, /<form[^>]*id="demoForm"[^>]*action=/);
});

test('responsive footer and accessible reduced motion',()=>{
 assert.match(html, /max-width:1050px/);
 assert.match(html, /climate-callout\{order:-1/);
 assert.match(html, /prefers-reduced-motion:reduce/);
});

test('locally hosted app icons exist',()=>{
 for(const name of ['google','maps','gemini','youtube','photos','calendar','drive','gmail','sheets','docs','meet','news','translate','keyboard']) assert.ok(existsSync(new URL('assets/icons/'+name+'.svg',root)),name);
});
