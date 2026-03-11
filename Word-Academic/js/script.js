document.addEventListener('DOMContentLoaded', () => {
    
    const API_KEY = "AIzaSyDYe5UiMojE1Jz3DFiVSlyhciAW2nIVRJE"; 
    const MODELO = "gemini-1.5-flash";

    // 2. SELEÇÃO DE ELEMENTOS
    const btnAbrir = document.getElementById('btnAbrirChat');
    const btnFechar = document.getElementById('btnFecharChat');
    const janela = document.getElementById('janelaChat');
    const btnEnviar = document.getElementById('btnEnviarMsg');
    const campoTexto = document.getElementById('campoMensagem');
    const listaMsgs = document.getElementById('listaMensagens');

    // 3. ABRIR E FECHAR
    if (btnAbrir) {
        btnAbrir.onclick = () => { janela.style.display = 'flex'; btnAbrir.style.display = 'none'; };
    }
    if (btnFechar) {
        btnFechar.onclick = () => { janela.style.display = 'none'; btnAbrir.style.display = 'block'; };
    }

    // 4. FUNÇÃO PARA FALAR COM A IA
    async function chamarIA(perguntaUsuario) {
        // Cria balão de "Digitando..."
        const botDiv = document.createElement('div');
        botDiv.classList.add('msg-bot');
        botDiv.innerText = "Pensando...";
        listaMsgs.appendChild(botDiv);
        listaMsgs.scrollTop = listaMsgs.scrollHeight;

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com{MODELO}:generateContent?key=${API_KEY}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: `Você é o assistente virtual da WordAcademic, uma agência de intercâmbio. Responda de forma curta e amigável sobre: ${perguntaUsuario}` }]
                    }]
                })
            });

            const data = await response.json();
            const textoIA = data.candidates[0].content.parts[0].text;
            
            // Substitui o "Pensando..." pela resposta real
            botDiv.innerText = textoIA;

        } catch (error) {
            botDiv.innerText = "Erro ao conectar com a IA. Verifique sua chave!";
            console.error(error);
        }
        listaMsgs.scrollTop = listaMsgs.scrollHeight;
    }

    // 5. ENVIAR MENSAGEM
    function enviar() {
        const msg = campoTexto.value.trim();
        if (msg !== "") {
            const divUser = document.createElement('div');
            divUser.classList.add('msg-user');
            divUser.innerText = msg;
            listaMsgs.appendChild(divUser);
            
            campoTexto.value = ""; 
            listaMsgs.scrollTop = listaMsgs.scrollHeight;

            // Chama a Inteligência Artificial
            chamarIA(msg);
        }
    }

    if (btnEnviar) btnEnviar.onclick = enviar;
    if (campoTexto) campoTexto.onkeypress = (e) => { if (e.key === 'Enter') enviar(); };
});
