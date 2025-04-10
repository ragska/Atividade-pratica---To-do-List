import { useState, useEffect } from 'react'; // Importa as hooks useState e useEffect do react

// Função princpal
function ListaTarefas() {
    // Estado que armazena a lista de tarefas
    const [tarefas, setTarefas] = useState([]);

    // Estado que armazena o texto da nova tarefa sendo digitada
    const [novaTarefa, setNovaTarefa] = useState('');

    // Estado que guarda os IDs das tarefas marcadas como feitas
    const [tarefasFeitas, setTarefasFeitas] = useState([]);

    // Estado que define o tipo de ordenação: por data (padrão) ou alfabética
    const [ordenacao, setOrdenacao] = useState("data");

    // useEffect que roda uma única vez ao montar o componente
    useEffect(() => {
        // Busca as tarefas salvas no localStorage
        const tarefasSalvas = localStorage.getItem('tarefas');
        const feitasSalvas = localStorage.getItem('tarefasFeitas');

        // Se houver tarefas salvas, define no estado
        if (tarefasSalvas) {
            setTarefas(JSON.parse(tarefasSalvas));
        }

        // Se houver tarefas feitas salvas, define no estado
        if (feitasSalvas) {
            setTarefasFeitas(JSON.parse(feitasSalvas));
        }
    }, []);
    
    // Função para adicionar uma nova tarefa à lista
    const adicionarTarefa = () => {
        if (novaTarefa.trim() !== '') {
            setTarefas([...tarefas, { id: Date.now(), texto: novaTarefa }]);
            setNovaTarefa(""); // Limpa o input após adicionar
        }
    };

    // Salva as tarefas no localStorage sempre que a lista de tarefas mudar
    useEffect(() => {
        if (tarefas.length > 0) {
            localStorage.setItem('tarefas', JSON.stringify(tarefas));
        }
    }, [tarefas]);

    // Remove uma tarefa da lista (e também das feitas)
    const removerTarefa = (id) => {
        setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
        setTarefasFeitas(tarefasFeitas.filter((tarefaId) => tarefaId !== id));
    };

    // Marca ou desmarca uma tarefa como feita
    const toggleFeita = (id) => {
        setTarefasFeitas((prev) =>
            prev.includes(id) 
                ? prev.filter((tarefaId) => tarefaId !== id) // Desmarca
                : [...prev, id] // Marca
        );
    };

    // Salva no localStorage sempre que a lista de tarefas feitas mudar
    useEffect(() => {
        if (tarefasFeitas.length > 0) {
            localStorage.setItem('tarefasFeitas', JSON.stringify(tarefasFeitas));
        }
    }, [tarefasFeitas]);

    // Função que ordena as tarefas com base na ordenação selecionada
    const ordenarTarefas = () => {
        let tarefasOrdenadas = [...tarefas];
        if (ordenacao === "alfabetica") {
            // Ordena pelo texto da tarefa em ordem alfabética
            tarefasOrdenadas.sort((a, b) => a.texto.localeCompare(b.texto));
        }
        return tarefasOrdenadas;
    };

    // Remove todas as tarefas marcadas como feitas
    const limparTarefasFeitas = () => {
        const restantes = tarefas.filter((tarefa) => !tarefasFeitas.includes(tarefa.id));
        setTarefas(restantes);
        setTarefasFeitas([]);
        localStorage.setItem('tarefas', JSON.stringify(restantes));
        localStorage.removeItem('tarefasFeitas');
    };
    
    // Remove todas as tarefas (feitas e não feitas)
    const limparTodasTarefas = () => {
        setTarefas([]);
        setTarefasFeitas([]);
        localStorage.removeItem('tarefas');
        localStorage.removeItem('tarefasFeitas');
    };

    //retorna o que será exibido na tela
    return (
        <div>
            {/* Título principal da aplicação */}
            <h2>Lista de Tarefas</h2>
    
            {/* Campo de entrada para digitar uma nova tarefa */}
            <input
                type='text'
                placeholder="Digite uma nova tarefa..."
                value={novaTarefa} // valor do input controlado pelo estado
                onChange={(e) => setNovaTarefa(e.target.value)} // atualiza o estado a cada digitação
                className="input-tarefa" // classe CSS para estilização
            />
    
            {/* Botão para adicionar a tarefa digitada à lista */}
            <button onClick={adicionarTarefa}>Adicionar</button>
    
            {/* Lista de tarefas */}
            <ul className="lista-tarefas">
                {/* Mapeia e renderiza cada tarefa ordenada */}
                {ordenarTarefas().map((tarefa) => (
                    <li 
                        key={tarefa.id} // cada item da lista precisa de uma chave única
                        className={tarefasFeitas.includes(tarefa.id) ? "feito" : ""} // aplica classe "feito" se estiver marcada
                    >
                        {/* Checkbox para marcar/desmarcar a tarefa como feita */}
                        <input 
                            type="checkbox" 
                            checked={tarefasFeitas.includes(tarefa.id)} // define se o checkbox está marcado
                            onChange={() => toggleFeita(tarefa.id)} // alterna o estado de feito
                        />
    
                        {/* Texto da tarefa */}
                        <span className="tarefa-texto">{tarefa.texto}</span>
    
                        {/* Botão para remover a tarefa */}
                        <button onClick={() => removerTarefa(tarefa.id)}>Remover</button>
                    </li>
                ))}
            </ul>
    
            {/* Botões para escolher o tipo de ordenação da lista */}
            <div>
                <button onClick={() => setOrdenacao("alfabetica")}>Ordem Alfabética</button>
                <button onClick={() => setOrdenacao("data")}>Ordem por data</button>
            </div>
    
            {/* Botões para ações gerais com a lista de tarefas */}
            <div>
                {/* Remove apenas as tarefas que estão marcadas como feitas */}
                <button onClick={limparTarefasFeitas} className='botao'>Limpar Feitas</button>
    
                {/* Remove todas as tarefas, feitas ou não */}
                <button onClick={limparTodasTarefas} className='botao'>Limpar Tudo</button>
            </div>
        </div>
    );
    
}

//exporta o componente principal
export default ListaTarefas;
