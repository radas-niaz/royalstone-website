/* ----------------------------------------------------------
   REBATE FLOATING BANNER + WIDGET + FIREWORKS
   ---------------------------------------------------------- */
const rebateHTML = `
  <div class="rebate-floating-banner slide-up">
    <span class="rebate-message">💡 Hey! Check your rebate in 60 seconds!</span>
    <button id="rebate-open-btn">Check Eligibility →</button>
  </div>

  <div id="rebate-widget-overlay" style="display:none;">
    <div class="rebate-widget-modal">
      <button id="rebate-close-btn" aria-label="Close">×</button>
      <iframe src="https://rebate-checker-widget.netlify.app/" allowfullscreen></iframe>
    </div>
  </div>

  <!-- Fireworks layer -->
  <div id="fireworks-container"></div>
`;

document.body.insertAdjacentHTML("beforeend", rebateHTML);

/* ---------------- STYLES ---------------- */
const style = document.createElement("style");
style.textContent = `
  .rebate-floating-banner {
    position: fixed;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    background: #003366;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 18px;
    border-radius: 50px;
    width: calc(100% - 40px);
    max-width: 520px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.25);
    font-family: system-ui, sans-serif;
    opacity: 0;
    animation: slideUpAppear 0.6s ease forwards;
  }
  .rebate-message {
    font-size: 15px;
    font-weight: 500;
    margin-right: 10px;
  }
  .rebate-floating-banner button {
    background: #fff;
    color: #003366;
    border: none;
    padding: 8px 16px;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s ease, transform 0.3s ease;
  }
  .rebate-floating-banner button:hover {
    background: #f2f2f2;
    transform: translateY(-2px);
  }

  #rebate-widget-overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  .rebate-widget-modal {
    background: white;
    width: 95%;
    max-width: 500px;
    height: 85%;
    border-radius: 12px;
    position: relative;
    overflow: hidden;
    animation: fadeIn 0.3s ease;
  }
  .rebate-widget-modal iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
  #rebate-close-btn {
    position: absolute;
    top: 12px; right: 12px;
    background: transparent;
    border: none;
    font-size: 28px;
    cursor: pointer;
    color: #333;
    transition: color 0.2s ease;
  }
  #rebate-close-btn:hover { color: #007bff; }

  @media (max-width:768px){
    .rebate-widget-modal{width:100%;height:100%;max-width:none;border-radius:0;}
    .rebate-floating-banner{
      bottom:70px;border-radius:12px;flex-direction:column;
      align-items:stretch;text-align:center;gap:8px;padding:14px 12px;
    }
    .rebate-floating-banner button{width:100%;}
  }

  @keyframes slideUpAppear{
    0%{transform:translate(-50%,100%);opacity:0;}
    100%{transform:translate(-50%,0);opacity:1;}
  }
  @keyframes slideDownHide{
    0%{transform:translate(-50%,0);opacity:1;}
    100%{transform:translate(-50%,100%);opacity:0;}
  }
  @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
  
  /* Fireworks */
  #fireworks-container{
    position:fixed;top:0;left:0;width:100%;height:100%;
    overflow:hidden;pointer-events:none;z-index:10000;
  }
  .firework{
    position:absolute;border-radius:50%;opacity:0;
    animation:explode 1s ease-out forwards;
  }
  @keyframes explode{
    0%{transform:scale(0);opacity:1;}
    80%{transform:scale(1.5);opacity:1;}
    100%{transform:scale(2);opacity:0;}
  }
`;
document.head.appendChild(style);

/* ---------------- LOGIC ---------------- */
const rebateBar = document.querySelector(".rebate-floating-banner");
const openBtn = document.getElementById("rebate-open-btn");
const overlay = document.getElementById("rebate-widget-overlay");
const closeBtn = document.getElementById("rebate-close-btn");

/* ---- Fireworks ---- */
function createFirework(){
  const container=document.getElementById("fireworks-container");
  const fw=document.createElement("div");
  fw.classList.add("firework");
  const colors=["#ff4b5c","#ffd700","#4bcffa","#32ff7e","#ff8c00","#ffffff"];
  fw.style.background=colors[Math.floor(Math.random()*colors.length)];
  fw.style.width=fw.style.height=`${Math.random()*8+4}px`;
  fw.style.left=`${Math.random()*100}%`;
  fw.style.top=`${Math.random()*60+10}%`;
  container.appendChild(fw);
  setTimeout(()=>fw.remove(),1000);
}
function startFireworks(duration=2500){
  const interval=setInterval(()=>{
    for(let i=0;i<8;i++)createFirework();
  },120);
  setTimeout(()=>clearInterval(interval),duration);
}

/* ---- Widget Open/Close ---- */
openBtn.addEventListener("click",()=>{
  overlay.style.display="flex";
  rebateBar.style.animation="slideDownHide 0.4s ease forwards";
  startFireworks(3000); // 🎆 trigger fireworks
});
closeBtn.addEventListener("click",()=>{
  overlay.style.display="none";
  rebateBar.style.animation="slideUpAppear 0.5s ease forwards";
});

/* ---- Adjust position if another bottom bar ---- */
window.addEventListener("DOMContentLoaded",()=>{
  const existingBar=document.querySelector(".mobile-cta");
  if(existingBar&&rebateBar){
    const barHeight=existingBar.offsetHeight||60;
    rebateBar.style.bottom=`${barHeight+10}px`;
  }
});
