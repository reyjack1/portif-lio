$(document).ready(function () {
    // === Transição automática de imagens no fundo do .heroi ===
    // Array com os caminhos das imagens para o fundo do header principal (heroi)
    const imagensHeroi = [
        'img/fundo-hero.jpg',
        'img/fundo-hero1.jpg',
        'img/fundo-hero2.jpg',
        'img/fundo-hero3.jpg'
    ];
    let indexAtual = 0; // Índice da imagem exibida atualmente

    // Troca a imagem do fundo a cada 20 segundos, fazendo um loop
    setInterval(function trocarImagemHeroi() {
        indexAtual = (indexAtual + 1) % imagensHeroi.length;
        $('.heroi').css('background-image', `url('${imagensHeroi[indexAtual]}')`);
    }, 20000);

    // === Botão futurista: animação de hover e clique ===
    // Destaca o botão ao passar o mouse
    $('.botao-futurista').hover(
        function() {
            $(this).css('box-shadow', '0 0 35px #ff8000');
        },
        function() {
            $(this).css('box-shadow', '0 2px 18px #ff800066');
        }
    );
    // Efeito de brilho ao pressionar o botão
    $('.botao-futurista').on('mousedown', function() {
        $(this).css({ filter: 'brightness(1.15)' });
    }).on('mouseup mouseleave', function() {
        $(this).css({ filter: '' });
    });

    // === Animação de revelação dos cards de projeto ao rolar a página ===
    function revealOnScroll() {
        $('.projeto').each(function(){
            var winTop = $(window).scrollTop();      // Topo da janela visível
            var winHeight = $(window).height();      // Altura da janela
            var offset = $(this).offset().top;       // Posição do topo do card
            // Se o card está visível na janela, adiciona a classe que revela (fade/slide)
            if (offset < winTop + winHeight - 60) {
                $(this).addClass('apareceu');
            }
        });
    }
    // Chama a função ao rolar ou redimensionar a janela
    $(window).on('scroll resize', revealOnScroll);
    // Executa uma vez ao carregar a página
    revealOnScroll();

    // === Efeito máquina de escrever no título principal ===
    function typeWriter(element, speed) {
        var $el = $(element);
        var text = $el.text(); // Texto original do elemento
        $el.html('');          // Limpa o elemento
        let i = 0;
        // Função recursiva para exibir as letras uma a uma
        function typing() {
            if (i < text.length) {
                $el.append(text.charAt(i));
                i++;
                setTimeout(typing, speed);
            }
        }
        typing();
    }
    // Aplica o efeito no título principal do header
    typeWriter('.conteudo-heroi h1', 90);

    // === Rolagem suave ao clicar nos links do menu ===
    $('.barra-navegacao a').on('click', function(e){
        var id = $(this).attr('href'); // Pega o destino do link
        // Se for um link âncora para uma seção da página
        if(id && id.startsWith('#') && $(id).length){
            e.preventDefault();
            // Rola suavemente até a seção, menos 30px para compensar o topo
            $('html, body').animate({
                scrollTop: $(id).offset().top - 30
            }, 700);
        }
    });

    // === Parallax leve nas imagens dos cards de projeto ao mover o mouse ===
    $('.projeto-imagem').on('mousemove', function(e){
        var $this = $(this);
        // Calcula o deslocamento do mouse dentro da imagem
        var x = e.offsetX / $this.width() * 10 - 5;
        var y = e.offsetY / $this.height() * 10 - 5;
        // Aplica transformação de escala e deslocamento na imagem
        $this.css('transform', `scale(1.04) translate(${x}px,${y}px)`);
    }).on('mouseleave', function(){
        // Reseta a transformação ao sair do mouse
        $(this).css('transform','');
    });

    // === ALERTA para projeto sem código disponível ===
    $('#codigo-banco').on('click', function(e) {
        e.preventDefault();
        alert('Este projeto não possui código disponível.');
    });

    // ALERTA para outro projeto sem código (caso futuro)
    $('#botao-codigo1').on('click', function(e) {
        // Exemplo de seletor para outro botão de código indisponível
        e.preventDefault();
        alert('Este projeto não possui código disponível.');
    });

    // === Função para rolar o carrossel de projetos pelas setas ===
    function scrollCarrossel(delta) {
        // Seleciona a lista de projetos dentro do carrossel
        const $lista = $('.carrossel-projetos .lista-projetos');
        // Largura de cada card (incluindo margin/gap)
        const cardWidth = $lista.children('.projeto').outerWidth(true) || 340;
        // Anima o scroll horizontal da lista
        $lista.animate({
            scrollLeft: $lista.scrollLeft() + delta * cardWidth
        }, 380);
    }

    // === Ativa as setas do carrossel (só aparecem em desktop pelo CSS) ===
    $('.carrossel-prev').on('click', function() {
        scrollCarrossel(-1); // Vai para a esquerda
    });
    $('.carrossel-next').on('click', function() {
        scrollCarrossel(1); // Vai para a direita
    });
});