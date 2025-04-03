import ListaTarefas from './components/ListaTarefas'; // Importa o componente "ListaTarefas"

import './App.css'; // Importa o arquivo css

function App() {
	return (
		<>
			<h1>Gerenciador de Tarefas</h1> {/* Título principal da aplicação */}
			<ListaTarefas /> {/*Renderiza o componente "ListaTarefas"*/}
		</>
	);
}

export default App; // Corrigindo o erro "export defalt" para "export default".

