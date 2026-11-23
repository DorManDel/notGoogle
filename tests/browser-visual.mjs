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
  if(v.w>650){
   const ai=page.locator('#ai');
   await ai.evaluate(el=>{
     if(el.classList.contains('is-loading'))el.classList.remove('is-loading');
   });
   await page.waitForTimeout(260);
   const idle=await ai.evaluate(el=>({
     visible:getComputedStyle(el,'::before').opacity,
     gradient:getComputedStyle(el,'::before').backgroundImage,
     mask:getComputedStyle(el,'::before').maskImage
   }));
   assert.equal(idle.visible,'0','Masked prism must be hidden when idle at '+v.label);
   assert.match(idle.gradient,/conic-gradient/,'Fixed rainbow disc expected at '+v.label);
   assert.match(idle.mask,/conic-gradient/,'Moving wedge mask expected at '+v.label);
   const box=await ai.boundingBox();assert.ok(box,'AI button should be visible at '+v.label);
   await page.mouse.move(box.x+box.width*.22,box.y+box.height/2);
   await page.waitForTimeout(280);
   const left=await ai.evaluate(el=>({
      visible:getComputedStyle(el,'::before').opacity,
      angle:parseFloat(el.style.getPropertyValue('--wedge-angle'))
   }));
   await page.screenshot({path:'artifacts/browser-qa/'+v.label+'-ai-left.png'});
   await page.mouse.move(box.x+box.width*.78,box.y+box.height/2);
   const right=await ai.evaluate(el=>({
      visible:getComputedStyle(el,'::before').opacity,
      angle:parseFloat(el.style.getPropertyValue('--wedge-angle'))
   }));
   await page.screenshot({path:'artifacts/browser-qa/'+v.label+'-ai-right.png'});
   assert.ok(Math.abs(left.angle-right.angle)>90,'Light wedge must follow cursor direction '+v.label);
   assert.equal(left.visible,'1','Prism should be visible on hover at '+v.label);
   assert.equal(right.visible,'1','Prism should be visible on hover at '+v.label);
   await page.mouse.move(0,box.y+box.height+80);
   await page.waitForTimeout(320);
   const off=await ai.evaluate(el=>getComputedStyle(el,'::before').opacity);
   assert.equal(off,'0','Prism must disappear after hover at '+v.label);
  }


  // Compact keyboard and single tooltip regression checks.
  await page.locator('#keyboard').click();
  assert.equal(await page.locator('#inputToolsPanel').isVisible(),true);
  const panelStyle=await page.locator('#inputToolsPanel').evaluate(el=>({
    background:getComputedStyle(el).backgroundColor,
    keys:el.querySelectorAll('.keyboard-key').length
  }));
  assert.ok(panelStyle.keys>=30,'Expected a full keyboard at '+v.label);
  assert.equal(panelStyle.background,'rgb(248, 249, 250)');
  await page.getByRole('button',{name:'Shift'}).click();
  assert.match(await page.locator('#inputModeLabel').innerText(),/ENGLISH/);
  await page.locator('#inputKeys .keyboard-row:nth-child(2) button').first().click();
  const typed=await page.locator('#query').inputValue();
  assert.ok(typed.length>0,'Keyboard must type into search');
  await page.getByRole('button',{name:'Ctrl + Alt'}).click();
  assert.match(await page.locator('#inputModeLabel').innerText(),/סמלים/);
  await page.locator('#closeInputTools').click();
  assert.equal(await page.locator('#inputToolsPanel').isVisible(),false);
  // Do not leave a search value that alters later screenshots.
  await page.locator('#query').fill('');
  for(const selector of ['#lens','#mic','#keyboard']){
    const title=await page.locator(selector).getAttribute('title');
    assert.equal(title,null,'No duplicate native title tooltip: '+selector);
  }

  await page.locator('#appsToggle').click();
  assert.equal(await page.locator('#appsPanel').isVisible(),true);
  const appStats=await page.locator('#appsScroll').evaluate(el=>({
    client:el.clientHeight,scroll:el.scrollHeight,computedOverflow:getComputedStyle(el).overflowY
  }));
  const appCount=await page.locator('#appsPanel .app').count();
  assert.ok(appCount>=38,'Expected expanded catalog at '+v.label+', got '+appCount);
  assert.ok(appStats.scroll>appStats.client+80,'Inner launcher must scroll at '+v.label);
  assert.equal(appStats.computedOverflow,'auto','Only the inner pane should scroll');
  await page.screenshot({path:'artifacts/browser-qa/'+v.label+'-apps.png'});
  await page.locator('#appsScroll').evaluate(el=>{el.scrollTop=el.scrollHeight});
  await page.screenshot({path:'artifacts/browser-qa/'+v.label+'-apps-bottom.png'});
  await page.locator('#appsEdit').click();
  assert.equal(await page.locator('#appsEditControls').isVisible(),true);
  await page.locator('#appsCancel').click();
  assert.equal(await page.locator('#appsEdit').isVisible(),true);
  await page.locator('#appsScroll').evaluate(el=>{el.scrollTop=0});
  await page.locator('#profileToggle').click();
  await page.locator('#revealFromProfile').click();
  assert.equal(await page.locator('#lab').isVisible(),true);
  assert.equal(await page.locator('#labOverview').isVisible(),true);
  await page.screenshot({path:'artifacts/browser-qa/'+v.label+'-reveal.png'});
  await page.locator('[data-lab-tab="events"]').click();
  assert.equal(await page.locator('#labEvents').isVisible(),true);
  await page.locator('[data-lab-tab="visual"]').click();
  assert.equal(await page.locator('#labVisual').isVisible(),true);
  const historicImage=page.locator('.lab-reference-image img');
  await historicImage.scrollIntoViewIfNeeded();
  await historicImage.evaluate(async img=>{if(!img.complete)await img.decode().catch(()=>{});});
  assert.equal(await historicImage.isVisible(),true,'Built-in historical image visible in Visual tab');
  const pic=await historicImage.evaluate(img=>({loaded:img.complete&&img.naturalWidth>0,width:img.naturalWidth,height:img.naturalHeight}));
  assert.equal(pic.loaded,true,'Historical comparison asset must decode on '+v.label);

  await page.locator('#openComparison').click();
  assert.equal(await page.locator('#compareModal').isVisible(),true);
  await page.locator('#closeComparison').click();
  await page.locator('[data-lab-tab="defense"]').click();
  assert.equal(await page.locator('#labDefense').isVisible(),true);
  await page.locator('#closeLab').click();
  assert.equal(await page.locator('#lab').isVisible(),false);
  const dims=await page.evaluate(()=>{
   window.scrollTo({left:1000,top:0,behavior:'instant'});const movedRight=window.scrollX;
   window.scrollTo({left:-1000,top:0,behavior:'instant'});const movedLeft=window.scrollX;
   window.scrollTo({left:0,top:0,behavior:'instant'});
   return {
     horizontalOverflow:document.documentElement.scrollWidth-innerWidth,
     actualHorizontalScroll:Math.max(Math.abs(movedRight),Math.abs(movedLeft)),
     bodyHeight:document.documentElement.scrollHeight,viewportHeight:innerHeight,
     appTitle:document.querySelector('#lens')?.getAttribute('title'),
     tabCount:document.querySelectorAll('[data-lab-tab]').length
   };
  });
  if(dims.horizontalOverflow>2){
    const offenders=await page.evaluate(()=>Array.from(document.querySelectorAll('*')).filter(el=>{
      const style=getComputedStyle(el);if(style.display==='none'||style.visibility==='hidden')return false;
      const r=el.getBoundingClientRect();
      return (r.right>innerWidth+1 || r.left < -1)&&r.width>0 && r.height>0
    }).slice(0,24).map(el=>({tag:el.tagName,id:el.id,cls:String(el.className).slice(0,70),rect:(()=>{const r=el.getBoundingClientRect();return {left:Math.round(r.left),right:Math.round(r.right),width:Math.round(r.width)}})(),text:el.textContent?.slice(0,25)})));
    console.log('OVERFLOW_DIAGNOSTICS',JSON.stringify({viewport:v.label,overflow:dims.horizontalOverflow,offenders},null,2));
  }
  assert.ok(dims.actualHorizontalScroll<=2,'Horizontal panning at '+v.label+': '+dims.actualHorizontalScroll+' (raw scrollWidth delta '+dims.horizontalOverflow+')');
  assert.equal(dims.appTitle,'חיפוש לפי תמונה');
  assert.equal(dims.tabCount,4);
  assert.deepEqual(errors,[],'JavaScript exceptions at '+v.label);
  results.push({viewport:v.label,dimensions:v.w+'x'+v.h,appMenu:appStats,reveal:'passed',tabs:'passed',errors:errors.length});
  await page.close();
 }
 console.log(JSON.stringify({status:'passed',results},null,2));
}finally{await browser.close();await new Promise(resolve=>server.close(resolve))}
