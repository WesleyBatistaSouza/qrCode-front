import { mockData } from "./data.js";

const scanner = new Html5Qrcode("reader");
let redirecionado = false;
let scannerAtivo = false;

let saveQrData = JSON.parse(localStorage.getItem("qrCodeData")) || [];

let formConfig = JSON.parse(localStorage.getItem("formConfig")) || {
  baseUrl: "",
  entryCodigo: "",
  entryPosicao: ""
};

const startScanBtn = document.getElementById("code");
const salvarFormBtn = document.getElementById("salvar-form");
const urlInput = document.getElementById("form-url");
const resultadoQrCode = document.getElementById("result");
const statusEl = document.getElementById("status");
const beep = document.getElementById("beep-sound");

function inicializarBotaoSalvar() {
  salvarFormBtn.disabled = true;
  salvarFormBtn.style.opacity = "0.6";
  salvarFormBtn.style.cursor = "not-allowed";
}

function atualizarHistorico() {
  const agora = Date.now();
  saveQrData = saveQrData.filter(item => agora - item.timestamp <= 3 * 60 * 1000);
  localStorage.setItem("qrCodeData", JSON.stringify(saveQrData));

  resultadoQrCode.innerHTML = "";
  saveQrData.forEach(item => {
    resultadoQrCode.innerHTML += `${item.codigo} - ${item.posicao ?? "sem posição"}<br>`;
  });
}

function iniciarScanner() {
  redirecionado = false;
  scanner.start({ facingMode: "environment" }, { fps: 10, qrbox: 450 }, onScann)
    .then(() => {
      scannerAtivo = true;
      console.log("Scanner iniciado.");
    })
    .catch(err => console.error("Erro ao iniciar o scanner:", err));
}

function pararScanner() {
  scanner.stop()
    .then(() => {
      scannerAtivo = false;
      console.log("Scanner parado.");
      scanner.clear();
    })
    .catch(err => console.error("Erro ao parar o scanner:", err));

  startScanBtn.innerHTML = "Ler Código";
  startScanBtn.style.backgroundColor = "#008000";
  redirecionado = false;
}

async function fetchPositionCode(code) {
  try {
    const produto = mockData.find(item => item.codigo === code);
    return { codigo: code, posicao: produto?.posicao ?? null };
  } catch (error) {
    console.error("Erro ao buscar posição:", error);
    return { codigo: code, posicao: null };
  }
}

async function onScann(qrData) {
  if (redirecionado) return;
  redirecionado = true;

  beep.play();
  const { codigo, posicao } = await fetchPositionCode(qrData);

  const url = `${formConfig.baseUrl}?usp=pp_url&${formConfig.entryCodigo}=${encodeURIComponent(codigo)}${posicao ? `&${formConfig.entryPosicao}=${encodeURIComponent(posicao)}` : ''}`;

  saveQrData.push({ codigo, posicao, timestamp: Date.now() });
  if (saveQrData.length > 2) saveQrData = saveQrData.slice(-2);
  atualizarHistorico();

  statusEl.innerHTML = posicao ? "Lido com sucesso! Contém Código e Posição" : "Lido com sucesso! Contém somente Código";
  statusEl.style.color = posicao ? "green" : "orange";

  const formWindow = window.open(url, "_blank");
  if (formWindow) {
    formWindow.opener = null;
    formWindow.focus();
  } else {
    alert("Por favor, permita pop-ups para este site.");
  }

  pararScanner();
}

window.addEventListener("load", () => {
  console.log("Histórico de QR Codes:", saveQrData);
  atualizarHistorico();
  inicializarBotaoSalvar();
});


urlInput.addEventListener("input", () => {
  const isEmpty = urlInput.value.trim() === "";
  salvarFormBtn.disabled = isEmpty;
  salvarFormBtn.style.opacity = isEmpty ? "0.6" : "1";
  salvarFormBtn.style.cursor = isEmpty ? "not-allowed" : "pointer";
});

salvarFormBtn.addEventListener("click", () => {
  try {
    const url = new URL(urlInput.value);
    const params = new URLSearchParams(url.search);
    const entryKeys = [...params.keys()].filter(k => k.startsWith("entry."));

    if (entryKeys.length < 1) return alert("URL inválida: nenhum parâmetro 'entry.xxx' encontrado.");
    formConfig.baseUrl = url.origin + url.pathname;
    formConfig.entryCodigo = entryKeys[0];
    formConfig.entryPosicao = entryKeys[1] ?? "";

    localStorage.setItem("formConfig", JSON.stringify(formConfig));
    alert("Formulário salvo com sucesso!");
  } catch (error) {
    alert("URL inválida!");
    console.error(error);
  }

  urlInput.value = '';
});

startScanBtn.addEventListener("click", () => {
  if (scannerAtivo) {
    pararScanner();
  } else {
    startScanBtn.innerHTML = "Parar Scanner";
    startScanBtn.style.backgroundColor = "#ff1c1c";
    iniciarScanner();
  }
});