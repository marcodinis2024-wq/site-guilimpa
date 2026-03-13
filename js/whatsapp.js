window.enviarEmail = function() {
    const email = "geral@guilimpa.pt";
    const assunto = "Pedido de Orçamento - GUI LIMPA";
    const corpo = "Olá equipa da GUI LIMPA!\n\nGostaria de pedir um orçamento para os vossos serviços.";

    const isMobile = /iPhone|Android/i.test(navigator.userAgent);

    if (!isMobile) {
        // Se for PC, abre diretamente o Gmail no browser com os campos preenchidos
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
        window.open(gmailUrl, '_blank');
    } else {
        // Se for Telemóvel, o mailto: funciona quase sempre bem nas apps nativas
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
    }
};