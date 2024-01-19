import{S as m,i as f}from"./assets/vendor-46aac873.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const p="41856327-3235cf4f5968f0d75f22e6e35",u=document.getElementById("search-form"),y=document.getElementById("search-input"),a=document.getElementById("image-gallery"),l=document.getElementById("loader");l.style.visibility="hidden";let c;u.addEventListener("submit",async t=>{t.preventDefault();const i=y.value.trim();if(i!==""){l.style.visibility="visible";try{const o=await fetch(`https://pixabay.com/api/?key=${p}&q=${i}&image_type=photo&orientation=horizontal&safesearch=true`);if(!o.ok)throw new Error("Network response was not ok");const n=await o.json();h(n.hits)}catch{d()}finally{l.style.visibility="hidden"}}});function h(t){if(t.length===0){d();return}a.innerHTML="";const i=t.map(n=>g(n));a.append(...i);let o={image_type:"photo",orientation:"horizontal",safesearch:!0};c=new m(".gallery a",o),c.refresh()}function g(t){const i=document.createElement("a");return i.href=t.largeImageURL,i.setAttribute("data-lightbox","image-gallery"),i.innerHTML=`
  <div class="galery-item">
    <img src="${t.webformatURL}" alt="${t.tags}">
    <div class="image-info">
      <div class="img-info-item">
        <p>Likes:</p>
        <p> ${t.likes}</p>
      </div>
      <div class="img-info-item">
        <p>Views: </p>
        <p>${t.views}</p>
      </div>
      <div class="img-info-item">
        <p>Comments: </p>
        <p>${t.comments}</p>
      </div>
      <div class="img-info-item">
        <p>Downloads: </p>
        <p>${t.downloads}</p>
      </div>
    </div>
  </div>
  `,i}function d(){a.innerHTML="",f.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"center"})}
//# sourceMappingURL=commonHelpers.js.map
