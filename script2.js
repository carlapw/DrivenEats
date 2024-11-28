let pedidos = {
    pratos: null,
    bebidas: null,
    sobremesas: null

};

const pratos = document.querySelectorAll('.sessaoPratos > div');
const bebidas = document.querySelectorAll('.sessaoBebidas > div');
const sobremesas = document.querySelectorAll('.sessaoSobremesas > div');

const botao = document.getElementById('botao');

function eventos(itens, tipo){ //adicionar eventos para selecionar os itens
    itens.forEach(item => {
        item.addEventListener('click', () => { 

            itens.forEach(i => i.style.borderColor = 'transparent'); // remoner o selecionado anterior da mesma categoria

            item.style.borderColor = '#32B72F'; // adicionar a borda no item clicado

            pedidos[tipo] = {  // salavar os nomes e os precos dos itens clicados 
                nome: item.getAttribute('data-nome'),
                preco: parseFloat(item.getAttribute('data-preco'))
            };

            if (pedidos.pratos && pedidos.bebidas && pedidos.sobremesas){
                botao.textContent = "Fechar Pedidos";
                botao.disabled = false;
            }

        });
    });
};

eventos(pratos, 'pratos' );
eventos(bebidas, 'bebidas' );
eventos(sobremesas, 'sobremesas' );

botao.addEventListener('click', () => {

    const { pratos, bebidas, sobremesas } = pedidos;
    

    if (pratos && bebidas && sobremesas){
         const total = pratos.preco + bebidas.preco + sobremesas.preco;

         

         const fundo = document.getElementById('fundo');
         fundo.style.display = 'block';

        const mensagemWhatsapp = `Meu Pedido é:%0A 
        - PRATO: ${pratos.nome} (R$ ${pratos.preco.toFixed(2)})%0A
        - BEBIDA: ${bebidas.nome} (R$ ${bebidas.preco.toFixed(2)})%0A
        - SOBREMESA: ${sobremesas.nome} (R$ ${sobremesas.preco.toFixed(2)})%0A
        TOTAL: R$ ${total.toFixed(2)}`;


        const urlWhatsapp = `https://wa.me/5574999136640?text=${mensagemWhatsapp}`;


         informacoes.innerHTML = `
         <div id="resumoPedido">
         <h2> Confirme seu Pedido </h2>
         <p id="paragrafo"> ${pratos.nome} - R$ ${pratos.preco.toFixed(2)}</p>
         <p id="paragrafo"> ${bebidas.nome} - R$ ${bebidas.preco.toFixed(2)}</p>
         <p id="paragrafo"> ${sobremesas.nome} - R$ ${sobremesas.preco.toFixed(2)}</p>
         <h3> Total: R$ ${total.toFixed(2)}</h3>
         <a id="butte" href="${urlWhatsapp}" target="_blank">Confirmar Pedido</a>
         <button onclick="cancelarPedido()"> Cancelar </button>
         </div>
         `
    } else{
        alert("Por favor, selecione um preto, uma bebida e uma sobremesa")
    }
});

document.getElementById('resumoPedido').remove();
document.getElementById('fundo').style.display = 'none';

function cancelarPedido(){
    document.getElementById('resumoPedido').remove();
    document.getElementById('fundo').style.display = 'none';
}