/* Native-resolution comparison: no stretching of the 320x157 historic bitmap. */
(() => {
"use strict";
if(new URLSearchParams(location.search).has("comparison-embed"))return;
const $=id=>document.getElementById(id);
const figure=document.querySelector("#labVisual .lab-reference"),modal=$("compareModal"),open=$("openComparison");
if(!figure||!modal||!open)return;
const google="https://upload.wikimedia.org/wikipedia/commons/d/d6/Google_Dark_screenshots.png";
const source="https://commons.wikimedia.org/wiki/File:Google_Dark_screenshots.png";
const panel='<div class="sharp-comparison">'
  +'<section class="sharp-panel" aria-label="Google archive"><div class="sharp-panel-label"><span>Google · Reference</span><small>Dark mode · 2021 · 1366 × 768</small></div>'
  +'<div class="sharp-viewport"><img src="'+google+'" alt="Actual Google dark-mode archival screenshot" width="1366" height="768" loading="lazy" decoding="async"></div></section>'
  +'<section class="sharp-panel" aria-label="Live notGoogle"><div class="sharp-panel-label"><span>notGoogle · Your site</span><small>Live · 1366 × 768</small></div>'
  +'<div class="sharp-viewport"><iframe data-sharp-live loading="lazy" tabindex="-1" title="Live notGoogle desktop view"></iframe></div></section></div>';
figure.innerHTML='<div class="sharp-main"><div class="sharp-head"><div><strong>Google מול notGoogle — השוואה חדה</strong>'
  +'<p>צילום ייחוס אמיתי לעומת הגרסה החיה של האתר שלך</p></div><button type="button" id="sharpOpenLarge">הגדל ↗</button></div>'
  +panel+'<div class="sharp-description">Google: צילום ארכיוני במצב כהה משנת 2021, לא צילום של הממשק היום. '
  +'notGoogle: האתר הנוכחי ברזולוציה תואמת. <a href="'+source+'" target="_blank" rel="noopener noreferrer">מקור · Wikimedia Commons</a>. '
  +'אפשר גם לטעון שני צילומים עדכניים משלך.</div></div>';
const oldImages=modal.querySelector(".compare-images"), uploads=modal.querySelector(".compare-pickers");
const quick=modal.querySelector(".compare-quick");
const block=document.createElement("div");block.id="sharpModalBlock";block.className="sharp-modal-block";
block.innerHTML=panel+'<div class="sharp-description">צילום Google ממקור חד, לצד notGoogle החי. '
  +'הצילום של Google ארכיוני: <a href="'+source+'" target="_blank" rel="noopener noreferrer">מקור</a>. '
  +'להשוואה מדויקת באותו יום ובאותו גודל מסך, אפשר לטעון שני צילומים משלך.</div>';
quick.after(block);
const controls=document.createElement("div");controls.className="sharp-modal-commands";
controls.innerHTML='<button type="button" id="sharpCustomImages">בחר שני צילומים משלך</button>'
  +'<button type="button" id="sharpDefaultImages">חזור להשוואה החדה</button>';
quick.after(controls);
const note=quick.querySelector("span");if(note)note.textContent="צילום Google חד לצד notGoogle ברזולוציה תואמת. לא מגדילים את קובץ ה-320px.";
const title=$("compareTitle");if(title)title.textContent="השוואה חדה — Google מול notGoogle";
const p=modal.querySelector(".compare-header p");
if(p)p.textContent="צילום ייחוס אמיתי לצד האתר החי. ניתן לטעון שני צילומים תואמים משלך.";
function resizeFrames(){
 for(const frame of document.querySelectorAll("[data-sharp-live]")){
  const width=frame.parentElement?.getBoundingClientRect().width||0;
  if(width>0)frame.style.transform="scale("+(width/1366)+")";
 }
}
function showSharp(){
 block.hidden=false;oldImages?.classList.add("sharp-hidden");uploads?.classList.add("sharp-hidden");
 requestAnimationFrame(resizeFrames);
}
function showUpload(){
 block.hidden=true;oldImages?.classList.remove("sharp-hidden");uploads?.classList.remove("sharp-hidden");
}
$("sharpCustomImages").addEventListener("click",showUpload);
$("sharpDefaultImages").addEventListener("click",showSharp);
const reset=$("loadSavedComparison");if(reset){reset.textContent="השוואה חדה";reset.onclick=showSharp}
open.onclick=()=>{modal.hidden=false;showSharp();$("closeComparison")?.focus()};
$("sharpOpenLarge").addEventListener("click",()=>open.click());
const filename=location.pathname.endsWith("/")?"index.html":location.pathname.split("/").pop();
for(const f of document.querySelectorAll("[data-sharp-live]"))f.src=filename+"?comparison-embed=1";
if("ResizeObserver" in window){
 const ro=new ResizeObserver(resizeFrames);
 for(const f of document.querySelectorAll("[data-sharp-live]"))ro.observe(f.parentElement);
}
window.addEventListener("resize",resizeFrames);requestAnimationFrame(resizeFrames);
})();