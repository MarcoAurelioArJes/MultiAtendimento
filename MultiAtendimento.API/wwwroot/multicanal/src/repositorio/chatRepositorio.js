import apiService from "./apiService";

const baseEndpoint = "chat"
export default {
    async obterTodos() {
        let respostaHttp = await apiService.requisicao({endpoint: `${baseEndpoint}/obterChatsDoUsuario`, verboHttp: "GET"})
        
        let respostaBody = await apiService.resposta(respostaHttp);
        
        //if (!respostaHttp.ok) throw new Error(respostaBody);

        return respostaBody;
    }
}