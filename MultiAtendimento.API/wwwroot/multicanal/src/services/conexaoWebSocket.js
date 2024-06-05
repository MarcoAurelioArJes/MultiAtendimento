import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'

export default {
    obterConexao() {
        const hubConnectionBuilder = new HubConnectionBuilder()
               .withUrl("http:localhost:9000/chatHub", { accessTokenFactory: () => localStorage.getItem("tokenDeAcesso") })
               .configureLogging(LogLevel.Information);
        
        return hubConnectionBuilder.build();
    },
    iniciarConexao(conexao) {
        try {
            conexao.start()
            .then(() => console.log("TESTE"));
            console.log("SignalR Connected.")
        }
        catch (erro) {
            console.log("erro:", erro);
        }
    },
    definirEventoASerEscutado(conexao, nomeEvento, funcaoASerExecutada) {
        conexao.on(nomeEvento, funcaoASerExecutada);
    },
    chamarFuncaoRemota(conexao, nomeFuncaoRemota, objetoDeEnvio) {
        conexao.invoke(nomeFuncaoRemota, objetoDeEnvio);
    }
}