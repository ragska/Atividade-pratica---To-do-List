import { useState, useEffect } from 'react';

function ListaTarefas() {
    const [tarefas, setTarefas] = useState([]);
    const [novaTarefa, setNovaTarefa] = useState('');
    const [tarefasFeitas, setTarefasFeitas] = useState([]);
    const [ordenacao, setOrdenacao] = useState("data");

    useEffect(() => {
        const tarefasSalvas = localStorage.getItem('tarefas');
        const feitasSalvas = localStorage.getItem('tarefasFeitas');
    
        if (tarefasSalvas) {
            setTarefas(JSON.parse(tarefasSalvas));
        }
    
        if (feitasSalvas) {
            setTarefasFeitas(JSON.parse(feitasSalvas));
        }
    }, []);
    
    const adicionarTarefa = () => {
        if (novaTarefa.trim() !== '') {
            setTarefas([...tarefas, { id: Date.now(), texto: novaTarefa }]);
            setNovaTarefa("");
        }
    };

    useEffect(() => {
        if (tarefas.length > 0) {
            localStorage.setItem('tarefas', JSON.stringify(tarefas));
        }
    }, [tarefas]);

    const removerTarefa = (id) => {
        setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
        setTarefasFeitas(tarefasFeitas.filter((tarefaId) => tarefaId !== id));
    };

    const toggleFeita = (id) => {
        setTarefasFeitas((prev) =>
            prev.includes(id) ? prev.filter((tarefaId) => tarefaId !== id) : [...prev, id]
        );
    };

    useEffect(() => {
        if (tarefasFeitas.length > 0) {
            localStorage.setItem('tarefasFeitas', JSON.stringify(tarefasFeitas));
        }
    }, [tarefasFeitas]);

    const ordenarTarefas = () => {
        let tarefasOrdenadas = [...tarefas];
        if (ordenacao === "alfabetica") {
            tarefasOrdenadas.sort((a, b) => a.texto.localeCompare(b.texto));
        }
        return tarefasOrdenadas;
    };

    return (
        <div>
            <h2>Lista de Tarefas</h2>
            <input
                type='text'
                placeholder="Digite uma nova tarefa..."
                value={novaTarefa}
                onChange={(e) => setNovaTarefa(e.target.value)}
                className="input-tarefa"
            />
            <button onClick={adicionarTarefa}>Adicionar</button>
            <ul className="lista-tarefas">
                {ordenarTarefas().map((tarefa) => (
                    <li key={tarefa.id} className={tarefasFeitas.includes(tarefa.id) ? "feito" : ""}>
                        <input 
                            type="checkbox" 
                            checked={tarefasFeitas.includes(tarefa.id)} 
                            onChange={() => toggleFeita(tarefa.id)}
                        />
                        <span className="tarefa-texto">{tarefa.texto}</span>
                        <button onClick={() => removerTarefa(tarefa.id)}>Remover</button>
                    </li>
                ))}
            </ul>
            <div>
                <button onClick={() => setOrdenacao("alfabetica")}>Ordem Alfabética</button>
                <button onClick={() => setOrdenacao("data")}>Ordem por data</button>
            </div>
        </div>
    );
}

export default ListaTarefas;
