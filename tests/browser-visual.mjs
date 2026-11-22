import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { resolve, extname, join } from 'node:path';
import assert from 'node:assert/strict';

const ROOT=process.cwd();
const mime={'.html':'text/html; charset=utf-8','.svg':'image/svg+xml','.css':'text/css','.js':'text/javascript','.png':'image/png'};
const server=createServer(async(req,res)=>{
 try{
  const raw=decodeURIComponent((req.url||'/').split('?')[0]);
  const path=resolve(ROOT,'.'+(raw==='/'?'/index.html':raw));
  if(!path.startsWith(ROOT+'/')){res.writeHead(403).end();return}
  const bytes=await readFile(path);
  res.writeHead(200,{'Content-Type':mime[extname(path)]||'application/octet-stream'}).end(bytes)
 }catch{res.writeHead(404).end('Not found')}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const url='http://127.0.0.1:'+server.address().port;
const cases=[{label:'desktop',w:1440,h:900},{label:'split',w:940,h:978},{label:'tablet',w:1194,h:834},{label:'phone',w:390,h:844}];
await mkdir('artifacts/browser-qa',{recursive:true});
const browser=await chromium.launch({headless:true});
const results=[];
try{
 for(const v of cases){
  const page=await browser.newPage({viewport:{width:v.w,height:v.h},deviceScaleFactor:1,locale:'he-IL'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(url,{waitUntil:'networkidle'});
  await page.screenshot({path:'artifacts/browser-qa/'+v.label+'-home.png'});
  await page.locator('#appsToggle').click();
  assert.equal(await page.locator('#appsPanel').isVisible(),true);
  const appStats=await page.locator('#appsPanel').evaluate(el=>({client:el.clientHeight,scroll:el.scrollHeight}));
  await page.screenshot({path:'artifacts/browser-qa/'+v.label+'-apps.png'});
  await page.locator('#profileToggle').click();
  await page.locator('#revealFromProfile').click();
  assert.equal(await page.locator('#lab').isVisible(),true);
  assert.equal(await page.locator('#labOverview').isVisible(),true);
  await page.screenshot({path:'artifacts/browser-qa/'+v.label+'-reveal.png'});
  await page.locator('[data-lab-tab="events"]').click();
  assert.equal(await page.locator('#labEvents').isVisible(),true);
  await page.locator('[data-lab-tab="visual"]').click();
  assert.equal(await page.locator('#labVisual').isVisible(),true);
  await page.locator('#openComparison').click();
  assert.equal(await page.locator('#compareModal').isVisible(),true);
  await page.locator('#closeComparison').click();
  await page.locator('[data-lab-tab="defense"]').click();
  assert.equal(await page.locator('#labDefense').isVisible(),true);
  await page.locator('#closeLab').click();
  assert.equal(await page.locator('#lab').isVisible(),false);
  const dims=await page.evaluate(()=>({horizontalOverflow:document.documentElement.scrollWidth-innerWidth,bodyHeight:document.documentElement.scrollHeight,viewportHeight:innerHeight,appTitle:document.querySelector('#lens')?.getAttribute('title'),tabCount:document.querySelectorAll('[data-lab-tab]').length}));
  assert.ok(dims.horizontalOverflow<=2,'Horizontal overflow at '+v.label+': '+dims.horizontalOverflow);
  assert.equal(dims.appTitle,'חיפוש לפי תמונה');
  assert.equal(dims.tabCount,4);
  assert.deepEqual(errors,[],'JavaScript exceptions at '+v.label);
  results.push({viewport:v.label,dimensions:v.w+'x'+v.h,appMenu:appStats,reveal:'passed',tabs:'passed',errors:errors.length});
  await page.close();
 }
 console.log(JSON.stringify({status:'passed',results},null,2));
}finally{await browser.close();await new Promise(resolve=>server.close(resolve))}
