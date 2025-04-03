import { useState } from 'react'; 
// importa o hook useState do React para gerenciar estados do componente

function ListaTarefas() { 
    // define o função ListaTarefas

    const [tarefas, setTarefas] = useState([]);
    // estado que armazena a lista de tarefas

    const [novaTarefa, setNovaTarefa] = useState('');
    // estado que armazena o texto digitado no input

    const [tarefasFeitas, setTarefasFeitas] = useState([]);
    // estado que guarda os ids das tarefas concluídas

    const [ordenacao, setOrdenacao] = useState("data");
    // estado que define o tipo de ordenação das tarefas

    const adicionarTarefa = () => {
        // função que adiciona uma nova tarefa à lista

        if (novaTarefa.trim() !== '') {
            //condicional para verificar se o input não está vazio

            setTarefas([...tarefas, { id: Date.now(), texto: novaTarefa }]);
            // adiciona uma nova tarefa ao array de tarefas, com um id único baseado no timestamp

            setNovaTarefa("");
            // limpa o input após adicionar a tarefa
        }
    };

    const removerTarefa = (id) => { 
        // função que remove uma tarefa pelo id

        setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
        // filtra a lista de tarefas, removendo aquela com o id correspondente

        setTarefasFeitas(tarefasFeitas.filter((tarefaId) => tarefaId !== id));
        // remove a tarefa da lista de concluídas, se estiver marcada
    };

    const toggleFeita = (id) => {
        // função que marca ou desmarca uma tarefa como concluída

        setTarefasFeitas((prev) =>
            prev.includes(id) ? prev.filter((tarefaId) => tarefaId !== id) : [...prev, id]
        );
        // se o id estiver na lista de concluídas, remove; se não estiver, adiciona
    };

    const ordenarTarefas = () => {
        // função que retorna a lista de tarefas ordenada conforme o estado de ordenação

        let tarefasOrdenadas = [...tarefas];
        // cria uma cópia da lista de tarefas para não modificar o estado original

        if (ordenacao === "alfabetica") {
            // se a ordenação for alfabética, ordena as tarefas pelo texto
            tarefasOrdenadas.sort((a, b) => a.texto.localeCompare(b.texto));
        }

        return tarefasOrdenadas;
        // retorna a lista ordenada
    };

    return (
        <div>
            {/* estrutura visual do componente */}

            <h2>Lista de Tarefas</h2>
            {/* título da aplicação */}

            <input
                type='text'
                placeholder="Digite uma nova tarefa..."
                value={novaTarefa}
                onChange={(e) => setNovaTarefa(e.target.value)}
                className="input-tarefa"
            />
            {/* campo de input para adicionar uma nova tarefa, ligado ao estado novaTarefa */}

            <button onClick={adicionarTarefa}>Adicionar</button>
            {/* botão que chama a função adicionarTarefa ao ser clicado */}

            <ul className="lista-tarefas">
                {/* lista onde as tarefas serão exibidas */}

                {ordenarTarefas().map((tarefa) => (
                    // percorre a lista de tarefas e renderiza cada uma

                    <li key={tarefa.id} className={tarefasFeitas.includes(tarefa.id) ? "feito" : ""}>
                        {/* se a tarefa estiver na lista de concluídas, adiciona a classe "feito" */}

                        <input 
                            type="checkbox" 
                            checked={tarefasFeitas.includes(tarefa.id)} 
                            onChange={() => toggleFeita(tarefa.id)}
                        />
                        {/* checkbox que permite marcar ou desmarcar a tarefa como concluída */}

                        <span className="tarefa-texto">{tarefa.texto}</span>
                        {/* exibe o texto da tarefa */}

                        <button onClick={() => removerTarefa(tarefa.id)}>Remover</button>
                        {/* botão para remover a tarefa */}
                    </li>
                ))}
            </ul>

            <div>
                {/* botões para definir o critério de ordenação */}

                <button onClick={() => setOrdenacao("alfabetica")}>Ordem Alfabética</button>
                {/* define a ordenação como alfabética */}

                <button onClick={() => setOrdenacao("data")}>Ordem por data</button>
                {/* define a ordenação como data de criação */}
            </div>
        </div>
    );
}

export default ListaTarefas;
// exporta o componente para ser utilizado em outros arquivos do projeto
