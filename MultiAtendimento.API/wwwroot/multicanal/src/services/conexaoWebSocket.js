import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import Cookies from 'js-cookie';

export default {
    obterConexao() {
        const hubConnectionBuilder = new HubConnectionBuilder()
               .withUrl("http://localhost:9000/chatHub", { accessTokenFactory: () => Cookies.get("tokenDeAcesso") })
               .configureLogging(LogLevel.Information);
        return hubConnectionBuilder.build();
    },
    async iniciarConexao(conexao) {
        try {
            await conexao.start();
            console.log("SignalR Connected.")
        }
        catch (erro) {
            console.log("erro:", erro);
        }
    },
    // definirEventoASerEscutado(conexao, nomeEvento, funcaoCallASerExecutada) {
    //     conexao.on(nomeEvento, funcaoCallASerExecutada);
    // },
    // chamarFuncaoRemota(conexao, nomeFuncaoRemota, objetoDeEnvio) {
    //     if (objetoDeEnvio)
    //         conexao.invoke(nomeFuncaoRemota, objetoDeEnvio);
    //     else 
    //         conexao.invoke(nomeFuncaoRemota);
    // }
}