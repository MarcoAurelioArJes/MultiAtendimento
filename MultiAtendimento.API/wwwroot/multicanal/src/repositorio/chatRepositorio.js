import apiService from "./apiService";

const baseEndpoint = "chat"
export default {
    async obterTodos() {
        let respostaHttp = await apiService.requisicao({endpoint: `${baseEndpoint}/obterChatsDoUsuario`, verboHttp: "GET"})
        
        let respostaBody = await apiService.resposta(respostaHttp);
        
        console.log(respostaHttp.ok)
        if (!respostaHttp.ok) 
            throw new Error(JSON.stringify(resultado))

        return respostaBody;
    }
}