(function () {
  // ==== EDIT THIS ONE LINE ====
  var PASSWORD = "storey2026";
  // ============================

  var KEY = "storey_access";

  // If already unlocked this session, do nothing.
  if (sessionStorage.getItem(KEY) === "granted") return;

  // Hide the page immediately so nothing flashes before the gate.
  var hideStyle = document.createElement("style");
  hideStyle.id = "gate-hide";
  hideStyle.textContent = "body > *:not(#gate-overlay){visibility:hidden !important;}";
  document.head.appendChild(hideStyle);

  function buildGate() {
    var overlay = document.createElement("div");
    overlay.id = "gate-overlay";
    overlay.innerHTML = ''
      + '<div id="gate-card">'
      + '  <div id="gate-mark">The <strong>Storey</strong> Studio</div>'
      + '  <h1 id="gate-title">This portfolio is private</h1>'
      + '  <p id="gate-sub">Enter the password to view the work.</p>'
      + '  <input id="gate-input" type="password" placeholder="Password" autocomplete="off" />'
      + '  <button id="gate-btn">Enter</button>'
      + '  <p id="gate-error"></p>'
      + '</div>';

    var css = document.createElement("style");
    css.textContent = ''
      + '#gate-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;'
      + 'justify-content:center;background:#1F3864;font-family:Arial,Helvetica,sans-serif;}'
      + '#gate-card{background:#ffffff;max-width:380px;width:88%;padding:44px 36px;border-radius:14px;'
      + 'box-shadow:0 20px 60px rgba(0,0,0,0.35);text-align:center;}'
      + '#gate-mark{color:#1F3864;font-size:15px;letter-spacing:1px;margin-bottom:26px;text-transform:uppercase;}'
      + '#gate-mark strong{font-weight:700;}'
      + '#gate-title{color:#1F3864;font-size:22px;margin:0 0 8px;font-weight:700;}'
      + '#gate-sub{color:#5a6474;font-size:14px;margin:0 0 24px;}'
      + '#gate-input{width:100%;box-sizing:border-box;padding:13px 14px;font-size:15px;'
      + 'border:1.5px solid #cdd4e0;border-radius:8px;outline:none;font-family:inherit;}'
      + '#gate-input:focus{border-color:#1F3864;}'
      + '#gate-btn{width:100%;margin-top:14px;padding:13px;font-size:15px;font-weight:700;color:#fff;'
      + 'background:#1F3864;border:none;border-radius:8px;cursor:pointer;letter-spacing:0.5px;}'
      + '#gate-btn:hover{background:#152a4d;}'
      + '#gate-error{color:#c0392b;font-size:13px;height:16px;margin:12px 0 0;}';
    document.head.appendChild(css);
    document.body.appendChild(overlay);

    var input = document.getElementById("gate-input");
    var btn = document.getElementById("gate-btn");
    var err = document.getElementById("gate-error");
    input.focus();

    function tryUnlock() {
      if (input.value === PASSWORD) {
        sessionStorage.setItem(KEY, "granted");
        overlay.remove();
        var h = document.getElementById("gate-hide");
        if (h) h.remove();
      } else {
        err.textContent = "Incorrect password. Try again.";
        input.value = "";
        input.focus();
      }
    }

    btn.addEventListener("click", tryUnlock);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") tryUnlock();
    });
  }

  if (document.body) {
    buildGate();
  } else {
    window.addEventListener("DOMContentLoaded", buildGate);
  }
})();
