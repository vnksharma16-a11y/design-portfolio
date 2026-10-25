'use strict';
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const projectCards = $$('.work-card');
$$('[data-filter]').forEach(button => button.addEventListener('click', () => {
  const value = button.dataset.filter;
  $$('[data-filter]').forEach(b => {b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button));});
  let count = 0;
  projectCards.forEach(card => {
    card.hidden = value !== 'all' && !card.dataset.categories.split(' ').includes(value);
    if (!card.hidden) count++;
    if (card.hidden) card.querySelector('video')?.pause();
  });
  $('#filter-status').textContent = 'Showing ' + count + ' projects.';
}));
function revealProjects() { $('[data-filter="all"]').click(); }
$$('a[href="#mini-v"],a[href="#work"]').forEach(a => a.addEventListener('click', revealProjects));

const panel = $('#mini-panel');
const launcher = $('#mini-launcher');
let miniOpener = launcher;
function openMini(opener = launcher) {
  miniOpener = opener;
  panel.hidden = false;
  launcher.setAttribute('aria-expanded','true');
  $('#close-mini').focus();
}
function closeMini() {
  panel.hidden = true;
  launcher.setAttribute('aria-expanded','false');
  miniOpener.focus();
}
launcher.addEventListener('click', () => panel.hidden ? openMini() : closeMini());
$$('[data-open-mini]').forEach(b => b.addEventListener('click', () => openMini(b)));
$('#close-mini').addEventListener('click', closeMini);
const miniAnswers = {
  services: ['Vinayak works on logos and brand identities, websites, social visuals and AI-assisted creative work. Tell him what you’re building and he’ll help define the right scope.', '#services', 'Explore the services ↗'],
  projects: ['Explore FENCO’s full logo design and showcase, SIEGER’s logo redraw, Charm U.S and Ayurvaidya. The Films section includes the Begun Online and KleanDiet ads, plus a self-initiated Westside sale concept—not a brand deal.', '#work', 'Explore the selected projects ↗'],
  about: ['Vinayak is a graphic designer and engineer based in Jaipur. He brings a visual eye and a builder’s mindset to brands and interactive experiences.', '#about', 'Meet Vinayak ↗'],
  contact: ['Have a project in mind? Call +91 7014021531, email vnksharma13@gmail.com or use the short brief below. Include your brand, deliverables, timeline and budget so the conversation can start in the right place.', '#contact', 'Start a project ↗']
};
$$('[data-mini-question]').forEach(b => b.addEventListener('click', () => {
  const [answer, href, label] = miniAnswers[b.dataset.miniQuestion];
  $('#mini-answer').textContent = answer;
  $('#mini-action').href = href;
  $('#mini-action').textContent = label;
  $$('[data-mini-question]').forEach(other => other.setAttribute('aria-pressed', String(other === b)));
}));
$('#mini-action').addEventListener('click', () => {revealProjects();closeMini();});
launcher.addEventListener('pointerenter', () => launcher.querySelector('img').src = 'assets/mini-v-thumbs.png');
launcher.addEventListener('pointerleave', () => launcher.querySelector('img').src = 'assets/mini-v-idle.png');

const cases = {
  fenco: { title:'FENCO', role:'Full logo design / Brand artwork / Architectural showcase', image:'assets/fenco-logo.png', imageClass:'fenco-case-logo', alt:'FENCO gold architectural monogram and wordmark', sections:[['My contribution','Complete logo design for FENCO Fenestration Systems, with primary, monogram and wordmark treatments, digital and print export preparation, and branded showcase imagery.'],['The visual direction','A dimensional gold F sits inside an open-frame form, connecting the mark to windows, doors and architectural openings.'],['Showing the identity in context','The architectural visuals below are AI-generated illustrative concepts used to present the identity in context. They are not photographs of completed installations or verified technical product renders.']], gallery:[{src:'assets/fenco-entrance-concept.jpg',alt:'FENCO emblem on a charcoal arched entrance concept',caption:'Charcoal arched entrance — AI-generated brand showcase concept.'},{src:'assets/fenco-french-door-concept.jpg',alt:'FENCO branding on a white arched French door concept',caption:'White arched French door — AI-generated brand showcase concept.'}],link:null },
  sieger: { title:'SIEGER', role:'Logo redraw / Artwork preparation — existing identity', image:'assets/sieger-logo.jpg', alt:'SIEGER redrawn logo on a white background', sections:[['My contribution','Logo redrawing and artwork preparation based on an existing supplied identity. The original logo concept and brand identity are not my design.'],['The delivery','Prepared primary-logo and mark-only treatments, transparent digital PNGs, light and dark background versions, and raster print exports.'],['Preserving the identity','The teal emblem, wordmark and Solutioning Redefined tagline retain the established visual identity while the export set makes the artwork easier to use consistently.']],gallery:[{src:'assets/sieger-logo-dark.jpg',alt:'SIEGER logo treatment on a dark background',caption:'Dark-background artwork treatment from the redraw delivery.'}],link:null },
  charm: { title:'Charm U.S', role:'Logo design / Animated brand presentation', image:'assets/charm-us-poster.png', alt:'Charm U.S logo reveal frame', sections:[['The visual idea','An infinity-shaped form flows into a fan of peacock-eye details. Rose-gold surfaces, blue eyes and deep burgundy lettering give the mark a distinctive material character.'],['The presentation','The supplied logo animation is shown directly in this portfolio. Play it to see the identity in motion.'],['My contribution','Logo design for Charm U.S.']], link:null },
  ayur: { title:'Ayurvaidya', role:'Logo design / Website design', image:'assets/ayurvaidya-logo.png', alt:'Ayurvaidya brand logo', sections:[['The visual idea','A green botanical form pairs with a gold lotus and oil-drop motif. The palette connects the identity to Ayurveda and carries through to the digital presence.'],['The digital experience','The live site brings consultation booking, herbal medicines and remedy information into one branded experience.'],['My contribution','The logo and website design.']], link:['https://ayurvaidya.life/','Explore the live website ↗'] },
  glitch: { title:'Style With Glitch', role:'Fashion content / AI-assisted visuals', sections:[['The project','A fashion and styling page that explores visual identity and social content. AI is part of the creative workflow used to develop visuals.'],['See the work','Visit the Instagram page for the published content. The typographic panel in this portfolio is a project cover, not a reproduction of a published post.']], link:['https://instagram.com/stylewithglitch','View the Instagram project ↗'] },
  klean: { title:'Klean.diet', role:'Logo design / Product advertisement', image:'assets/kleandiet-poster.png', alt:'KleanDiet product advertisement featuring Mini-V', sections:[['The project','Logo design and a product advertisement for KleanDiet. The video features monk fruit sweetener alongside my Mini-V digital companion.'],['Watch the advertisement','The complete supplied video is available in the Films section below.']], link:['#film-klean','Watch the KleanDiet advertisement ↓'] }
};
const dialog = $('#case-dialog');
$$('[data-case]').forEach(button => button.addEventListener('click', () => {
  const data = cases[button.dataset.case];
  $('#case-title').textContent = data.title;
  $('#case-role').textContent = data.role;
  const content = $('#case-content');content.replaceChildren();
  if (data.image) {const img = document.createElement('img');img.src = data.image;img.alt = data.alt;if(data.imageClass)img.className=data.imageClass;content.append(img);}
  data.sections.forEach(([title, body]) => {const h = document.createElement('h3');h.textContent=title;const p=document.createElement('p');p.textContent=body;content.append(h,p);});
  (data.gallery || []).forEach(item => {const figure=document.createElement('figure');figure.className='case-gallery-item';const image=document.createElement('img');image.src=item.src;image.alt=item.alt;image.loading='lazy';const caption=document.createElement('figcaption');caption.textContent=item.caption;figure.append(image,caption);content.append(figure);});
  if(data.link){const a=document.createElement('a');a.href=data.link[0];a.textContent=data.link[1];if(data.link[0].startsWith('#')){a.addEventListener('click',()=>dialog.close());}else{a.target='_blank';a.rel='noopener';}content.append(a);}
  dialog.showModal();
}));
$('#close-case').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { if(e.target === dialog) {const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
$('#case-contact').addEventListener('click', () => dialog.close());
document.addEventListener('keydown', e => {if(e.key === 'Escape' && !panel.hidden) closeMini();});
$$('[data-service]').forEach(a => a.addEventListener('click', () => $('#service').value = a.dataset.service));
$('#brief-form').addEventListener('submit', e => {
  e.preventDefault();
  const name = $('#name').value.trim(), brief = $('#brief').value.trim(), service = $('#service').value;
  if(!name || !brief){$('#form-status').textContent='Please add your name and a few details about the project.';return;}
  const body = 'Hi Vinayak,\n\nI’m ' + name + ' and I’d like to discuss ' + service.toLowerCase() + '.\n\n' + brief + '\n\nThanks,\n' + name;
  const href='mailto:vnksharma13@gmail.com?subject='+encodeURIComponent('Project enquiry — '+service)+'&body='+encodeURIComponent(body);
  const status=$('#form-status');status.replaceChildren();
  const retry=document.createElement('a');retry.href=href;retry.textContent='Open the prepared email ↗';retry.style.textDecoration='underline';
  status.append('Your brief is ready. If your email app did not open, ',retry,'.');
  window.location.href=href;
});
$('#copy-email').addEventListener('click', async () => {
  try{await navigator.clipboard.writeText('vnksharma13@gmail.com');$('#toast').textContent='Email address copied.';}
  catch{$('#toast').textContent='Email: vnksharma13@gmail.com';}
  $('#toast').hidden=false;setTimeout(()=>$('#toast').hidden=true,4000);
});
$('#year').textContent=String(new Date().getFullYear());
const emblemToggle = $('#toggle-emblem');
let emblemPaused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function updateEmblem() {
  $('#ayur-emblem').src = emblemPaused ? 'assets/ayurvaidya-emblem-still.svg' : 'assets/ayurvaidya-emblem.svg';
  emblemToggle.textContent = emblemPaused ? 'Play emblem' : 'Pause emblem';
  emblemToggle.setAttribute('aria-pressed', String(emblemPaused));
}
emblemToggle.addEventListener('click', () => {emblemPaused = !emblemPaused;updateEmblem();});
updateEmblem();
// Keep playback deliberate and avoid overlapping sound across the gallery.
$$('video').forEach(video => video.addEventListener('play', () => {
  $$('video').forEach(other => { if (other !== video) other.pause(); });
}));
