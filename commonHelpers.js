import{a as f,S as v,i as y}from"./assets/vendor-89feecc5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))c(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const m of n.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&c(m)}).observe(document,{childList:!0,subtree:!0});function a(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerpolicy&&(n.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?n.credentials="include":r.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function c(r){if(r.ep)return;r.ep=!0;const n=a(r);fetch(r.href,n)}})();const h="41856327-3235cf4f5968f0d75f22e6e35",$=document.getElementById("search-form"),I=document.getElementById("search-input"),i=document.getElementById("image-gallery"),q=document.getElementById("spinner"),u=document.getElementById("load-more");let p,l=1,o=40,g="";const w=()=>{const t=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})};$.addEventListener("submit",async e=>{e.preventDefault();const t=I.value.trim();if(t!==""){g=t;try{s(!0);const c=(await f.get(`https://pixabay.com/api/?key=${h}&q=${g}&image_type=photo&orientation=horizontal&safesearch=true&page=${l}&per_page=${o}`)).data;S(c.hits.slice(0,o)),l=1}catch{b()}finally{s(!1),d()}}});u.addEventListener("click",async()=>{u.setAttribute("style","display: none;"),l+=1,await B(),w()});async function B(){try{if(I.value.trim()==="")return;s(!0);const a=(await f.get(`https://pixabay.com/api/?key=${h}&q=${g}&image_type=photo&orientation=horizontal&safesearch=true&page=${l}&per_page=${o}`)).data;_(a.hits.slice(0,o))}catch{L()}finally{s(!1)}}function S(e){if(e.length===0){b();return}e.length<o?(d(),s(!1)):d(),i.innerHTML="";const t=e.map(E);i.append(...t),p=new v(".gallery a",{q:g,image_type:"photo",orientation:"horizontal",safesearch:!0,page:l,per_page:o}),p.refresh()}function _(e){if(e.length===0){d(),s(!1),L();return}const t=e.map(E);i.append(...t),p.refresh()}function E(e){const t=document.createElement("a");return t.href=e.largeImageURL,t.setAttribute("data-lightbox","image-gallery"),t.innerHTML=`
    <div class="gallery-item">
      <img src="${e.webformatURL}" alt="${e.tags}">
    </div>
  `,t}function L(){u.setAttribute("style","display: none;"),y.info({title:"Info",message:"We're sorry, but you've reached the end of search results",position:"center"})}function b(){i.innerHTML="",y.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"center"})}const x=()=>i.children.length>0,d=()=>{u.classList.toggle("is-hidden",!x())},s=e=>{q.classList.toggle("is-hidden",!e)};
//# sourceMappingURL=commonHelpers.js.map
