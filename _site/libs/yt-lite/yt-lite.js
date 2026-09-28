/*
 * yt-lite : vignette YouTube respectueuse de la vie privée.
 * Aucune requête vers YouTube n'est effectuée tant que l'utilisateur
 * n'a pas cliqué ; la vidéo est alors chargée depuis youtube-nocookie.com.
 *
 * Balisage attendu :
 * <div class="yt-lite" data-yt-id="ID" data-yt-title="Titre">
 *   <button type="button" class="yt-lite-btn" aria-label="Lire la vidéo : Titre">
 *     <img src="yt/ID.jpg" alt="..." loading="lazy">
 *     <span class="yt-lite-play" aria-hidden="true"></span>
 *   </button>
 * </div>
 */
(function () {
  "use strict";

  function activate(container) {
    var id = container.getAttribute("data-yt-id");
    if (!id || !/^[A-Za-z0-9_-]{11}$/.test(id)) {
      return;
    }
    var iframe = document.createElement("iframe");
    iframe.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
    iframe.title = container.getAttribute("data-yt-title") || "Vidéo YouTube";
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute(
      "allow",
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    );
    iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    iframe.setAttribute("allowfullscreen", "");
    container.innerHTML = "";
    container.appendChild(iframe);
    container.classList.add("yt-lite-active");
    iframe.focus();
  }

  document.addEventListener("click", function (event) {
    var button = event.target.closest(".yt-lite-btn");
    if (!button) {
      return;
    }
    var container = button.closest(".yt-lite");
    if (container) {
      event.preventDefault();
      activate(container);
    }
  });
})();
