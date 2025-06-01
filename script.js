document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("qr-form");
  const input = document.getElementById("qr-input");
  const qrCodeContainer = document.getElementById("qrcode");
  const downloadBtn = document.getElementById("download-btn");

  // Hold current QR code instance globally
  let currentQRCode = null;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const text = input.value.trim();
    qrCodeContainer.innerHTML = "";
    downloadBtn.style.display = "none";

    if (text === "") {
      alert("Please enter some text or a URL.");
      return;
    }

    const rootStyles = getComputedStyle(document.documentElement);
    const qrDarkColor = rootStyles.getPropertyValue("--qr-dark-color").trim();
    const qrLightColor = rootStyles.getPropertyValue("--qr-light-color").trim();

    currentQRCode = new QRCode(qrCodeContainer, {
      text: text,
      width: 160,
      height: 160,
      colorDark: qrDarkColor,
      colorLight: qrLightColor,
      correctLevel: QRCode.CorrectLevel.H,
    });

    // Fade-in animation
    qrCodeContainer.classList.remove("qr-fade-in");
    void qrCodeContainer.offsetWidth; // trigger reflow
    qrCodeContainer.classList.add("qr-fade-in");

    // Show download button
    downloadBtn.style.display = "inline-block";
  });

  downloadBtn.addEventListener("click", function () {
    if (!currentQRCode) return;

    // QRCode.js renders canvas or img - get the first child
    const qrCanvas = qrCodeContainer.querySelector("canvas");
    if (qrCanvas) {
      const dataURL = qrCanvas.toDataURL("image/png");

      // Create a temporary link to download
      const a = document.createElement("a");
      a.href = dataURL;
      a.download = "qr-code.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      alert("Sorry, your browser does not support canvas download.");
    }
  });
});
