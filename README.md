# QR Code Almoxarifado - Sistema de Controle de Estoque

![Logo do Projeto](https://github.com/user-attachments/assets/8a2313cc-ed52-4039-9754-fcd628c8e3b4)


## 📋 Descrição do Projeto

Sistema desenvolvido para gestão de estoque em almoxarifados através de leitura de QR Codes, identificando automaticamente a localização física dos materiais nas prateleiras e integrando com Google Forms para registro automatizado.

## ✨ Funcionalidades Principais

- 🔍 Leitor de QR Code para identificação de materiais
- 📍 Visualização da posição exata (prateleira/coluna)
- 🔗 Integração automática com Google Forms
- 📱 Interface mobile-first para uso em dispositivos móveis
- 🔎 Busca manual por código de material

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5
- **Leitor QR**: Biblioteca react-qr-reader
- **Estilização**: CSS3
- **Integração**: Google Forms API
- **Deploy**: Vercel

## � Como Usar

### Configuração Inicial

1. **Configurar Google Forms**:
   - Crie um formulário com campos para:
     - Código do material
     - Quantidade
     - Posição (prateleira/coluna)
   - Gere o link de preenchimento automático (instruções abaixo)

2. **Configurar Aplicativo**:
   - Cole o link do formulário no campo indicado
   - Clique em "Salvar formulário"

### Fluxo Principal

1. Escaneie o QR Code do material
2. O sistema automaticamente:
   - Identifica o código do material
   - Mostra a posição no almoxarifado
   - Redireciona para o Google Forms com os campos pré-preenchidos
3. Complete as informações adicionais no formulário

### Busca Manual

1. Clique em "Buscar Posição por Código"
2. Digite o código do material
3. Visualize a posição correspondente

## 📲 Instalação como PWA

Para melhor experiência, instale como aplicativo:

1. Acesse https://qr-code-delta-amber-78.vercel.app no seu celular
2. Clique nos 3 pontos no navegador
3. Selecione "Adicionar à tela inicial"
4. Nomeie como "Almoxarifado QR" e confirme

## 🖥️ Telas do Sistema

| Tela Inicial | Busca por Código |
|--------------|------------------|
| ![Tela Inicial](https://github.com/user-attachments/assets/6a84a94b-aec4-4045-b056-9b86b47cd515) | ![Busca Código](https://github.com/user-attachments/assets/8170da23-7c74-4c4d-8f05-b4e061cecac0)

## ⚙️ Configuração do Google Forms

Siga estes passos para configurar o formulário:

1. Crie campos para:
   - Código (texto)
   - Quantidade (número)
   - Posição (texto)

2. Gere o link de preenchimento automático:
   ```
   https://docs.google.com/forms/d/e/FORM_ID/viewform?usp=pp_url&entry.CODIGO_FIELD=350&entry.POSICAO_FIELD=A1A1
   ```

3. Substitua no aplicativo colando no input com placeholder "Cole aqui" por este link

## 📌 Pré-requisitos

- Dispositivo móvel com câmera
- Acesso à internet
- Conta Google para formulários
- Navegador Atualizado

## 📄 Licença

Distribuído sob licença MIT. Veja `LICENSE` para mais informações.

## ✉️ Contato

Desenvolvido por Wesley Batista Souza - [LinkedIn](https://www.linkedin.com/in/wesley-batista-souza/)  
Email: wessouza06@gmail.com

---

**Acesse o projeto**: [https://qr-code-delta-amber-78.vercel.app](https://qr-code-delta-amber-78.vercel.app)  
**Repositório**: [https://github.com/WesleyBatistaSouza/qrCode-front](https://github.com/WesleyBatistaSouza/qrCode-front)
