import { mockData } from "./data.js";
const codigoInput = document.getElementById("codigo");
const resultado = document.getElementById("resultado");
const SearchPositionBtn = document.getElementById("search-position-btn");

codigoInput.addEventListener("input", () => {
  const isEmpty = codigoInput.value.trim() === "";
  SearchPositionBtn.disabled = isEmpty;
  SearchPositionBtn.style.opacity = isEmpty ? "0.6" : "1";
  SearchPositionBtn.style.cursor = isEmpty ? "not-allowed" : "pointer";
});

async function positionCode(code) {
  try {
    const produto = mockData.find((item) => item.codigo === code);
    return { codigo: code, posicao: produto?.posicao ?? null };
  } catch (error) {
    console.error("Erro ao buscar posição:", error);
    return { codigo: code, posicao: null };
  }
}

async function buscarPosicao() {
  const codigo = codigoInput.value.trim();
  if (!codigo) {
    resultado.textContent = "Por favor, insira um código.";
    return;
  }

  const { codigo: cod, posicao } = await positionCode(codigo);
  if (posicao) {
    resultado.textContent = `Código: ${cod}, Posição: ${posicao}`;
  } else {
    resultado.textContent = `Código: ${cod}, Posição não encontrada.`;
  }
}

SearchPositionBtn.addEventListener("click", (e) => {
  e.preventDefault();
  buscarPosicao();
  codigoInput.value = '';
});
