/* Bespoke — shared nav + footer injection + behaviours for interior pages */
(function(){
  const NAV = `
  <nav class="nav" id="nav">
    <a class="brand" href="index.html">
      <img class="brand-logo brand-white" src="assets/logo-white.png" alt="Bespoke Pools and Landscapes">
      <img class="brand-logo brand-green" src="assets/logo-green.png" alt="Bespoke Pools and Landscapes">
    </a>
    <div class="navlinks">
      <div class="has-dropdown">
        <a href="pools.html">Pools <svg class="caret" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></a>
        <div class="dropdown">
          <a href="custom.html">Custom concrete<small>Designed to your block</small></a>
          <a href="plunge.html">Plunge pools<small>Fast install, Plungie partner</small></a>
          <a href="renovations.html">Pool renovations<small>Bring an old pool back</small></a>
        </div>
      </div>
      <a href="landscaping.html">Landscaping</a>
      <a href="gallery.html">Gallery</a>
      <a href="careers.html">Careers</a>
      <a class="btn" href="contact.html">Enquire</a>
    </div>
    <button class="navtoggle" aria-label="Menu"><span></span><span></span><span></span></button>
  </nav>`;

  const FOOTER = `
  <footer class="footer">
    <div class="wrap">
      <div class="footer__top">
        <div class="footer__brand">
          <img src="assets/logo-white.png" alt="Bespoke Pools and Landscapes">
          <p>Brisbane's whole-backyard pool builder. Custom concrete pools, fencing and landscaping, designed and delivered by one trusted team.</p>
        </div>
        <div class="fcol">
          <h5>Pools</h5>
          <a href="custom.html">Custom concrete</a>
          <a href="plunge.html">Plunge pools</a>
          <a href="renovations.html">Pool renovations</a>
        </div>
        <div class="fcol">
          <h5>Explore</h5>
          <a href="landscaping.html">Landscaping</a>
          <a href="fencing.html">Pool &amp; glass fencing</a>
          <a href="gallery.html">Gallery</a>
          <a href="careers.html">Careers</a>
          <a href="process.html">Our process</a>
          <a href="faq.html">FAQ</a>
        </div>
        <div class="fcol">
          <h5>Get in touch</h5>
          <a href="tel:0425711975">Matt · 0425 711 975</a>
          <a href="tel:0451221820">Josh · 0451 221 820</a>
          <a href="mailto:info@bespokescapes.com.au">info@bespokescapes.com.au</a>
          <p>PO Box 31, Geebung QLD 4034</p>
          <a href="contact.html" class="textlink" style="color:var(--gold-soft);margin-top:10px">Start a project</a>
        </div>
      </div>
      <div class="footer__bar">
        <span>© 2026 Bespoke Pools &amp; Landscapes. QBCC licensed &amp; insured.</span>
        <span>Custom concrete pools · Plunge pools · Fencing · Landscaping · Brisbane</span>
      </div>
    </div>
  </footer>`;

  document.body.insertAdjacentHTML('afterbegin', NAV);
  document.body.insertAdjacentHTML('beforeend', FOOTER);

  const nav=document.getElementById('nav');

  // nav solid once past the page hero
  const phero=document.querySelector('.phero');
  const trigger=()=>{ const t = phero ? phero.offsetHeight*0.7 : 40; if(nav) nav.classList.toggle('scrolled', scrollY>t); };
  addEventListener('scroll',trigger,{passive:true}); trigger();

  // mobile menu
  const toggle=nav.querySelector('.navtoggle');
  if(toggle) toggle.addEventListener('click',()=>nav.classList.toggle('menu-open'));
  nav.querySelectorAll('.navlinks a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('menu-open')));

  // page-hero parallax
  const pmedia=document.querySelector('.phero__media');
  if(pmedia) addEventListener('scroll',()=>{ pmedia.style.transform=`translateY(${scrollY*0.22}px)`; },{passive:true});

  // reveals
  const io=new IntersectionObserver((es)=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.16});
  document.querySelectorAll('.io').forEach(el=>io.observe(el));

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item=>{
    const q=item.querySelector('.faq-q'); const a=item.querySelector('.faq-a');
    if(!q||!a)return;
    q.addEventListener('click',()=>{
      const open=item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o=>{o.classList.remove('open');o.querySelector('.faq-a').style.maxHeight=null;});
      if(!open){ item.classList.add('open'); a.style.maxHeight=a.scrollHeight+'px'; }
    });
  });

  // gallery filter
  const chips=document.querySelectorAll('.chip');
  const tiles=document.querySelectorAll('.gtile');
  chips.forEach(chip=>chip.addEventListener('click',()=>{
    chips.forEach(c=>c.classList.remove('on')); chip.classList.add('on');
    const f=chip.dataset.filter;
    tiles.forEach(t=>{ t.style.display = (f==='all'||(t.dataset.tags||'').includes(f)) ? '' : 'none'; });
  }));

  // contact form (prototype: no backend)
  const form=document.getElementById('enquiry');
  if(form) form.addEventListener('submit',e=>{ e.preventDefault(); const btn=form.querySelector('[type=submit]'); if(btn){btn.textContent='Thanks, we’ll be in touch shortly'; btn.disabled=true;} });
})();
